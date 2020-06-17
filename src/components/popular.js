import React from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'
import Image from "../components/image"
import { rhythm, scale } from "../utils/typography"

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
            allTotalPageViews(limit: 10, sort: {fields: totalCount, order: DESC}) {
                edges {
                    node {
                      id
                      totalCount
                    }
                }
            }
            allRecentPageViews(limit: 10, sort: {fields: recentCount, order: DESC}) {
              edges {
                  node {
                    id
                    recentCount
                  }
              }
          }
        }
    `)

  const allPosts = data.allMarkdownRemark.edges;
  const totalPopularPosts = data.allTotalPageViews.edges;
  const recentPopularPosts = data.allRecentPageViews.edges;
  const totalResults = [];
  const recentResults = [];

  for (const a of totalPopularPosts) {
    const popularPost = allPosts.find(b => b.node.fields.slug === a.node.id);
    if (popularPost == null) {
      continue;
    } else {
      totalResults.push({
        count: a.node.totalCount,
        ...popularPost.node,
      });
    }
    if (totalResults.length >= 5) {
      break;
    }
  };
  for (const a of recentPopularPosts) {
    const popularPost = allPosts.find(b => b.node.fields.slug === a.node.id);
    if (popularPost == null) {
      continue;
    } else {
      recentResults.push({
        count: a.node.recentCount,
        ...popularPost.node,
      });
    }
    if (recentResults.length >= 5) {
      break;
    }
  };

  return (
    <div>
      <div style={{ width: "300px", marginBottom: rhythm(0.5), backgroundColor: "white", padding: rhythm(0.5) }}>
        <h3>Trending</h3>
        {recentResults.map(recentResult => (
          <article key={recentResult.fields.slug} >
            <Link style={{ boxShadow: `none`, textDecoration: `none`, color: `inherit`, }} to={recentResult.fields.slug}>
              <div style={{
                display: "flex", flexFlow: "row",
                marginTop: rhythm(0.5)
              }}>
                <div style={{ width: "120px", paddingRight: rhythm(0.5) }}>
                  <Image filename={recentResult.frontmatter.featuredImage} />
                </div>
                <small style={{ width: "150px", }}>
                  {recentResult.frontmatter.title}
                </small>
              </div>

            </Link>
          </article>
        ))}
      </div>

      <div style={{ width: "300px", marginBottom: rhythm(0.5), backgroundColor: "white", padding: rhythm(0.5) }}>
        <h3>Most Read</h3>
        {totalResults.map(totalResult => (
          <article key={totalResult.fields.slug} >
            <Link style={{ boxShadow: `none`, textDecoration: `none`, color: `inherit`, }} to={totalResult.fields.slug}>
              <div style={{
                display: "flex", flexFlow: "row",
                marginTop: rhythm(0.5)
              }}>
                <div style={{ width: "120px", paddingRight: rhythm(0.5) }}>
                  <Image filename={totalResult.frontmatter.featuredImage} />
                </div>
                <small style={{ width: "150px", }}>
                  {totalResult.frontmatter.title}
                </small>
              </div>

            </Link>
          </article>
        ))}
      </div>
    </div>
  )
};

export default PopularPost