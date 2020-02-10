import React from "react"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

const About = ({ data, location }) => {
    const siteTitle = data.site.siteMetadata.title
  
    return (
      <Layout location={location}>
        <SEO title="About" />
        <div>
            <h1>About</h1>
        </div>
      </Layout>
    )
  };

export default About;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
