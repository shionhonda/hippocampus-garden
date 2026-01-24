import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import RelatedPosts from "../components/related-posts"
import Seo from "../components/seo.jsx"
import Tags from "../components/tags"
import Share from "../components/share"
import { rhythm, scale } from "../utils/typography"
require(`katex/dist/katex.min.css`)

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const { previous, next, relatedPostSlugs = [] } = pageContext
  const relatedPostMap = new Map(
    (data.relatedPosts?.edges || []).map((edge) => [
      edge.node.fields.slug,
      edge.node,
    ])
  )
  const relatedPosts = relatedPostSlugs
    .map((slug) => relatedPostMap.get(slug))
    .filter(Boolean)
  const { siteTitle, author, url } = data.site.siteMetadata
  const content = (
    <p>
      Written by <strong>{author}</strong>. If you like this, please share!
    </p>
  )

  return (
    <Layout
      location={location}
      title={siteTitle}
      toc={post.tableOfContents}
      relatedPosts={<RelatedPosts posts={relatedPosts} />}
    >
      <Seo
        title={post.frontmatter.title}
        desc={post.frontmatter.description || post.excerpt}
        banner={post.frontmatter.featuredImage}
        pathname={post.fields.slug}
        article={true}
        datePublished={post.frontmatter.date}
      />
      <article style={{ backgroundColor: "white", padding: rhythm(1) }}>
        <h1 style={{ marginBottom: 0 }}>{post.frontmatter.title}</h1>
        <p
          style={{
            ...scale(-1 / 5),
            display: `block`,
            marginBottom: rhythm(0),
          }}
        >
          {post.frontmatter.date}&nbsp; | &nbsp;
          {post.timeToRead} min read
        </p>
        <Tags tags={post.frontmatter.tags} />

        <Share title={post.frontmatter.title} url={url + post.fields.slug} />
        <section dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <Share title={post.frontmatter.title} url={url + post.fields.slug} />
        <Bio>{content}</Bio>

        <nav>
          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0,
              margin: 0,
            }}
          >
            <li style={{ width: `45%` }}>
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  ← Previous <br /> {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li style={{ width: `45%`, textAlign: `right` }}>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  Next → <br />
                  {next.frontmatter.title}
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </article>
    </Layout>
  )
}

export const Head = ({ data }) => {
  if (!data?.markdownRemark) {
    return null
  }
  const post = data.markdownRemark
  return React.createElement(Seo, {
    title: post.frontmatter.title,
    desc: post.frontmatter.description || post.excerpt,
    banner: post.frontmatter.featuredImage,
    pathname: post.fields.slug,
    article: true,
    datePublished: post.frontmatter.date,
  })
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!, $relatedPostSlugs: [String!] = []) {
    site {
      siteMetadata {
        title
        author
        url
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        featuredImage
        tags
      }
      tableOfContents
      timeToRead
      fields {
        slug
      }
    }
    relatedPosts: allMarkdownRemark(
      filter: { fields: { slug: { in: $relatedPostSlugs } } }
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
    totalPageViews(path: { eq: $slug }) {
      count
    }
  }
`
