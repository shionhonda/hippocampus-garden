import React from "react"
import { Link, graphql } from "gatsby"

import Image from "../components/image"
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo.jsx"
import { rhythm } from "../utils/typography"

const BlogIndex = ({ data, location }) => {
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges
    const content  = "Random posts on music, gourmet, books, careers, and so on. Mostly written in Japanese."  
    return (
      <Layout location={location} title={siteTitle}>
        <SEO title="Miscellaneous" />
        <Bio>{content}</Bio>
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
      allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/misc/"}}, 
      sort: { fields: [frontmatter___date], order: DESC }) {
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
    }`