import { afterEach, beforeEach, describe, expect, test } from "bun:test";

import {
  ATTRIBUTION_COOKIES,
  clearAttributionCookies,
  readCampaignCookie,
  writeAttributionCookie,
} from "../campaignParams";

/**
 * A document.cookie that behaves like the real one for the two things these
 * helpers do: a write with Max-Age=0 removes the cookie, any other write
 * stores it, and a read returns the "name=value; name=value" join.
 */
function fakeCookieJar() {
  const jar = new Map<string, string>();

  return {
    get cookie() {
      return [...jar].map(([name, value]) => `${name}=${value}`).join("; ");
    },
    set cookie(header: string) {
      const [pair, ...attributes] = header.split("; ");
      const [name, value] = pair.split("=");
      const expired = attributes.some((a) => /^Max-Age=0$/i.test(a));

      if (expired) jar.delete(name);
      else jar.set(name, value);
    },
  };
}

const realWindow = globalThis.window;
const realDocument = globalThis.document;

beforeEach(() => {
  // @ts-expect-error -- stubbing the two globals the module touches
  globalThis.window = { location: { protocol: "https:" } };
  // @ts-expect-error -- ditto
  globalThis.document = fakeCookieJar();
});

afterEach(() => {
  // @ts-expect-error -- restoring whatever was there, including undefined
  globalThis.window = realWindow;
  // @ts-expect-error -- ditto
  globalThis.document = realDocument;
});

describe("clearAttributionCookies", () => {
  test("removes every attribution cookie the site writes", () => {
    for (const name of ATTRIBUTION_COOKIES) {
      writeAttributionCookie(name, `value-for-${name}`);
    }
    expect(readCampaignCookie("gclid")).toBe("value-for-gclid");
    expect(readCampaignCookie("rk_ft_ts")).toBe("value-for-rk_ft_ts");

    clearAttributionCookies();

    for (const name of ATTRIBUTION_COOKIES) {
      expect(readCampaignCookie(name)).toBe("");
    }
  });

  /**
   * The Caso code survives a withdrawal on purpose: the firm may be mid-
   * conversation about it. See getSessionCode.
   */
  test("leaves rk_caso and the consent record alone", () => {
    writeAttributionCookie("rk_caso", "ABC123");
    globalThis.document.cookie = "cookie-consent=%7B%7D; Max-Age=3600; Path=/";

    clearAttributionCookies();

    expect(readCampaignCookie("rk_caso")).toBe("ABC123");
    expect(readCampaignCookie("cookie-consent")).toBe("{}");
  });

  test("covers last touch, first touch and the three first-visit facts", () => {
    expect(ATTRIBUTION_COOKIES).toContain("gclid");
    expect(ATTRIBUTION_COOKIES).toContain("utm_term");
    expect(ATTRIBUTION_COOKIES).toContain("rk_ft_gclid");
    expect(ATTRIBUTION_COOKIES).toContain("rk_ft_utm_campaign");
    expect(ATTRIBUTION_COOKIES).toContain("rk_ft_landing");
    expect(ATTRIBUTION_COOKIES).toContain("rk_ft_referrer");
    expect(ATTRIBUTION_COOKIES).toContain("rk_ft_ts");
    expect(ATTRIBUTION_COOKIES).not.toContain("rk_caso");
  });
});
