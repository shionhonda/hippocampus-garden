import React from 'react';
import { useStaticQuery, graphql } from "gatsby"
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

        <ul style={{ listStyle: "none", margin: "0", padding: "0" }}>
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
        </ul>

    );

}

export default Share;

export const Head = () => {
    <>
        <script type="text/javascript" src="//b.st-hatena.com/js/bookmark_button.js" charset="utf-8" async="async" />
    </>
}