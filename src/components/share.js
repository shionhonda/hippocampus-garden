import React from 'react';
import { useStaticQuery, graphql } from "gatsby"
import { Helmet, HelmetProvider } from "react-helmet-async"
import {
    FacebookShareButton,
    FacebookIcon,
    TwitterShareButton,
    TwitterIcon,
    LineShareButton,
    LineIcon,
    LinkedinShareButton,
    LinkedinIcon,
    RedditShareButton,
    RedditIcon
} from 'react-share';

const Share = ({ title, url }) => {
    const data = useStaticQuery(graphql`
        query ShareQuery {
            site {
                siteMetadata {
                    defaultTitle: title
                    social {
                        twitter
                    }
                }
            }
        }
    `)
    const { social } = data.site.siteMetadata
    title = title + ` | ` + data.site.siteMetadata.defaultTitle


    return (
        <HelmetProvider>

        <ul style={{ listStyle: "none", margin: "0", padding: "0" }}>
            <Helmet>
                <script type="text/javascript" src="//b.st-hatena.com/js/bookmark_button.js" charset="utf-8" async="async" />
            </Helmet>

            <li style={{ display: "inline-block" }}>
                <TwitterShareButton title={title} via={social.twitter} url={url}>
                    <TwitterIcon size={40} square="true" />
                </TwitterShareButton>
            </li>
            <li style={{ display: "inline-block" }}>
                <RedditShareButton title={title} url={url}>
                    <RedditIcon size={40} square="true" />
                </RedditShareButton>
            </li>
            <li style={{ display: "inline-block" }}>
                <FacebookShareButton url={url}>
                    <FacebookIcon size={40} square="true" />
                </FacebookShareButton>
            </li>
            <li style={{ display: "inline-block" }}>
                <LinkedinShareButton url={url}>
                    <LinkedinIcon size={40} square="true" />
                </LinkedinShareButton>
            </li>
            <li style={{ display: "inline-block" }}>
                <LineShareButton url={url}>
                    <LineIcon size={40} square="true" />
                </LineShareButton>
            </li>
            <li style={{ display: "inline-block" }}>
                <a href="https://b.hatena.ne.jp/entry/" className="hatena-bookmark-button" data-hatena-bookmark-layout="touch-counter" data-hatena-bookmark-height="40" title="このエントリーをはてなブックマークに追加">
                    <img src="https://b.st-hatena.com/images/v4/public/entry-button/button-only@2x.png" alt="このエントリーをはてなブックマークに追加" width="40" height="40" style={{ border: "none" }} />
                </a>
            </li>
        </ul>
        </HelmetProvider>

    );

}

export default Share;