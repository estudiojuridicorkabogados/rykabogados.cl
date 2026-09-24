import { describe, expect, test } from "bun:test";

import {
  buildConsentBootstrapSnippet,
  CONSENT_BOOTSTRAP_SNIPPET,
  consentStateFrom,
  type ConsentChoices,
  readStoredChoices,
} from "../consent";

const COMBINATIONS: ConsentChoices[] = [
  { analytics: false, advertising: false },
  { analytics: true, advertising: false },
  { analytics: false, advertising: true },
  { analytics: true, advertising: true },
];

/** Runs the inline snippet against a stub window, returning what it pushed. */
function runSnippet(
  cookie: string,
  snippet: string = CONSENT_BOOTSTRAP_SNIPPET
): unknown[] {
  const stubWindow: { dataLayer: unknown[] } = { dataLayer: [] };

  new Function("window", "document", snippet)(stubWindow, { cookie });

  return stubWindow.dataLayer;
}

/** Points the module-level reader at a cookie string. */
function withDocumentCookie(cookie: string, run: () => void): void {
  const realDocument = globalThis.document;
  // @ts-expect-error -- stubbing the one global readStoredChoices touches
  globalThis.document = { cookie };
  try {
    run();
  } finally {
    // @ts-expect-error -- restoring whatever was there, including undefined
    globalThis.document = realDocument;
  }
}

function cookieFor(choices: ConsentChoices, extra: object = {}): string {
  const record = {
    necessary: true,
    analytics: choices.analytics,
    advertising: choices.advertising,
    timestamp: new Date().toISOString(),
    // The current shape. Raised with CONSENT_VERSION and
    // REPROMPT_BELOW_VERSION on 24 September 2026; a cookie below the gate is
    // denied, so leaving this at 2 would have quietly turned every test below
    // into a test of the re-prompt instead of what it says it checks.
    version: 3,
    ...extra,
  };

  return `cookie-consent=${encodeURIComponent(JSON.stringify(record))}`;
}

describe("consentStateFrom", () => {
  test("maps advertising onto all three ad types together", () => {
    const state = consentStateFrom({ analytics: false, advertising: true });

    expect(state.ad_storage).toBe("granted");
    expect(state.ad_user_data).toBe("granted");
    expect(state.ad_personalization).toBe("granted");
    expect(state.analytics_storage).toBe("denied");
  });

  test("declares all seven types, because an omitted one counts as granted", () => {
    const state = consentStateFrom({ analytics: false, advertising: false });

    expect(Object.keys(state).toSorted()).toEqual(
      [
        "ad_personalization",
        "ad_storage",
        "ad_user_data",
        "analytics_storage",
        "functionality_storage",
        "personalization_storage",
        "security_storage",
      ].toSorted()
    );
  });

  test("the three types no choice moves never move", () => {
    for (const choices of COMBINATIONS) {
      const state = consentStateFrom(choices);

      expect(state.functionality_storage).toBe("granted");
      expect(state.security_storage).toBe("granted");
      expect(state.personalization_storage).toBe("denied");
    }
  });
});

describe("CONSENT_BOOTSTRAP_SNIPPET", () => {
  /**
   * The snippet is a second implementation of consentStateFrom, written in
   * ES5 because it runs before hydration. Two implementations of one rule
   * drift, so this is the test that stops them.
   */
  test("agrees with consentStateFrom for every combination", () => {
    for (const choices of COMBINATIONS) {
      const [command] = runSnippet(cookieFor(choices)) as Array<
        [string, string, Record<string, string>]
      >;

      expect(command[0]).toBe("consent");
      expect(command[1]).toBe("default");
      expect({ ...command[2] }).toEqual({ ...consentStateFrom(choices) });
    }
  });

  test("the consent default is the first thing in the dataLayer", () => {
    const pushed = runSnippet("") as Array<[string, string]>;

    expect(pushed[0][0]).toBe("consent");
    expect(pushed[0][1]).toBe("default");
  });

  test("sets ads_data_redaction and url_passthrough", () => {
    const pushed = runSnippet("") as Array<[string, string, boolean]>;
    const sets = pushed.filter((command) => command[0] === "set");

    expect(sets).toHaveLength(2);
    expect(Object.fromEntries(sets.map((s) => [s[1], s[2]]))).toEqual({
      ads_data_redaction: true,
      url_passthrough: true,
    });
  });

  test("denies everything for a visitor who has not answered", () => {
    const [command] = runSnippet("") as Array<
      [string, string, Record<string, string>]
    >;

    expect({ ...command[2] }).toEqual({
      ...consentStateFrom({ analytics: false, advertising: false }),
    });
  });

  /**
   * A record written before phase 3 has no `advertising` key. It must read as
   * declined rather than as undefined-and-therefore-whatever.
   *
   * Read at a threshold of 0 rather than through the live constant, which has
   * been 3 since 24 September 2026 and denies such a record outright — the
   * test below. Two separate rules, and this one has to keep working on its
   * own: the missing key is what protects us if the gate is ever lowered.
   */
  test("a record from before the advertising category reads as declined", () => {
    const legacy = `cookie-consent=${encodeURIComponent(
      JSON.stringify({
        necessary: true,
        analytics: true,
        timestamp: "2025-10-17",
      })
    )}`;

    const [command] = runSnippet(
      legacy,
      buildConsentBootstrapSnippet(0)
    ) as Array<[string, string, Record<string, string>]>;

    expect(command[2].analytics_storage).toBe("granted");
    expect(command[2].ad_storage).toBe("denied");
    expect(command[2].ad_user_data).toBe("denied");
    expect(command[2].ad_personalization).toBe("denied");
  });

  /**
   * The live gate, as opposed to the parameterised ones below: everything
   * written before 24 September 2026 is asked again, version 2 records
   * included. The firm's answer to decision 4 of docs/client-brief.md.
   */
  test("the shipped snippet grants nothing for a version 2 record", () => {
    const [command] = runSnippet(
      cookieFor({ analytics: true, advertising: true }, { version: 2 })
    ) as Array<[string, string, Record<string, string>]>;

    expect({ ...command[2] }).toEqual({
      ...consentStateFrom({ analytics: false, advertising: false }),
    });
  });

  test("a truthy-but-not-true advertising value is still declined", () => {
    const [command] = runSnippet(
      cookieFor(
        { analytics: false, advertising: false },
        { advertising: "yes" }
      )
    ) as Array<[string, string, Record<string, string>]>;

    expect(command[2].ad_storage).toBe("denied");
  });

  test("survives a cookie it cannot parse", () => {
    const pushed = runSnippet("cookie-consent=not%20json%20at%20all");

    expect(pushed).toHaveLength(3);
    expect((pushed[0] as string[])[1]).toBe("default");
  });

  test("finds its cookie among others", () => {
    const [command] = runSnippet(
      `_ga=GA1.1.x; ${cookieFor({ analytics: true, advertising: true })}; other=1`
    ) as Array<[string, string, Record<string, string>]>;

    expect(command[2].ad_storage).toBe("granted");
  });

  test("runs once, so the fallback call cannot double-push", () => {
    const stubWindow: { dataLayer: unknown[] } = { dataLayer: [] };
    const document = { cookie: "" };

    new Function("window", "document", CONSENT_BOOTSTRAP_SNIPPET)(
      stubWindow,
      document
    );
    new Function("window", "document", CONSENT_BOOTSTRAP_SNIPPET)(
      stubWindow,
      document
    );

    expect(stubWindow.dataLayer).toHaveLength(3);
  });

  /**
   * REPROMPT_BELOW_VERSION has to bite here too, not only in the banner. When
   * it did not, raising it brought the banner back for a version 1 record
   * while this snippet went on sending the record's grants as the default —
   * Google was told yes by a visitor the UI was treating as un-asked.
   */
  test("a record below the re-prompt version grants nothing", () => {
    const legacy = `cookie-consent=${encodeURIComponent(
      JSON.stringify({
        necessary: true,
        analytics: true,
        timestamp: "2025-10-17",
      })
    )}`;

    const [command] = runSnippet(
      legacy,
      buildConsentBootstrapSnippet(2)
    ) as Array<[string, string, Record<string, string>]>;

    expect({ ...command[2] }).toEqual({
      ...consentStateFrom({ analytics: false, advertising: false }),
    });
  });

  test("a record at the re-prompt version still counts", () => {
    const [command] = runSnippet(
      cookieFor({ analytics: true, advertising: true }),
      buildConsentBootstrapSnippet(2)
    ) as Array<[string, string, Record<string, string>]>;

    expect(command[2].analytics_storage).toBe("granted");
    expect(command[2].ad_storage).toBe("granted");
  });

  test("pushes an arguments object, not an array — GTM checks", () => {
    const [command] = runSnippet("");

    // The whole mechanism hinges on this: a literal array is merged into the
    // data model and silently ignored as a command.
    expect(Array.isArray(command)).toBe(false);
    expect(Object.prototype.toString.call(command)).toBe("[object Arguments]");
  });
});

describe("readStoredChoices", () => {
  test("reads a current record", () => {
    withDocumentCookie(
      cookieFor({ analytics: true, advertising: false }),
      () => {
        expect(readStoredChoices()).toEqual({
          analytics: true,
          advertising: false,
        });
      }
    );
  });

  test("no cookie is denied", () => {
    withDocumentCookie("", () => {
      expect(readStoredChoices()).toEqual({
        analytics: false,
        advertising: false,
      });
    });
  });

  /**
   * The same gate the snippet applies, in the reader the site's own cookies
   * and the fallback default go through. Without it, `hasAdvertisingConsent`
   * kept minting Caso codes for a record the banner had stopped honouring.
   */
  test("a record below the re-prompt version is denied", () => {
    const legacy = `cookie-consent=${encodeURIComponent(
      JSON.stringify({
        necessary: true,
        analytics: true,
        timestamp: "2025-10-17",
      })
    )}`;

    withDocumentCookie(legacy, () => {
      expect(readStoredChoices(2)).toEqual({
        analytics: false,
        advertising: false,
      });
      expect(readStoredChoices(0).analytics).toBe(true);
    });
  });

  test("agrees with the snippet for every combination", () => {
    for (const choices of COMBINATIONS) {
      withDocumentCookie(cookieFor(choices), () => {
        const [command] = runSnippet(cookieFor(choices)) as Array<
          [string, string, Record<string, string>]
        >;

        expect({ ...command[2] }).toEqual({
          ...consentStateFrom(readStoredChoices()),
        });
      });
    }
  });
});
