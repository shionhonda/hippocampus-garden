import React from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'
import Image from "../components/image"
import { rhythm } from "../utils/typography"

const PopularPost = () => {
  const data = useStaticQuery(graphql`
      query allPagesAndViews {
          allMarkdownRemark(limit: 1000, sort: {order: DESC, fields: frontmatter___date}) {
              edges {
                node {
                  frontmatter {
                    title
                    featuredImage
                  }
                  fields {
                    slug
                  }
                }
              }
          }
          allTotalPageViews(limit: 10, sort: {fields: count, order: DESC}) {
              edges {
                  node {
                    id
                    count
                  }
              }
          }
          allRecentPageViews(limit: 10, sort: {fields: count, order: DESC}) {
            edges {
                node {
                  id
                  count
                }
            }
          }
      }
  `)

  function chooseTop5(allPosts, popularPosts) {
    const results = [];
    for (const a of popularPosts) {
      const popularPost = allPosts.find(b => b.node.fields.slug === a.node.id);
      if (popularPost == null) {
        continue;
      } else {
        results.push({
          count: a.node.count,
          ...popularPost.node,
        });
      }
      if (results.length >= 5) {
        break;
      }
    };
    return results;
  }

  const TrendBox = ({ results }) => (
    results.map(result => (
      <article key={result.fields.slug} >
        <Link style={{ boxShadow: `none`, textDecoration: `none`, color: `inherit`, }} to={result.fields.slug}>
          <div style={{
            display: "flex", flexFlow: "row",
            marginTop: rhythm(0.5)
          }}>
            <div style={{ width: "120px", paddingRight: rhythm(0.5) }}>
              <Image filename={result.frontmatter.featuredImage} />
            </div>
            <small style={{ width: "150px", }}>
              {result.frontmatter.title}
            </small>
          </div>
        </Link>
      </article>
    ))
  )

  const allPosts = data.allMarkdownRemark.edges;
  const totalResults = chooseTop5(allPosts, data.allTotalPageViews.edges);
  const recentResults = chooseTop5(allPosts, data.allRecentPageViews.edges);

  return (
    <div>
      <div style={{ width: "300px", marginBottom: rhythm(0.5), backgroundColor: "white", padding: rhythm(0.5) }}>
        <h3>Trending</h3>
        <TrendBox results={recentResults} />
      </div>

      <div style={{ width: "300px", marginBottom: rhythm(0.5), backgroundColor: "white", padding: rhythm(0.5) }}>
        <h3>Most Read</h3>
        <TrendBox results={totalResults} />
      </div>
    </div>
  )
};

export default PopularPost