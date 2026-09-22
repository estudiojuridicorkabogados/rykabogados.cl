import {
  readCampaignCookie,
  writeAttributionCookie,
} from "@/lib/utils/campaignParams";

const WEBAPP_URL =
  "https://script.google.com/macros/s/AKfycbwdfIflbl-jPOw5j-ldCl_qumzoEDvC82njzKOf4ZiO6jQwvhnlWa4k1txCLQdzSjrnwA/exec";
const DEFAULT_PHONE = "56986395780";
const DEFAULT_MSG =
  "¡Hola! Estaba revisando el sitio web y me gustaría que evalúen mi situación, por favor.";

export interface LogToSheetParams {
  landing: string;
  gclid: string;
  shortCode: string;
  channel: string;
  phone?: string;
  email?: string;
}

interface BuildWhatsAppUrlParams {
  gclid: string;
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
 */
export function getSessionCode(): string {
  if (typeof window === "undefined") {
    // Fallback for SSR - generate a temporary code
    return mintCode();
  }

  try {
    const fromCookie = readCampaignCookie(CASO_COOKIE);
    if (fromCookie) return fromCookie;

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
 * Log tracking data to Google Sheets via WebApp
 */
export function logToSheet({
  landing,
  gclid,
  shortCode,
  channel,
  phone = "",
  email = "",
}: LogToSheetParams): void {
  if (!WEBAPP_URL || typeof window === "undefined") {
    return;
  }

  const url =
    WEBAPP_URL +
    `?landing=${encodeURIComponent(landing)}` +
    `&gclid=${encodeURIComponent(gclid)}` +
    `&code=${encodeURIComponent(shortCode)}` +
    `&channel=${encodeURIComponent(channel || "unknown")}` +
    `&phone=${encodeURIComponent(phone)}` +
    `&email=${encodeURIComponent(email)}` +
    `&cb=${Date.now()}`;

  fetch(url).catch(() => {
    console.error("Error logging to sheet");
  });
}

/**
 * Build WhatsApp URL with session code and gclid
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
