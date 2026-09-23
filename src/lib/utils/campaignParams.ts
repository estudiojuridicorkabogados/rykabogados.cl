/**
 * The URL parameters that mark a visit as coming from a campaign.
 *
 * `gclid` is the usual Google Ads click reference. `wbraid` and `gbraid` are
 * what Ads sends instead from iOS when tracking permissions are restricted —
 * the same click, a different name — and the `utm_*` trio covers everything
 * that is not Google Ads: Meta, email, partner links. GA4 reads the `utm_*`
 * ones for its own campaign attribution.
 *
 * One list serves two jobs, which is deliberate: these are exactly the visits
 * whose origin we persist (TrackingParamsCapture) and exactly the visits that
 * must not have their tags deferred (DeferredGoogleTagManager). Keeping two
 * near-identical lists is how they drift apart.
 *
 * The three click references are split out because they answer a narrower
 * question than the rest: not "where did this visit come from" but "which ad
 * click was this", which is the one useTracking needs to issue a Caso code.
 */
export const CLICK_ID_PARAMS = ["gclid", "wbraid", "gbraid"] as const;

export type ClickIdParam = (typeof CLICK_ID_PARAMS)[number];

/**
 * A click reference as the Sheet stores it: a `gclid` bare, a `wbraid` or
 * `gbraid` prefixed with its kind — `wbraid:…`, `gbraid:…`.
 *
 * All three share the Sheet's one `gclid` column, and nothing else in the row
 * says which one arrived. That did not matter while the column was only read
 * by people; it does once Google Ads imports case outcomes from it, because
 * the upload takes each kind in its own column and rejects a wbraid offered
 * as a gclid — so every iPhone visitor who became a client would fail to
 * upload. The prefix carries the kind without adding a column, which the
 * positional Apps Script could not take without a redeploy. The `Ads import`
 * tab splits on it. A bare value stays a gclid so the rows written before
 * 23 September 2026 still read correctly.
 */
export function formatClickIdForSheet(
  param: ClickIdParam,
  value: string
): string {
  return param === "gclid" ? value : `${param}:${value}`;
}

export const CAMPAIGN_PARAMS = [
  ...CLICK_ID_PARAMS,
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

/** Ninety days, which is also Google Ads' longest standard lookback. */
export const ATTRIBUTION_MAX_AGE = 90 * 86400;

/**
 * Prefix for the first-touch copies.
 *
 * The unprefixed cookies are last touch and are overwritten on every campaign
 * visit, because the click happening now is the one Ads should be told about.
 * These are written once and never again, so the campaign that first brought
 * someone is still there when they come back on a Wednesday and book. Both
 * readings are wanted; neither is a substitute for the other.
 */
export const FIRST_TOUCH_PREFIX = "rk_ft_";

/**
 * The first-touch record, as the Google Sheet receives it.
 *
 * Read at the moment a row is written rather than at mount: the cookies are
 * set by an effect after hydration, and a component that mounted before it
 * would otherwise carry an empty snapshot for the life of the page.
 *
 * Nothing is classified here — an organic Google visit arrives as an empty
 * `ft_source` and a `ft_referrer` of google.com, and the Apps Script behind
 * the Sheet is where that becomes "google / organic". Keeping the site to raw
 * values means a change of classification is a Sheet edit, not a release.
 */
export interface FirstTouch {
  ft_source: string;
  ft_medium: string;
  ft_campaign: string;
  ft_content: string;
  ft_term: string;
  ft_landing: string;
  ft_referrer: string;
  ft_ts: string;
}

function readFirstTouchCookie(key: string): string {
  return readCampaignCookie(`${FIRST_TOUCH_PREFIX}${key}`);
}

export function readFirstTouch(): FirstTouch {
  const ft = readFirstTouchCookie;

  return {
    ft_source: ft("utm_source"),
    ft_medium: ft("utm_medium"),
    ft_campaign: ft("utm_campaign"),
    ft_content: ft("utm_content"),
    ft_term: ft("utm_term"),
    ft_landing: ft("landing"),
    ft_referrer: ft("referrer"),
    ft_ts: ft("ts"),
  };
}

/**
 * Whether a landing URL's query string carries any campaign marker.
 *
 * Takes the search string rather than reading `window` so it stays a pure
 * function, and so callers decide when it is safe to touch the DOM.
 */
export function hasCampaignParam(search: string): boolean {
  try {
    const params = new URLSearchParams(search);
    return CAMPAIGN_PARAMS.some((param) => Boolean(params.get(param)));
  } catch {
    // Malformed query string — treat as ordinary traffic rather than throwing
    // inside an effect that has tag loading downstream of it.
    return false;
  }
}

/**
 * Writes a cookie that survives a tab closing.
 *
 * Not httpOnly and not meant to be: nothing reads these on the server, and the
 * whole point is that document.cookie can get at them. SameSite=Lax so a click
 * arriving from an ad still carries them.
 */
export function writeAttributionCookie(name: string, value: string): void {
  try {
    const secure = window.location.protocol === "https:" ? "; Secure" : "";

    document.cookie = `${name}=${encodeURIComponent(
      value
    )}; Max-Age=${ATTRIBUTION_MAX_AGE}; Path=/; SameSite=Lax${secure}`;
  } catch {
    // Storage disabled or blocked — tracking is best-effort, never fatal.
  }
}

/**
 * Every attribution cookie the site writes, so a withdrawal can find them all:
 * the last-touch campaign parameters, their first-touch copies, and the three
 * first-visit facts that carry no parameter name.
 */
const FIRST_TOUCH_EXTRAS = ["landing", "referrer", "ts"] as const;

export const ATTRIBUTION_COOKIES: readonly string[] = [
  ...CAMPAIGN_PARAMS,
  ...CAMPAIGN_PARAMS.map((param) => `${FIRST_TOUCH_PREFIX}${param}`),
  ...FIRST_TOUCH_EXTRAS.map((key) => `${FIRST_TOUCH_PREFIX}${key}`),
];

/**
 * Expires every attribution cookie. Called when advertising consent is
 * withdrawn, because these are the site's own marketing cookies and nothing
 * else — not Consent Mode, not the browser — would otherwise remove them
 * before their ninety days ran out.
 *
 * Path matches the write because a cookie is identified by name, domain and
 * path; Secure and SameSite are repeated for symmetry rather than necessity.
 * `rk_caso` is not in the list on purpose; see getSessionCode.
 */
export function clearAttributionCookies(): void {
  try {
    const secure = window.location.protocol === "https:" ? "; Secure" : "";

    for (const name of ATTRIBUTION_COOKIES) {
      document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax${secure}`;
    }
  } catch {
    // Storage disabled or blocked — nothing was written, so nothing to clear.
  }
}

/**
 * Reads back a parameter TrackingParamsCapture stored.
 *
 * Lives next to the write so the encoding stays symmetrical: the value went in
 * through encodeURIComponent and has to come back out through its inverse, or
 * a campaign name with a space in it returns mangled.
 */
export function readCampaignCookie(param: string): string {
  try {
    const match = document.cookie.match(new RegExp(`(?:^|; )${param}=([^;]+)`));
    return match ? decodeURIComponent(match[1]) : "";
  } catch {
    return "";
  }
}
