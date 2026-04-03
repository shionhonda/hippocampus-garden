const CONSENT_STORAGE_KEY = "cookie-consent"
const CONSENT_EVENT_NAME = "cookie-consent-change"
const GA_MEASUREMENT_ID = "G-MV24SB9YT3"
const GA_SCRIPT_ID = "ga4-script"

export const cookieConsentValues = {
  accepted: "accepted",
  rejected: "rejected",
} as const

type CookieConsentValue =
  (typeof cookieConsentValues)[keyof typeof cookieConsentValues]

const isBrowser = () => typeof window !== "undefined"

const isConsentValue = (value: string | null): value is CookieConsentValue =>
  value === cookieConsentValues.accepted || value === cookieConsentValues.rejected

const dispatchConsentChange = (value: CookieConsentValue | null) => {
  if (!isBrowser()) {
    return
  }

  window.dispatchEvent(
    new CustomEvent(CONSENT_EVENT_NAME, {
      detail: { value },
    }),
  )
}

export const getCookieConsent = (): CookieConsentValue | null => {
  if (!isBrowser()) {
    return null
  }

  const value = window.localStorage.getItem(CONSENT_STORAGE_KEY)
  return isConsentValue(value) ? value : null
}

const setAnalyticsDisabled = (disabled: boolean) => {
  if (!isBrowser()) {
    return
  }

  window[`ga-disable-${GA_MEASUREMENT_ID}`] = disabled
}

const updateAnalyticsConsent = (granted: boolean) => {
  if (!isBrowser() || typeof window.gtag !== "function") {
    return
  }

  window.gtag("consent", "update", {
    analytics_storage: granted ? "granted" : "denied",
  })
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
  if (!isBrowser() || getCookieConsent() !== cookieConsentValues.accepted) {
    return
  }

  injectAnalyticsScript()
  setAnalyticsDisabled(false)

  window.dataLayer = window.dataLayer || []
  window.gtag =
    window.gtag ||
    function gtag(...args: unknown[]) {
      window.dataLayer?.push(args)
    }

  if (!window.__gaInitialized) {
    window.gtag("consent", "default", {
      analytics_storage: "denied",
    })
    window.gtag("js", new Date())
    window.gtag("config", GA_MEASUREMENT_ID, { send_page_view: false })
    window.__gaInitialized = true
  }

  updateAnalyticsConsent(true)
}

export const trackPageView = (path = window.location.pathname + window.location.search) => {
  if (
    !isBrowser() ||
    getCookieConsent() !== cookieConsentValues.accepted ||
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

export const setCookieConsent = (value: CookieConsentValue) => {
  if (!isBrowser()) {
    return
  }

  window.localStorage.setItem(CONSENT_STORAGE_KEY, value)

  if (value === cookieConsentValues.accepted) {
    initializeAnalytics()
    trackPageView()
  } else {
    setAnalyticsDisabled(true)
    updateAnalyticsConsent(false)
  }

  dispatchConsentChange(value)
}

export const reopenCookieConsent = () => {
  if (!isBrowser()) {
    return
  }

  setAnalyticsDisabled(true)
  updateAnalyticsConsent(false)
  window.localStorage.removeItem(CONSENT_STORAGE_KEY)
  dispatchConsentChange(null)
}

export const subscribeToCookieConsent = (
  callback: (value: CookieConsentValue | null) => void,
) => {
  if (!isBrowser()) {
    return () => {}
  }

  const handler = (event: Event) => {
    const detail = (event as CustomEvent<{ value?: CookieConsentValue | null }>).detail
    callback(detail?.value ?? getCookieConsent())
  }

  window.addEventListener(CONSENT_EVENT_NAME, handler)

  return () => {
    window.removeEventListener(CONSENT_EVENT_NAME, handler)
  }
}

declare global {
  interface Window {
    __gaInitialized?: boolean
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
    [key: `ga-disable-${string}`]: boolean | undefined
  }
}
