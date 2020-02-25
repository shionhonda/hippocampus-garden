import React from 'react'
import Helmet from 'react-helmet'

import {
  title,
  siteUrl,
  description,
  logo,
  social
} from '../config/site.js';

export default function OGP({type, pageTitle, pageDescription}) {
  return(
    <Helmet>
      <meta property="og:title" content={pageTitle || title} />
      <meta property="og:description" content={pageDescription || description} />

      <meta property="og:url" content={siteUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={pageTitle} />
      <meta property="og:image" content={logo} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={{social.twitter}} />
    </Helmet>
  )
}
