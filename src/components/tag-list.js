import React from "react"
import kebabCase from "lodash/kebabCase"
import { graphql, useStaticQuery, Link } from 'gatsby'
import { rhythm } from "../utils/typography"

const TagList = () => {
  const data = useStaticQuery(graphql`
    query allTags {
      site {
        siteMetadata {
          title
        }
      }
      allMarkdownRemark(limit: 1000) {
        group(field: frontmatter___tags) {
          fieldValue
          totalCount
        }
      }
    }
  `)
  return (
    <div style={{ width: "300px", marginBottom: rhythm(0.5), backgroundColor: "white", padding: rhythm(0.5) }}>
      <h3>Tags</h3>
      <ul style={{ lineHeight: 1 }}>
        {data.allMarkdownRemark.group.map(tag => (
          <li key={tag.fieldValue}>
            <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
              {tag.fieldValue} ({tag.totalCount})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )

}
export default TagList