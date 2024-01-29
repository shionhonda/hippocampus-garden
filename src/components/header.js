import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import Navbar from "./navbar"

const Header = () => {
  // Set ImageData.
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to top, #41899E, #72dbc1)`,
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
          fontSize: `42px`,
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
        }}
      >
        {`Under the sea, in the hippocampus's garden...`}
      </p>
      <Navbar />
    </div>
  )
}

const StyledHeader = styled(Header)`
  width: 100%;
  background-position: center center;
  background-repeat: repeat-y;
  background-size: cover;
`

export default StyledHeader
