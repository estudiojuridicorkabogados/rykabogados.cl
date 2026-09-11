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
 * raw values never reach Google. Nothing reads `user_data` until that tag is
 * pointed at these events in GTM.
 */

const CONVERSION_VALUE = 1.0;
const CONVERSION_CURRENCY = "CLP";

export interface ConversionUserData {
  name?: string;
  email?: string;
  phone?: string;
}

interface UserDataPayload {
  email?: string;
  phone_number?: string;
  first_name?: string;
  last_name?: string;
}

function normalizeEmail(email?: string) {
  return email?.trim().toLowerCase() || undefined;
}

/**
 * Google matches on E.164. Chilean numbers get typed every which way —
 * "9 8639 5780", "+56 9 8639 5780", "986395780" — so keep the digits and
 * prepend +56 unless a country code is already there. A local number is 9
 * digits, so only 11+ can carry one.
 */
function normalizePhone(phone?: string) {
  const digits = phone?.replace(/\D/g, "");

  if (!digits) {
    return undefined;
  }

  if (digits.length >= 11 && digits.startsWith("56")) {
    return `+${digits}`;
  }

  return `+56${digits.replace(/^0+/, "")}`;
}

function splitName(name?: string) {
  const parts = name?.trim().split(/\s+/).filter(Boolean) ?? [];

  if (parts.length === 0) {
    return {};
  }

  return {
    first_name: parts[0],
    last_name: parts.slice(1).join(" ") || undefined,
  };
}

function buildUserData(userData?: ConversionUserData) {
  if (!userData) {
    return undefined;
  }

  const payload: UserDataPayload = {
    email: normalizeEmail(userData.email),
    phone_number: normalizePhone(userData.phone),
    ...splitName(userData.name),
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
