import { afterEach, beforeEach, describe, expect, test } from "bun:test";

import {
  createDefaultPreferences,
  getCookieConsent,
  isConsentValid,
} from "../utils";

/**
 * These read document.cookie at call time rather than at import, so a pair of
 * stub globals is enough — no DOM environment needed.
 */
const realWindow = globalThis.window;
const realDocument = globalThis.document;

function withCookie(cookie: string) {
  // @ts-expect-error -- stubbing the two globals the module actually touches
  globalThis.window = { location: { protocol: "https:" } };
  // @ts-expect-error -- ditto
  globalThis.document = { cookie };
}

beforeEach(() => withCookie(""));

afterEach(() => {
  // @ts-expect-error -- restoring whatever was there, including undefined
  globalThis.window = realWindow;
  // @ts-expect-error -- ditto
  globalThis.document = realDocument;
});

function store(record: object): void {
  withCookie(`cookie-consent=${encodeURIComponent(JSON.stringify(record))}`);
}

describe("getCookieConsent", () => {
  test("reads a current record", () => {
    store(createDefaultPreferences({ analytics: true, advertising: true }));

    const preferences = getCookieConsent();

    expect(preferences?.analytics).toBe(true);
    expect(preferences?.advertising).toBe(true);
    expect(preferences?.version).toBe(2);
  });

  /**
   * The rule that matters for the upgrade: a record written before the
   * advertising category existed has no such key, and must read as declined
   * rather than as undefined leaking through three call sites.
   */
  test("a record from before the advertising category reads as declined", () => {
    store({ necessary: true, analytics: true, timestamp: "2025-10-17" });

    const preferences = getCookieConsent();

    expect(preferences?.analytics).toBe(true);
    expect(preferences?.advertising).toBe(false);
    expect(preferences?.version).toBe(1);
  });

  test("a truthy-but-not-true value is not consent", () => {
    store({ analytics: "yes", advertising: 1, timestamp: "2025-10-17" });

    const preferences = getCookieConsent();

    expect(preferences?.analytics).toBe(false);
    expect(preferences?.advertising).toBe(false);
  });

  test("necessary is always true, whatever the cookie claims", () => {
    store({ necessary: false, analytics: false, timestamp: "2025-10-17" });

    expect(getCookieConsent()?.necessary).toBe(true);
  });

  test("malformed JSON is no consent, not a throw", () => {
    withCookie("cookie-consent=not%20json");

    expect(getCookieConsent()).toBeNull();
  });

  test("a record with no timestamp is not a record", () => {
    store({ necessary: true, analytics: true });

    expect(getCookieConsent()).toBeNull();
  });

  test("no cookie at all", () => {
    expect(getCookieConsent()).toBeNull();
  });

  test("finds its cookie among others", () => {
    const record = encodeURIComponent(
      JSON.stringify(createDefaultPreferences({ advertising: true }))
    );
    withCookie(`_ga=GA1.1.x; cookie-consent=${record}; _gcl_au=1.1.y`);

    expect(getCookieConsent()?.advertising).toBe(true);
  });
});

describe("createDefaultPreferences", () => {
  test("declines both categories when asked for nothing", () => {
    const preferences = createDefaultPreferences();

    expect(preferences.analytics).toBe(false);
    expect(preferences.advertising).toBe(false);
    expect(preferences.necessary).toBe(true);
  });

  test("an omitted key is a decline, not an accept", () => {
    const preferences = createDefaultPreferences({ analytics: true });

    expect(preferences.analytics).toBe(true);
    expect(preferences.advertising).toBe(false);
  });
});

describe("isConsentValid", () => {
  test("a fresh record is valid", () => {
    expect(isConsentValid(createDefaultPreferences())).toBe(true);
  });

  test("an acceptance older than a year is not", () => {
    const old = createDefaultPreferences({ analytics: true });
    old.timestamp = new Date(Date.now() - 400 * 86_400_000).toISOString();

    expect(isConsentValid(old)).toBe(false);
  });

  /**
   * A refusal is kept for thirty days rather than a year, so the banner asks
   * again in a month. Deliberately not a day: see REJECTION_MAX_AGE.
   */
  test("a refusal lapses after thirty days so the visitor is asked again", () => {
    const refusal = createDefaultPreferences();
    refusal.timestamp = new Date(Date.now() - 31 * 86_400_000).toISOString();

    expect(isConsentValid(refusal)).toBe(false);
  });

  test("a refusal still stands inside the thirty days", () => {
    const refusal = createDefaultPreferences();
    refusal.timestamp = new Date(Date.now() - 20 * 86_400_000).toISOString();

    expect(isConsentValid(refusal)).toBe(true);
  });

  test("an acceptance of the same age is untouched by the refusal window", () => {
    const accepted = createDefaultPreferences({ analytics: true });
    accepted.timestamp = new Date(Date.now() - 90 * 86_400_000).toISOString();

    expect(isConsentValid(accepted)).toBe(true);
  });

  /**
   * Granting one category and refusing the other is an answer, not a refusal.
   * They engaged with the question, so it keeps the full year.
   */
  test("a partial choice is not a refusal", () => {
    const partial = createDefaultPreferences({ analytics: true });
    partial.timestamp = new Date(Date.now() - 60 * 86_400_000).toISOString();

    expect(isConsentValid(partial)).toBe(true);
  });

  test("null is not consent", () => {
    expect(isConsentValid(null)).toBe(false);
  });

  /**
   * REPROMPT_BELOW_VERSION is 0 today, so a version 1 record still counts.
   * If the firm decides those visitors must choose again, raising it to 2 is
   * the whole change — and this test is what says so out loud.
   */
  test("version 1 records are still honoured while the constant is 0", () => {
    const legacy = {
      ...createDefaultPreferences({ analytics: true }),
      version: 1,
    };

    expect(isConsentValid(legacy)).toBe(true);
  });
});
