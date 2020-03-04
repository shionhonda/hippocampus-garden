import React from 'react'
import {Link } from 'gatsby'

const Footer = () => {
    const pageLink = "/privacy-policy/"
    return (
        <footer style={{clear:"both", fontSize:"14px"}}>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
          <br></br>
          <Link to={pageLink}>
            Privacy Policy
          </Link>
            
        </footer>
    )
};

export default Footer;