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
          fontSize: `48px`
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

  return (
    <div style={{backgroundColor: "#F2F3F6"}}>
      <header>{header}</header>
      
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
          backgroundColor: "#FFFFFF",
        }}
      >
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    </div>
  )
}

export default Layout
