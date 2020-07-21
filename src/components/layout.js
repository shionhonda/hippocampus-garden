import React from "react"

import Header from './header.js'
import Footer from './footer.js'
import PopularPost from './popular'
import TagList from './tag-list'
import './layout.scss';
import { rhythm } from "../utils/typography"


const Layout = ({ location, title, children, toc }) => {
  const isRootPath = location.pathname === `${__PATH_PREFIX__}/`
  const pageNumber = location.pathname
    .split('/')
    .filter(Boolean)
    .pop()
  const isPaginatedPath = pageNumber && Boolean(pageNumber.match(/^[0-9]+$/))
  const isTagPath = Boolean(location.pathname.match(/tags\/.+$/))

  let content

  if (isRootPath || isPaginatedPath || isTagPath) {
    content = (
      <div className="flexbox">
        <div className="mainbox grid">
          <main>{children}</main>
        </div>
        <div className="sidebar" >
          <PopularPost />
          <a className="twitter-timeline" data-width="300" data-height="600"
            href="https://twitter.com/shion_honda?ref_src=twsrc%5Etfw">Tweets by shion_honda
          </a>
          <TagList />
        </div>
      </div>
    )
  }

  else if (location.pathname === "/about/"
    || location.pathname === "/privacy-policy/") {
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
            <div dangerouslySetInnerHTML={{ __html: toc }} />
          </div>
          <PopularPost />
          <TagList />
        </div>
      </div>
    )
  }

  return (
    <div style={{ width: "100%", height: "100%", backgroundColor: "#F2F3F6" }}>
      <Header />
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(40),
          padding: `${rhythm(.5)} ${rhythm(.5)}`,
        }}
      >
        {content}
      </div>
      <Footer />
    </div>
  )
}

export default Layout
