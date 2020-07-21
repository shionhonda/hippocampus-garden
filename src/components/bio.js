/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

import { rhythm } from "../utils/typography"

const Bio = ({ children }) => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.png/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
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
      <Image
        fixed={data.avatar.childImageSharp.fixed}
        alt={author.toString()}
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          minWidth: 50,
        }}
      />
      {children}
    </div>
  )
}

export default Bio
