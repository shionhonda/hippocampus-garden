import React from 'react'
import { Link, graphql } from 'gatsby'

import Image from "../components/image"
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo.jsx"
import { rhythm } from "../utils/typography"

const BlogListTemplate = ({ data, pageContext, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const author = data.site.siteMetadata.author
  const posts = data.allMarkdownRemark.edges
  const content = (
    `Welcome to ${siteTitle}, produced by ${author}. 
    I regularly post about machine learning, statistics, programming, and my hobbies.`
  )
  const { currentPage, numPages } = pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = currentPage - 1 === 1 ? '/' : (currentPage - 1).toString()
  const nextPage = (currentPage + 1).toString()

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Home" />
      <Bio>{content}</Bio>
      <div className="posts">
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <article key={node.fields.slug} style={{
              backgroundColor: "white",
              height: "100%",
            }}>
              <Link style={{ boxShadow: `none`, textDecoration: `none`, color: `inherit`, }} to={node.fields.slug}>
                <Image filename={node.frontmatter.featuredImage} />
                <div style={{ padding: rhythm(0.5) }}>
                  <h3 style={{ marginTop: rhythm(1 / 4), marginBottom: rhythm(1 / 4), }}>
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
                      style={{ marginBottom: 0 }}
                    />
                  </section>
                </div>
              </Link>
            </article>
          )
        })}
      </div>
      <ul
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          listStyle: 'none',
          padding: 0,
        }}
      >
        {!isFirst && (
          <Link to={prevPage} rel="prev">
            ← Previous Page
          </Link>
        )}
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
                padding: rhythm(1 / 4),
                textDecoration: 'none',
                color: i + 1 === currentPage ? '#ffffff' : '',
                background: i + 1 === currentPage ? '#007acc' : '',
              }}
            >
              {i + 1}
            </Link>
          </li>
        ))}
        {!isLast && (
          <Link to={nextPage} rel="next">
            Next Page →
          </Link>
        )}
      </ul>

    </Layout>
  )
}
//   return (
//     <Layout location={this.props.location} title={siteTitle}>
//       <SEO
//         title={siteTitle}
//         keywords={[`blog`, `gatsby`, `javascript`, `react`]}
//       />
//       <Bio />
//       {posts.map(({ node }) => {
//         const title = node.frontmatter.title || node.fields.slug
//         return (
//           <div key={node.fields.slug}>
//             <h3
//               style={{
//                 marginBottom: rhythm(1 / 4),
//               }}
//             >
//               <Link style={{ boxShadow: 'none' }} to={node.fields.slug}>
//                 {title}
//               </Link>
//             </h3>
//             <small>{node.frontmatter.date}</small>
//             <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
//           </div>
//         )
//       })}
//       <ul
//         style={{
//           display: 'flex',
//           flexWrap: 'wrap',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           listStyle: 'none',
//           padding: 0,
//         }}
//       >
//         {!isFirst && (
//           <Link to={prevPage} rel="prev">
//             ← Previous Page
//           </Link>
//         )}
//         {Array.from({ length: numPages }, (_, i) => (
//           <li
//             key={`pagination-number${i + 1}`}
//             style={{
//               margin: 0,
//             }}
//           >
//             <Link
//               to={`/${i === 0 ? '' : i + 1}`}
//               style={{
//                 padding: rhythm(1 / 4),
//                 textDecoration: 'none',
//                 color: i + 1 === currentPage ? '#ffffff' : '',
//                 background: i + 1 === currentPage ? '#007acc' : '',
//               }}
//             >
//               {i + 1}
//             </Link>
//           </li>
//         ))}
//         {!isLast && (
//           <Link to={nextPage} rel="next">
//             Next Page →
//           </Link>
//         )}
//       </ul>
//     </Layout>
//   )
// }

export default BlogListTemplate

export const pageQuery = graphql`
  query blogPageQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        author
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
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
          }
        }
      }
    }
  }
`