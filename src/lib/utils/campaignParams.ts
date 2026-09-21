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

export const CAMPAIGN_PARAMS = [
  ...CLICK_ID_PARAMS,
  "utm_source",
  "utm_medium",
  "utm_campaign",
] as const;

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
