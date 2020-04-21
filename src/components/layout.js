import React from "react"

import Header from './header.js'
import Footer from './footer.js'
import './layout.scss';
import { rhythm, scale } from "../utils/typography"


const Layout = ({ location, title, children, toc }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  
  let content

  if (location.pathname==="/"
      || location.pathname==="/blog/"
      || location.pathname==="/misc/") {
    content = (
      <div className="flexbox">
        <div className="mainbox grid">
          <main>{children}</main>
        </div>
        <div className="sidebar">
          <a className="twitter-timeline" data-width="300" data-height="600" 
          href="https://twitter.com/shion_honda?ref_src=twsrc%5Etfw">Tweets by shion_honda
          </a> 
        </div>
      </div>
    )
  } 
  
  else if (location.pathname==="/about/"
             || location.pathname==="/privacy-policy/") {
    content = <main>{children}</main>
  } 
  
  else {
    content = (
      <div className="flexbox">
        <div className="mainbox">
          <main>{children}</main>
        </div>
        <div className="sidebar">
          <div className="toc">
            <h3>Table of Contents</h3>
            <div dangerouslySetInnerHTML={{__html: toc}}/>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{height:"100%", backgroundColor: "#F2F3F6"}}>
      <Header/>
      <body
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(40),
          padding: `${rhythm(.5)} ${rhythm(.5)}`,
        }}
      >
        {content}
      </body>
      <Footer/>
    </div> 
  )
}

export default Layout
