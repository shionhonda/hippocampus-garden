const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const crypto = require('crypto')
const { google } = require('googleapis')
const activeEnv =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || 'development';
require('dotenv').config({
  path: `.env.${activeEnv}`,
});

const key = process.env.PRIVATE_KEY.replace(new RegExp('\\\\n', '\g'), '\n')
const moment = require('moment');


exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const posts = result.data.allMarkdownRemark.edges

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.sourceNodes = async ({ actions }, configOptions) => {
  const { createNode } = actions
  const email = process.env.CLIENT_EMAIL
  const viewId = `211975708`
  const scopes = 'https://www.googleapis.com/auth/analytics.readonly'

  const jwt = new google.auth.JWT(email, null, key, scopes)
  await jwt.authorize()

  const totalResult = await google.analytics('v3').data.ga.get({
    'auth': jwt,
    'ids': 'ga:' + viewId,
    'start-date': `2020-02-21`,
    'end-date': 'today',
    'dimensions': 'ga:pagePath',
    'metrics': 'ga:pageviews',
    'sort': '-ga:pageviews',
  })
  const recentResult = await google.analytics('v3').data.ga.get({
    'auth': jwt,
    'ids': 'ga:' + viewId,
    'start-date': moment().add(-30, 'days').format('YYYY-MM-DD'),
    'end-date': 'today',
    'dimensions': 'ga:pagePath',
    'metrics': 'ga:pageviews',
    'sort': '-ga:pageviews',
  })


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

  createNodes(recentResult, `RecentPageViews`)
  createNodes(totalResult, `TotalPageViews`)

}
