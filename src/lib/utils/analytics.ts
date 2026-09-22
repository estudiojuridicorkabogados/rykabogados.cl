/**
 * The site's whole signal vocabulary.
 *
 * Every `rk_*` event the site can send is named here, and every one of them
 * goes out through `trackEvent`. One file rather than a helper per feature, so
 * that a new signal has to be added to the union below before it can be fired —
 * which is what stops a second, inconsistent naming scheme appearing later.
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
 * Those four names are load-bearing: the Ads tags in the container trigger on
 * them, so renaming one silently stops a live conversion. Everything else here
 * is new and reaches Analytics through the single `rk_.*` forwarding rule built
 * in phase 4. See docs/tracking-events.md.
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

/* -------------------------------------------------------------------------- */
/* Labels                                                                      */
/* -------------------------------------------------------------------------- */

/**
 * What kind of page the visitor is on. Registered as a custom dimension in
 * Analytics, so the values are a closed set on purpose — a free-form string
 * here becomes an unusable high-cardinality dimension there.
 */
export type PageType =
  | "home"
  | "landing_trabajadores"
  | "landing_empresas"
  | "asesoria_trabajadores"
  | "asesoria_empresas"
  | "otras_areas"
  | "contacto"
  | "nosotros"
  | "faqs"
  | "blog_index"
  | "blog_post"
  | "legal"
  | "other";

export type FormName = "trabajadores" | "empresas" | "contacto";

/** Where on the page the visitor acted. */
export type TrackLocation =
  | "hero"
  | "slogan"
  | "navbar"
  | "footer"
  | "contact_section"
  | "contact_page"
  | "faqs"
  | "blog_post"
  | "team_grid"
  | "chatbot"
  | "about_section"
  | "team_section";

export type ScrollDepth = 25 | 50 | 75 | 100;

/* -------------------------------------------------------------------------- */
/* Events                                                                      */
/* -------------------------------------------------------------------------- */

export type RkEvent =
  // Moving around the site
  | "rk_page_view"
  | "rk_scroll"
  // The three forms
  | "rk_form_view"
  | "rk_form_start"
  | "rk_form_step"
  | "rk_form_error"
  | "rk_form_submit"
  | "rk_form_fail"
  // Finishing — these four are the existing Ads conversions, names frozen
  | "rk_conv_contact_form"
  | "rk_conv_trabajadores_booking"
  | "rk_conv_empresas_booking"
  | "rk_conv_whatsapp"
  // Reaching the firm without a form
  | "rk_contact_click"
  | "rk_cta_click"
  // The chatbot
  | "rk_chat_open"
  | "rk_chat_first_message"
  | "rk_chat_message"
  | "rk_chat_handoff"
  | "rk_chat_lead"
  | "rk_chat_lead_fail"
  | "rk_chat_error";

interface UserDataPayload {
  email?: string;
  phone_number?: string;
}

export interface TrackPayload {
  form_name?: FormName;
  location?: TrackLocation;
  percent_scrolled?: ScrollDepth;
  /** rk_page_view: where the visitor came from, and whether this is the entry. */
  previous_page?: string;
  previous_page_type?: PageType;
  is_first_page?: boolean;
  /** rk_form_step: which step was just completed. */
  step?: number;
  /** rk_form_error: comma-separated field names that failed validation. */
  error_fields?: string;
  /** rk_form_fail: why the send did not go through. */
  fail_reason?: string;
  /** rk_chat_message: 1 for the first, 2 for the second, and so on. */
  message_number?: number;
  /** rk_cta_click: the button's own wording, for telling duplicates apart. */
  cta_label?: string;
  /** rk_contact_click */
  contact_method?: "phone" | "email";
  user_data?: UserDataPayload;
  conversion_value?: number;
  conversion_currency?: string;
}

/* -------------------------------------------------------------------------- */
/* Page type                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * Longest match first, because `/habla-con-nosotros/empresas` and
 * `/asesoria-empresas` are different pages that a loose `includes("empresas")`
 * would merge — which is exactly what useTracking does when picking a WhatsApp
 * message, and is tolerable there but would corrupt a report here.
 *
 * `/asesoria-empresas` is currently unreachable (next.config.ts redirects it to
 * the empresas landing page) but is mapped anyway: the redirect is a business
 * decision that may be reverted, and an unmapped path silently becomes "other".
 */
const PAGE_TYPES: ReadonlyArray<readonly [string, PageType]> = [
  ["/habla-con-nosotros/trabajadores", "landing_trabajadores"],
  ["/habla-con-nosotros/empresas", "landing_empresas"],
  ["/asesoria-trabajadores", "asesoria_trabajadores"],
  ["/asesoria-empresas", "asesoria_empresas"],
  ["/politicas-de-privacidad", "legal"],
  ["/politica-cookies", "legal"],
  ["/otras-areas", "otras_areas"],
  ["/contacto", "contacto"],
  ["/nosotros", "nosotros"],
  ["/faqs", "faqs"],
];

export function pageTypeFromPathname(pathname: string): PageType {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;

  if (path === "/") return "home";
  if (path === "/blog") return "blog_index";
  if (path.startsWith("/blog/")) return "blog_post";

  for (const [prefix, pageType] of PAGE_TYPES) {
    if (path === prefix || path.startsWith(`${prefix}/`)) {
      return pageType;
    }
  }

  return "other";
}

function currentPageType(): PageType {
  if (typeof window === "undefined") return "other";

  return pageTypeFromPathname(window.location.pathname);
}

/* -------------------------------------------------------------------------- */
/* Fire-once bookkeeping                                                       */
/* -------------------------------------------------------------------------- */

/**
 * Signals that mean "the first time this happened on this page" — a scroll
 * mark, a form coming into view, a form being started. The site never reloads
 * between pages, so nothing clears these for us; PageViewTracker calls
 * `resetPageScope` on every navigation instead.
 */
let firedOnThisPage = new Set<string>();

export function onceOnThisPage(key: string): boolean {
  if (firedOnThisPage.has(key)) return false;

  firedOnThisPage.add(key);
  return true;
}

export function resetPageScope(): void {
  firedOnThisPage = new Set<string>();
}

/* -------------------------------------------------------------------------- */
/* The push                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Safe to call before GTM has loaded. DeferredGoogleTagManager creates
 * `window.dataLayer` at hydration and the container replays whatever is already
 * in the array when it initialises, so an early push is queued rather than
 * dropped — which matters because the container's own load trigger is the
 * visitor's first scroll, the same gesture that produces our first rk_scroll.
 */
export function trackEvent(event: RkEvent, payload?: TrackPayload): void {
  if (typeof window === "undefined") {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event,
    page_type: currentPageType(),
    ...payload,
  });
}

/* -------------------------------------------------------------------------- */
/* Conversions                                                                 */
/* -------------------------------------------------------------------------- */

export interface ConversionUserData {
  email?: string;
  phone?: string;
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

export function buildUserData(
  userData?: ConversionUserData
): UserDataPayload | undefined {
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

function pushConversion(
  event: RkEvent,
  userData?: ConversionUserData,
  payload?: TrackPayload
) {
  const user_data = buildUserData(userData);

  trackEvent(event, {
    conversion_value: CONVERSION_VALUE,
    conversion_currency: CONVERSION_CURRENCY,
    ...payload,
    ...(user_data && { user_data }),
  });
}

export function trackContactFormSubmission(userData?: ConversionUserData) {
  pushConversion("rk_conv_contact_form", userData, { form_name: "contacto" });
}

/**
 * `location` is optional only until every WhatsappLink call site passes one.
 * Once it is threaded through the component's required prop it becomes
 * required here too, so an untagged WhatsApp click cannot be added later.
 */
export function trackWhatsappConversion(location?: TrackLocation) {
  pushConversion("rk_conv_whatsapp", undefined, { location });
}

export function trackEmpresasBookACallFormConversion(
  userData?: ConversionUserData
) {
  pushConversion("rk_conv_empresas_booking", userData, {
    form_name: "empresas",
  });
}

export function trackTrabajadoresBookACallFormConversion(
  userData?: ConversionUserData
) {
  pushConversion("rk_conv_trabajadores_booking", userData, {
    form_name: "trabajadores",
  });
}
