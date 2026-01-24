const path = require(`path`)
const fs = require('fs');
const _ = require("lodash")
const { createFilePath } = require(`gatsby-source-filesystem`)
const { google } = require('googleapis')
const TinySegmenter = require('tiny-segmenter')
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
        id
        fields {
          slug
        }
        rawMarkdownBody
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
  const relatedPostsBySlug = buildRelatedPosts(posts)
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
    const relatedPostSlugs =
      relatedPostsBySlug[post.node.fields.slug] ?? []
    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
        relatedPostSlugs,
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

function buildRelatedPosts(posts) {
  const segmenter = new TinySegmenter()
  const stopWords = new Set([
    'a',
    'an',
    'and',
    'are',
    'as',
    'at',
    'be',
    'but',
    'by',
    'for',
    'from',
    'has',
    'have',
    'if',
    'in',
    'into',
    'is',
    'it',
    'its',
    'of',
    'on',
    'or',
    'that',
    'the',
    'their',
    'then',
    'this',
    'to',
    'was',
    'were',
    'will',
    'with',
  ])
  const tokensBySlug = new Map()
  const termFreqBySlug = new Map()
  const docFreq = new Map()
  const docs = posts.map((post) => post.node)

  docs.forEach((post) => {
    const tokens = tokenizeContent(
      post.rawMarkdownBody || '',
      segmenter,
      stopWords
    )
    tokensBySlug.set(post.fields.slug, tokens)
    const termFreq = new Map()
    tokens.forEach((token) => {
      termFreq.set(token, (termFreq.get(token) || 0) + 1)
    })
    termFreqBySlug.set(post.fields.slug, termFreq)
    new Set(tokens).forEach((token) => {
      docFreq.set(token, (docFreq.get(token) || 0) + 1)
    })
  })

  const totalDocs = docs.length
  const idfByTerm = new Map()
  docFreq.forEach((freq, term) => {
    idfByTerm.set(term, Math.log((totalDocs + 1) / (freq + 1)) + 1)
  })

  const tfidfBySlug = new Map()
  termFreqBySlug.forEach((termFreq, slug) => {
    const vector = new Map()
    let norm = 0
    termFreq.forEach((count, term) => {
      const tf = count / (tokensBySlug.get(slug).length || 1)
      const tfidf = tf * (idfByTerm.get(term) || 0)
      vector.set(term, tfidf)
      norm += tfidf * tfidf
    })
    tfidfBySlug.set(slug, { vector, norm: Math.sqrt(norm) })
  })

  const relatedPostsBySlug = {}
  docs.forEach((post) => {
    const slug = post.fields.slug
    const tags = new Set(post.frontmatter.tags || [])
    const scores = []
    docs.forEach((candidate) => {
      if (candidate.fields.slug === slug) {
        return
      }
      const tagScore = computeTagScore(tags, candidate.frontmatter.tags)
      const tfidfScore = cosineSimilarity(
        tfidfBySlug.get(slug),
        tfidfBySlug.get(candidate.fields.slug)
      )
      const score = tagScore * 0.6 + tfidfScore * 0.4
      if (score > 0) {
        scores.push({ slug: candidate.fields.slug, score })
      }
    })
    scores.sort((a, b) => b.score - a.score)
    relatedPostsBySlug[slug] = scores.slice(0, 5).map((item) => item.slug)
  })

  return relatedPostsBySlug
}

function tokenizeContent(content, segmenter, stopWords) {
  const normalized = content.toLowerCase()
  const japaneseTokens = segmenter
    .segment(normalized)
    .map((token) => token.trim())
    .filter((token) => token && !stopWords.has(token))
  const englishTokens = normalized
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .map((token) => token.trim())
    .filter((token) => token && token.length > 1 && !stopWords.has(token))
  return [...japaneseTokens, ...englishTokens]
}

function computeTagScore(tags, candidateTags = []) {
  if (tags.size === 0 || candidateTags.length === 0) {
    return 0
  }
  let matches = 0
  candidateTags.forEach((tag) => {
    if (tags.has(tag)) {
      matches += 1
    }
  })
  return matches / Math.max(tags.size, candidateTags.length)
}

function cosineSimilarity(source, target) {
  if (!source || !target || source.norm === 0 || target.norm === 0) {
    return 0
  }
  let dot = 0
  source.vector.forEach((value, term) => {
    const targetValue = target.vector.get(term)
    if (targetValue) {
      dot += value * targetValue
    }
  })
  return dot / (source.norm * target.norm)
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
    const prevCounts = {};
    if (nodeName==='TotalPageViews') {
      const fileContents = fs.readFileSync('content/assets/google-analytics-v3.json', 'utf8');
      JSON.parse(fileContents).nodes.forEach(node => {
        prevCounts[node.path] = node.count;
      });
    }

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
