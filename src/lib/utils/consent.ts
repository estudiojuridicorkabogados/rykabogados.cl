/**
 * Google Consent Mode v2: the visitor's cookie choice, in the form Google
 * understands.
 *
 * This is the only file that issues gtag commands. `src/lib/utils/analytics.ts`
 * is the only file that pushes `rk_*` events, and the bootstrap snippet below
 * is the only thing that touches `window.dataLayer` before hydration. Nothing
 * else writes to it. See docs/tracking-events.md.
 *
 * Two things about this site make the implementation less obvious than the
 * usual recipe.
 *
 * First, `window.gtag` does not exist here. The Google tag (AW-11083927345) is
 * loaded *through* GTM, which keeps the gtag API internal, so there is no
 * `gtag()` to call — consent commands have to be pushed onto the dataLayer
 * ourselves, in the shape gtag.js would have pushed them.
 *
 * Second, that shape is an `arguments` object, not an array. GTM tells a
 * *command* from a *data push* by checking `arguments`-ness, so
 * `dataLayer.push(["consent", "default", {...}])` with a real array is merged
 * into the data model and silently ignored as a command. Nothing throws,
 * nothing logs, and Tag Assistant simply shows no consent state. Rest
 * parameters (`...args`) build an Array too, so `gtag` below has to be a
 * non-arrow function reaching for `arguments`.
 */

/** The seven storage types Consent Mode v2 defines. */
export interface ConsentModeState {
  ad_storage: ConsentValue;
  ad_user_data: ConsentValue;
  ad_personalization: ConsentValue;
  analytics_storage: ConsentValue;
  functionality_storage: ConsentValue;
  personalization_storage: ConsentValue;
  security_storage: ConsentValue;
}

export type ConsentValue = "granted" | "denied";

/** The two categories the banner actually asks about. */
export interface ConsentChoices {
  analytics: boolean;
  advertising: boolean;
}

/** The subset a visitor's choice can move. The other three never change. */
type MutableConsentState = Pick<
  ConsentModeState,
  "ad_storage" | "ad_user_data" | "ad_personalization" | "analytics_storage"
>;

type GtagCommand =
  | ["consent", "default", ConsentModeState]
  | ["consent", "update", MutableConsentState]
  | ["set", "url_passthrough" | "ads_data_redaction", boolean];

/**
 * The cookie the banner writes. Declared here rather than in the CookieConsent
 * component because two things read it and only one of them is React: the
 * provider, and the pre-hydration snippet below.
 */
export const CONSENT_COOKIE_NAME = "cookie-consent";

/**
 * Records below this version are treated as no consent at all: the banner
 * comes back, Google is told nothing was granted, and none of the site's own
 * advertising cookies are written.
 *
 * Set to 0, so nothing is re-prompted: a visitor who accepted "analytics"
 * before the advertising category existed keeps that, and reads as having
 * declined advertising. Whether that is enough, or whether they must make a
 * fresh affirmative choice now that advertising is a separate decision, is a
 * legal judgement for the firm rather than ours. Raise this to 2 when they
 * answer; nothing else needs to change.
 *
 * It lives here rather than in the CookieConsent component because three
 * readers have to agree on it: `isConsentValid` (the banner), `readStoredChoices`
 * below (the site's own cookies and the fallback default), and the bootstrap
 * snippet (the Consent Mode default). A gate that only the banner applied left
 * the other two granting what the UI was treating as un-consented.
 */
export const REPROMPT_BELOW_VERSION = 0;

/** A record with no `version` predates the advertising category. */
export const LEGACY_CONSENT_VERSION = 1;

/**
 * Marks the defaults as sent, so the snippet and `ensureConsentDefaults` can
 * both run without double-pushing. Whichever gets there first wins.
 */
const CONSENT_READY_FLAG = "__rkConsentDefaults";

function grant(allowed: boolean): ConsentValue {
  return allowed ? "granted" : "denied";
}

/**
 * The category-to-storage-type mapping, in one place.
 *
 * All seven types are declared, including the three no choice moves. An
 * *undeclared* type behaves as granted, which is the trap: listing only the
 * four the banner controls would leave the rest silently permissive.
 *
 * `functionality_storage` and `security_storage` are what the banner already
 * calls "necesarias" — the consent cookie itself, and reCAPTCHA's fraud
 * signal on the three form pages. `personalization_storage` covers
 * personalised *content*, which this site does not do, so denying it is both
 * truthful and the conservative reading.
 */
export function consentStateFrom(choices: ConsentChoices): ConsentModeState {
  return {
    ad_storage: grant(choices.advertising),
    ad_user_data: grant(choices.advertising),
    ad_personalization: grant(choices.advertising),
    analytics_storage: grant(choices.analytics),
    functionality_storage: "granted",
    personalization_storage: "denied",
    security_storage: "granted",
  };
}

const gtag: (...command: GtagCommand) => void = function () {
  window.dataLayer = window.dataLayer || [];
  // oxlint-disable-next-line prefer-rest-params -- GTM reads the arguments
  // object itself; an array is not a command. See the file header.
  window.dataLayer.push(arguments);
};

/**
 * Reads the stored choice without React.
 *
 * `analytics.ts` and the snippet are both framework-free and both need this,
 * so it cannot come from the provider's context.
 *
 * `repromptBelow` is a parameter only so the version gate can be tested
 * without editing the constant; callers never pass it.
 */
export function readStoredChoices(
  repromptBelow: number = REPROMPT_BELOW_VERSION
): ConsentChoices {
  const denied: ConsentChoices = { analytics: false, advertising: false };

  if (typeof document === "undefined") {
    return denied;
  }

  try {
    const match = document.cookie.match(
      new RegExp(`(?:^|; )${CONSENT_COOKIE_NAME}=([^;]*)`)
    );
    if (!match) return denied;

    const stored: unknown = JSON.parse(decodeURIComponent(match[1]));
    if (typeof stored !== "object" || stored === null) return denied;

    const value = stored as Record<string, unknown>;

    // A record from a shape the firm has decided to ask about again grants
    // nothing, however it reads. Same rule in isConsentValid and the snippet.
    const version =
      typeof value.version === "number"
        ? value.version
        : LEGACY_CONSENT_VERSION;
    if (version < repromptBelow) return denied;

    // `=== true`, not truthiness: a record written before the advertising
    // category existed has no such key, and the spec is that it reads as
    // declined until the visitor chooses again. Mirrored in
    // normalizePreferences (src/components/CookieConsent/utils.ts) and in the
    // bootstrap snippet below — change all three together.
    return {
      analytics: value.analytics === true,
      advertising: value.advertising === true,
    };
  } catch {
    // Storage blocked, or a cookie we did not write. Denied is the safe read.
    return denied;
  }
}

/** Whether Google — and we — may write advertising identifiers. See step 6. */
export function hasAdvertisingConsent(): boolean {
  return readStoredChoices().advertising;
}

/**
 * The defaults, sent once per page load before anything can trigger a tag.
 *
 * Idempotent, and deliberately so: the snippet below normally gets here first,
 * and this exists as the fallback for when it cannot — a CSP added without a
 * hash, an extension that strips inline scripts. Called from
 * DeferredGoogleTagManager so that even then the container still has defaults
 * before its own bootstrap push.
 *
 * There is no `wait_for_update`. It exists for consent platforms that load
 * asynchronously and answer a beat later; this one reads the cookie
 * synchronously and sends the right default first time, so waiting would delay
 * every tag for every undecided visitor and buy nothing.
 *
 * No `region` targeting either: one global deny-by-default is stricter than
 * scoping to CL, and simpler to reason about.
 */
export function ensureConsentDefaults(): void {
  if (typeof window === "undefined") {
    return;
  }

  const flagged = window as unknown as Record<string, unknown>;
  if (flagged[CONSENT_READY_FLAG]) {
    return;
  }
  flagged[CONSENT_READY_FLAG] = 1;

  gtag("consent", "default", consentStateFrom(readStoredChoices()));
  gtag("set", "ads_data_redaction", true);
  gtag("set", "url_passthrough", true);
}

/**
 * The visitor has just chosen. Moves the four types a choice can move.
 *
 * Consent Mode does not replay: events already in the dataLayer went out under
 * whatever state was in force when GTM processed them. That is expected — the
 * landing page view of a first-time visitor is a cookieless ping, and only
 * what follows the choice carries an identifier.
 */
export function updateConsent(choices: ConsentChoices): void {
  if (typeof window === "undefined") {
    return;
  }

  const state = consentStateFrom(choices);

  gtag("consent", "update", {
    ad_storage: state.ad_storage,
    ad_user_data: state.ad_user_data,
    ad_personalization: state.ad_personalization,
    analytics_storage: state.analytics_storage,
  });
}

/**
 * The same thing again, as a string, for the root layout to inline.
 *
 * This is the copy that actually runs in production. It has to exist
 * separately because everything above is a module: it loads with the bundle,
 * after hydration, by which time PageViewTracker has already pushed
 * `rk_page_view`. GTM replays the dataLayer in order, and an undeclared
 * consent type behaves as granted, so a page view sitting at index 0 would be
 * processed unrestricted. Running before hydration is the only way the default
 * is guaranteed to be first.
 *
 * ES5 only — no optional chaining, no const — since it runs before any
 * polyfill. Kept in sync with consentStateFrom by a test
 * (src/lib/utils/__tests__/consent.test.ts) that executes this string and
 * compares the result, because two implementations of one rule drift.
 *
 * Written readably and collapsed once at module load. It ships in the HTML of
 * every page, so the indentation is worth removing; it is also parsed and
 * executed before the document continues, so what it costs is measurable
 * rather than arguable — `bun run perf:probe` is the harness, and
 * docs/consent-performance.md records what it actually measured.
 *
 * Every statement here is semicolon-terminated, so collapsing whitespace is
 * safe. The one significant space, in `(?:^|; )`, survives as a single space.
 *
 * Two things here look like style and are not. The strings are single-quoted
 * because this script ships twice: once as itself, and once backslash-escaped
 * inside the RSC flight payload, where every `"` becomes `\\"` and costs
 * three extra bytes. JSON does not escape `'`. And the granted/denied values
 * are hoisted into `a` and `d` rather than repeated as ternaries, which the
 * second copy would also have paid for four times over.
 */
function compact(source: string): string {
  return source.replace(/\s+/g, " ").trim();
}

/**
 * Exported as a builder so the version gate can be tested at a threshold
 * other than the live one. Production uses CONSENT_BOOTSTRAP_SNIPPET.
 */
export function buildConsentBootstrapSnippet(repromptBelow: number): string {
  return compact(`
(function () {
  var w = window;
  if (w.${CONSENT_READY_FLAG}) return;
  w.${CONSENT_READY_FLAG} = 1;
  w.dataLayer = w.dataLayer || [];
  function g() { w.dataLayer.push(arguments); }
  var a = 'denied', d = 'denied';
  try {
    var m = document.cookie.match(/(?:^|; )${CONSENT_COOKIE_NAME}=([^;]*)/);
    if (m) {
      var p = JSON.parse(decodeURIComponent(m[1]));
      var v = typeof p.version === 'number' ? p.version : ${LEGACY_CONSENT_VERSION};
      if (v >= ${repromptBelow}) {
        if (p.analytics === true) a = 'granted';
        if (p.advertising === true) d = 'granted';
      }
    }
  } catch (e) {}
  g('consent', 'default', {
    ad_storage: d,
    ad_user_data: d,
    ad_personalization: d,
    analytics_storage: a,
    functionality_storage: 'granted',
    personalization_storage: 'denied',
    security_storage: 'granted'
  });
  g('set', 'ads_data_redaction', true);
  g('set', 'url_passthrough', true);
})();
`);
}

export const CONSENT_BOOTSTRAP_SNIPPET = buildConsentBootstrapSnippet(
  REPROMPT_BELOW_VERSION
);
