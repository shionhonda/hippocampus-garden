import React from "react"
import { graphql } from "gatsby"
import Img from 'gatsby-image'
import Layout from "../components/layout"
import SEO from "../components/seo.jsx"
import { rhythm } from "../utils/typography"

const About = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="About" />
      <div style={{ backgroundColor: "white", padding: rhythm(1) }}>
        <h1>About</h1>
        <p>
          Hi! I'm Shion Honda, and welcome to {siteTitle}!! I built this website to write about machine learning, statistics, programming, and sometimes my hobbies.
            <br />
            I am a data scientist at Recruit Inc., Ltd.
            MScs in Information Science and Technology.
            <br />
            Opinions presented here are my own and not the views of my employer.
          </p>
        <div style={{ textAlign: "center" }}>
          <Img fixed={data.face.childImageSharp.fixed} />
        </div>

        <div style={{ textAlign: "center" }}>
          <a href="https://twitter.com/shion_honda/" target="_blank" rel="noopener noreferrer">
            <Img fixed={data.twitterIcon.childImageSharp.fixed} />
          </a>
          <a href="https://github.com/shionhonda/" target="_blank" rel="noopener noreferrer">
            <Img fixed={data.githubIcon.childImageSharp.fixed} />
          </a>
          <a href="https://www.linkedin.com/in/shionhonda/" target="_blank" rel="noopener noreferrer">
            <Img fixed={data.linkedinIcon.childImageSharp.fixed} />
          </a>
          <a href="https://scholar.google.co.jp/citations?user=NhNlsZcAAAAJ" target="_blank" rel="noopener noreferrer">
            <Img fixed={data.googlescholarIcon.childImageSharp.fixed} />
          </a>
        </div>

        <p style={{ clear: "both" }}>See <a href="https://www.linkedin.com/in/shionhonda/" target="_blank" rel="noopener noreferrer">LinkedIn</a> for my education and work experiences
          and <a href="https://scholar.google.co.jp/citations?user=NhNlsZcAAAAJ" target="_blank" rel="noopener noreferrer">Google Scholar</a> for publications.</p>


        <h2>External links</h2>
          You may also like:
          <ul>
          <li>
            <a href="https://qiita.com/shionhonda" target="_blank" rel="noopener noreferrer"><strong>Qiita</strong></a> (all in Japanese).
              I used to write survey posts here. The topics are somewhat wide: system trading for cryptocurrencies, graph neural networks, deep reinforcement learning, deep generative models, etc.
            </li>
          <li>
            <a href="https://ai-scholar.tech/author/honda-shion/" target="_blank" rel="noopener noreferrer"><strong>AI-SCHOLAR</strong></a> (all in Japanese).
              I contributed some introductory articles to a web media for non-experts in AI.
              Popular posts are on MuZero, XLNet, and NGBoost.
            </li>
          <li>
            <a href="https://www.slideshare.net/ShionHonda" target="_blank" rel="noopener noreferrer"><strong>SlideShare</strong></a> (mostly in Japanese).
              Here are some slides that I used in my talks and presentations.
            </li>
          <li>
            <a href="https://www.amazon.jp/hz/wishlist/ls/3DA10HYL0KND7?ref_=wl_share" target="_blank" rel="noopener noreferrer"><strong>Amazon Wish List</strong></a>.
              I appreciate your kindness.
            </li>
        </ul>

        <h2>News</h2>
        <ul>
          <li>Apr 2020: Start working at Recruit Inc., Ltd. in Tokyo.</li>
          <li>Mar 2020: Completed my Master's course at the University of Tokyo.</li>
        </ul>
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
    twitterIcon: file(relativePath: { eq: "twitter.png" }) {
      ...fixedImage50
    }
    githubIcon: file(relativePath: { eq: "github.png" }) {
      ...fixedImage50
    }
    linkedinIcon: file(relativePath: { eq: "linkedin.png" }) {
      ...fixedImage50
    }
    googlescholarIcon: file(relativePath: { eq: "google-scholar.png" }) {
      ...fixedImage50
    }
    face: file(relativePath: { eq: "face.jpg" }) {
      ...fixedImage200
    }
  }
`
export const fixedImage50 = graphql`
  fragment fixedImage50 on File {
    childImageSharp {
      fixed(width: 50) {
        ...GatsbyImageSharpFixed
      }
    }
  }
`

export const fixedImage200 = graphql`
  fragment fixedImage200 on File {
    childImageSharp {
      fixed(width: 200) {
        ...GatsbyImageSharpFixed
      }
    }
  }
`


