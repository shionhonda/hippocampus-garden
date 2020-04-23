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
    const appPageViews = data.allPageViews;
    const results = [];

    appPageViews.edges
    .forEach(({ node }) => {
      allPosts.forEach(({ node: post }) => {
        if (post.fields.slug === node.id) {
          results.push({
            count: node.totalCount,
            ...post,
          });
        }
      });
    });
    console.log(results);

    return (
        <div
          style={{
            marginBottom: rhythm(1.4),
          }}
        >
            Popular Posts
          {results.map(result => (
            <article key={result.id}>
              <Link to={result.fields.slug}>
                <Image filename={result.frontmatter.featuredImage}/>
                {result.frontmatter.title}: {result.count}
              </Link>
            </article>
          ))}
        </div>
    )
};

export default PopularPost