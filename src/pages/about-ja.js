import React from "react"
import { graphql, Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import Seo from "../components/seo.jsx"
import { rhythm } from "../utils/typography"

const AboutJa = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const l50 = 50
  const l250 = 250

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="About" pathname="about-ja" />
      <div style={{ backgroundColor: "white", padding: rhythm(1) }}>
        <div style={{ textAlign: "right" }}>
          <Link to={"/about/"}>English</Link>
        </div>
        <h2>当ブログについて</h2>
        <p>
          ようこそ、 {siteTitle}{" "}
          へ！当ブログでは、機械学習、統計学、ソフトウェア開発、そして時折趣味について書いています。
          <br />
          おことわり：当ブログの内容は著者個人の意見であり、雇用主とは関係ありません。
        </p>

        <h2>著者について</h2>
        <p>
          私は本田志温と申します。Alanという会社でソフトウェアエンジニアをしています。
          <br />
          2023年に東京からパリに引っ越し、現在の会社に入社しました。
          それ以前はRecruitで機械学習エンジニアとして、最新のアルゴリズムを開発し、数千万人のユーザーに提供するという挑戦に取り組んでいました。
          <br />
          東京大学で修士（情報理工学）を取得しています。修士論文は分子の表現学習に関するものでした。
          <br />
          趣味は音楽鑑賞、料理、読書です。
        </p>
        <div style={{ textAlign: "center", marginBottom: "10px" }}>
          <StaticImage
            src="../../content/assets/face.jpg"
            alt="face"
            width={l250}
          />
        </div>

        <div style={{ textAlign: "center" }}>
          <a
            href="https://twitter.com/shion_honda/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <StaticImage
              src="../../content/assets/x.png"
              alt="x"
              width={l50}
              height={l50}
            />
          </a>
          <a
            href="https://github.com/shionhonda/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <StaticImage
              src="../../content/assets/github.png"
              alt="github"
              width={l50}
              height={l50}
            />
          </a>
          <a
            href="https://huggingface.co/shionhonda"
            target="_blank"
            rel="noopener noreferrer"
          >
            <StaticImage
              src="../../content/assets/hugging-face.png"
              alt="huggingface"
              width={l50}
              height={l50}
            />
          </a>
          <a
            href="https://kaggle.com/shionhonda/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <StaticImage
              src="../../content/assets/kaggle.png"
              alt="kaggle"
              width={l50}
              height={l50}
            />
          </a>
          <a
            href="https://www.linkedin.com/in/shionhonda/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <StaticImage
              src="../../content/assets/linkedin.png"
              alt="linkedin"
              width={l50}
              height={l50}
            />
          </a>
          <a
            href="https://scholar.google.co.jp/citations?user=NhNlsZcAAAAJ"
            target="_blank"
            rel="noopener noreferrer"
          >
            <StaticImage
              src="../../content/assets/google-scholar.png"
              alt="google-scholar"
              width={l50}
              height={l50}
            />
          </a>
        </div>
        <br />

        <p style={{ clear: "both" }}>
          最新のプロフィールと経歴については{" "}
          <a
            href="https://www.linkedin.com/in/shionhonda/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          をご覧ください。
        </p>

        <h2>新着情報</h2>
        <ul>
          <li>2023年9月: Alan（フランス）に入社しました。</li>
          <li>
            2022年12月:{" "}
            <a
              href="https://www.tkd-pbl.com/book/b616180.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              執筆を共同で担当した『[実践]データ活用システム開発ガイド』
            </a>
            が東京化学同人から出版されました。
          </li>
          <li>
            2021年5月:{" "}
            <a
              href="http://www.tkd-pbl.com/book/b559511.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              翻訳を共同で担当した『ダイテル Pythonプログラミング』
            </a>
            が東京化学同人から出版されました。
          </li>
          <li>2020年4月: 株式会社リクルートに入社しました。</li>
        </ul>

        <h2>リンク集</h2>
        <ul>
          <li>
            <a
              href="https://medium.com/@shionhonda"
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>Medium</strong>
            </a>
            ： 勤務先のテックブログに投稿した記事があります。
          </li>
          <li>
            <a
              href="https://qiita.com/shionhonda"
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>Qiita</strong>
            </a>
            ：
            過去に日本語でブログ記事を書いていました。内容は暗号通貨、グラフニューラルネットワーク、深層強化学習、深層生成モデルなど多岐にわたります。
          </li>
          <li>
            <a
              href="https://ai-scholar.tech/author/honda-shion/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>AI-SCHOLAR</strong>
            </a>
            ： 非専門家に向けたAIの解説記事をいくつか寄稿しました。
          </li>
          <li>
            <a
              href="https://www.amazon.jp/hz/wishlist/ls/3DA10HYL0KND7?ref_=wl_share"
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>Amazon Wish List</strong>
            </a>
            ： ご支援いただける場合はこちらからお願いします。
          </li>
        </ul>
      </div>
    </Layout>
  )
}

export default AboutJa

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    xIcon: file(relativePath: { eq: "x.png" }) {
      ...fixedImage50
    }
    githubIcon: file(relativePath: { eq: "github.png" }) {
      ...fixedImage50
    }
    huggingfaceIcon: file(relativePath: { eq: "hugging-face.png" }) {
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
export const fixedImage50 = graphql`
  fragment fixedImage50 on File {
    childImageSharp {
      gatsbyImageData(width: 50, layout: FIXED)
    }
  }
`

export const fixedImage250 = graphql`
  fragment fixedImage250 on File {
    childImageSharp {
      gatsbyImageData(width: 250, layout: FIXED)
    }
  }
`
