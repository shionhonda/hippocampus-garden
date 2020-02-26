import React, { Component } from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

const SEO = ({title, desc, banner, pathname, article }) => (
  <StaticQuery
    query={graphql`
      query {
        site {
          buildTime(formatString: "MMMM DD, YYYY")
          siteMetadata {
            defaultTitle: title
            titleAlt
            shortName
            author
            siteLanguage
            logo
            url
            pathPrefix
            defaultDescription: description
            defaultBanner: banner
            social {
                twitter
            }
          }
        }
        images: allFile {
          edges {
            node {
              relativePath
              name
              childImageSharp {
                sizes(maxWidth: 800) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
          }
        }
      }
    `}

    render={data => {
      const imageNode = data.images.edges.find(n => {
        return n.node.relativePath.includes(banner || data.site.siteMetadata.defaultBanner)
      })     
      const seo = {
          title: title + ` | ` + data.site.siteMetadata.defaultTitle || data.site.siteMetadata.defaultTitle,
          image: `${data.site.siteMetadata.url}${imageNode.node.childImageSharp.sizes.src}`,
          description: desc || data.site.siteMetadata.defaultDescription,
          url: `${data.site.siteMetadata.url}${pathname || '/'}`,
      };
      const realPrefix = data.site.siteMetadata.pathPrefix === '/' ? '' : data.site.siteMetadata.pathPrefix;
      let schemaOrgJSONLD = [
        {
            '@context': 'http://schema.org',
            '@type': 'WebSite',
            '@id': data.site.siteMetadata.url,
            url: data.site.siteMetadata.url,
            name: data.site.siteMetadata.defaultTitle,
            alternateName: data.site.siteMetadata.titleAlt || '',
        },
      ];
      if (article) {
        schemaOrgJSONLD = [
          {
            '@context': 'http://schema.org',
            '@type': 'BlogPosting',
            '@id': seo.url,
            url: seo.url,
            name: title,
            alternateName: data.site.siteMetadata.titleAlt || '',
            headline: title,
            image: {
                '@type': 'ImageObject',
                url: seo.image,
            },
            description: seo.description,
            datePublished: data.site.buildTime,
            dateModified: data.site.buildTime,
            author: {
                '@type': 'Person',
                name: data.site.siteMetadata.author,
            },
            publisher: {
                '@type': 'Organization',
                name: data.site.siteMetadata.author,
                logo: {
                '@type': 'ImageObject',
                url: data.site.siteMetadata.url + realPrefix + data.site.siteMetadata.logo,
                },
            },
            isPartOf: data.site.siteMetadata.url,
            mainEntityOfPage: {
                '@type': 'WebSite',
                '@id': data.site.siteMetadata.url,
            },
          },
        ];
      }

      return (
        <>
          <Helmet title={seo.title}>
            <html lang={data.site.siteMetadata.siteLanguage} />
            <meta name="description" content={seo.description} />
            <meta name="image" content={seo.image} />
            <meta name="apple-mobile-web-app-title" content={data.site.siteMetadata.shortName} />
            <meta name="application-name" content={data.site.siteMetadata.shortName} />
            <script type="application/ld+json">{JSON.stringify(schemaOrgJSONLD)}</script>

            {/* OpenGraph  */}
            <meta property="og:url" content={seo.url} />
            <meta property="og:type" content={article ? 'article' : null} />
            <meta property="og:title" content={seo.title} />
            <meta property="og:description" content={seo.description} />
            <meta property="og:image" content={seo.image} />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:creator" content={data.site.siteMetadata.social.twitter} />
            <meta name="twitter:title" content={seo.title} />
            <meta name="twitter:description" content={seo.description} />
            <meta name="twitter:image" content={seo.image} />
            </Helmet>
        </>
      );
    }}
  />
);

export default SEO

SEO.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
  banner: PropTypes.string,
  pathname: PropTypes.string,
  article: PropTypes.bool,
};

SEO.defaultProps = {
  title: null,
  desc: null,
  banner: null,
  pathname: null,
  article: false,
};
