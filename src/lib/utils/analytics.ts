const BASE_CONVERSION_ID = "AW-11083927345";

const CONTACT_FORM_CONVERSION_ID = "yTHYCP_x0MobELGenaUp";
const WHATSAPP_CONVERSION_ID = "yTHYCP_x0MobELGenaUp";
const EMPRESAS_BOOK_A_CALL_CONVERSION_ID = "yTHYCP_x0MobELGenaUp";
const TRABAJADORES_BOOK_A_CALL_CONVERSION_ID = "yTHYCP_x0MobELGenaUp";

function trackConversion(sendToId: string) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", "conversion", {
      send_to: `${BASE_CONVERSION_ID}/${sendToId}`,
    });
  }
}

export function trackContactFormSubmission() {
  trackConversion(CONTACT_FORM_CONVERSION_ID);
}

export function trackWhatsappConversion() {
  trackConversion(WHATSAPP_CONVERSION_ID);
}

export function trackEmpresasBookACallFormConversion() {
  trackConversion(EMPRESAS_BOOK_A_CALL_CONVERSION_ID);
}

export function trackTrabajadoresBookACallFormConversion() {
  trackConversion(TRABAJADORES_BOOK_A_CALL_CONVERSION_ID);
}
