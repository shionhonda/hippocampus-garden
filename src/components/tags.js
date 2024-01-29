import React from "react"
import { Link } from "gatsby"
import kebabCase from "lodash/kebabCase"
import { rhythm } from "../utils/typography"

const Tag = ({ tag }) => {
  return (
    <li>
      <Link
        to={`/tags/${kebabCase(tag)}/`}
        style={{
          marginRight: rhythm(1 / 4),
          marginBottom: rhythm(1 / 4),
          paddingTop: rhythm(1 / 3),
          paddingBottom: 0,
          paddingLeft: rhythm(1 / 4),
          paddingRight: rhythm(1 / 4),
          fontSize: 16,
          textDecoration: `none`,
          color: `black`,
          backgroundColor: `#f0f0f0`,
          borderRadius: rhythm(1 / 4),
          lineHeight: 0.5,
        }}
      >
        {tag}
      </Link>
    </li>
  )
}

const Tags = ({ tags }) => {
  return (
    <ul
      style={{
        display: `flex`,
        justifyContent: `left`,
        alignItems: `center`,
        listStyle: `none`,
        padding: 0,
        margin: 0,
      }}
    >
      {(tags || []).map((tag) => (
        <Tag key={tag} tag={tag} />
      ))}
    </ul>
  )
}

export default Tags
