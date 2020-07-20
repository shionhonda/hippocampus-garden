---
title: Count Page Views & Show Popular Posts in Gatsby Blog
date: "2020-06-21T23:12:03.284Z"
description: "This post introduces how to count page views and show popular posts in the sidebar of Gatsby Blog. Google Analytics saves you the trouble of preparing databases and APIs."
featuredImage: trend/ogp.jpg
tags: ["en", "gatsby", "programming"]
---
Blogs built with WordPress and such have a feature to count page views and show popular posts. It helps visitors look around the web site and improves the average dwell time. Unfortunately, Gatsby does not support such features by default (remember that Gatsby is a Single Page App generator).

In this post, I show how I implemented the page view counter and the "popular posts" sidebar to this blog using **Google Analytics API**. Specifically, as you see in the sidebar, I made two boxes: "Trending" to show the most popular posts in the last 30 days from the build and "Most Read" to show the most popular posts since the first build.

![](2020-06-21-16-02-17.png)

## Count Page Views 
One of the easiest ways to count page views is to use Google Analytics. It won't bother you to think about databases and APIs, and it's free! I don't explain it in detail, but it's set up in a few minutes by following the official document of [Google Analytics](https://analytics.google.com/analytics/web/) and [gatsby-plugin-google-analytics](https://www.gatsbyjs.org/packages/gatsby-plugin-google-analytics/). Once you set up everything, you will be able to see reports of access logs at [Google Analytics](https://analytics.google.com/analytics/web/).

## Get Page Views
I guess counting page views itself was pretty easy, but in order to show the view counts in the blog posts, you need to get them from Google Analytics API.

[Here](https://decodenatura.com/how-to-add-a-trending-section-to-gatsby-blog/) is already a great tutorial for getting page views from Google Analytics API [1], so please follow it and complete the procedure.
- Enable Google Analytics API
- Create a service account
- Download a JSON file including the service account email address and the private key to access the API

To manage the private key, I used [dotenv](https://www.npmjs.com/package/dotenv) module and created a file like this: 

```text:title=env.development
CLIENT_EMAIL=hoge@mail.com
PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nfuga\n-----END PRIVATE KEY-----\n"
```
<br/>

Also, since I host this blog by Netlify, I set the same variables for the production environment at https://app.netlify.com/sites/my-project/settings/deploys .

After setting up environment variables, write some lines of code to read them at `gatsby-node.js`. 

```javascript:title=gatsby-node.js
const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

const crypto = require('crypto')
const { google } = require('googleapis')
const moment = require('moment');
const activeEnv =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || 'development';
require('dotenv').config({
  path: `.env.${activeEnv}`,
});
const key = process.env.PRIVATE_KEY.replace(new RegExp('\\\\n', '\g'), '\n')

...
```
<br/>

The expression `.replace(new RegExp('\\\\n', '\g'), '\n')` was important for my environment. Without it, it throws an error like: 
```
error "gatsby-source-google-analytics-reporting-api" threw an error while running the sourceNodes lifecycle:
error:0909006C:PEM routines:get_name:no start line
  Error: error:0909006C:PEM routines:get_name:no start line
```


Visit [here](https://github.com/googleapis/google-api-nodejs-client/issues/1110#issuecomment-436868760) for more discussion.

And add the following to get results from Google Analytics API (`getGA()`) and create nodes that have information about view counts (`createNodes()`). I call them twice with different start dates to make two sections: "Trending" and "Most Read".

```javascript:title=gatsby-node.js
...

exports.sourceNodes = async ({ actions }) => {
  const { createNode } = actions
  const email = process.env.CLIENT_EMAIL
  const viewId = `<Your ViewId>`
  const scopes = 'https://www.googleapis.com/auth/analytics.readonly'

  const jwt = new google.auth.JWT(email, null, key, scopes)
  await jwt.authorize()

  function getGA(date) {
    return google.analytics('v3').data.ga.get({
      'auth': jwt,
      'ids': 'ga:' + viewId,
      'start-date': date,
      'end-date': 'today',
      'dimensions': 'ga:pagePath',
      'metrics': 'ga:pageviews',
      'sort': '-ga:pageviews',
    })
  }

  function createNodes(GAResult, nodeName) {
    for (let [path, count] of GAResult.data.rows) {
      createNode({
        path,
        count: Number(count),
        id: path,
        internal: {
          type: nodeName,
          contentDigest: crypto.createHash(`md5`).update(JSON.stringify({ nodeName, path, count })).digest(`hex`),
          mediaType: `text/plain`,
          description: `Page views per path`,
        }
      })
    }
  }

  const recentResult = await getGA(moment().add(-30, 'days').format('YYYY-MM-DD'))
  createNodes(recentResult, `RecentPageViews`)
  const totalResult = await getGA(`2020-02-21`)
  createNodes(totalResult, `TotalPageViews`)
}
```
<br/>

Note that `contentDigest` should be unique because it is used for caching [3].

## Show Popular Posts
Now you should have new nodes that look like:

```
"allTotalPageViews": {
    "nodes": [
        {
            "count": XXX,
            "path": "/"
        },
        {
            "count": YYY,
            "path": "/hoge/"
        },
        {
            "count": ZZZ,
            "path": "/fuga/"
        },...
    ]
}
```
<br/>

I created the `PopularPost` component to query `recentPageViews` and `totalPageViews` with GraphQL and show popular posts in a sidebar. The function `chooseTop5()` selects the five most popular posts that belong to `markdownRemark` and the component `TrendBox` shows the result in a formatted style.

```javascript:title=src/components/popular.js
import React from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'
import Image from "../components/image"
import { rhythm } from "../utils/typography"

const PopularPost = () => {
  const data = useStaticQuery(graphql`
      query allPagesAndViews {
          allMarkdownRemark(limit: 1000, sort: {order: DESC, fields: frontmatter___date}) {
              edges {
                node {
                  frontmatter {
                    title
                    featuredImage
                  }
                  fields {
                    slug
                  }
                }
              }
          }
          allTotalPageViews(limit: 10, sort: {fields: count, order: DESC}) {
              edges {
                  node {
                    id
                    count
                  }
              }
          }
          allRecentPageViews(limit: 10, sort: {fields: count, order: DESC}) {
            edges {
                node {
                  id
                  count
                }
            }
          }
      }
  `)

  function chooseTop5(allPosts, popularPosts) {
    const results = [];
    for (const a of popularPosts) {
      const popularPost = allPosts.find(b => b.node.fields.slug === a.node.id);
      if (popularPost == null) {
        continue;
      } else {
        results.push({
          count: a.node.count,
          ...popularPost.node,
        });
      }
      if (results.length >= 5) {
        break;
      }
    };
    return results;
  }

  const TrendBox = ({ results }) => (
    results.map(result => (
      <article key={result.fields.slug} >
        <Link style={{ boxShadow: `none`, textDecoration: `none`, color: `inherit`, }} to={result.fields.slug}>
          <div style={{
            display: "flex", flexFlow: "row",
            marginTop: rhythm(0.5)
          }}>
            <div style={{ width: "120px", paddingRight: rhythm(0.5) }}>
              <Image filename={result.frontmatter.featuredImage} />
            </div>
            <small style={{ width: "150px", }}>
              {result.frontmatter.title}
            </small>
          </div>
        </Link>
      </article>
    ))
  )

  const allPosts = data.allMarkdownRemark.edges;
  const totalResults = chooseTop5(allPosts, data.allTotalPageViews.edges);
  const recentResults = chooseTop5(allPosts, data.allRecentPageViews.edges);

  return (
    <div>
      <div style={{ width: "300px", marginBottom: rhythm(0.5), backgroundColor: "white", padding: rhythm(0.5) }}>
        <h3>Trending</h3>
        <TrendBox results={recentResults} />
      </div>

      <div style={{ width: "300px", marginBottom: rhythm(0.5), backgroundColor: "white", padding: rhythm(0.5) }}>
        <h3>Most Read</h3>
        <TrendBox results={totalResults} />
      </div>
    </div>
  )
};

export default PopularPost
```
<br/>

## References
[1] [De Code Natura | How to add a trending section to your gatsby blog](https://decodenatura.com/how-to-add-a-trending-section-to-gatsby-blog/)  
[2] [antonmedv/gatsby-source-google-analytics-reporting-api: Gatsby source for Google Anatytics Reporting API](https://github.com/antonmedv/gatsby-source-google-analytics-reporting-api)  
[3] [Node Interface | GatsbyJS](https://www.gatsbyjs.org/docs/node-interface/#contentdigest)  
[4] [Creating your own nodes with Gatsby | Dimitri's tutorials](https://dimitr.im/creating-nodes-gatsby)  
[5] [Gatsby でも人気記事を表示したい！（その１） | Blog](https://dotgirl.net/2020/02/18/gatsby-analytics/)