import React from "react"
import { Link } from "gatsby"
import Image from "../components/image"
import { rhythm } from "../utils/typography"

const RelatedPosts = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return null
  }

  return (
    <div
      style={{
        width: "300px",
        marginBottom: rhythm(0.5),
        backgroundColor: "white",
        padding: rhythm(0.5),
      }}
    >
      <h3>Related Posts</h3>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {posts.map((post) => (
          <li key={post.fields.slug} style={{ marginBottom: rhythm(0.4) }}>
            <Link
              style={{
                boxShadow: `none`,
                textDecoration: `none`,
                color: `inherit`,
              }}
              to={post.fields.slug}
            >
              <div
                style={{
                  display: "flex",
                  flexFlow: "row",
                }}
              >
                <div style={{ width: "120px", paddingRight: rhythm(0.5) }}>
                  <Image filename={post.frontmatter.featuredImage} />
                </div>
                <small style={{ width: "150px" }}>
                  {post.frontmatter.title}
                </small>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RelatedPosts
