// Thanks to @inouetakumon

import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image";

// 画像ファイルパスをプロパティに取るようなコンポーネントを定義
const Image = ({ filename }) => (

  // ページじゃないコンポーネントでもGraphQLが使えるように
  // StaticQueryタグを使う
  <StaticQuery

    // GraphQLのクエリ引数には何も指定しない！
    query={graphql`{
  images: allFile {
    edges {
      node {
        relativePath
        name
        childImageSharp {
          gatsbyImageData(width: 800, layout: CONSTRAINED)
        }
      }
    }
  }
}
`}

    // 全画像情報がdataに代入されている
    render={(data) => {

      // 指定した画像ファイルパス（コンポーネントのプロパティ）と
      // 一致するgatsby-image用の情報を取得
      const image = data.images.edges.find(n => {
        return n.node.relativePath.includes(filename)
      })
      if (!image) {
        console.log(filename + 'image not found')
        return
      }

      // Imgタグでgatsby-imageで最適化された画像を表示する
      const imageSizes = image.node.childImageSharp.gatsbyImageData
      return <GatsbyImage image={imageSizes} alt="post" />;
    }}
  />
)

export default Image