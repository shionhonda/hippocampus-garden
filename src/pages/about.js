import React from "react"
import { Link, graphql } from "gatsby"
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

const About = ({ data, location }) => {
    const siteTitle = data.site.siteMetadata.title
  
    return (
      <Layout location={location} title={siteTitle}>
        <SEO title="About" />
        <div>
          <h1>Shion Honda</h1>
          <p>Hi, this is Shion.
          MScs in Information Scince and Technology.</p>
          <div style={{ textAlign:"center"}}>
            <img src="https://media-exp1.licdn.com/dms/image/C5103AQGDS2utMiobKQ/profile-displayphoto-shrink_200_200/0?e=1587600000&v=beta&t=_HITxpVXkoPWiGKZsMKBLFUVlbZwrxWhF7noPpfcBXc"
            alt="profile" width="40%" ></img>
          </div>
          <p>See <a href="https://www.linkedin.com/in/shionhonda/">LinkedIn</a> for my education and work experiences
          and <a href="https://scholar.google.co.jp/citations?user=NhNlsZcAAAAJ">Google Scholar</a> for publications.</p>

          <h1>News</h1>
          <ul></ul>   
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
