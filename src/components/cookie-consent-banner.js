import React, { useEffect, useState } from "react"
import { Link } from "gatsby"
import {
  cookieConsent,
  getCookieConsent,
  setCookieConsent,
  subscribeToCookieConsent,
} from "../utils/cookie-consent"

const CookieConsentBanner = () => {
  const [consent, setConsent] = useState(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    setConsent(getCookieConsent())
    setIsReady(true)

    return subscribeToCookieConsent((value) => {
      setConsent(value)
      setIsReady(true)
    })
  }, [])

  if (!isReady || consent) {
    return null
  }

  return (
    <aside
      className="cookie-banner"
      aria-label="Cookie consent banner"
      role="dialog"
      aria-live="polite"
    >
      <div className="cookie-banner__content">
        <h2>Analytics cookies are optional</h2>
        <p>
          This site uses Google Analytics only if you allow it. We also use
          Amazon affiliate links, and Amazon may apply its own tracking after
          you follow those links. See the{" "}
          <Link to="/privacy-policy/">Privacy Policy</Link> for details.
        </p>
      </div>
      <div className="cookie-banner__actions">
        <button
          type="button"
          className="cookie-banner__button cookie-banner__button--secondary"
          onClick={() => setCookieConsent(cookieConsent.values.rejected)}
        >
          Reject
        </button>
        <button
          type="button"
          className="cookie-banner__button"
          onClick={() => setCookieConsent(cookieConsent.values.accepted)}
        >
          Accept
        </button>
      </div>
    </aside>
  )
}

export default CookieConsentBanner
