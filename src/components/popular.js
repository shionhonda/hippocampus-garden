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
            allPageViews(limit: 10, sort: {fields: totalCount, order: DESC}) {
                edges {
                    node {
                      id
                      totalCount
                    }
                }
            }
        }
    `)

  const allPosts = data.allMarkdownRemark.edges;
  const popularPosts = data.allPageViews.edges;
  const results = [];

  for (const a of popularPosts) {
    const popularPost = allPosts.find(b => b.node.fields.slug === a.node.id);
    if (popularPost == null) {
      continue;
    } else {
      results.push({
        count: a.node.totalCount,
        ...popularPost.node,
      });
    }
    if (results.length >= 5) {
      break;
    }
  };

  return (
    <div style={{ marginBottom: rhythm(0.5), backgroundColor: "white", padding: rhythm(0.5) }}>
      <h3>Popular Posts</h3>
      {results.map(result => (
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
      ))}
    </div>
  )
};

export default PopularPost