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
          {/* <div style={{ textAlign:"center"}}>
            <img src=""
            alt="profile" width="40%" ></img>
          </div> */}
          <p>See <a href="https://www.linkedin.com/in/shionhonda/" target="_blank" rel="noopener">LinkedIn</a> for my education and work experiences
          and <a href="https://scholar.google.co.jp/citations?user=NhNlsZcAAAAJ" target="_blank" rel="noopener">Google Scholar</a> for publications.</p>

          <h1>External links</h1>
          You may also like:
          <ul>
            <li>
              <a href="https://qiita.com/shionhonda" target="_blank" rel="noopener"><strong>Qiita</strong></a> (all in Japanese).
              I used to write survey posts here. The topics are somewhat wide: system trading for cryptocurrencies, graph neural networks, deep reinforcement learning, deep generative models, etc.
            </li>
            <li>
              <a href="https://ai-scholar.tech/author/honda-shion/" target="_blank" rel="noopener"><strong>AI-SCHOLAR</strong></a> (all in Japanese).
              I contributed some introductory articles to a web media for non-experts in AI.
              Popular posts are on MuZero, XLNet, and NGBoost.
            </li>
            <li>
              <a href="https://www.slideshare.net/ShionHonda" target="_blank" rel="noopener"><strong>SlideShare</strong></a> (mostly in Japanese).
              Here are some slides that I used in my talks and presentations.
            </li>
          </ul>
          
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
