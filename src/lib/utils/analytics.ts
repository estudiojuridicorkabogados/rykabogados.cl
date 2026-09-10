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
 */

const CONVERSION_VALUE = 1.0;
const CONVERSION_CURRENCY = "CLP";

function pushConversion(event: string) {
  if (typeof window === "undefined") {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event,
    conversion_value: CONVERSION_VALUE,
    conversion_currency: CONVERSION_CURRENCY,
  });
}

export function trackContactFormSubmission() {
  pushConversion("rk_conv_contact_form");
}

export function trackWhatsappConversion() {
  pushConversion("rk_conv_whatsapp");
}

export function trackEmpresasBookACallFormConversion() {
  pushConversion("rk_conv_empresas_booking");
}

export function trackTrabajadoresBookACallFormConversion() {
  pushConversion("rk_conv_trabajadores_booking");
}
