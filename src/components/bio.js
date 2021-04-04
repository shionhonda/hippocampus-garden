/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image";

import { rhythm } from "../utils/typography"

const Bio = ({ children }) => {
  const data = useStaticQuery(graphql`query BioQuery {
  avatar: file(absolutePath: {regex: "/profile-pic.png/"}) {
    childImageSharp {
      gatsbyImageData(width: 50, height: 50, layout: FIXED)
    }
  }
  site {
    siteMetadata {
      author
    }
  }
}
`)

  const author = data.site.siteMetadata

  return (
    <div
      style={{
        display: `flex`,
        padding: rhythm(0.5),
        marginBottom: rhythm(0.5),
        backgroundColor: "white"
      }}
    >
      <GatsbyImage
        image={data.avatar.childImageSharp.gatsbyImageData}
        alt={author.toString()}
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          minWidth: 50,
        }} />
      {children}
    </div>
  );
}

export default Bio
