const WEBAPP_URL =
  "https://script.google.com/macros/s/AKfycbwlHFxYXHLOaBO7Ddgj5uv-W84HAuc1icLHafo-fYCEr4Gih_BQmmPY3Iqay1eaud_iKg/exec";
const DEFAULT_PHONE = "56986395780";
const DEFAULT_MSG =
  "¡Hola! Estaba revisando el sitio web y me gustaría que evalúen mi situación, por favor.";

interface LogToSheetParams {
  landing: string;
  gclid: string;
  shortCode: string;
  channel: string;
  phone?: string;
  email?: string;
}

interface BuildWhatsAppUrlParams {
  phone: string;
  baseText?: string;
  shortCode: string;
  gclid: string;
}

/**
 * Generate and store unique session code in sessionStorage
 * Returns existing code if already generated, otherwise creates new one
 */
export function getSessionCode(): string {
  if (typeof window === "undefined") {
    // Fallback for SSR - generate a temporary code
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  try {
    let code = sessionStorage.getItem("am_short_code");
    if (!code) {
      code = Math.random().toString(36).substring(2, 8).toUpperCase();
      sessionStorage.setItem("am_short_code", code);
    }
    return code;
  } catch (e) {
    console.error("Error getting session code:", e);
    // Fallback if sessionStorage is not available
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }
}

/**
 * Get gclid from URL query params or cookie
 */
export function getGclid(): string {
  if (typeof window === "undefined") {
    return "";
  }

  // First try URL query params
  const urlParams = new URLSearchParams(window.location.search);
  const urlGclid = urlParams.get("gclid");
  if (urlGclid) {
    return urlGclid;
  }

  // Then try cookie (set by middleware)
  try {
    const match = document.cookie.match(/(?:^|; )gclid=([^;]+)/);
    return match ? decodeURIComponent(match[1]) : "";
  } catch (e) {
    console.error("Error getting gclid:", e);
    return "";
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

  // Use Image pixel technique for GET request
  const img = new Image();
  img.src = url;

  console.log("📡 Log → Sheets", {
    landing,
    gclid,
    shortCode,
    channel,
    phone,
    email,
  });
}

/**
 * Build WhatsApp URL with session code and gclid
 */
export function buildWhatsAppUrl({
  phone,
  baseText,
  shortCode,
}: BuildWhatsAppUrlParams): string {
  let msg = baseText && baseText.trim() ? baseText.trim() : DEFAULT_MSG;

  // Append "Caso: {shortCode}" if not already present
  if (!/caso\s*:/i.test(msg)) {
    msg += "\nCaso: " + shortCode;
  }

  const finalPhone = phone || DEFAULT_PHONE;

  return (
    "https://api.whatsapp.com/send?phone=" +
    encodeURIComponent(finalPhone) +
    "&type=phone_number&app_absent=0&text=" +
    encodeURIComponent(msg)
  );
}

/**
 * Fire Google Ads conversion event
 */
export function fireConversion(sendTo?: string): void {
  if (typeof window === "undefined") {
    return;
  }

  const DEFAULT_SEND_TO = "AW-11083927345/yTHYCP_x0MobELGenaUp"; // From analytics.ts
  const conversionId = sendTo || DEFAULT_SEND_TO;

  if (typeof window.gtag === "function" && conversionId) {
    try {
      window.gtag("event", "conversion", {
        send_to: conversionId,
        value: 1.0,
        currency: "CLP",
      });
    } catch (e) {
      // Silent fail
      console.error("Error firing conversion:", e);
    }
  }
}
