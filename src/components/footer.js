import React from 'react'
import { Link } from 'gatsby'
import { useStaticQuery, graphql } from "gatsby"
import { rhythm } from "../utils/typography"
import './footer.scss'
import { StaticImage } from "gatsby-plugin-image";



const Footer = () => {
  const data = useStaticQuery(graphql`query FooterQuery {
  avatar: file(absolutePath: {regex: "/profile-pic.png/"}) {
    childImageSharp {
      gatsbyImageData(width: 30, height: 30, layout: FIXED)
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
  const width = 30
  const height = 30

  return (
    <footer
      style={{
        clear: "both",
        textAlign: "center",
        backgroundImage: `linear-gradient(to top, #30506e, #41899e)`,
        color: "white",
        padding: rhythm(0.5),
        margin: "0 auto"
      }}
    >
      <StaticImage
        src="../../content/assets/profile-pic.png" alt={author}
        width={width} height={height} />
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
              <li><Link to={"/privacy-policy/"}>Privacy Policy</Link></li>
              <li><Link to={"/rss.xml/"}>RSS</Link></li>
            </ul>
          </div>
        </nav>
      </small>

    </footer >
  );
};

export default Footer;