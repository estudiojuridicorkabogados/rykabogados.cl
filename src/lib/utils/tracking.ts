import {
  FirstTouch,
  readCampaignCookie,
  writeAttributionCookie,
} from "@/lib/utils/campaignParams";
import { hasAdvertisingConsent } from "@/lib/utils/consent";

/**
 * The Apps Script web app in front of the firm's Google Sheet. Set only in
 * Vercel production, so preview deployments and local runs write nothing to
 * the live log. Read straight from `process.env` rather than `@/lib/env` for
 * the same reason as `getCaptchaToken`: that module drags dotenv into the
 * browser bundle. Next inlines `NEXT_PUBLIC_*` at build time.
 */
const WEBAPP_URL = process.env.NEXT_PUBLIC_SHEET_WEBAPP_URL;
const DEFAULT_PHONE = "56986395780";
const DEFAULT_MSG =
  "¡Hola! Estaba revisando el sitio web y me gustaría que evalúen mi situación, por favor.";

export interface LogToSheetParams extends Partial<FirstTouch> {
  landing: string;
  /**
   * Last touch: the click reference of the most recent ad visit, whichever
   * name it arrived under. Stays `gclid` on the wire because the Apps Script
   * reads that name, and it is the one Ads can still attribute.
   */
  gclid: string;
  shortCode: string;
  channel: string;
  phone?: string;
  email?: string;
}

interface BuildWhatsAppUrlParams {
  shortCode: string;
  message?: string;
}

const CASO_COOKIE = "rk_caso";
const LEGACY_CASO_STORAGE = "am_short_code";

function mintCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

/**
 * The Caso code for this visitor: the reference quoted in the WhatsApp
 * message, the booking and chatbot emails, and the Google Sheet row.
 *
 * It lived in sessionStorage, which is wiped when the tab closes. Someone who
 * clicks an ad on Monday, thinks it over and books on Wednesday arrived as a
 * different person with a different code, and the two halves of that story
 * could never be joined. A ninety-day cookie — the same window the campaign
 * cookies use — keeps one visitor to one code.
 *
 * sessionStorage is still read first so that anyone mid-visit when this ships
 * keeps the code they may already have pasted into WhatsApp.
 *
 * Since phase 3 it needs advertising consent, because it is exactly what the
 * advertising category describes: a ninety-day identifier whose only purpose
 * is to join a conversation to the campaign that produced it. Without consent
 * the caller gets an empty string, and everything downstream already copes —
 * buildWhatsAppUrl drops the "Caso:" line, and the Sheet row is still written,
 * with no code and no campaign against it. The firm still gets the enquiry;
 * they just cannot trace it back to an ad.
 */
export function getSessionCode(): string {
  if (typeof window === "undefined") {
    // Fallback for SSR - generate a temporary code
    return mintCode();
  }

  try {
    const fromCookie = readCampaignCookie(CASO_COOKIE);
    if (fromCookie) return fromCookie;

    // Checked after the read, deliberately: a visitor who consented, was
    // issued a code, and later withdrew keeps quoting the code they may
    // already have sent on WhatsApp. Withdrawal stops new identifiers; it
    // does not invalidate a reference the firm is mid-conversation about.
    if (!hasAdvertisingConsent()) return "";

    // Read once, for continuity: a visitor mid-visit when this ships keeps the
    // code they may already have pasted into WhatsApp. Nothing writes back to
    // sessionStorage — the cookie is the record now.
    const code = sessionStorage.getItem(LEGACY_CASO_STORAGE) || mintCode();

    writeAttributionCookie(CASO_COOKIE, code);

    return code;
  } catch (e) {
    console.error("Error getting session code:", e);
    // Fallback if neither cookies nor sessionStorage are available
    return mintCode();
  }
}

/**
 * The landing URL with its query string removed.
 *
 * Without advertising consent the row must carry no campaign, and the click
 * reference is gated upstream — but the caller passes `window.location.href`
 * as the landing page, and on the landing page itself that still has
 * `?gclid=` in it. The whole query goes rather than a list of known names:
 * `fbclid`, `msclkid`, `ttclid` and whatever comes next are click identifiers
 * too, and a list is only ever as complete as the last time someone looked.
 * Nothing on this site routes on a query parameter, so the path is the part
 * the firm reads and the part that survives.
 */
function withoutQuery(landing: string): string {
  try {
    const url = new URL(landing);
    url.search = "";
    return url.toString();
  } catch {
    return landing;
  }
}

/**
 * Writes one row to the Google Sheet through its Apps Script web app.
 *
 * The first-touch fields (`ft_*`) are what make a row from an Instagram,
 * newsletter or organic visitor say anything about where they came from. The
 * click reference alone only ever described Google Ads visits, so every other
 * conversation arrived with a Caso code and no campaign next to it. Unknown
 * parameters are ignored by Apps Script, so sending them ahead of the script
 * reading them is harmless; docs/tracking-events.md lists the columns.
 *
 * Without advertising consent the row is still written, with the enquiry and
 * nothing that ties it to a campaign: the click reference and first touch
 * arrive empty from useTracking, the Caso code from getSessionCode, and the
 * landing URL is stripped of its query string here.
 */
export function logToSheet({
  landing,
  gclid,
  shortCode,
  channel,
  phone = "",
  email = "",
  ...firstTouch
}: LogToSheetParams): void {
  if (!WEBAPP_URL || typeof window === "undefined") {
    return;
  }

  const params = new URLSearchParams({
    landing: hasAdvertisingConsent() ? landing : withoutQuery(landing),
    gclid,
    code: shortCode,
    channel: channel || "unknown",
    phone,
    email,
    ...firstTouch,
    cb: String(Date.now()),
  });

  fetch(`${WEBAPP_URL}?${params}`).catch(() => {
    console.error("Error logging to sheet");
  });
}

/**
 * Build WhatsApp URL with the Caso code in the message, when there is one.
 */
export function buildWhatsAppUrl({
  shortCode,
  message,
}: BuildWhatsAppUrlParams): string {
  const baseMsg = message ?? DEFAULT_MSG;
  const msg = shortCode ? `${baseMsg}\nCaso: ${shortCode}` : baseMsg;

  return (
    "https://api.whatsapp.com/send?phone=" +
    encodeURIComponent(DEFAULT_PHONE) +
    "&type=phone_number&app_absent=0&text=" +
    encodeURIComponent(msg)
  );
}
