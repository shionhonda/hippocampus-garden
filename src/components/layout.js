import React from "react"
import Link from "gatsby"

import Header from './header.js'
import Footer from './footer.js'
import './layout.css';
import { rhythm, scale } from "../utils/typography"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  
  let content
  if (location.pathname==="/"
      || location.pathname==="/blog/"
      || location.pathname==="/misc/"){
    content = (
      <div className="flexbox">
        <div className="mainbox">
          <main>{children}</main>
        </div>
        <div className="sidebar">
          <a className="twitter-timeline" data-width="300" data-height="600" 
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
    <div style={{height:"100%", backgroundColor: "#F2F3F6"}}>
      <Header></Header>
      
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(36),
          padding: `${rhythm(.5)} ${rhythm(.5)}`,
        }}
      >
        {content}

        <Footer></Footer>
        
        
      </div>
    </div> 
  )
}

export default Layout
