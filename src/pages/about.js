import React from "react"
import { graphql, Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image";
import Layout from "../components/layout"
import Seo from "../components/seo.jsx"
import { rhythm } from "../utils/typography"

const About = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const l50 = 50
  const l250 = 250

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="About" pathname="about" />
      <div style={{ backgroundColor: "white", padding: rhythm(1) }}>
        <div style={{ "textAlign": "right" }}>
          <Link to={"/about-ja/"}>日本語</Link>
        </div>

        <h1>About</h1>
        <h2>This Site</h2>
        <p>
          Welcome to {siteTitle}! This is a blog by Shion Honda. I write about machine learning, statistics, programming, and sometimes my hobbies.
        </p>
        {/* TODO: copyright, privacy policy https://www.haya-programming.com/about */}
        <h2>Author</h2>
        <p>
          I am a machine learning engineer at Recruit Inc., Ltd. I completed my M.S. in Information Science and Technology at University of Tokyo.
          <br />
          Opinions presented here are my own and not the views of my employer.
        </p>
        <div style={{ textAlign: "center" }}>
          <StaticImage src="../../content/assets/face.jpg" alt="face"
            width={l250} />
        </div>

        <div style={{ textAlign: "center" }}>
          <a href="https://twitter.com/shion_honda/" target="_blank" rel="noopener noreferrer">
            <StaticImage src="../../content/assets/twitter.png" alt="twitter"
              width={l50} height={l50} />
          </a>
          <a href="https://github.com/shionhonda/" target="_blank" rel="noopener noreferrer">
            <StaticImage src="../../content/assets/github.png" alt="github"
              width={l50} height={l50} />
          </a>
          <a href="https://kaggle.com/shionhonda/" target="_blank" rel="noopener noreferrer">
            <StaticImage src="../../content/assets/kaggle.png" alt="kaggle"
              width={l50} height={l50} />
          </a>
          <a href="https://www.linkedin.com/in/shionhonda/" target="_blank" rel="noopener noreferrer">
            <StaticImage src="../../content/assets/linkedin.png" alt="linkedin"
              width={l50} height={l50} />
          </a>
          <a href="https://scholar.google.co.jp/citations?user=NhNlsZcAAAAJ" target="_blank" rel="noopener noreferrer">
            <StaticImage src="../../content/assets/google-scholar.png" alt="google-scholar"
              width={l50} height={l50} />
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
          <li>Dec 2021: I passed the Applied Information Technology Engineer Examination (a Japanese national certification).</li>
          <li>
            May 2021: <a href="http://www.tkd-pbl.com/book/b559511.html" target="_blank" rel="noopener noreferrer">The book "Python for Programmers by Deitel &amp; Deitel", which I co-translated</a>, has been published.
          </li>
          <li>Apr 2020: Started working at Recruit Inc., Ltd. in Tokyo.</li>
          <li>Mar 2020: Completed my Master's course at the University of Tokyo.</li>
        </ul>
      </div>
    </Layout>
  );
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
    kaggleIcon: file(relativePath: { eq: "kaggle.png" }) {
      ...fixedImage50
    }
    linkedinIcon: file(relativePath: { eq: "linkedin.png" }) {
      ...fixedImage50
    }
    googlescholarIcon: file(relativePath: { eq: "google-scholar.png" }) {
      ...fixedImage50
    }
    face: file(relativePath: { eq: "face.jpg" }) {
      ...fixedImage250
    }
  }
`
export const fixedImage50 = graphql`fragment fixedImage50 on File {
  childImageSharp {
    gatsbyImageData(width: 50, layout: FIXED)
  }
}
`

export const fixedImage250 = graphql`fragment fixedImage250 on File {
  childImageSharp {
    gatsbyImageData(width: 250, layout: FIXED)
  }
}
`


