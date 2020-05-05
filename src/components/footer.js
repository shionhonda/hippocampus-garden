import React from 'react'
import { Link } from 'gatsby'
import { useStaticQuery, graphql } from "gatsby"
import { rhythm } from "../utils/typography"
import './footer.scss'
import Image from "gatsby-image"



const Footer = () => {
  const data = useStaticQuery(graphql`
    query FooterQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.png/" }) {
        childImageSharp {
          fixed(width: 30, height: 30) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author
          title
        }
      }
    }
  `)

  const { author, title } = data.site.siteMetadata

  return (
    <footer
      style={{
        clear: "both",
        textAlign: "center",
        backgroundColor: "#41899E",
        color: "white",
        padding: rhythm(0.5)
      }}
    >
      <Image
        fixed={data.avatar.childImageSharp.fixed}
        alt={author}
        style={{
          marginBottom: 0,
        }}
      />
      <br />
      <small>
        {title} © {new Date().getFullYear()}, {author}. Built with
          {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>

        <br />
        <nav className="footer">
          <div className="footer-item">
            <ul>
              <li><Link to={"/"}>Home</Link></li>
              <li><Link to={"/about/"}>About</Link></li>
              <li><Link to={"/blog/"}>Blog</Link></li>
              <li><Link to={"/misc/"}>Misc.</Link></li>
              <li><Link to={"/privacy-policy/"}>Privacy Policy</Link></li>
            </ul>
          </div>
        </nav>
      </small>

    </footer >
  )
};

export default Footer;