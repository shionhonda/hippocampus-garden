import React from "react"
import { Link, graphql } from "gatsby"
import Disqus from 'gatsby-plugin-disqus'

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo.jsx"
import Share from "../components/share"
import { rhythm, scale } from "../utils/typography"

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark;
  const { previous, next } = pageContext;
  const { siteTitle, author, url} = data.site.siteMetadata;
  const n_views = data.pageViews.totalCount;
  const formatter = new Intl.NumberFormat('ja-JP');

  const content = (
    <p>
      Written by <strong>{author}</strong>.
      If you like this, please share!
    </p>
  )

  const disqusConfig = {
    url: `${url + post.fields.slug}`,
    identifier: post.fields.slug,
    title: post.frontmatter.title,
  }

  return (
    <Layout location={location} title={siteTitle} toc={post.tableOfContents}>
      <SEO
        title={post.frontmatter.title}
        desc={post.frontmatter.description || post.excerpt}
        banner={post.frontmatter.featuredImage}
        pathname={post.fields.slug}
        article={true}
      />
      <article style={{backgroundColor: "white", padding:rhythm(1)}}>
          <h1 style={{marginBottom: 0}}>
            {post.frontmatter.title}
          </h1>
          <p
            style={{
              ...scale(-1 / 5),
              display: `block`,
              marginBottom: rhythm(0),
            }}
          >
            {post.frontmatter.date}&nbsp; | &nbsp; 
            {post.timeToRead} min read&nbsp; | &nbsp; 
            {formatter.format(n_views)} views
          </p>
          
          <Share title={post.frontmatter.title} url={url + post.fields.slug}/>
          <section dangerouslySetInnerHTML={{ __html: post.html }} />
          <hr
            style={{
              marginBottom: rhythm(1),
            }}
          />
          <Share title={post.frontmatter.title} url={url + post.fields.slug}/>
          <Bio>{content}</Bio>
      
        <nav>
          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0,
              margin: 0
            }}
          >
            <li style={{width: `45%`}}>
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li style={{width: `45%`, textAlign: `right`}}>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </nav>

        <Disqus config={disqusConfig} />
      </article>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
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
      }
      tableOfContents
      timeToRead
      fields {
        slug
      }
    }
    pageViews(id: {eq: $slug }) {
      totalCount
    }
  }
`
