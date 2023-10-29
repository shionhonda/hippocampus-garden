const path = require(`path`)
const fs = require('fs');
const _ = require("lodash")
const { createFilePath } = require(`gatsby-source-filesystem`)
const { google } = require('googleapis')
const activeEnv =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || 'development';
require('dotenv').config({
  path: `.env.${activeEnv}`,
});

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const result = await graphql(
    `{
  postsRemark: allMarkdownRemark(sort: {frontmatter: {date: DESC}}, limit: 1000) {
    edges {
      node {
        fields {
          slug
        }
        frontmatter {
          title
          tags
        }
      }
    }
  }
  tagsGroup: allMarkdownRemark(limit: 1000) {
    group(field: {frontmatter: {tags: SELECT}}) {
      fieldValue
    }
  }
}`
  )

  if (result.errors) {
    throw result.errors
  }

  const posts = result.data.postsRemark.edges
  // Create blog post list pages
  const postsPerPage = 10;
  const numPages = Math.ceil(posts.length / postsPerPage);
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/` : `/${i + 1}`,
      component: path.resolve("./src/templates/blog-list.js"),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    });
  });

  // Create blog posts pages.
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
  });

  // Create tagged blog post list pages
  const tags = result.data.tagsGroup.group
  // Make tag pages
  tags.forEach(tag => {
    createPage({
      path: `/tags/${_.kebabCase(tag.fieldValue)}/`,
      component: path.resolve("./src/templates/blog-list-tag.js"),
      context: {
        tag: tag.fieldValue,
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

exports.sourceNodes = async ({ actions, createContentDigest }) => {
  const { createNode } = actions;
  const email = process.env.CLIENT_EMAIL;
  const propertyId = '376031501';
  const scopes = 'https://www.googleapis.com/auth/analytics.readonly';
  const key = process.env.PRIVATE_KEY.replace(new RegExp('\\\\n', '\g'), '\n')
  const jwtClient = new google.auth.JWT(
    email,
    null,
    key,
    scopes
  );

  // Authenticate request
  await jwtClient.authorize();

  const analyticsData = google.analyticsdata({
    version: 'v1beta',
    auth: jwtClient // Pass the JWT client to the API
  });

  function getGA(date) {
    return analyticsData.properties.runReport({
    property: `properties/${propertyId}`,
    resource: {
      dateRanges: [
        {
          startDate: date,
          endDate: 'today',
        },
      ],
      dimensions: [
        {
          name: 'pagePath',
        },
      ],
      metrics: [
        {
          name: 'screenPageviews',
        },
      ],
      orderBys: [
        {
          metric: {
            metricName: 'screenPageviews',
          },
          desc: true,
        },
      ],
    },
  });
}

  function createNodes(GAResult, nodeName) {
    // counts from GA3
    const fileContents = fs.readFileSync('content/assets/google-analytics-v3.json', 'utf8');
    const prevCounts = {};
    JSON.parse(fileContents).nodes.forEach(node => {
      prevCounts[node.path] = node.count;
    });

    const rows = GAResult.data.rows;
    for (let i = 0; i < rows.length; i++) {
      const path = rows[i].dimensionValues[0].value
      const count = rows[i].metricValues[0].value;
      const prevCount = prevCounts.hasOwnProperty(path) ? prevCounts[path] : 0;
      createNode({
        path,
        count: Number(count) + prevCount,
        id: nodeName + path,
        internal: {
          type: nodeName,
          contentDigest: createContentDigest({ nodeName, path, count }),
          mediaType: 'text/plain',
          description: 'Page views per path',
        },
      });
    }
  }

  const recentResult = await getGA('30daysAgo');
  createNodes(recentResult, 'RecentPageViews');
  const totalResult = await getGA('2023-09-10');
  createNodes(totalResult, 'TotalPageViews');
};