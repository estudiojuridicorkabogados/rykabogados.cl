import { CookieConsentPreferences } from "./types";

const COOKIE_NAME = "cookie-consent";
const DISMISSED_KEY = "cookie-banner-dismissed";
const COOKIE_MAX_AGE = 365 * 24 * 60 * 60; // 1 year in seconds

/**
 * Get cookie consent preferences from cookie
 */
export function getCookieConsent(): CookieConsentPreferences | null {
  if (typeof window === "undefined") return null;

  const cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${COOKIE_NAME}=`))
    ?.split("=")[1];

  if (!cookieValue) return null;

  try {
    return JSON.parse(decodeURIComponent(cookieValue));
  } catch {
    return null;
  }
}

/**
 * Set cookie consent preferences in cookie
 */
export function setCookieConsent(preferences: CookieConsentPreferences): void {
  if (typeof window === "undefined") return;

  const value = encodeURIComponent(JSON.stringify(preferences));
  document.cookie = `${COOKIE_NAME}=${value}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
}

/**
 * Remove cookie consent preferences
 */
export function removeCookieConsent(): void {
  if (typeof window === "undefined") return;

  document.cookie = `${COOKIE_NAME}=; path=/; max-age=0`;
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
 * Create default consent preferences
 */
export function createDefaultPreferences(
  analytics: boolean = false
): CookieConsentPreferences {
  return {
    necessary: true,
    analytics,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Check if consent is still valid (not expired)
 */
export function isConsentValid(
  preferences: CookieConsentPreferences | null
): boolean {
  if (!preferences || !preferences.timestamp) return false;

  const consentDate = new Date(preferences.timestamp);
  const now = new Date();
  const daysSinceConsent =
    (now.getTime() - consentDate.getTime()) / (1000 * 60 * 60 * 24);

  return daysSinceConsent < 365; // Valid for 1 year
}
