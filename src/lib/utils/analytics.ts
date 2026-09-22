/**
 * Conversion tracking.
 *
 * These push custom events to the GTM dataLayer; the Google Ads conversion
 * tags themselves live in GTM container GTM-PC49T6MC. `window.gtag` is NOT
 * available on this site — the Google tag (AW-11083927345) is loaded through
 * GTM, which keeps the gtag API internal — so calling gtag directly is a
 * silent no-op.
 *
 * dataLayer event            -> Google Ads conversion label (AW-11083927345)
 * rk_conv_contact_form       -> _AbcCMzlkfIcELGenaUp  (Formulario RK)
 * rk_conv_whatsapp           -> GhpoCLOFkvIcELGenaUp  (Clic WhatsApp)
 * rk_conv_empresas_booking   -> tfBhCLX2nPMcELGenaUp  (Formulario Empresa)
 * rk_conv_trabajadores_booking -> KGx4CMKMpfMcELGenaUp (Formulario Trabajadores)
 *
 * The form events also carry `user_data` for enhanced conversions. GTM's
 * User-Provided Data tag hashes it before anything leaves the browser; the
 * raw values never reach Google. Verified against production on 22 September
 * 2026: the conversion ping carries `em.<hash>~pn.<hash>`.
 *
 * Email and phone only. Names were sent until that date and silently
 * discarded — GTM's User-Provided Data variable takes first and last name
 * under Address, beside street, city, postal code and country, and Google
 * gets little from a name with nothing to anchor it. These forms collect no
 * address, so the names were raw PII sitting in `window.dataLayer`, readable
 * by every other tag in the container, in exchange for nothing.
 *
 * `conversion_value` is pushed but not read: all four GTM tags send a flat
 * 1000 CLP whatever arrives here. Left in place as the hook for real per-
 * conversion values, which belong in the Ads conversion action rather than
 * the tag.
 */

const CONVERSION_VALUE = 1.0;
const CONVERSION_CURRENCY = "CLP";

export interface ConversionUserData {
  email?: string;
  phone?: string;
}

interface UserDataPayload {
  email?: string;
  phone_number?: string;
}

function normalizeEmail(email?: string) {
  return email?.trim().toLowerCase() || undefined;
}

/**
 * Google matches on E.164. Chilean numbers get typed every which way —
 * "9 8639 5780", "+56 9 8639 5780", "986395780" — so keep the digits and
 * prepend +56 when it's a local 9-digit number.
 *
 * Anything that doesn't resolve to a plausible number is dropped rather than
 * guessed at: the form only checks length 7-15, so typos get through, and a
 * fabricated number can't match anyone. It also makes the User-Provided Data
 * tag fail, which takes the valid email down with it.
 */
function normalizePhone(phone?: string) {
  const raw = phone?.trim();
  const digits = raw?.replace(/\D/g, "");

  if (!raw || !digits) {
    return undefined;
  }

  // Typed with a country code — trust it, within E.164's own bounds.
  if (raw.startsWith("+")) {
    return digits.length >= 8 && digits.length <= 15 ? `+${digits}` : undefined;
  }

  // Chilean national numbers are 9 digits, with or without the country code.
  if (digits.length === 9) {
    return `+56${digits}`;
  }

  if (digits.length === 11 && digits.startsWith("56")) {
    return `+${digits}`;
  }

  return undefined;
}

function buildUserData(userData?: ConversionUserData) {
  if (!userData) {
    return undefined;
  }

  const payload: UserDataPayload = {
    email: normalizeEmail(userData.email),
    phone_number: normalizePhone(userData.phone),
  };

  const hasValue = Object.values(payload).some(Boolean);

  return hasValue ? payload : undefined;
}

function pushConversion(event: string, userData?: ConversionUserData) {
  if (typeof window === "undefined") {
    return;
  }

  const user_data = buildUserData(userData);

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event,
    conversion_value: CONVERSION_VALUE,
    conversion_currency: CONVERSION_CURRENCY,
    ...(user_data && { user_data }),
  });
}

export function trackContactFormSubmission(userData?: ConversionUserData) {
  pushConversion("rk_conv_contact_form", userData);
}

export function trackWhatsappConversion() {
  pushConversion("rk_conv_whatsapp");
}

export function trackEmpresasBookACallFormConversion(
  userData?: ConversionUserData
) {
  pushConversion("rk_conv_empresas_booking", userData);
}

export function trackTrabajadoresBookACallFormConversion(
  userData?: ConversionUserData
) {
  pushConversion("rk_conv_trabajadores_booking", userData);
}
