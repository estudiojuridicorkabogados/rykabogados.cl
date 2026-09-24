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

import {
  ensureConsentDefaults,
  hasAdvertisingConsent,
} from "@/lib/utils/consent";

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

/**
 * Every signal the site can send, by name, in one place.
 *
 * Call sites reference these rather than spelling the string out. A typo in a
 * literal is a signal that silently never appears in any report — nothing
 * throws, nothing fails to build, and the funnel is simply missing a step
 * nobody notices for weeks. Referencing a constant makes that a compile error
 * instead, and makes a rename one edit rather than a search.
 *
 * The four `CONV_*` values are **load-bearing**: the Google Ads conversion
 * tags in container GTM-PC49T6MC trigger on these exact strings, so changing
 * one silently stops a live conversion. The keys can be renamed freely; the
 * values cannot.
 */
export const RK_EVENTS = {
  // Moving around the site
  PAGE_VIEW: "rk_page_view",
  SCROLL: "rk_scroll",

  // The three forms
  FORM_VIEW: "rk_form_view",
  FORM_START: "rk_form_start",
  FORM_STEP: "rk_form_step",
  FORM_ERROR: "rk_form_error",
  FORM_SUBMIT: "rk_form_submit",
  FORM_FAIL: "rk_form_fail",

  // Finishing — the existing Ads conversions. These four strings are frozen.
  CONV_CONTACT_FORM: "rk_conv_contact_form",
  CONV_TRABAJADORES_BOOKING: "rk_conv_trabajadores_booking",
  CONV_EMPRESAS_BOOKING: "rk_conv_empresas_booking",
  CONV_WHATSAPP: "rk_conv_whatsapp",

  // Reaching the firm without a form
  CONTACT_CLICK: "rk_contact_click",
  CTA_CLICK: "rk_cta_click",
  CTA_VIEW: "rk_cta_view",

  // The chatbot
  CHAT_OPEN: "rk_chat_open",
  CHAT_FIRST_MESSAGE: "rk_chat_first_message",
  CHAT_MESSAGE: "rk_chat_message",
  CHAT_HANDOFF: "rk_chat_handoff",
  CHAT_LEAD: "rk_chat_lead",
  CHAT_LEAD_FAIL: "rk_chat_lead_fail",
  CHAT_ERROR: "rk_chat_error",
} as const;

export type RkEvent = (typeof RK_EVENTS)[keyof typeof RK_EVENTS];

interface UserDataPayload {
  email?: string;
  phone_number?: string;
}

/** Labels any event may carry, on top of the automatic `page_type`. */
interface CommonPayload {
  location?: TrackLocation;
  user_data?: UserDataPayload;
  conversion_value?: number;
  conversion_currency?: string;
}

/**
 * What each event is allowed — and required — to carry.
 *
 * A closed vocabulary of names only stops half the mistakes. The other half is
 * a correct name with the wrong labels: `rk_scroll` carrying a `form_name`, or
 * a form event with no `form_name` at all. Both compile happily against a bag
 * of optional fields, both arrive in Analytics, and both quietly corrupt the
 * dimension they land in. Per-event payloads make the compiler the thing that
 * catches it rather than a person reading a report six weeks later.
 *
 * `void` means the event takes no payload beyond the automatic `page_type`,
 * and `trackEvent` then refuses a second argument.
 */
interface EventPayloads {
  [RK_EVENTS.PAGE_VIEW]: {
    is_first_page: boolean;
    previous_page?: string;
    previous_page_type?: PageType;
  };
  [RK_EVENTS.SCROLL]: { percent_scrolled: ScrollDepth };

  [RK_EVENTS.FORM_VIEW]: { form_name: FormName };
  [RK_EVENTS.FORM_START]: { form_name: FormName };
  /** `step` is the step just completed, not the one being entered. */
  [RK_EVENTS.FORM_STEP]: { form_name: FormName; step: number };
  /** Comma-separated field names, so one event names every failure at once. */
  [RK_EVENTS.FORM_ERROR]: { form_name: FormName; error_fields: string };
  [RK_EVENTS.FORM_SUBMIT]: { form_name: FormName };
  /** Why the send was refused — captcha, calendar, server. */
  [RK_EVENTS.FORM_FAIL]: { form_name: FormName; fail_reason: string };

  [RK_EVENTS.CONV_CONTACT_FORM]: { form_name: FormName };
  [RK_EVENTS.CONV_TRABAJADORES_BOOKING]: { form_name: FormName };
  [RK_EVENTS.CONV_EMPRESAS_BOOKING]: { form_name: FormName };
  /** Required: ten placements, and without it they are indistinguishable. */
  [RK_EVENTS.CONV_WHATSAPP]: { location?: TrackLocation };

  [RK_EVENTS.CONTACT_CLICK]: { contact_method: "phone" | "email" };
  /** The button's own wording, for telling duplicate placements apart. */
  [RK_EVENTS.CTA_CLICK]: { location: TrackLocation; cta_label: string };
  /**
   * A contact box came on screen. The denominator for `rk_cta_click` in the
   * same place — and on a phone, where the blog's box sits below the article,
   * the only exact answer to "did they get far enough to see it".
   */
  [RK_EVENTS.CTA_VIEW]: { location: TrackLocation };

  [RK_EVENTS.CHAT_OPEN]: void;
  [RK_EVENTS.CHAT_FIRST_MESSAGE]: { message_number: number };
  [RK_EVENTS.CHAT_MESSAGE]: { message_number: number };
  [RK_EVENTS.CHAT_HANDOFF]: { location: TrackLocation };
  [RK_EVENTS.CHAT_LEAD]: { location: TrackLocation };
  [RK_EVENTS.CHAT_LEAD_FAIL]: void;
  [RK_EVENTS.CHAT_ERROR]: void;
}

type PayloadFor<E extends RkEvent> = EventPayloads[E] extends void
  ? CommonPayload | undefined
  : EventPayloads[E] & CommonPayload;

/** Every label any event can carry, common or per-event. */
type LabelKey =
  | keyof CommonPayload
  | {
      [E in RkEvent]: EventPayloads[E] extends void
        ? never
        : keyof EventPayloads[E];
    }[RkEvent];

/**
 * Tag Manager does not read the dataLayer as a list of separate messages. It
 * folds every push into one persistent object — its data layer model — and a
 * Data Layer Variable reads from that object, where a key stays set until a
 * later push overwrites it. Nothing clears it on the next event, and nothing
 * clears it on navigation, because the site never reloads.
 *
 * So after `rk_form_start` sets `form_name`, every later event — the scroll
 * marks, the next page view, a WhatsApp click on another page — still
 * resolves `form_name` to that form when the phase 4 rule forwards it to
 * Analytics, and the dimension fills with values from the previous event.
 * The per-event typing above stops the wrong label being *sent*; this stops
 * the right label from a previous event being *inherited*.
 *
 * Spread under every push, so each label is explicitly `undefined` unless the
 * event sets it. An explicit `undefined` overwrites the key in the model, the
 * variable resolves to nothing, and the tag omits it. Typed as a Record over
 * every label key so that adding a label without adding it here is a compile
 * error rather than a quietly sticky dimension.
 */
const RESET_LABELS: Record<LabelKey, undefined> = {
  location: undefined,
  user_data: undefined,
  conversion_value: undefined,
  conversion_currency: undefined,
  is_first_page: undefined,
  previous_page: undefined,
  previous_page_type: undefined,
  percent_scrolled: undefined,
  form_name: undefined,
  step: undefined,
  error_fields: undefined,
  fail_reason: undefined,
  contact_method: undefined,
  cta_label: undefined,
  message_number: undefined,
};

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
 *
 * The consent default is guaranteed to precede every push from here. The
 * inline snippet in the root layout normally sends it before hydration; when
 * that script cannot run — a CSP added without a hash, an extension that
 * strips inline scripts — ensureConsentDefaults sends it now, ahead of this
 * event, instead of from DeferredGoogleTagManager's effect, which runs after
 * PageViewTracker's and so used to let the landing page view into the
 * dataLayer first. A no-op whenever the snippet got there, which is always in
 * practice.
 *
 * Every push carries every label, the absent ones as `undefined` — see
 * RESET_LABELS for why.
 */
export function trackEvent<E extends RkEvent>(
  event: E,
  ...[payload]: EventPayloads[E] extends void
    ? [payload?: CommonPayload]
    : [payload: PayloadFor<E>]
): void {
  if (typeof window === "undefined") {
    return;
  }

  ensureConsentDefaults();

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    ...RESET_LABELS,
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

/**
 * Email and phone for enhanced conversions — or nothing, without advertising
 * consent.
 *
 * GTM's User-Provided Data tag hashes these before anything leaves the
 * browser, and under `ad_user_data: denied` it will not send them at all. But
 * suppressing the *send* is not the same as suppressing the *exposure*: until
 * this check, the raw email and phone of a visitor who had declined were still
 * pushed into `window.dataLayer`, where every other tag in the container can
 * read them. That is the same reasoning that took first and last name out of
 * this payload — PII sitting in a global object in exchange for nothing.
 *
 * The consent is read from the cookie rather than from the provider's context
 * on purpose: this file is framework-free, every other function in it is, and
 * a React import here would be the beginning of the end of that.
 */
export function buildUserData(
  userData?: ConversionUserData
): UserDataPayload | undefined {
  if (!userData || !hasAdvertisingConsent()) {
    return undefined;
  }

  const payload: UserDataPayload = {
    email: normalizeEmail(userData.email),
    phone_number: normalizePhone(userData.phone),
  };

  const hasValue = Object.values(payload).some(Boolean);

  return hasValue ? payload : undefined;
}

function pushConversion<E extends RkEvent>(
  event: E,
  userData: ConversionUserData | undefined,
  payload: PayloadFor<E>
) {
  const user_data = buildUserData(userData);

  trackEvent(event, {
    conversion_value: CONVERSION_VALUE,
    conversion_currency: CONVERSION_CURRENCY,
    ...payload,
    ...(user_data && { user_data }),
  } as PayloadFor<E>);
}

export function trackContactFormSubmission(userData?: ConversionUserData) {
  pushConversion(RK_EVENTS.CONV_CONTACT_FORM, userData, {
    form_name: "contacto",
  });
}

/**
 * `location` is optional only until every WhatsappLink call site passes one.
 * Once it is threaded through the component's required prop it becomes
 * required here too, so an untagged WhatsApp click cannot be added later.
 */
export function trackWhatsappConversion(location?: TrackLocation) {
  pushConversion(RK_EVENTS.CONV_WHATSAPP, undefined, { location });
}

export function trackEmpresasBookACallFormConversion(
  userData?: ConversionUserData
) {
  pushConversion(RK_EVENTS.CONV_EMPRESAS_BOOKING, userData, {
    form_name: "empresas",
  });
}

export function trackTrabajadoresBookACallFormConversion(
  userData?: ConversionUserData
) {
  pushConversion(RK_EVENTS.CONV_TRABAJADORES_BOOKING, userData, {
    form_name: "trabajadores",
  });
}
