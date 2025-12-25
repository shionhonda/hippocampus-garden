import React from 'react'
import { Link, graphql } from 'gatsby'

import Image from "../components/image"
import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo.jsx"
import { rhythm } from "../utils/typography"

const BlogListTemplate = ({ data, pageContext, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const author = data.site.siteMetadata.author
  const posts = data.allMarkdownRemark.edges
  const content = (
    `Welcome to ${siteTitle}, a ${author}'s blog. 
    I regularly write about machine learning, statistics, programming, and my hobbies.`
  )
  const { currentPage, numPages } = pageContext
  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="Home" />
      <Bio>{content}</Bio>
      <div className="posts">
        {posts.map(({ node }) => {
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
      <nav>
        <ul
          style={{
            display: `flex`,
            justifyContent: `center`,
            listStyle: `none`,
            padding: 0,
            marginTop: rhythm(1 / 2)

          }}
        >

          {Array.from({ length: numPages }, (_, i) => (
            <li
              key={`pagination-number${i + 1}`}
              style={{
                margin: 0,
              }}
            >
              <Link
                to={`/${i === 0 ? '' : i + 1}`}
                style={{
                  padding: rhythm(1 / 2),
                  textDecoration: 'none',
                  color: i + 1 === currentPage ? '#000000' : '',
                  fontWeight: i + 1 === currentPage ? 'bold' : 'normal'
                }}
              >
                {i + 1}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

    </Layout>
  )
}

export default BlogListTemplate

export const pageQuery = graphql`query blogPageQuery($skip: Int!, $limit: Int!) {
  site {
    siteMetadata {
      author
      title
    }
  }
  allMarkdownRemark(sort: {frontmatter: {date: DESC}}, limit: $limit, skip: $skip) {
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
  }
}`