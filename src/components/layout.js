import React from "react"
import { Link } from "gatsby"

import Nav from "./nav"
import Header from './header';
import './layout.css';
import { rhythm, scale } from "../utils/typography"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  let header

  header = (
      <div
        className={`header`}
        style={{
          textAlign: `center`,
          color: `#FFFFFF`,
        }}
          >
      <h1
        style={{
          paddingTop: `3rem`,
          paddingBottom: `1rem`,
          marginBottom: 0,
          marginTop: 0,
          fontStyle: `bold`,
          fontSize: `42px`
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            textDecoration: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {`Hippocampus's Garden`}
        </Link>
      </h1>
      <p
      style={{
        margin: 0,
        fontStyle: `italic`,
      }}>
        Under the sea, in the hippocampus's garden...
        </p>
        <Header />
      </div>
    )
  
  let content
  if (location.pathname==="/"
      || location.pathname==="/blog/"
      || location.pathname==="/misc/"){
    content = (
      <div class="flexbox">
        <div class="mainbox">
          <main>{children}</main>
        </div>
        <div class="sidebar">
          <a class="twitter-timeline" data-width="300" data-height="600" 
          href="https://twitter.com/shion_honda?ref_src=twsrc%5Etfw">Tweets by shion_honda
          </a> 
        </div>
      </div>
    )
  } else {
    content = (
      <div style={{backgroundColor: "white", padding: "20px"}}>
        <main>{children}</main>
      </div>
      
    )

  }

  return (
    <div style={{backgroundColor: "#F2F3F6"}}>
      <header>{header}</header>
      
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(36),
          padding: `${rhythm(.5)} ${rhythm(.5)}`,
          
        }}
      >
        {content}
        
        <footer style={{clear:"both"}}>
            © {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    </div> 
  )
}

export default Layout
