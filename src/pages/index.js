import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo.jsx"
import { rhythm } from "../utils/typography"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const author = data.site.siteMetadata.author
  const posts = data.allMarkdownRemark.edges
  const content  = (
    `Welcome to ${siteTitle}, produced by Shion Honda. 
        Let’s explore the world of wonder!`
  )

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Home" />
      <Bio>{content}</Bio>
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <article key={node.fields.slug} >
                          <Link style={{ boxShadow: `none`, textDecoration: `none`, color: `inherit`,}} to={node.fields.slug}>

            <h3
              style={{
                marginBottom: rhythm(1 / 4),
              }}
            >
                {title}
              
            </h3>
            <small>{node.frontmatter.date}</small>
          <section>
            <p
              dangerouslySetInnerHTML={{
                __html: node.frontmatter.description || node.excerpt,
              }}
            />
          </section>
          </Link>
        </article>
        )
      })}
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`
