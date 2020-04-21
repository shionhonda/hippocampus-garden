import React from 'react'
import {Link } from 'gatsby'
import { useStaticQuery, graphql } from "gatsby"
import { rhythm } from "../utils/typography"


const Footer = () => {
  const data = useStaticQuery(graphql`
    query FooterQuery {
      site {
        siteMetadata {
          author
          title
        }
      }
    }
  `)

  const { author, title } = data.site.siteMetadata
  const pageLink = "/privacy-policy/"

  return (
      <footer 
        style={{
          clear:"both", 
          textAlign:"center",
          backgroundColor: "#41899E",
          color: "white",
          padding: rhythm(0.5)
        }}
      >
        <small>
          {title} © {new Date().getFullYear()}, {author}. Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
          <br></br>
          <Link to={pageLink}>
            Privacy Policy
          </Link>
        </small>
          
      </footer>
  )
};

export default Footer;