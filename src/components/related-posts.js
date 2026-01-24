import React from "react"
import { Link } from "gatsby"
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
            <Link to={post.fields.slug}>{post.frontmatter.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RelatedPosts
