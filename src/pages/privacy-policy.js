import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo.jsx"
import { rhythm } from "../utils/typography"

const PrivacyPolicyPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="Privacy Policy" pathname="privacy-policy" />
      <div style={{ backgroundColor: "white", padding: rhythm(1) }}>
        <h1>Privacy Policy of Hippocampus's Garden</h1>
        <p>
          Hippocampus&apos;s Garden operates{" "}
          <a href="https://hippocampus-garden.com/">
            https://hippocampus-garden.com/
          </a>
          . This page explains what information may be processed when you visit
          the site, which third-party services are involved, and how you can
          control optional analytics cookies.
        </p>
        <p>
          The site is a personal blog. It does not offer account registration,
          comments, or contact forms that ask visitors to submit names, phone
          numbers, or postal addresses directly on the site.
        </p>

        <h2>Log Data</h2>
        <p>
          Like most websites, the servers and platforms involved in delivering
          this site may record technical data such as IP address, browser type,
          referring pages, visited pages, timestamps, and similar diagnostic
          information. This information is used for security, troubleshooting,
          and aggregate traffic analysis.
        </p>

        <h2>Cookies</h2>
        <p>
          Cookies are small text files stored on your device. This site uses a
          small consent record in your browser so your analytics preference can
          be remembered across page views and future visits.
        </p>
        <p>
          Analytics cookies are optional on this site. Google Analytics is only
          enabled after you click <strong>Accept</strong> in the cookie banner.
          If you click <strong>Reject</strong>, the site will continue to work
          normally and Google Analytics will remain disabled.
        </p>
        <p>
          You can reopen the banner and change your choice at any time through
          the <strong>Cookie Settings</strong> link in the footer.
        </p>

        <h2>Third-Party Services</h2>
        <p>The site relies on the following external services:</p>
        <ul>
          <li>
            <strong>Google Analytics</strong>: used to understand aggregate site
            usage, such as popular pages and navigation patterns. It is loaded
            only after you grant consent through the cookie banner.
          </li>
          <li>
            <strong>Google Search Console</strong>: used by the site owner to
            monitor search performance, indexing, and technical issues. It is
            not used as a visitor-facing optional cookie category in the banner.
          </li>
          <li>
            <strong>Amazon Associates / affiliate links</strong>: some posts
            link to Amazon products using affiliate links. If you click one of
            those links, Amazon may collect information according to its own
            policies and may set cookies or other tracking technologies on its
            own sites.
          </li>
        </ul>
        <p>
          When you interact with third-party services or leave this site through
          affiliate links, their own terms and privacy policies apply.
        </p>

        <h2>Legal Basis for Analytics</h2>
        <p>
          Where consent is required under applicable law, Google Analytics is
          processed on the basis of your consent. If you do not consent, no
          analytics script is loaded from Google Analytics on this site.
        </p>

        <h2>Security</h2>
        <p>
          Reasonable efforts are made to keep the site secure, but no method of
          transmission or storage over the internet is completely secure.
        </p>

        <h2>Links to Other Sites</h2>
        <p>
          The site may link to external websites. Once you leave this site, the
          privacy practices of the destination website are controlled by that
          third party, not by Hippocampus&apos;s Garden.
        </p>

        <h2>Children&apos;s Privacy</h2>
        <p>
          This site is not directed to children under 13, and it does not
          knowingly collect personal information from children through direct
          submission features on the site.
        </p>

        <h2>Changes to This Privacy Policy</h2>
        <p>
          This policy may be updated from time to time to reflect operational,
          legal, or regulatory changes. The latest version will always be
          published on this page.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have questions about this Privacy Policy, please contact the
          site owner through the publicly listed channels on the About page or
          associated social profiles.
        </p>
      </div>
    </Layout>
  )
}

export default PrivacyPolicyPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
