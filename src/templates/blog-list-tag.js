import React from 'react'
import { Link, graphql } from 'gatsby'

import Image from "../components/image"
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo.jsx"
import Tags from "../components/tags"
import { rhythm } from "../utils/typography"

const BlogListTemplate = ({ data, pageContext, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const { edges, totalCount } = data.allMarkdownRemark
  const { tag } = pageContext
  const content = (
    `${totalCount} post${totalCount === 1 ? '' : 's'} tagged with "${tag}"`
  )
  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Home" />
      <Bio>{content}</Bio>
      <div className="posts">
        {edges.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <article key={node.fields.slug} style={{
              backgroundColor: "white",
              height: "100%",
            }}>
              <div style={{ padding: rhythm(0.5) }}>
                <Link style={{ boxShadow: `none`, textDecoration: `none`, color: `inherit`, }} to={node.fields.slug}>
                  <Image filename={node.frontmatter.featuredImage} />
                  <h3 style={{ marginTop: rhythm(1 / 4), marginBottom: rhythm(1 / 4), }}>
                    {title}
                  </h3>
                </Link>
                <small>
                  {node.frontmatter.date}&nbsp; | &nbsp;
                    {node.timeToRead} min read
                    <Tags tags={node.frontmatter.tags} />
                </small>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: node.frontmatter.description || node.excerpt,
                    }}
                    style={{ marginBottom: 0 }}
                  />
                </section>
              </div>
            </article>
          )
        })}
      </div>

    </Layout>
  )
}

export default BlogListTemplate

export const pageQuery = graphql`
  query blogListTagQuery($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          timeToRead
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            featuredImage
            tags
          }
        }
      }
      totalCount
    }
  }
`