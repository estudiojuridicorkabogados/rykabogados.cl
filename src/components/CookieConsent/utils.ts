import { CONSENT_COOKIE_NAME } from "@/lib/utils/consent";

import { CookieConsentPreferences } from "./types";

const DISMISSED_KEY = "cookie-banner-dismissed";
const COOKIE_MAX_AGE = 365 * 24 * 60 * 60; // 1 year in seconds

/** The shape records are written in today. */
const CONSENT_VERSION = 2;

/**
 * Records below this version are treated as no consent at all, and the banner
 * comes back.
 *
 * Set to 0, so nothing is re-prompted: a visitor who accepted "analytics"
 * before the advertising category existed keeps that, and reads as having
 * declined advertising. Whether that is enough, or whether they must make a
 * fresh affirmative choice now that advertising is a separate decision, is a
 * legal judgement for the firm rather than ours. Raise this to 2 when they
 * answer; nothing else needs to change.
 */
const REPROMPT_BELOW_VERSION = 0;

/**
 * Turns whatever is in the cookie into a record we can trust.
 *
 * The parse result is `any`, so a record from an older build type-checks while
 * being structurally wrong at runtime — which is exactly what a record written
 * before the advertising category is.
 */
function normalizePreferences(raw: unknown): CookieConsentPreferences | null {
  if (typeof raw !== "object" || raw === null) return null;

  const value = raw as Record<string, unknown>;
  if (typeof value.timestamp !== "string") return null;

  return {
    necessary: true,
    analytics: value.analytics === true,
    // `=== true`, not truthiness: an older record has no such key and reads as
    // declined until the visitor chooses again. The same rule lives in
    // readStoredChoices and in CONSENT_BOOTSTRAP_SNIPPET
    // (src/lib/utils/consent.ts) — change all three together.
    advertising: value.advertising === true,
    timestamp: value.timestamp,
    version: typeof value.version === "number" ? value.version : 1,
  };
}

/**
 * Get cookie consent preferences from cookie
 */
export function getCookieConsent(): CookieConsentPreferences | null {
  if (typeof window === "undefined") return null;

  const cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${CONSENT_COOKIE_NAME}=`))
    ?.split("=")[1];

  if (!cookieValue) return null;

  try {
    return normalizePreferences(JSON.parse(decodeURIComponent(cookieValue)));
  } catch {
    return null;
  }
}

/**
 * Set cookie consent preferences in cookie
 */
export function setCookieConsent(preferences: CookieConsentPreferences): void {
  if (typeof window === "undefined") return;

  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  const value = encodeURIComponent(JSON.stringify(preferences));

  document.cookie = `${CONSENT_COOKIE_NAME}=${value}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax${secure}`;
}

/**
 * Remove cookie consent preferences
 */
export function removeCookieConsent(): void {
  if (typeof window === "undefined") return;

  document.cookie = `${CONSENT_COOKIE_NAME}=; path=/; max-age=0`;
}

/**
 * Check if banner was dismissed
 */
export function isBannerDismissed(): boolean {
  if (typeof window === "undefined") return false;

  try {
    const dismissed = localStorage.getItem(DISMISSED_KEY);
    return dismissed === "true";
  } catch {
    return false;
  }
}

/**
 * Set banner as dismissed in localStorage
 */
export function setBannerDismissed(): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(DISMISSED_KEY, "true");
  } catch {
    // Silent fail if localStorage is not available
  }
}

/**
 * Remove banner dismissed flag
 */
export function removeBannerDismissed(): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem(DISMISSED_KEY);
  } catch {
    // Silent fail if localStorage is not available
  }
}

/**
 * Create default consent preferences.
 *
 * An options object rather than positional booleans: with two categories,
 * `createDefaultPreferences(true, false)` says nothing about which is which,
 * and a third would make it worse. Both default to declined.
 */
export function createDefaultPreferences({
  analytics = false,
  advertising = false,
}: {
  analytics?: boolean;
  advertising?: boolean;
} = {}): CookieConsentPreferences {
  return {
    necessary: true,
    analytics,
    advertising,
    timestamp: new Date().toISOString(),
    version: CONSENT_VERSION,
  };
}

/**
 * Check if consent is still valid (not expired, and not from a shape we have
 * decided to re-ask about).
 *
 * The expiry check is belt and braces for clock skew: setCookieConsent writes
 * max-age for the same year, so a record the browser still hands us is valid
 * by construction.
 */
export function isConsentValid(
  preferences: CookieConsentPreferences | null
): boolean {
  if (!preferences || !preferences.timestamp) return false;

  if ((preferences.version ?? 1) < REPROMPT_BELOW_VERSION) return false;

  const consentDate = new Date(preferences.timestamp);
  const now = new Date();
  const daysSinceConsent =
    (now.getTime() - consentDate.getTime()) / (1000 * 60 * 60 * 24);

  return daysSinceConsent < 365; // Valid for 1 year
}
