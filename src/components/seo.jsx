import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

const Seo = ({ title, desc, banner, pathname, article }) => (
  <StaticQuery
    query={graphql`
      {
        site {
          buildTime(formatString: "MMMM DD, YYYY")
          siteMetadata {
            defaultTitle: title
            titleAlt
            shortName
            author
            siteLanguage
            logo
            siteUrl
            pathPrefix
            defaultDescription: description
            defaultBanner: banner
            social {
              twitter
            }
          }
        }
        images: allFile {
          nodes {
            relativePath
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED, layout: FIXED)
            }
          }
        }
      }
    `}
    render={(data) => {
      const imageNode = data.images.nodes.find((n) => {
        return n.relativePath.includes(
          banner || data.site.siteMetadata.defaultBanner
        )
      })
      const seo = {
        title: title + ` | ` + data.site.siteMetadata.defaultTitle,
        image: `${data.site.siteMetadata.siteUrl}${imageNode.childImageSharp.gatsbyImageData.images.fallback.src}`,
        description: desc || data.site.siteMetadata.defaultDescription,
        url: `${data.site.siteMetadata.siteUrl}${pathname || ""}`,
      }

      let schemaOrgJSONLD = [
        {
          "@context": "http://schema.org",
          "@type": "WebSite",
          "@id": data.site.siteMetadata.siteUrl,
          url: data.site.siteMetadata.siteUrl,
          name: data.site.siteMetadata.defaultTitle,
          alternateName: data.site.siteMetadata.titleAlt || "",
        },
      ]
      if (article) {
        schemaOrgJSONLD = [
          {
            "@context": "http://schema.org",
            "@type": "BlogPosting",
            "@id": seo.siteUrl,
            url: seo.siteUrl,
            name: title,
            alternateName: data.site.siteMetadata.titleAlt || "",
            headline: title,
            image: {
              "@type": "ImageObject",
              url: seo.image,
            },
            description: seo.description,
            datePublished: data.site.buildTime,
            dateModified: data.site.buildTime,
            author: {
              "@type": "Person",
              name: data.site.siteMetadata.author,
            },
            publisher: {
              "@type": "Organization",
              name: data.site.siteMetadata.author,
              logo: {
                "@type": "ImageObject",
                url:
                  data.site.siteMetadata.siteUrl +
                  "/" +
                  data.site.siteMetadata.logo,
              },
            },
            isPartOf: data.site.siteMetadata.siteUrl,
            mainEntityOfPage: {
              "@type": "WebSite",
              "@id": data.site.siteMetadata.siteUrl,
            },
          },
        ]
      }
      console.log("&&&", seo.image)

      return (
        <>
          <title>{seo.title}</title>
          <html lang={data.site.siteMetadata.siteLanguage} />
          <meta name="description" content={seo.description} />
          <meta name="image" content={seo.image} />
          <meta
            name="apple-mobile-web-app-title"
            content={data.site.siteMetadata.shortName}
          />
          <meta
            name="application-name"
            content={data.site.siteMetadata.shortName}
          />
          <script type="application/ld+json">
            {JSON.stringify(schemaOrgJSONLD)}
          </script>

          {/* OpenGraph  */}
          <meta property="og:url" content={seo.siteUrl} />
          <meta property="og:type" content={article ? "article" : "website"} />
          <meta property="og:title" content={seo.title} />
          <meta property="og:description" content={seo.description} />
          <meta property="og:image" content={seo.image} />
          <meta property="og:image:secure_url" content={seo.image} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:image:type" content="image/jpeg" />
          <meta property="fb:app_id" content="125328685588673" />

          {/* Twitter Card */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:creator"
            content={data.site.siteMetadata.social.twitter}
          />
          <meta name="twitter:title" content={seo.title} />
          <meta name="twitter:description" content={seo.description} />
          <meta name="twitter:image" content={seo.image} />
        </>
      )
    }}
  />
)

export default Seo

Seo.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
  banner: PropTypes.string,
  pathname: PropTypes.string,
  article: PropTypes.bool,
}

Seo.defaultProps = {
  title: null,
  desc: null,
  banner: null,
  pathname: null,
  article: false,
}
