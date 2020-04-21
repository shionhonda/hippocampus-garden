import React from "react"
import { Link, graphql } from "gatsby"

import Image from "../components/image"
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo.jsx"
import { rhythm } from "../utils/typography"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const author = data.site.siteMetadata.author
  const posts = data.allMarkdownRemark.edges
  const content  = (
    `Welcome to ${siteTitle}, produced by ${author}. 
        Let’s explore the world of wonder!`
  )

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Home" />
      <Bio>{content}</Bio>
      <div className="posts">
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <Link style={{ boxShadow: `none`, textDecoration: `none`, color: `inherit`,}} to={node.fields.slug}>
              <article key={node.fields.slug} style={{marginBottom: rhythm(2)}}>
                <h3 style={{marginBottom: rhythm(1 / 4),}}>
                  {title}
                </h3>
                <small>
                  {node.frontmatter.date}&nbsp; | &nbsp; 
                  {node.timeToRead} min read
                </small>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: node.frontmatter.description || node.excerpt,
                    }}
                    style={{marginBottom: 0}}
                  />
                </section>
                <div style={{width: "70%", textAlign: "center", margin: "auto"}}>
                <Image filename={node.frontmatter.featuredImage} />

                </div>
              </article>
            </Link>
          )
        })}
      </div>
      
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        author
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
          timeToRead
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            featuredImage
          }
        }
      }
    }
  }
`