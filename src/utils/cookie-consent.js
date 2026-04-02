const CONSENT_STORAGE_KEY = "cookie-consent"
const CONSENT_EVENT_NAME = "cookie-consent-change"
const GA_MEASUREMENT_ID = "G-MV24SB9YT3"
const GA_SCRIPT_ID = "ga4-script"

const CONSENT_VALUES = {
  accepted: "accepted",
  rejected: "rejected",
}

const isBrowser = () => typeof window !== "undefined"

export const cookieConsent = {
  key: CONSENT_STORAGE_KEY,
  eventName: CONSENT_EVENT_NAME,
  values: CONSENT_VALUES,
}

const dispatchConsentChange = (value) => {
  if (!isBrowser()) {
    return
  }

  window.dispatchEvent(
    new CustomEvent(CONSENT_EVENT_NAME, {
      detail: { value },
    })
  )
}

export const getCookieConsent = () => {
  if (!isBrowser()) {
    return null
  }

  const value = window.localStorage.getItem(CONSENT_STORAGE_KEY)

  return Object.values(CONSENT_VALUES).includes(value) ? value : null
}

const setAnalyticsDisabled = (disabled) => {
  if (!isBrowser()) {
    return
  }

  window[`ga-disable-${GA_MEASUREMENT_ID}`] = disabled
}

const injectAnalyticsScript = () => {
  if (!isBrowser() || document.getElementById(GA_SCRIPT_ID)) {
    return
  }

  const script = document.createElement("script")
  script.id = GA_SCRIPT_ID
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  document.head.appendChild(script)
}

export const initializeAnalytics = () => {
  if (!isBrowser()) {
    return
  }

  if (getCookieConsent() !== CONSENT_VALUES.accepted) {
    return
  }

  injectAnalyticsScript()
  setAnalyticsDisabled(false)

  window.dataLayer = window.dataLayer || []
  window.gtag =
    window.gtag ||
    function gtag() {
      window.dataLayer.push(arguments)
    }

  if (!window.__gaInitialized) {
    window.gtag("js", new Date())
    window.gtag("config", GA_MEASUREMENT_ID, { send_page_view: false })
    window.__gaInitialized = true
  }
}

export const trackPageView = (path) => {
  if (!isBrowser()) {
    return
  }

  if (
    getCookieConsent() !== CONSENT_VALUES.accepted ||
    typeof window.gtag !== "function"
  ) {
    return
  }

  window.gtag("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  })
}

export const setCookieConsent = (value) => {
  if (!isBrowser() || !Object.values(CONSENT_VALUES).includes(value)) {
    return
  }

  window.localStorage.setItem(CONSENT_STORAGE_KEY, value)

  if (value === CONSENT_VALUES.accepted) {
    initializeAnalytics()
    trackPageView(window.location.pathname + window.location.search)
  } else {
    setAnalyticsDisabled(true)

    if (typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        analytics_storage: "denied",
      })
    }
  }

  dispatchConsentChange(value)
}

export const reopenCookieConsent = () => {
  if (!isBrowser()) {
    return
  }

  setAnalyticsDisabled(true)

  if (typeof window.gtag === "function") {
    window.gtag("consent", "update", {
      analytics_storage: "denied",
    })
  }

  window.localStorage.removeItem(CONSENT_STORAGE_KEY)
  dispatchConsentChange(null)
}

export const subscribeToCookieConsent = (callback) => {
  if (!isBrowser()) {
    return () => {}
  }

  const handler = (event) => {
    callback(event.detail?.value ?? getCookieConsent())
  }

  window.addEventListener(CONSENT_EVENT_NAME, handler)

  return () => {
    window.removeEventListener(CONSENT_EVENT_NAME, handler)
  }
}
