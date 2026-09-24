# Tracking and funnel plan

What we will build so RK Abogados can see which campaigns bring people who actually book a call or write on WhatsApp, and exactly where the others give up.

**This is the internal build plan — it does not go to the client.** It is written for whoever implements the work: it names files, events and settings, and it says what is wrong with the site today in plainer terms than a client document would. The client-facing proposal is a separate document, written in Spanish, derived from section 9.

Prepared 16 September 2026, revised 20 September 2026.

**All dates and times in this document, and in every document beside it, are
Santiago time** (`America/Santiago`) — the same zone the Analytics property is
set to, so a date written here lines up with the same date in a report. This
matters because the work is done from Cyprus, which runs **six hours ahead**:
anything done between midnight and 06:00 Cyprus time belongs to the *previous*
day in Santiago, and would otherwise be filed a day late against the data it
describes. Convert before writing a date down, not after.

Status: draft, under review.

## Contents

1. [Where things stand today](#1-where-things-stand-today)
2. [Phase 1: Check the accounts and connect them](#phase-1-check-the-accounts-and-connect-them)
3. [Phase 2: Make the site report every step](#phase-2-make-the-site-report-every-step)
4. [Phase 3: Make the cookie banner real](#phase-3-make-the-cookie-banner-real)
5. [Phase 4: Receive those steps in Analytics](#phase-4-receive-those-steps-in-analytics)
6. [Phase 5: Build the funnel reports](#phase-5-build-the-funnel-reports)
7. [Phase 6: One-page dashboard (stretch)](#phase-6-one-page-dashboard-stretch)
8. [Phase 7: Watch, then review](#phase-7-watch-then-review)
9. [Phase 8: Read the reports automatically (recurring, optional)](#phase-8-read-the-reports-automatically-recurring-optional)
10. [What the client gets, and effort](#9-what-the-client-gets-and-effort)
11. [After this: getting the most out of it](#10-after-this-getting-the-most-out-of-it)
12. [Plain-language glossary](#11-plain-language-glossary)
13. [Banner off, tracking on](#12-banner-off-tracking-on)

---

## 1. Where things stand today

The site already tells Google Ads when someone finishes one of four things: sends the contact form, clicks WhatsApp, books a call as a worker (trabajadores), or books a call as a company (empresas). Since the fix in the week of 8 September 2026 it also sends name, email and phone alongside, which lets Google match the person to the ad click more reliably. That part works and we will not touch it.

There is a second, home-made system: when a visitor arrives from a Google ad, the site generates a six-character "Caso" code, appends it to the WhatsApp message and to the booking emails, and writes the code plus the ad click reference to a Google Sheet. That is the only way today to connect a real conversation back to a campaign. It is useful, and phase 2 widens it rather than replacing it.

What is missing:

- **Nothing between arriving and finishing is recorded.** If a visitor opens the booking form, picks a date and time, then closes the tab on the personal details step, nobody knows. Neither does anybody know if they never scrolled down to the form at all.
- **Nothing records how far down a page people read.** There is no scroll measurement of any kind. On the blog and the long landing pages this is the difference between "the ad brought a reader" and "the ad brought a bounce".
- **Movement between pages is barely visible.** The site never reloads when you navigate, so page views depend entirely on a Tag Manager setting we have not yet verified, and even when they arrive they are bare URLs with no sense of what kind of page it was or where the visitor came from.
- **The chatbot captures complete leads that nothing records.** Its `processUserInfo` tool collects name, email, phone, the legal issue and the whole transcript, emails the studio and confirms to the visitor. That is a finished enquiry, equivalent to the contact form and carrying more context — and it fires no conversion, writes nothing to the Sheet and carries no campaign reference. Google Ads has never heard of it, and a chatbot lead cannot currently be traced to a campaign by any means at all.
- **Several ways of contacting the firm are invisible.** The two phone numbers, the email address, the "Agenda una asesoría" buttons, the chatbot, and one WhatsApp link on the team page fire nothing.
- **Only Google desktop ad clicks are attributed.** The site reads the `gclid` parameter and nothing else. Clicks from iOS, where Google sends `wbraid` or `gbraid` instead, and every campaign that is not Google Ads (Meta, email, referrals) arrive unlabelled — and because the Caso code is only generated when a `gclid` is present, none of those visitors ever get one. Their WhatsApp conversations can never be traced back to anything.
- **Analytics has never received a conversion.** Confirmed in phase 1: the container holds no GA4 event tag, only the Analytics configuration tag. All four conversions go to Google Ads and stop there, so Analytics holds page views and enhanced measurement and nothing else.
- **The cookie banner does nothing.** Visitors can decline, but tracking runs anyway because the switch in the code is disabled, and Google is never told what the visitor chose. The banner also has no advertising category at all, only "necessary" and "analytics". Phase 3 fixes both.

### Where people can contact the firm

The address `/habla-con-nosotros` is not a page, it forwards to the workers landing page. There are three actual forms — workers booking, companies booking, and the generic contact form at `/contacto` — but rather more places where a visitor can reach the firm without touching a form:

| Surface | Where | What it offers |
| --- | --- | --- |
| Workers booking form | `/habla-con-nosotros/trabajadores` | Two-step booking, plus WhatsApp in hero and slogan |
| Companies booking form | `/habla-con-nosotros/empresas` | Two-step booking, plus WhatsApp in hero and slogan |
| Contact form | `/contacto` | Form, two phone numbers, email, WhatsApp |
| Service pages | `/asesoria-trabajadores`, `/asesoria-empresas`, `/otras-areas` | Shared contact section, no form |
| Blog posts | `/blog/[slug]` | "Habla con nosotros" block with WhatsApp |
| FAQs | `/faqs` | Contact block with WhatsApp |
| Team page | `/nosotros` | Per-lawyer email and a raw WhatsApp link that bypasses all tracking |
| Chatbot | Every page | AI assistant that captures a full lead by email, or hands over the WhatsApp number |
| Footer | Every page | Two phone numbers and the email address |

Only the three forms get the form signals in phase 2 — the other surfaces have no form to start or abandon. What matters there is simpler: which page a WhatsApp tap came from, and from where on it. That is what the page and position labels are for.

### Open decisions

Everything below is planned out except these. Each is settled with the client rather than by us, and each blocks the phase it sits in. **What to actually say to them, in Spanish, is `docs/client-brief.md`** — keep the two in step.

| Decision | Whose call | Where it lands |
| --- | --- | --- |
| Banner copy, category names, whether "decline" is as prominent as "accept" | The firm — they are the lawyers | Phase 3, step 11 |
| Wording of `/politica-cookies` and `/politicas-de-privacidad` | The firm writes it; the cookie inventory was sent to them 24 September 2026 | Phase 3, step 10 |
| ~~Which of the four Ads conversions are primary, and which become secondary~~ | Settled 24 September 2026 — as recommended: the three forms primary, WhatsApp secondary | Phase 1 record |
| ~~Whether `digitalizame.cl` keeps editor access to Ads and Tag Manager~~ | Settled 23 September 2026 — access removed | Phase 1 record |
| Whether chatbot leads get their own Ads conversion action | Revisit at phase 7 once volume is known — agreed it goes primary when created | Phase 2 |
| The consent go-live date, recorded as the reporting baseline | Agreed jointly before phase 3 ships | Phase 3, step 4 |
| Whether the phase 6 dashboard is wanted | The firm, after two or three weeks of reading the funnels | Phase 6 |
| Whether phase 7 becomes a monthly retainer | The firm | Section 9 |
| ~~Whether the firm will mark case outcomes in the Sheet~~ | Settled 23 September 2026 — **yes** | Section 10 |

### Where the current code lives

| What | File |
| --- | --- |
| Tag Manager loader | `src/components/Analytics/SiteAnalytics.tsx` (was `ConditionalAnalytics`; the dead gate is gone) |
| Consent Mode | `src/lib/utils/consent.ts`, bootstrap snippet inlined in `src/app/layout.tsx` |
| Conversion signals to Tag Manager | `src/lib/utils/analytics.ts` |
| Caso code, Google Sheet logging, WhatsApp URL | `src/lib/utils/tracking.ts`, `src/hooks/useTracking.ts` |
| Shared WhatsApp link | `src/components/WhatsappLink/WhatsappLink.tsx` |
| Workers booking form | `src/app/habla-con-nosotros/trabajadores/_components/ReservaFormTrabajadores/` |
| Companies booking form | `src/app/habla-con-nosotros/empresas/_components/ReservaFormEmpresas/` |
| Contact form | `src/app/contacto/_components/ContactForm/` |
| Shared contact section | `src/components/ContactSectionLight/`, `src/components/ContactSectionEmpresas/` |
| Untracked WhatsApp link | `src/app/nosotros/_components/TeamGrid/TeamGrid.tsx` |
| Chatbot | `src/components/SupportChatbot/`, `src/lib/ai/rk-bot/` |
| Cookie consent | `src/components/CookieConsent/` (categories in `types.ts`) |

---

## Phase 1: Accounts — done 20 September 2026

Half a day, as estimated. No code. What follows is the record; the working runbook has been retired.

### What was set

| Setting | Value |
| --- | --- |
| Analytics property | `G-HE87DHS09F`, stream renamed to `www.rkabogados.cl` (it still said `ryoasociados.cl`) |
| Time zone / currency | Santiago / CLP |
| Data retention | 14 months, up from the 2-month default |
| Google signals | On, reporting identity **Blended** |
| Unwanted referrals | `whatsapp.com`, `api.whatsapp.com`, `web.whatsapp.com` |
| Ads link | Already linked since April 2024, personalised advertising on |
| Auto-tagging | Confirmed on |
| Search Console | Linked, `www` property, collection published, sitemap reading cleanly |
| Analytics conversions imported to Ads | No — correctly declined |
| Library | `Data import` and `Monetisation` unpublished as permanently empty |
| Enhanced measurement | All seven on (the default). Phase 4 turns **Scrolls** and **Form interactions** off. |

Internal traffic was **not** excluded: the office IP is dynamic and staff work from home, so an IP filter would be wrong on both counts. The cost is that the firm's own visits inflate the top of every funnel, including form starts that were never going to convert. If phase 7 shows that distorting things, the fix is a one-off opt-out link setting a cookie that marks the visit internal — twenty minutes, entirely inside Tag Manager, no IP needed.

### The container, as found

`GTM-PC49T6MC`, 8 tags, 5 triggers, 5 variables. Healthy: the Google tags for Ads (`AW-11083927345`) and Analytics both fire on all pages, all four conversion tags exist, nothing is paused, and **all four conversion labels match `src/lib/utils/analytics.ts` exactly**. Verified against the Ads side — same labels, same conversion ID — so the site's conversions are correctly wired end to end. Two of the four (Trabajadores, WhatsApp) are actively recording; the other two show Google's low-volume warning, which at this traffic is not a fault.

One change was published on its own: an exception trigger (`Page Hostname contains vercel.app`) on all eight tags, meant to stop preview deployments being measured as real traffic. **It did not work.** Found on 22 September 2026 from the container export: the exception was built as a Page View trigger, and an exception only blocks a tag when it fires on the same event as the tag. The conversion tags fire on `rk_conv_*` events and the Google tags on Initialization, and a Page View trigger fires on neither, so it blocked nothing. Every form send and WhatsApp click from a preview, and from `localhost`, which the condition never covered, reached Google Ads as a real conversion. Fix: make it a Custom Event trigger, regex `.*`, condition `Page Hostname does not equal www.rkabogados.cl`, and verify on a preview URL that every tag shows as blocked.

### What the inventory turned up, to fix during phase 4

- **The user-provided data variable maps only email and phone.** `First Name` and `Last Name` variables exist, read the right data layer keys, and are wired to nothing — so the names the site has been sending since the 8 September fix are being discarded. Two rows added to that variable, and enhanced-conversion match rates improve for free.
- **Cross-domain linking lists 13 dead Vercel preview hostnames.** Single-domain site; turn cross-domain off and empty the list. (22 September: the list is gone from the workspace but cross-domain is still switched on with no domains. Untick it.)
- **`Solo enlaces`**, a link-click trigger matching `api.whatsapp`, fires no tag. Predecessor of the current WhatsApp conversion. Delete.
- **`url_passthrough` is off** and all eight tags are `consentStatus: NOT_SET` — both exactly as phase 3 assumed.
- **Conversion values are a flat 1000 CLP placeholder** on all four tags, ignoring the `conversion_value` the site pushes. Harmless, but it means the code sends a field nobody reads, and the "what is a contact worth" item in section 10 starts from nothing real.
- **The User-provided Data Event tag reports "Failed" in Tag Assistant, and works anyway.** Seen on 22 September 2026 on a real booking and a real contact form send: the variable resolves to a valid email and E.164 phone, the tag fires on the right three events, and reports "Failed" both times — yet Ads' enhanced-conversions diagnostics rate Formulario Trabajadores "Excellent" the same day. The status is a quirk of that tag type, not a fault. The three conversion tags do not include user-provided data themselves; leave that as it is. Formulario Contacto and Formulario Empresa showed "No recent data" purely for lack of submissions: a test send on 22 September moved Contacto into the healthy group within the hour, so all three forms are confirmed and nothing in the container needs touching. Note that this diagnostic counts pings carrying user data from any visitor, ad click or not — attribution to a campaign is a separate step, and a test send will never appear in the campaign reports.

### Findings that change what we expected

**Analytics has never received a conversion.** There is no GA4 event tag in the container at all — the Analytics tag is configuration only. All four conversions go to Google Ads and stop there. Phase 4 is therefore not an improvement to Analytics reporting; it is the first time Analytics will see a conversion at all.

**Two of the three forms have produced nothing** in the period the current conversion actions have existed, while the workers form produced two. A business fact rather than a tracking one, and precisely the asymmetry phase 5 exists to explain.

**The firm was previously RyO Asociados** and the rename was never carried through the tooling — the Ads account is still named that, and the Analytics stream was too until today. `ryoasociados.cl` still 301s to the current domain, so the old brand's inbound links keep their value.

### Left open

- **Stray Ads conversion actions — 23 September 2026.** `Enviar formulario de conversion de RK Abogados` (Primary, no data, legacy) **demoted to Secondary**; the removal option was not offered, and Secondary is enough — it no longer touches bidding. `Envío de formulario para clientes potenciales` (auto-created, never fired, already Secondary) **removed 24 September 2026** as noise. Removed actions stay listed with status Removed — Ads never deletes one, to keep its history — so filter the table on Status: Enabled.
- ~~`contacto@digitalizame.cl` holds editor access~~ — **removed 23 September 2026.** They had last modified the Ads link on 15 September 2026; two parties editing tracking configuration independently is how a container acquires thirteen dead linker domains. Configuration changes now have one source: this repository's docs.
- ~~Primary versus secondary conversions~~ — **settled 24 September 2026, as recommended, and applied in Ads:** the three form conversions primary, the WhatsApp click secondary. A WhatsApp tap is a lead that still has to write; bidding on it would chase the cheapest action rather than the one that becomes a case.
- ~~**A second WhatsApp action, `Click Whatsapp RK`**~~ — **removed 24 September 2026.** It was Primary with no data: its label `SXmKCICe6M4bELGenaUp` was not the `GhpoCLOFkvIcELGenaUp` the container fires, so nothing sent to it, and an empty Primary action distorts Smart Bidding.
- **`Cliente convertido` — keep it, and do not touch its enhanced conversions.** Secondary, source "Import from clicks", created 16 April 2026, last recorded conversion 23 March 2026, 90-day window, every conversion. **Uploads is empty** (23 September 2026): no schedule, no file, nothing feeding it. The daily "last ping" is not an upload — it lines up with our own test sends on 22 and 23 September, and is the site's User-provided Data Event tag supplying hashed email and phone for *enhanced conversions for leads*. So this is half of section 10's mechanism already built: the website half works, the upload half was never set up, and its "no attempted imports" warning only says nobody has uploaded outcomes yet. **Connected 23 September 2026:** the Sheet's `Ads import` tab feeds this action daily through Data Manager (see section 10). It had been removed in the clean-up the same day and was re-enabled — a removed action records nothing. **Enhanced conversions stays on** — it is what lets an upload match by email and phone instead of click ID alone, the only way to cover leads that arrived without a `gclid`. (This replaces the earlier advice to untick it, written before the ping was understood.)

---

## Phase 2: Make the site report every step — live since 22 September 2026

| | |
| --- | --- |
| **Where** | The website code. One pull request. |
| **Effort** | Two to two and a half days including testing on the real forms |
| **Result** | The site sends a signal at every meaningful moment on the way to a contact, not only at the end. All of them carry the same labels so they can be compared, and every visitor — not only Google ad clicks — gets a Caso code in the Sheet. |

Today there is one tracking file (`src/lib/utils/analytics.ts`) that knows how to talk to Tag Manager. We extend it, so there is a single place where every signal is defined and named, and no one can invent a new inconsistent one later. Every signal carries the same three labels: which form (workers, companies, contact), which page it happened on, and where on the page (hero button, footer, chatbot, and so on).

### Signals we add

**Moving around the site**

| Signal | Name | Meaning |
| --- | --- | --- |
| Page seen | `rk_page_view` | Sent on every navigation, carrying the kind of page, the previous page, and whether this was the first page of the visit. The site never reloads between pages, so without this the journey is a list of bare URLs that cannot be grouped or compared. |
| Scroll depth | `rk_scroll` | Fires at 25%, 50%, 75% and 100% of the page, once each per page per visit. Analytics' own scroll event only fires at 90% and cannot be changed, which is why we send our own. The counter resets on navigation, otherwise the second page inherits the first page's marks. |

> On short pages such as `/contacto` and `/faqs` the whole page is visible at once, so 100% fires immediately and means nothing on its own. Read scroll depth on the long pages — the landing pages and blog posts — and ignore it elsewhere. If the blog turns out to matter, a time-based "actually read it" signal is a small addition later.

**The three forms**

| Signal | Name | Meaning |
| --- | --- | --- |
| Form comes into view | `rk_form_view` | The visitor scrolled far enough to see the form. Separates "never saw it" from "saw it and left". Only on the three pages that have a form; elsewhere the WhatsApp signal and its page label do the work. |
| Form started | `rk_form_start` | First interaction: a date is picked or a field gets focus. Fires once per visit. |
| Step completed | `rk_form_step` | Date and time chosen, "next" pressed. On the two booking forms the calendar is step 1, personal details are step 2. |
| Validation error | `rk_form_error` | The form refused to continue, and which field caused it. Shows whether people fail on the phone number, the email, or the required message. |
| Send pressed | `rk_form_submit` | The visitor tried to send. Compared with the next two, this shows technical failures. |
| Sent successfully | `rk_conv_contact_form`, `rk_conv_trabajadores_booking`, `rk_conv_empresas_booking` | The success step is the three conversion events that already exist — there is no separate `rk_form_success`. They keep their names so the Ads tags do not break, and gain the same labels as everything else. |
| Send failed | `rk_form_fail` | Server or captcha error, with the reason. Today these are silent. |

**Reaching the firm without a form**

| Signal | Name | Meaning |
| --- | --- | --- |
| WhatsApp clicked | `rk_conv_whatsapp` | Already exists. We add the page and location labels, and route the untracked team-page link through the same component. |
| Phone or email clicked | `rk_contact_click` | The two phone numbers and the email address in the footer, the contact page and the team page. Mostly mobile visitors. |
| Call-to-action clicked | `rk_cta_click` | The "Agenda una asesoría" and similar buttons that scroll to the form or lead to the landing pages, with their position on the page. |

**The chatbot**

The assistant is a real conversation, not a widget, so one signal cannot describe it. Five do:

| Signal | Name | Meaning |
| --- | --- | --- |
| Opened | `rk_chat_open` | The floating button was pressed. |
| First message sent | `rk_chat_first_message` | The visitor actually started talking. This is the one that belongs in the funnels. |
| Message sent | `rk_chat_message` | Every subsequent message, numbered, so we can see whether conversations go anywhere or die on turn two. |
| Handed to WhatsApp | `rk_chat_handoff` | The bot offered the WhatsApp number (`provideWhatsappContactTool`). The step where a chat becomes a real lead. |
| Lead captured | `rk_chat_lead` | The bot collected name, email, phone and the legal issue and emailed the studio. A finished enquiry, and the strongest outcome the chatbot has. Carries `user_data` like the forms do. |
| Lead failed | `rk_chat_lead_fail` | `processUserInfo` returned `success: false` — the email did not send. Today this is silent in both directions: the visitor is not told and the firm never learns the enquiry existed. |
| Failed | `rk_chat_error` | The assistant errored out. Today this is invisible. |

The WhatsApp links rendered *inside* the chatbot go through the shared component already, so they must pass `location: "chatbot"` — otherwise a WhatsApp tap won from a conversation is indistinguishable from one in the footer.

The bot has two possible endings and they are not equal: handing over the WhatsApp number passes the visitor to a channel where they still have to write, while capturing the lead finishes the job. The funnels need to tell them apart.

**The Caso code goes into the chatbot emails too.** The booking forms already put it in theirs; `processUserInfoTool.ts` sends two emails carrying no campaign reference at all, which is why a chatbot lead is currently less traceable than a WhatsApp message. Adding it to both templates is a few lines and it is what makes the lead attributable.

**No fifth Ads conversion action yet.** A chatbot lead is a real enquiry and should eventually be counted as one, but the volume is unknown and an Ads conversion action that fires twice a month is noise. Phase 2 makes the lead visible in Analytics and traceable in the Sheet; the Ads action waits until the phase 7 review shows what the volume actually is. When it is created it goes **primary**, alongside the three forms — that is already settled, so it is a ten-minute job later rather than another conversation. `user_data` rides on the event from the start so enhanced conversions work the day it is switched on.

### Labels carried by every signal

| Label | Values |
| --- | --- |
| `form_name` | `trabajadores`, `empresas`, `contacto` |
| `page_type` | `home`, `landing_trabajadores`, `landing_empresas`, `asesoria_trabajadores`, `asesoria_empresas`, `otras_areas`, `contacto`, `nosotros`, `faqs`, `blog_index`, `blog_post`, `legal` |
| `location` | `hero`, `slogan`, `footer`, `contact_section`, `chatbot`, `team_grid`, `navbar`, ... |
| `percent_scrolled` | `25`, `50`, `75`, `100` (scroll signal only) |

Existing Ads conversion signals (`rk_conv_contact_form`, `rk_conv_whatsapp`, `rk_conv_empresas_booking`, `rk_conv_trabajadores_booking`) keep their names so the Ads tags in Tag Manager do not break.

### Attribution: a reference for every visitor, not only Google clicks

Three changes to `src/lib/utils/tracking.ts` and `src/hooks/useTracking.ts`:

1. **Read every campaign marker, not just `gclid`.** Add `wbraid` and `gbraid`, which is what Google sends instead of `gclid` on iOS when tracking permissions are limited, and the standard `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term` for Meta, email and anything else. Also keep the referring site and the landing page.
2. **Generate the Caso code for everyone.** Today it only exists when a `gclid` is present, so an organic or Meta or iOS visitor who writes on WhatsApp arrives with no reference at all and can never be traced. Every visitor gets one.
3. **Store first touch in a cookie, not `sessionStorage`.** `sessionStorage` is wiped when the tab closes. Someone who clicks an ad on Monday, thinks it over, and books on Wednesday is currently credited to nothing. A ninety-day cookie holding the first campaign seen keeps the original credit, and is what the Sheet logs: every row now carries `ft_source`, `ft_medium`, `ft_campaign`, `ft_content`, `ft_term`, `ft_landing`, `ft_referrer` and `ft_ts` beside the last-touch `gclid`. The landing page and referrer are recorded on the very first visit whether or not it carried a campaign marker, so an organic visit that later converts is not claimed by a paid click a week on. **The Apps Script behind the Sheet has to be taught the new columns** — until then the parameters arrive and are ignored, which is harmless.

> **What this deliberately does not do.** The Caso code stays where it is useful — in the WhatsApp message, the booking email and the Google Sheet, next to the campaign that brought the visitor. It is not sent to Analytics, and Analytics' own visitor references are not written back to the Sheet. Joining the two would mean a unique value per visitor in Analytics, which its reports collapse into an "(other)" bucket, so the join would be built and then never usable from the interface. The Sheet answers "which campaign produced this case"; Analytics answers "where do people give up". Keeping them apart is the honest version.

### Small fixes along the way

- The team page has a raw WhatsApp link that bypasses all tracking. It will use the shared component.
- `WhatsappLink` gets a **required** `location` prop. The component is used in roughly ten places; a required prop is the only thing that stops an eleventh being added untagged.
- The Google Sheet channel name for the workers form has a typo (`trabjadores`). Fixing it keeps the sheet clean; the old spelling stays readable in the sheet's history.
- The Tag Manager ID is written into the code in two places. It moves to a configuration variable so a staging site can use a separate container without touching code.
- **Every push resets every label.** Tag Manager keeps a persistent model of the dataLayer, so a `form_name` set by one event is still there when the next `rk_page_view` is forwarded to Analytics. `trackEvent` now pushes every label key on every event, `undefined` unless the event sets it, so the phase 4 rule forwards only what the event actually carried.
- **The contact form asks the browser before counting a send.** Its fields are natively `required`, so `requestSubmit()` can refuse silently; `rk_form_submit` used to fire before that check and every refused attempt looked like a technical failure. It now fires `rk_form_error` with the refused fields instead, and `rk_form_submit` only when the browser lets the send through.
- **The cookie banner no longer reloads the page on accept.** The reload re-mounted a consent gate that is disabled, and replayed the landing page's signals for every visitor who accepted. Removed here rather than in phase 3, so the data collected in between is not doubled on entry pages.

### Testing

On a preview deployment with Google's Tag Assistant open, walk through each form on desktop and phone, and confirm every signal arrives with the right labels before merging. `agent-browser` is already a development dependency here, so a smoke test that walks one form and asserts the signals fire is worth adding to the pipeline — it is the only thing that catches tracking quietly dying after an unrelated refactor.

### Checklist

- [x] `trackEvent` helper and signal vocabulary in `src/lib/utils/analytics.ts`
- [x] `rk_page_view` on navigation, with page type and previous page
- [x] `rk_scroll` at 25/50/75/100, once per page, reset on navigation
- [x] Booking forms (both): view, start, step, error, submit, success, fail
- [x] Contact form: view, start, error, submit, success, fail
- [x] WhatsApp link: labels added, `location` required — the team grid's
      raw link turned out to be commented out entirely, so there was nothing
      to route; its `tel:` and `mailto:` links are covered instead
- [x] Phone and email links tracked
- [x] CTA buttons tracked
- [x] Chatbot: open, first message, message, handoff, lead, lead fail, error
- [x] Caso code written into the studio email sent by `processUserInfoTool.ts`
      — the studio one only, not both: it is an internal reference for
      matching the Sheet row, and the visitor has no use for it. Closed over
      by a per-request tool factory rather than added to the input schema,
      so the model cannot hallucinate or drop it
- [x] `wbraid`, `gbraid` and `utm_*` read alongside `gclid`
- [x] Caso code generated for every visitor
- [x] First touch stored in a 90-day cookie, for every first visit
- [x] First touch sent with every Sheet row (`ft_*` parameters)
- [x] Apps Script updated to write the `ft_*` columns — done 22 September
      2026 as a new Sheet and script on the firm's own Google account (the
      original lived on an account the firm had no access to). The site
      reads the web app URL from `NEXT_PUBLIC_SHEET_WEBAPP_URL`, set in
      Vercel production only. Script and columns in `docs/tracking-events.md`
      under "The Sheet row".
- [x] Labels reset on every dataLayer push
- [x] Contact form: native validation reported as `rk_form_error`, not as a submit
- [x] Consent banner reload removed (pulled forward from phase 3)
- [x] Sheet channel typo fixed
- [x] Tag Manager ID moved to an environment variable
- [x] Tested on production, desktop, 22 September 2026, with Tag Assistant:
      label reset visible between consecutive events, both Ads conversions
      fired on their events, enhanced conversions rated "Excellent" in Ads
      for Trabajadores and Contacto the same day, contact form's native
      validation reported as `rk_form_error`, no reload on consent
- [ ] Phone walk — **moved to the final sweep** (phase 7): one form start
      and one WhatsApp tap from a mobile, confirmed by the Sheet row and the
      Ads diagnostics staying healthy
- [x] Smoke test — `bun run test:tracking`, an agent-browser walk of the
      trabajadores form asserting the `rk_*` sequence. Not in a pipeline:
      this repo has no CI, and the Playwright spec on `feat/e2e-tests` is
      where that belongs
- [x] Signal documentation written (see phase 4)

---

## Phase 3: Make the cookie banner real — done 22 September 2026, the firm's answers built 24 September

Code live, container published, all four consent states verified on
production. The firm replied to `docs/client-brief.md` on 24 September 2026:
three of the five decisions came back answered and are built, one came back
as a question for us, and one is still open. The cookie inventory went over the
same day, as a Spanish PDF made from `docs/cookie-inventory.md` without the
code references.

### The firm's answers — 24 September 2026

They agreed with the document as a whole and read the consent questions
against European practice on purpose: the firm aligns its own policy with the
European rules rather than with the Chilean floor, which is why two of the
three answers go further than what we recommended.

| Decision | Their answer | Status |
| --- | --- | --- |
| 1. What "reject" sends to Google | not addressed | **Open**, and the one with a date: 1 December 2026 |
| 2. Pre-ticked switches | Off by default, activated by hand — no pre-ticked boxes, no implied consent | **Built** |
| 3. Rename "Personalizar" | Went further: an explicit **reject** on the banner itself, beside "Personalizar" | **Built** |
| 4. Re-ask those who accepted in 2025 | Yes — ask again even where consent was already given | **Built** |
| 5. Texts | The banner paragraph is "not entirely accurate" and they will rewrite it | **Open**, waiting on their copy |
| — | New: cut cookie lifetimes to 6 months on consent, nothing retained on refusal, and *what period is technically necessary for the reports?* | **Open**, and the question is ours to answer |

**What was built, in one place each.** Decision 2 is
`CookieSettingsModal.tsx`, where both switches now start off; the consequence
worth saying out loud is that "Guardar preferencias" pressed without touching
anything now means the same as "Rechazar todas", where it used to mean the same
as "Aceptar todas" — which was the whole objection. Decision 3 is
`CookieBanner.tsx`, now three buttons — **Rechazar todas**, **Personalizar**,
**Aceptar todas** — with reject and accept carrying the same variant and reject
first in the DOM, so it is also first when the row stacks on a phone and first
for a screen reader. Decision 4 is `REPROMPT_BELOW_VERSION` in
`src/lib/utils/consent.ts`, raised from 0 to 3 with `CONSENT_VERSION` alongside
it.

**Decision 4 was taken literally, and that is a choice worth recording.** The
question in the brief was about the visitors who accepted before the
advertising category existed — version 1 records. Their answer says "aunque se
haya otorgado previamente", so version 2 records go too: everything written
before 24 September 2026 is asked again. Those version 2 records were complete
and current-shaped, but they were collected through a panel whose switches
started ticked and a banner with no first-layer reject, which is precisely what
the firm has now ruled out. Keeping them would mean relying on consent
gathered the way they just rejected. The cost is one more banner for anyone who
answered between 22 and 24 September — two days of traffic.

**What this does to the numbers, and it is the same warning as step 4 below.**
Three changes that each push consent down, shipping together: the switches no
longer pre-grant, rejecting is now one click from the banner, and every
existing acceptance is discarded. Expect the recorded conversion volume to step
down again within days of this going live, and automatic bidding to recalibrate
for a fortnight on top of the recalibration it started on 22 September. It is
still a measurement change, not a business change. Note the go-live date the
same way phase 7 notes the first one.

**The open items.** Decision 1 is unchanged and still has the 1 December
deadline. The banner and panel copy stays theirs; our wording remains in the
components marked `TODO(copy)`, with the one sentence that describes the
buttons corrected on 24 September so it at least matches what is on screen.
Their retention proposal — six months where consent is given, nothing retained
where it is refused — needs our technical answer first, since what a report can
still say depends on it; the periods in play are the `cookie-consent` record's
own lifetime (a year on acceptance, 30 days on refusal, `utils.ts`), Analytics'
own retention setting, and the Ads conversion windows. Answer that, then they
decide. The two policy pages are still theirs to write from our inventory.

| | |
| --- | --- |
| **Where** | The website code and Tag Manager. |
| **Effort** | One and a half days |
| **Result** | What a visitor chooses in the banner actually controls what Google is allowed to store, with advertising as a choice of its own. The firm can point to a banner that does what it says, ahead of Chile's new data protection law (Ley 21.719, in force December 2026). |

### How it works

Google has a mechanism called Consent Mode. Before Tag Manager loads, the site tells it the visitor's current choice (defaults to "not granted" until they decide). When the visitor accepts or declines, the site tells Google again. Every tag inside Tag Manager then behaves accordingly:

- **Accepted:** everything works as today.
- **Declined:** no cookies are set and nothing identifies the person. Google still receives a bare, cookieless ping per page and per signal.
- **Not yet decided:** treated as declined.

> **An honest caveat, and it belongs in the client conversation.** Google advertises that it fills the gap left by declining visitors statistically. That modelling only switches on above a traffic threshold — in the order of a thousand declining visitors a day, sustained for a week. A law firm's site will not reach it. So declining visitors will be genuinely absent from the reports, not estimated. The funnels still work, they describe the consenting majority, and the percentages between steps stay meaningful. What they cannot do is tell you the absolute number of people who considered contacting the firm.

### The banner needs a third category

Today `src/components/CookieConsent/types.ts` has only `necessary` and `analytics`, and the settings modal shows one switch. But Google distinguishes four kinds of storage, and three of them are advertising rather than measurement: whether ads may be stored, whether the visitor's own data may be sent with a conversion, and whether ads may be personalised. Folding those under a checkbox labelled "analytics" would be the sort of thing the firm advises its own clients against.

So the banner, the settings modal and the stored preferences gain an **advertising** category:

| Banner category | Google storage types |
| --- | --- |
| Necessary | none — the site's own function |
| Analytics | `analytics_storage` |
| Advertising | `ad_storage`, `ad_user_data`, `ad_personalization` |

A visitor can then accept measurement while refusing ad personalisation, which is the common preference and the one the law is aimed at. The practical consequence to explain to the client: a visitor who declines advertising still counts in the funnels, but their booking cannot be matched back to the ad click in Google Ads.

### Steps

1. **Add the advertising category** to `types.ts`, the banner, the settings modal and the stored cookie, defaulting to declined. Existing stored preferences without the field are treated as declined until the visitor chooses again.
2. **Set the default consent state** in the site before the Tag Manager snippet runs, reading the existing `cookie-consent` cookie so a returning visitor's choice applies immediately.
3. **Send the update** when the visitor presses accept, decline, or saves preferences in the settings modal. The full page reload that used to follow accept and save was already removed in phase 2 — it was doubling the landing page's signals — so this is only the dataLayer update.
4. **Warn the client before this goes live, not after.** Today the site tracks every visitor regardless of the banner, so switching consent on will cut the recorded Ads conversions by whatever share of visitors decline. The firm will see a step down in their conversion numbers within days of this phase shipping, and automatic bidding will spend a fortnight recalibrating to it. It is a measurement change, not a business change, but it looks alarming on a dashboard and it is the sort of thing that gets blamed on the last person who touched the site. Agree a go-live date and note it, so the before and after are never compared.
5. **Switch on `url_passthrough` and `ads_data_redaction`.** Both are set from the page, one line each, and are the part of Consent Mode most often left out. Done.

   **`url_passthrough` does not work on this site, and that was measured rather than assumed.** This step used to claim it prevented a declining visitor losing the ad click reference on navigating to a second page. Tested on production on 22 September 2026 in a clean incognito session — land on `/?gclid=TEST123`, decline advertising, click through to `/nosotros` — and the parameter was **gone**. It decorates `<a>` clicks, and every internal link here is a Next `<Link>` whose router intercepts the click and calls `pushState` with a URL of its own, so there is nothing left to decorate.

   The practical consequence is smaller than it sounds, and arguably correct. It only ever mattered for visitors who **declined** advertising: everyone who accepts gets a normal `_gcl_aw` cookie, and commit 26d8283 already loads the tag at hydration on campaign visits so that cookie survives a click-through. What is lost is cookieless attribution for a decliner who converts on a later page — and a visitor who declined advertising arguably should not be attributed to an ad click, so the failure aligns with what they chose. It is also moot entirely if the firm takes the option in `docs/cookie-inventory.md` of blocking Google's tags for decliners, since then no conversion ping is sent for them at all.

   `ads_data_redaction` is the half that does work and still matters: it strips identifiers from the ad requests that do go out.
6. **Keep Tag Manager loading for everyone.** The disabled gate in `ConditionalAnalytics.tsx` is removed rather than re-enabled: with Consent Mode the container itself must load so it can receive the choice. The tags inside it are what get restricted.
7. **In Tag Manager:** switch on consent checks for the container, confirm each tag declares which storage types it needs, and verify with Tag Assistant that a declined visit sets no cookies.
8. **Remove the `noscript` Tag Manager iframe** from `src/app/layout.tsx`. It fires the container for visitors with JavaScript disabled, before any choice can exist, and Consent Mode cannot reach it. Nothing on this site works without JavaScript anyway — the forms, the calendar and the chatbot are all client-side — so it is loading a tracker for people who cannot use the site.
9. **Leave Vercel Analytics and Speed Insights outside the banner.** They sit in the same file as the Tag Manager loader (`ConditionalAnalytics.tsx`) and it would be easy to sweep them into the consent gate while rewriting it. They are cookieless and store nothing on the visitor's device, so they do not require consent. This is a deliberate position, not an oversight, and the cookie policy should say so.
10. **Update the public cookie policy and privacy policy.** This is the part that actually has to hold up. `/politica-cookies` today lists only Vercel Analytics and Speed Insights; Google Tag Manager, Google Analytics and Google Ads load on every page and appear nowhere on it, and reCAPTCHA appears on the three form pages only — not on every page, as this said until 22 September. The full inventory is `docs/cookie-inventory.md`. `/politicas-de-privacidad` mentions "Google Analytics y Vercel" in passing. Both need the new advertising category, a table of the cookies actually set, who receives the data and for how long. We supply the technical inventory — every cookie, its purpose, its lifetime, the recipient — and the firm writes the wording, since they are the lawyers and it is their liability.
11. **Review the banner copy** with the client. The wording, the three categories, and whether "decline" is as prominent as "accept" are their legal call, since they are the lawyers. The plan provides the mechanism; they provide the words.

### Checklist

- [x] Advertising category added to types, modal and stored cookie
- [x] Both optional switches start **off** in the settings modal — 24
      September 2026, the firm's answer to decision 2, which agreed with our
      recommendation. They had started on until then, knowingly and recorded;
      what changed is that "Guardar preferencias" untouched now means reject
      rather than accept
- [x] **A way to decline at all** — there was none. `rejectAll` writes a record
      and the settings modal's footer is the conventional three — reject all,
      save preferences, accept all — with cancel demoted to an X in the header
- [x] **Reject on the banner itself** — 24 September 2026, the firm's answer to
      decision 3, going past the rename we had recommended. Nothing in force in
      Chile requires a first-layer reject; they align their policy with the
      European rules by choice. Reject and accept share a variant so neither is
      the easier button, and reject is first in the DOM
- [x] **Everyone asked again** — 24 September 2026, the firm's answer to
      decision 4. `REPROMPT_BELOW_VERSION` raised 0 → 3 with `CONSENT_VERSION`,
      so every record written before that date is re-prompted, version 2
      included: those were collected through the pre-ticked panel
- [x] **The banner made visible again.** It had not rendered for anyone since
      27 August 2026 (b1c0840) — verified against production before touching
      it. Shipping consent on top of an invisible banner would have denied
      every visitor permanently
- [x] A refusal lapses after 30 days, an acceptance after a year
- [x] Default consent state set before Tag Manager loads — and before
      hydration, which is stricter and is what the ordering actually needs
- [x] Update sent on accept, reject, and preference save
- [x] Categories mapped to all **seven** storage types, not four: an
      undeclared type behaves as granted
- [x] `url_passthrough` and `ads_data_redaction` enabled from the page
- [x] Gate in `SiteAnalytics` removed, container loads for everyone
- [x] `noscript` Tag Manager iframe removed from `layout.tsx`
- [x] Vercel Analytics and Speed Insights confirmed outside the consent gate
- [x] The site's own attribution cookies gated on advertising consent, with the
      landing URL buffered in memory so accepting does not lose the campaign
- [x] `user_data` withheld without advertising consent — it was putting a
      declining visitor's raw email and phone in `window.dataLayer`
- [x] Verified in a browser: accept, reject, partial, returning visitor, and
      the modal re-sync bug
- [x] 38 unit tests, including snippet/module parity for all four combinations
- [x] `bun run test:tracking` asserts the consent default is at index 0
- [x] Performance measured, not asserted — `docs/consent-performance.md`
- [x] Cookie inventory written (`docs/cookie-inventory.md`)
- [x] `docs/consent-mode-runbook.md` written for the container work
- [x] `docs/client-brief.md` — what the firm has to hear and decide
- [x] Tag Manager: consent overview on, all eight tags reviewed and left on
      "No additional consent required" — they are all Google-built and carry
      their own checks. The eighth turned out to be the Conversion Linker
- [x] Tag Manager: container published, 22 September 2026
- [x] Verified on production, 22 September 2026, Tag Assistant plus DevTools,
      clean profile for each state:
      - consent default is dataLayer event **1**, ahead of `rk_page_view` at 6
      - both `Set` commands land (`ads_data_redaction`, `url_passthrough`)
      - undecided: four types denied, `functionality`/`security` granted
      - **reject**: update denies all four, conversion tag **fires** with
        `gcs=G100`, and no `_ga`, `_gcl_*`, `rk_caso`, `gclid` or `rk_ft_*`
      - **accept**: update grants all four, `gcs=G111`, cookies appear
      - **partial** (analytics on, advertising off): `gcs=G101`, `_ga` only
- [x] Measured: the ad click reference does **not** survive navigation for a
      declining visitor. `url_passthrough` decorates `<a>` clicks and Next's
      `<Link>` router takes the click first. Tested on production, incognito,
      22 September 2026. Consequence and why it is close to harmless: step 5
- [x] Go-live recorded as the reporting baseline: **22 September 2026, about
      13:00 Santiago** (19:00 Cyprus), set by the deploy rather than agreed in
      advance. Everything before that moment was measured on a different basis;
      phase 7 counts from it, and the hour matters when reading the first day
- [ ] `/politica-cookies` updated with the advertising category and the real cookie table
- [ ] `/politicas-de-privacidad` updated
- [ ] Banner and modal copy — reviewed 24 September 2026 and the firm is
      rewriting the banner paragraph, which they consider not entirely
      accurate. Ours stands until theirs arrives, marked `TODO(copy)` in the
      components; the sentence naming the buttons was corrected the same day
- [ ] Retention periods — the firm proposes six months on consent and nothing
      retained on refusal, and has asked what period is technically necessary
      for the reports. Ours to answer before they decide
- [ ] Decision 1 — what reaches Google when someone rejects. Still open, still
      due before **1 December 2026**
- [x] **The way back into the panel unblocked.** "Configurar cookies" in the
      footer is the only route to the settings panel once someone has chosen,
      and the chat bubble — fixed to the bottom-right corner — was sitting over
      it at common desktop widths (blocked at 1024 and 1280, clear at 1152,
      1400 and 1440; it depends on where the row lands when the page is
      scrolled to the end). Confirmed on the live site, not only locally. Two
      changes, both measured: `pointer-events-none` on the bubble's artwork,
      which is 70px inside a 56px button and was collecting clicks up to 14px
      outside its own hit area; and `lg:pb-24` on the footer, since the artwork
      reaches 87px up from the viewport bottom. Not z-index — every overlay
      here is on one flat `z-50`, so lifting the footer over the bubble would
      also lift it over the consent banner, which is fixed to the same corner
- [x] Verified against a production build on localhost, 24 September 2026, one
      clean session throughout: three buttons on the banner; **Rechazar todas**
      from the banner writes `{analytics:false, advertising:false, version:3}`
      and pushes an update denying all four; both switches open **off**; a
      returning visitor with a version 3 partial record still sees their own
      positions, so the new default does not overwrite a stored choice;
      "Guardar preferencias" untouched now writes a refusal; and a version 2
      record granting everything is asked again, with the pre-hydration snippet
      sending denied — the banner and the snippet agreeing is the part that
      matters. `bun run test:tracking` green on the same build
- [ ] Re-verify the same five on production once deployed
- [ ] Go-live of the 24 September changes recorded as a second baseline —
      consent will step down again and bidding will recalibrate
- [x] `COOKIE_CONSENT_SETUP.md` retired and `src/components/CookieConsent/README.md` rewritten

---

## Phase 4: Receive those steps in Analytics — live since 23 September 2026

Container published **23 September 2026, about 11:45 Santiago** (17:45
Cyprus). From that moment every `rk_*` signal reaches Analytics with its
labels; before it, Analytics held page views and enhanced measurement only, so
no funnel can start earlier. What is left is listed under **Outstanding**
below.

| | |
| --- | --- |
| **Where** | Tag Manager and Analytics. No code. |
| **Effort** | About half a day |
| **Result** | Every signal from phase 2 shows up in Analytics with its labels, and the four "finished" actions are marked as conversions there too. |

1. **In Tag Manager:** one rule that forwards every signal whose name starts with `rk_` to Analytics, passing the labels along. One rule instead of twenty means a future signal needs no Tag Manager change.
2. **In Analytics:** register the labels so they can be used in reports (Google calls this "custom dimensions"; without it the labels arrive but cannot be filtered on). The four that every funnel breaks down by — `form_name`, `page_type`, `location`, `percent_scrolled` — and the per-event ones the phase 7 questions depend on: `error_fields` and `fail_reason` (which field fails, why a send is refused), `step`, `cta_label`, `contact_method`, `message_number`, `previous_page_type` and `is_first_page`. Twelve event-scoped dimensions, well inside the property's limit of fifty. `previous_page` is left unregistered — it is a raw path, and the path report reads it from the page view itself. Mark the four finishing actions as conversions ("key events" in Google's current wording), plus `rk_chat_lead` — a finished enquiry, and marking it costs nothing because Analytics key events are not imported into Ads. The Ads-side decision for chatbot leads stays at phase 7. `rk_conv_whatsapp` counts once per session: people tap twice when the app is slow to open.

   **There is no Key events page any more** (September 2026). It was folded into **Data display → Events**, where an event is marked with a toggle on its row — and a row only exists once the event has arrived. So key events cannot be declared ahead of the tag; they are marked after publishing, and `rk_chat_lead` only after the first real chatbot lead. "Create event" on that page is something else — it derives a new event from existing ones — and must not be used for this.
3. **Build the audiences.** Once the signals land, "started a form and did not finish" and "reached a landing page and never scrolled to the form" become audiences that can be exported to Google Ads for remarketing. They cost nothing and they are the most valuable list the firm could advertise to.
4. **Verify:** in Analytics "DebugView", walk through the forms again and watch the signals arrive live. Publish the Tag Manager container.
5. **Hand-off note:** a one-page list of every signal, its labels and what it means, saved in this repository (`docs/tracking-events.md`), so whoever looks at this in a year can understand the reports.

### Google's automatic events

Analytics has a set of built-in events ("enhanced measurement"), each with its own switch. We keep the useful ones and turn off the ones that would collide with our signals:

| Automatic event | Keep? | Why |
| --- | --- | --- |
| Page views on navigation | **Yes, and verify** | The site never reloads between pages. Without this only the landing page counts. Verify in phase 1 that page views are neither missing nor doubled. Our `rk_page_view` carries the labels; this one keeps Google's own reports working. |
| Form start and submit | **Off** | Guessed from the HTML, wrong for a two-step form. Would sit next to our signals with similar names and contradict them. |
| Scroll (90%) | **Off** | Now that we send 25/50/75/100 ourselves, a fifth mark at 90% under a different name only invites someone to build a report on the wrong one. |
| Outbound clicks | Keep | Also logs WhatsApp clicks under a generic name, a useful cross-check. |
| File downloads | Keep | Harmless. |
| Site search, video | Irrelevant | Nothing on the site for them to see. |

Rule for everything else: the site decides what a signal means and sends it; Tag Manager only forwards. No click-on-selector or form-submission triggers built inside Tag Manager, because they break silently when the site's markup changes and cannot know which step or field the visitor was on.

### Outstanding — as of 23 September 2026

**Blocked on Analytics processing — cleared 24 September 2026; both steps below done.** The `rk_*` events reach Realtime and the Events report within minutes, but the Admin **Events** list and the audience builder's event picker only offer an event once it has been through processing — up to 48 hours. On publish day neither listed any `rk_*` event, so both steps below wait. Every conversion was triggered at least once on 23 September, including a test booking on each form, so all four should be listed — and `rk_chat_lead` too, which arrived the same evening. Still missing by Friday 25 September is a real fault, not the lag.

1. ~~**Key events.**~~ **Done 24 September 2026.** Data display → Events → "Mark as key event" on `rk_conv_contact_form`, `rk_conv_trabajadores_booking`, `rk_conv_empresas_booking`, `rk_conv_whatsapp` and `rk_chat_lead`; WhatsApp set to **once per session** from the ⋮ menu, the rest once per event.
2. ~~**Audience `Formulario iniciado sin enviar`.**~~ **Built 24 September 2026**, exclusion set to *Permanently* (the default, *Temporarily*, would let someone who has since contacted the firm drift back into the list). Data display → Audiences → New audience → custom. Include: `rk_form_start`, across all sessions. Exclude permanently, joined by **OR** not AND: the four `rk_conv_*` events and `rk_chat_lead` — WhatsApp and the chatbot included, since that visitor has already reached the firm. Membership 30 days, no audience trigger.
3. ~~**Audience `Landing sin ver formulario`.**~~ **Built 24 September 2026** with `page_type` matches regex `landing_(trabajadores|empresas)`, exclusion *Permanently*. Google's preview on saving: 26 landing viewers, 14 excluded, 12 in the audience — mostly our own test traffic, not a baseline. Include: `rk_page_view` with `page_type` matching `landing_trabajadores` or `landing_empresas`. Exclude permanently, by OR: `rk_form_view`, the four `rk_conv_*` and `rk_chat_lead`. Membership 30 days. If `page_type` is not offered as a parameter yet, page path containing `/habla-con-nosotros/` is an equivalent condition.

**Using the audiences in Ads — decided yes, 24 September 2026, with three conditions found checking Google's policy the same day.**

- **The trabajadores side is a policy risk.** Google's personalised-advertising policy lists *negative financial status* as a sensitive category, with "unemployment resources" among its examples, and for sensitive categories *your data segments* — the Analytics audiences — are not supported at all ([policy](https://support.google.com/adspolicy/answer/143465), [category](https://support.google.com/adspolicy/answer/16700443)). Dismissal claims are not named, but ads to recently dismissed workers are exactly what a reviewer could read as that category. Empresas carries no such risk. So: use the lists on the empresas campaign first; on trabajadores add them as **Observation** only, which reports how the list performs without targeting it, and watch the campaign's policy status before switching to Targeting.
- **The two audiences mix both forms**, so neither is fit to target a single campaign. **Split 24 September 2026** into four more, duplicated from the originals with one condition changed (GA4 does not allow editing a saved audience's conditions): `Formulario iniciado sin enviar · Trabajadores` / `· Empresas` (`form_name` exactly matches), and `Landing sin ver formulario · Trabajadores` / `· Empresas` (`page_type` exactly matches `landing_…`). Exclusions unchanged, `rk_form_view` still without a parameter so seeing any form counts. The two combined originals stay for reading in Analytics — they are the only ones that include the `/contacto` form. Only the split ones go to Ads.
- **List size is 100, not a thousand.** Google lowered the minimum to 100 active users across Search, Display and YouTube, fully rolled out December 2025. Only visitors who accepted advertising are added, so the lists fill slower than the Analytics preview suggests. Twelve on the day they were built, most of it our own testing.

**Found during verification, not tracking work.** Walking the forms turned up two faults in the forms themselves:

- **Fixed, live** (commit 30ab9a3; confirmed 24 September 2026 by finding the new message in the production bundle): reCAPTCHA failing mid-request left the booking forms spinning forever with no message and no `rk_form_fail`, and a captcha refused on the contact form showed nothing and reset the service select and consent box. Reproduced against the live build; `getCaptchaToken` now always settles within ten seconds, and all three forms show one message and fire `rk_form_fail` with `fail_reason: captcha`.
- **Unexplained, closed as unresolvable — 24 September 2026:** one `rk_form_fail` with `fail_reason: exception` on the **empresas** form during the 23 September test. The server action catches its own errors, the payload is plain data and nothing was deployed that day, so the likeliest cause is the server call itself hanging or failing — which would mean a booking the server completed while the visitor was told nothing. The logs that could say which are gone: the Vercel project is on the free plan, which keeps runtime logs for an hour at most, and the action's `console.error` goes nowhere else. What remains is to watch the rate. `rk_form_fail` by `fail_reason` in Analytics shows whether `exception` recurs on real visitors; if it does, a durable error record — an error tracker, or the failure written to the Sheet — is the only way to catch the next one, since the logs will have expired before anyone looks.

### Checklist

- [x] Enhanced measurement: form interactions off, scroll off, page views on navigation verified — one `page_view` per navigation in DebugView, 23 September 2026
- [x] Tag Manager: non-production exception rebuilt as a Custom Event `.*` trigger on `Page Hostname does not equal www.rkabogados.cl`, published 22 September 2026 — preview verification is in the final sweep
- [x] Tag Manager: `Solo enlaces` trigger and the `First Name` / `Last Name` variables deleted; cross-domain linking unticked; Google tag renamed from `RyO Asociados` to the firm's name in Ads
- [x] Tag Manager: `CE - rk_* events` trigger (Custom Event, regex `^rk_.*`), twelve `DLV - <label>` variables, one `GA4 - rk_* events` tag with event name `{{Event}}` and the twelve labels as parameters, non-production exception attached. `user_data`, `conversion_value` and `previous_page` deliberately not forwarded — the first is email and phone, which must never reach Analytics; the second a placeholder that would read as revenue
- [x] ~~"Include user-provided data" on the conversion tags~~ — the option no longer exists in this account's Tag Manager, on the conversion tags or the Google tag. The User-provided Data Event tag stays as the mechanism; Ads rates it "Excellent", and its "Failed" status in Tag Assistant is cosmetic
- [x] Ads diagnostics: Formulario Contacto received user-provided data from the 22 September test send within the hour — all three forms confirmed, nothing in the container to change
- [x] Analytics: twelve custom dimensions registered (see step 2), dimension name identical to the parameter name
- [x] Analytics: key events marked, 24 September 2026 — the four `rk_conv_*` and `rk_chat_lead`, WhatsApp once per session, the rest once per event. Marked with the star on the event's row; `form_start` and `form_submit` still listed from before enhanced measurement's form interactions went off, and deliberately left unstarred
- [x] Audiences built in Analytics, 24 September 2026 — `Formulario iniciado sin enviar` and `Landing sin ver formulario`, both excluding permanently, 30-day membership
- [ ] Audiences used in Ads — decided yes, 24 September 2026. Empresas first; trabajadores in Observation until the policy status is known; lists split by form, 24 September 2026; each list must reach 100 before it can serve. See Outstanding
- [x] Verified in Tag Assistant preview and DebugView on production, 23 September 2026: page views, scroll marks, navigation labels, the forms, and the chatbot's open, first message, numbered messages and handoff. No label carried over to the next event; no `user_data` on any event; the tag blocked on `localhost`. The chatbot lead was not sent — it emails the firm
- [x] Container published, 23 September 2026, about 11:45 Santiago
- [x] `docs/tracking-events.md` written, and updated for the published rule

---

## Phase 5: Build the funnel reports — done 24 September 2026

Eight explorations built and shared, every funnel broken down by channel, and
the six funnels plus `Artículos del blog` published in the firm's Reports menu
as the `RK Abogados` collection. Two blog explorations and a home page path
were added on the day, beyond the original five funnels and one path. The
written guide was dropped the same day in favour of a recorded walkthrough at
the end of phase 7. What the reports showed on day one is recorded under the
path report and in `docs/client-suggestions/`; none of it is to be read as a
finding before about 21 October.

| | |
| --- | --- |
| **Where** | Analytics, "Explore" section. Shared with the client's login. |
| **Effort** | About one day. The written guide first planned here became a recorded walkthrough at phase 7 |
| **Result** | Five reports the client can open any time, each showing how many people reach each step and where they leave, broken down by campaign, by source (ads, Google search, direct, social), and by device. |

### The funnels

**Workers booking**
Arrived → Saw form → Started → Date and time chosen → Details sent → Booked

**Companies booking**
Arrived → Saw form → Started → Date and time chosen → Details sent → Booked

**Contact form**
Arrived → Reached `/contacto` → Started → Sent → Received

**Chatbot**
Arrived → Opened the chat → Sent a first message → Gave contact details → Lead emailed to the studio

with the weaker branch alongside it: first message → handed the WhatsApp number → wrote on WhatsApp. Reading the two together answers whether the bot is finishing conversations itself or merely passing them on.

**Any contact**
Arrived → Read past half the page → Booked, wrote on WhatsApp, left contact details with the chatbot, called or emailed

The last one is the number the client cares about most: of everyone a campaign brought, what share made contact by any channel. The others tell us why the rest did not.

Alongside the funnels, one "path" report: for visitors who reached a landing page and left without contacting, where did they go instead? With `page_type` and scroll depth attached, this is the report that usually points at a missing piece of information — price, location, who the lawyers are.

### Corrections to the funnels above — 23 and 24 September 2026

Written before the signals existed; checked against what the site actually sends, four steps promise more than Analytics can see, and a fifth broke on building.

1. **"Wrote on WhatsApp" is not visible.** The chatbot branch can show the bot offering the number (`rk_chat_handoff`) and the visitor tapping it (`rk_conv_whatsapp` with `location = chatbot`). Whether they then wrote happens inside WhatsApp; only the Caso code in the Sheet can tell.
2. **"Called or emailed" is a click, not a call.** `rk_contact_click` fires when the number or address is tapped. Label it "tapped phone or email" in the report and the walkthrough, or the any-contact number overstates.
3. **"Gave contact details" and "lead emailed" are one event.** The bot collects and emails in one tool call; the site sees `rk_chat_lead` when the email went, `rk_chat_lead_fail` when it did not. A funnel cannot use the same event for two consecutive steps, so the chatbot funnel ends at `rk_chat_lead`, and the failures are counted beside it rather than inside it.
4. **The any-contact funnel cannot require half-page scroll.** Funnel steps cannot be skipped, and the WhatsApp button in the landing heroes is tapped without scrolling — the most common contact on the site would drop out at step 2. It is two steps, arrived and contacted; scroll depth is read from the landing funnels instead.
5. **Neither landing funnel can require half-page scroll either** — found 24 September 2026 while building the workers funnel. The form is reachable without passing 50%: it sits above that mark, and the hero's CTA jumps straight to it, so `rk_form_view` can fire before `rk_scroll` 50. A funnel demands its steps in order, so the scroll step dropped people who plainly saw the form and made the result depend on page layout. Both landing funnels start at arrival and go straight to seeing the form; scroll depth is read on its own, as a free-form table of `rk_scroll` by `percent_scrolled` and `page_type`.

### How to build them

Every report is in **Explore → Blank**, one exploration per report, named as below so the client finds them. Settings shared by all five funnels:

| Setting | Value |
| --- | --- |
| Technique | Funnel exploration, standard funnel |
| Date range | **Last 28 days** (the preset). A custom range keeps its end date, so a report opened in November would still show September, and a shared exploration is read-only to the firm. Before 23 September 11:45 there are no `rk_*` events to distort anything; our own test traffic of the 23rd is inside the window until about 21 October, which is before anyone should read these anyway |
| Open funnel | **Off.** Everyone counted entered at step 1 |
| Between steps | "Indirectly followed by" (the default) — other events in between are fine |
| Breakdown | **`Session default channel group`** as the default, decided 24 September 2026 — Paid Search, Organic Search, Direct, Referral, Organic Social — because the firm's first question is organic or paid, and a campaign breakdown files everything unpaid under "(organic)" and "(direct)". Switch to `Session campaign` to compare Ads campaigns, or `Device category`, by dragging it onto the Breakdown slot; one at a time, and the exploration keeps whichever was applied last, so leave the channel one on before sharing. Paid only reads as paid where it is tagged: Google Ads is, by auto-tagging; anything else needs `utm_*` on its links |
| Show elapsed time | On — time between steps is half the diagnosis |

Parameter conditions (`form_name`, `step`, `page_type`…) are added inside a step with **Add parameter**; they are the custom dimensions from phase 4 and match on the exact value. Scroll depth is text: `percent_scrolled` exactly matches `50`.

`session_start` is Google's own event, fired as a visit begins and before its first page view. It is the "arrived" step wherever the next step could be the landing page itself — using `rk_page_view` there would need a *second* page view, and visitors who land straight on the page would vanish.

**`RK · Embudo trabajadores`**

| # | Step | Event | Conditions |
| --- | --- | --- | --- |
| 1 | Llegó a la landing | `rk_page_view` | `page_type` = `landing_trabajadores` |
| 2 | Vio el formulario | `rk_form_view` | `form_name` = `trabajadores` |
| 3 | Empezó | `rk_form_start` | `form_name` = `trabajadores` |
| 4 | Eligió fecha y hora | `rk_form_step` | `form_name` = `trabajadores`, `step` = `1` |
| 5 | Envió sus datos | `rk_form_submit` | `form_name` = `trabajadores` |
| 6 | Reservó | `rk_conv_trabajadores_booking` | — |

No scroll step — see correction 5. The gap between 5 and 6 is technical failure, not hesitation — read it next to `rk_form_fail` and its `fail_reason`.

**`RK · Embudo empresas`** — identical, with `landing_empresas`, `form_name` = `empresas` and `rk_conv_empresas_booking`.

**`RK · Embudo contacto`**

| # | Step | Event | Conditions |
| --- | --- | --- | --- |
| 1 | Llegó al sitio | `session_start` | — |
| 2 | Abrió /contacto | `rk_page_view` | `page_type` = `contacto` |
| 3 | Empezó | `rk_form_start` | `form_name` = `contacto` |
| 4 | Envió | `rk_form_submit` | `form_name` = `contacto` |
| 5 | Recibido | `rk_conv_contact_form` | — |

No "saw the form" step: on `/contacto` it is on screen at load, so the step would equal step 2.

**`RK · Embudo chatbot`**

| # | Step | Event | Conditions |
| --- | --- | --- | --- |
| 1 | Llegó al sitio | `session_start` | — |
| 2 | Abrió el chat | `rk_chat_open` | — |
| 3 | Escribió | `rk_chat_first_message` | — |
| 4 | Dejó sus datos | `rk_chat_lead` | — |

The weaker ending is a second tab in the same exploration, `RK · Chatbot a WhatsApp`: steps 1–3 as above, then `rk_chat_handoff`, then `rk_conv_whatsapp` with `location` = `chatbot`. Beside both, a free-form tab counting `rk_chat_lead_fail` — any non-zero value is an enquiry the firm never received.

**`RK · Cualquier contacto`**

| # | Step | Event | Conditions |
| --- | --- | --- | --- |
| 1 | Llegó al sitio | `session_start` | — |
| 2 | Contactó | any of, joined by **OR**: `rk_conv_trabajadores_booking`, `rk_conv_empresas_booking`, `rk_conv_contact_form`, `rk_conv_whatsapp`, `rk_chat_lead`, `rk_contact_click` | — |

The headline figure is step 2 over step 1, by channel. A second tab, `Por canal`, shows which channel the contact came through — as a **free-form** table, not a funnel breakdown, since a funnel breakdown is not reliably taken from the step's own event: rows `Event name`, values `Active users` and `Event count`, filter Event name matching regex `rk_conv_.*|rk_chat_lead|rk_contact_click`.

**`RK · Qué hicieron los que no contactaron`** — Path exploration, not a funnel.

| Setting | Value |
| --- | --- |
| Starting point | **Page path and screen class** — `/habla-con-nosotros/trabajadores`, then `/habla-con-nosotros/empresas` in a second tab |
| Node type | Page path and screen class |
| Segment | Users excluding anyone with any `rk_conv_*` or `rk_chat_lead` event — built in the exploration, so it does not wait for the phase 4 audiences |
| Date range | Last 28 days, as for the funnels |

Path explorations only accept Google's own node types, so `page_type` cannot be a node — the path reads raw URLs, which on this site is readable enough.

Two things found building it, 24 September 2026. **Values must be `Active users`** — the default counts events: 1,636 on the workers page, against 1,269 people once switched. That is not comparable with the funnel's 11 either: the path reads Google's `page_view` across all 28 days, the funnel `rk_page_view`, which exists only from 23 September 11:45. The window also straddles the consent go-live of 22 September — before it every visitor counted, after it a decliner does not — so the path mixes two measurement regimes until about 21 October. And **the segment is weaker than the path until about 21 October**: the path reads Google's own `page_view` across the full 28 days, but `Sin contacto` can only exclude people whose contact reached Analytics, which is from 23 September 11:45. Anyone who booked before then is counted as not having contacted. Read it as indicative until the window lies entirely after the 23rd.

**A third tab, `Desde el inicio`** — added 24 September 2026. Starting point `/`, Values `Active users`, and **no segment**: on the home page the question is not where non-contacts went but whether visitors find their way at all — to the two booking pages, or off to `/nosotros`, `/faqs`, the blog, or out. Excluding people who contacted would hide exactly the ones who navigated well. It is also where visitors first choose between workers and companies, so it is the place to look for the crossover below. Same caveat as the other tabs until about 21 October.

**A question for phase 7, from the first look.** The largest exit from `/habla-con-nosotros/trabajadores` was to `/habla-con-nosotros/empresas` — 95 events against 44 to the home page. Either visitors are unsure which page is theirs, or something on the page sends them across. Re-read on Active users after 21 October before drawing anything from it.

**And from the home page, the same day** (`Desde el inicio`, 28 days, Active users, all visitors). Of 250 people on `/`, the next page was `/nosotros` for 44, the workers' booking page for 22, `/blog` and `/contacto` for 14 each, the companies' booking page for 13 — about 14% straight to a booking page, and "who are the lawyers" the most common move. That is the missing-information pattern this report was built to find. The crossover shows here too: 4 of the 22 who reached the workers' page went on to the companies' page. Same caveat — indicative until about 21 October.

### The blog — added 24 September 2026

The firm pays for traffic to the blog, so "do blog readers become clients" needs its own answer; the any-contact funnel folds them in with everyone. Two explorations.

**`RK · Embudo blog`** — funnel, settings as for the others.

| # | Step | Event | Conditions |
| --- | --- | --- | --- |
| 1 | Leyó un artículo | `rk_page_view` | `page_type` = `blog_post` |
| 2 | Pasó a una página de contacto | `rk_page_view` | `page_type` matches regex `landing_trabajadores\|landing_empresas\|contacto` |
| 3 | Contactó | any of, by **OR**: the six events of `RK · Cualquier contacto` step 2 | — |

A reader who taps WhatsApp straight from the post skips step 2 and drops out, so a second tab, `Por artículo`, is free form: rows `Landing page + query string`, values `Active users` and `Key events`, filter Landing page + query string **begins with** `/blog/`. Each article people *arrived on*, how many came, how many contacted — independent of the steps in between, and the table that answers the money question. Add `Average engagement time per active user` to its values: seconds the article was actually on screen and in focus, measured even when it is the only page viewed.

A third tab, `Lectura`, is free form: rows `Page path and screen class`, columns `percent_scrolled`, values `Active users`, filters Event name exactly `rk_scroll` and page path begins with `/blog/`. Kept apart from `Por artículo` because that tab counts by the page landed on and this one by the page scrolled — in one table the scroll columns would split the people and contacts too. For phones, filter or split by `Device category` = `mobile`. **100 is the bottom of the whole page**, and on a phone the contact box comes straight after the article, then related posts and the footer — so a reader passes the box well before 100. The `75` column is the nearer proxy for "reached the end of the article, and the box", and where exactly the box falls depends on the article's length. Unlike engagement time, the tab only has data from 23 September 11:45, and from consenting visitors: six people on the day it was built, none at 100. Read from 50: the 25 mark can fire on load, since it measures where the bottom of the screen reaches, not whether the reader scrolled.

**`rk_cta_view`, added 24 September 2026**, replaces the estimate with a count: the blog's contact box reports when it comes on screen, with `location` = `blog_post`. On a phone it fires only when the reader reaches the box — at 74% of the page on the most-read article, measured in a production build, which is why the `75` column was the right proxy. On desktop the box is a sticky sidebar and fires on arrival for nearly everyone, so read it on mobile. `location` is already a registered dimension and the `rk_*` rule forwards it, so no Tag Manager or Analytics change. It has its own tab in `RK · Embudo blog`, `Caja de contacto`: free form, rows `Page path and screen class`, values `Active users`, filters Event name exactly `rk_cta_view`, page path begins with `/blog/`, Device category exactly `mobile`. Built 24 September 2026, before the event was deployed — a free-form filter matches typed text, unlike the funnel's event picker, so it needs no data first; the rows appear once the first event is processed. Read it beside `Lectura`: that tab says how far readers scrolled, this one how many reached the box.

Time and depth read together — long and deep: they got their answer and left, the case for a call to action at or before the end; short and shallow: the article or the ad missed, not the layout; long and shallow: they read the top closely and stopped, the case for one early.

**`RK · Recorrido desde el blog`** — path exploration. A path's starting point takes one page and no wildcard, so it starts from the **event** `session_start`, with every later step on `Page path and screen class`, and a **session** segment `Entró por el blog`: Landing page + query string begins with `/blog/`. Step +1 is then the article landed on, step +2 where they went from it. Covers visits that *began* on the blog, which is what paid blog traffic is; not someone who reads a post mid-visit. Values `Active users`.

Step +1 splits into one branch per article, thin at this volume. If it is unreadable, the tidier version is to send `page_type` as the Google tag's `content_group` in Tag Manager — one field, value already in the dataLayer — so every article collapses into one `blog_post` node. Not retroactive, and a container change, so only if the per-article version fails.

For a WhatsApp contact, the Sheet's `ft_landing` is the stronger evidence than either: it records the first page a person ever landed on, a blog post read days earlier included.

### Testing a funnel: not with Tag Assistant open

Found 24 September 2026 building the workers funnel. A test booking made on 23 September with Tag Assistant open reached step 5 and never showed as booked — not even with the funnel opened — although the event was in the Admin events list. A booking made the next day in a plain window, cookies accepted, showed in Realtime within the minute. Preview mode marks every event as debug traffic: DebugView and the Admin list show it, reports and Explore may not. So a funnel is checked with a real walk in a normal window and read the next day, when Explore has processed it; Tag Assistant is for checking what the container fires, not for filling a funnel. A real walk is a real booking — the firm gets the email, the Sheet a row, Ads a conversion — so name it `PRUEBA – no contactar` and delete the Sheet row after.

### When to read them

Build as soon as the events are selectable in Explore — the same processing lag as the phase 4 audiences, so 24 September afternoon. **Read them no earlier than two weeks after.** At this traffic a step holds a handful of people for the first days, and one visitor moves a percentage by twenty points.

Sharing: an exploration belongs to whoever built it; **Share** makes it read-only for everyone with access to the property. The firm needs its own Google account with at least Viewer on the property — confirm before promising "reports they can open any time".

### The written guide — dropped

Replaced on 24 September 2026 by a recorded walkthrough, made at the end of phase 7 when the reports hold a month of real numbers. See phase 7, **Handover**.

### Checklist

- [x] Funnels checked against the signals and turned into step-by-step recipes, 23 September 2026 — four corrections, see above
- [x] Workers funnel, 24 September 2026 — six steps, no scroll step (correction 5); a real test booking the same day to confirm the last step, since the 23 September test was made in preview mode
- [x] Companies funnel, 24 September 2026 — duplicated from the workers funnel, values switched to `empresas`
- [x] Contact form funnel, 24 September 2026
- [x] Chatbot funnel, 24 September 2026 — three tabs: `Chatbot`, `Chatbot a WhatsApp`, and `Leads fallidos` (free-form, empty on the day it was built, as it should be)
- [x] Any-contact funnel, 24 September 2026, with the free-form `Por canal` tab
- [x] Path report, 24 September 2026 — segment `Sin contacto` (user segment, permanent exclusion), one tab per booking page
- [x] Blog funnel, with the `Por artículo` tab, 24 September 2026. `rk_contact_click` not yet in step 3 — see the final sweep
- [x] Blog path report, 24 September 2026 — first reading in `docs/client-suggestions/month_2026_09.md`, entry 2026-09-1
- [x] Home page tab `Desde el inicio` in the path report, 24 September 2026 — first reading under the path report
- [x] `Session default channel group` as the breakdown on every funnel tab, 24 September 2026 — seven tabs across the six funnel explorations. None had one before: the Session campaign breakdown in the recipe had never been applied. `Session campaign` is imported per exploration only when comparing Ads campaigns; the funnel shows 5 rows per breakdown by default, raised under Rows per dimension
- [x] The firm's own Google account has access to the property — confirmed 24 September 2026: they granted ours, so they hold at least administrator
- [x] Reports menu, 24 September 2026: collection `RK Abogados`, published, in the left-hand Reports menu for everyone on the property. Topic `Embudos` holds the six funnels saved as reports (names without "RK ·", Spanish one-line descriptions); topic `Blog` holds `Artículos del blog`, a detail report from the Landing page template — filter landing page begins with `/blog/`, metrics Active users, Key events and Average engagement time per active user, bar chart only (a line per article is noise at this volume). Everything else stays in Explore: path reports have no menu equivalent, column-spread tables like `Lectura` do not survive the move, and the diagnostic tabs are ours rather than the firm's. Elapsed time between steps is also Explore-only
- [x] All eight explorations shared, 24 September 2026. GA4 offers no per-user choice: sharing makes an exploration read-only for everyone with access to the property, so check Admin → Property access management for anyone who should not be on that list
- [x] ~~Guide in Spanish~~ — dropped 24 September 2026, replaced by the recorded walkthrough in phase 7

---

## Phase 6: One-page dashboard (stretch)

| | |
| --- | --- |
| **Where** | Looker Studio, Google's free report builder. A link the client opens like a Google Doc. |
| **Effort** | About one day |
| **Result** | One page that combines money spent in Ads with results on the site: spend, clicks, visits, forms started, bookings, WhatsApp clicks, and cost per booking, per campaign, week by week. |

The funnels in phase 5 live inside Analytics and require logging in and finding them. They also cannot show money, because spend lives in Ads. The dashboard puts spend and outcomes side by side, which is the question an owner actually asks: "what did each campaign cost me per booked call?" It is free. Only the paid "Pro" tier adds scheduled emails and team folders, which a firm this size does not need.

This is also the only place where search terms can be analysed properly — see the note in section 10 — by blending Search Console with Analytics on the landing page.

Build it only after the client has looked at the phase 5 funnels for two or three weeks and told us what they keep wanting to see. Otherwise we guess at the layout.

---

## Phase 7: Watch, then review

| | |
| --- | --- |
| **Where** | A call with the client, plus a short written summary. |
| **Effort** | Half a day, about four weeks after phase 5 goes live |
| **Result** | The first concrete findings and a prioritised list of what to change on the site and in the campaigns. |

Funnels need a few hundred visits per step to say anything reliable. The month is also counted from the consent go-live in phase 3, not from whenever the code shipped: everything before that date was measured on a different basis and mixing the two produces a drop that is not real. After roughly a month we read them together and write down what stands out: the step with the largest loss, the campaign with the worst ratio, the device where the form fails, the field that produces the most errors, the point on the page where readers stop scrolling. Each finding comes with one suggested change. This is where the value of the whole project shows, so it belongs in the offer rather than being left to chance.

### Final sweep

Small items deliberately postponed from earlier phases, to be closed in one sitting before the review call rather than one at a time as they came up. None of them blocks the phases in between.

- [ ] Phone walk of the workers form and a WhatsApp tap (from phase 2): confirmed by the Sheet row and Ads diagnostics staying healthy
- [x] Apps Script: the eight `ft_*` columns (from phase 2) — done 22 September 2026 with the move to the firm's own Sheet, see phase 2 checklist
- [x] Preview and test traffic kept out of the live Sheet (finding 4 of the 22 September review): the Apps Script URL is now `NEXT_PUBLIC_SHEET_WEBAPP_URL`, set in production only; unset means `logToSheet` is a no-op
- [ ] Container's non-production exception verified on a preview URL with Tag Assistant: Google tags blocked on load, conversion tag blocked on a WhatsApp click
- [x] Old `Click Whatsapp RK` action removed, 24 September 2026 (from the phase 1 open list)
- [x] `Cliente convertido` understood, 23 September 2026 — nothing uploads to it; kept for section 10, see phase 1
- [ ] `docs/tracking-events.md` re-read against the code one last time
- [ ] `rk_contact_click` included in the contact step of `RK · Cualquier contacto` and `RK · Embudo blog`. On 24 September 2026 it had never fired, so the event picker did not offer it; tap a footer phone number once to seed it if it is still missing
- [ ] The four split audiences (phase 4) listed in Google Ads → Audience manager → Your data segments, source Google Analytics. Expected within a day or two of 24 September 2026; both prerequisites confirmed 24 September 2026: the Analytics link's personalised advertising is Enabled, and ads personalisation is on for Chile under Admin → Data collection. Missing by then is a fault to raise with Google, not a setting
- [ ] Each split audience at 100 or more: the empresas pair added to the empresas campaign as Targeting, the trabajadores pair to theirs as Observation, and the trabajadores campaign's policy status checked a week later before any move to Targeting
- [ ] The Analytics → Ads link still shows the account as `RyO Asociados` although the Ads account was renamed. Analytics appears to keep the name from when the link was made; cosmetic, not worth relinking. Check whether it has caught up

### Handover: a recorded walkthrough

The last step of the plan. After the review call, a screen recording in Spanish
that the firm can replay whenever they open Analytics, in place of the written
guide first planned for phase 5. Recorded at this point on purpose: the reports
then hold a month of numbers from after both the consent go-live and the
tracking go-live, so the examples on screen are real.

What it covers, in about ten minutes:

- Where the reports are: Reports → **RK Abogados** in the left menu — `Embudos`
  and `Blog` — and Explore → *Shared with me* for the deeper ones.
- How to change the date range, and why a funnel reads as people, not visits.
- How to read one funnel end to end — the drop between two steps, and
  switching the breakdown between channel and campaign.
- Three questions answered on screen, with the clicks: which channel brings
  contacts, where the most people give up, which blog articles bring clients.
- What the numbers cannot show: visitors who reject cookies, and a WhatsApp
  conversation after the tap. The Sheet's Caso code is where those live.

Sent as a link, not an attachment, so it can be re-recorded when the reports
change without the firm keeping an old copy.

- [ ] Walkthrough recorded in Spanish and the link sent to the firm

---

## Phase 8: Read the reports automatically (recurring, optional)

| | |
| --- | --- |
| **Where** | This repository: a skill plus MCP server configuration. Nothing in the site, nothing in the client's accounts beyond read access. |
| **Effort** | One day to set up, then roughly an hour a month to run and edit the output |
| **Result** | A written analysis once a month — what changed, what is out of line, what to try next — drafted from the live data and reviewed by a human before it goes anywhere near the client. |

Phase 7 is one reading, once. The reports only pay for themselves if somebody keeps reading them, and the honest reason that does not happen is that opening five funnels and a Search Console property costs an hour nobody has. This phase removes that hour and makes phase 7 repeat every month.

Analytics, Search Console, Google Ads and the Google Sheet can all be connected to Claude through MCP servers, which means the model reads the real numbers through the APIs rather than a screenshot or a summary somebody typed. A skill in this repository fixes the questions asked each time, so one month's run is comparable with the next.

### What connects, and how

| Source | How | Status |
| --- | --- | --- |
| Analytics (GA4) | Google's own MCP server over the Data API (`analytics-mcp`, which includes `run_funnel_report`) | **Connected 24 September 2026.** Logs in as a service account in our own Google Cloud project, added to the property as **Viewer** — no OAuth screen and nothing that expires, and the firm revokes it by removing one user. Registered in Claude Code at user scope rather than in `.mcp.json`, because the key file is machine-specific and never enters the repository. |
| Search Console | Community MCP server over the Search Console API | Ready. Queries, impressions, CTR per page. |
| Google Ads | Community MCP server over the Google Ads API | **Needs a developer token with Basic Access**, approved manually by Google. Days, not hours. Start the request early or the first runs have no spend data. |
| Google Sheet (Caso codes) | Service account, or a Sheets MCP server | Ready. This is where the case outcomes live once section 10's first item happens. |
| Tag Manager | Official API | Useful for configuration audits — has a signal stopped firing since the last release — rather than for reporting. |
| Looker Studio | — | No read API, and none needed. It is a presentation layer over the same sources this reads directly. |

### The skill

`.claude/skills/monthly-report/` holds the questions, not the answers. Fixed, so nothing drifts between runs:

- Step-by-step funnel movement against the previous month, per campaign and per device.
- Campaigns whose cost per contact sits outside their own recent range.
- Forms, fields and devices with an error rate above their baseline.
- Scroll depth on the landing pages and the blog: where reading stops, and whether the form sits below that point.
- Search Console queries that gained or lost position on pages that produce contacts.
- Anything that moved more than the month's noise, stated with the number.

Run it with `/loop` locally, or as a scheduled cloud agent. Output is a draft, always: it goes to the client only after someone has read it and removed what does not hold up.

### What to be careful about

**Cadence: monthly, on everything, for now.** At this traffic a weekly reading is mostly noise, and a report that cries wolf gets ignored by the third one. If ad spend grows enough that a month is too long to wait on a campaign going wrong, split it then — spend weekly, funnel monthly — and not before.

**The consent undercount applies here too.** The model reads the same partial data as everybody else. It has to be told that in the skill, or it will read a consent-driven step down as a collapse in demand.

**Read-only access.** Every connection is read. Nothing in this phase writes to Ads, Analytics or the Sheet. The offline-conversion upload in section 10 is a separate piece of work with a separate decision behind it.

### Checklist

- [ ] Google Ads developer token requested (do this first — approval is the long pole)
- [ ] MCP servers configured with read-only credentials — Analytics done 24 September 2026 (user scope, service account as Viewer); Search Console, Ads and the Sheet still to do
- [ ] Skill written with the fixed question set and the consent caveat
- [ ] Two runs compared by hand against the Analytics interface before anything is sent to the client
- [ ] Cadence and delivery format agreed with the firm

### Pricing

Not part of the core scope and not part of the EUR 1,000. It belongs to the monthly follow-up conversation: the setup day plus the recurring hour a month is what a retainer would cover. Offer it after the client has read the phase 7 review, not before — the point lands when they have seen one analysis and want the next one without asking.

---

## 9. What the client gets, and effort

Source material for the client document, not the client document itself. The client version is written in Spanish, drops every file path and event name, and leads with what the firm gets rather than what we build. What follows is the substance to draw from, in English, so the scope is unambiguous to whoever implements it.

Effort is in working days; pricing goes on top.

### The offer, in substance

> #### Understanding which campaigns bring clients, and where you lose the rest
>
> Today your Google Ads account counts how many people booked a call or wrote on WhatsApp. It cannot tell you why the others did not, and your Analytics account cannot tell you which campaign each visitor came from. This work connects the two and makes the site report every step a visitor takes towards contacting you.
>
> **You will receive**
>
> 1. **Connected accounts.** Google Ads, Analytics and Search Console linked, with the Analytics property configured to keep 14 months of history, exclude your own office traffic, and stop crediting WhatsApp for visits your campaigns paid for.
> 2. **Step-by-step tracking on the site.** Every moment on the way to a contact is recorded: which page, how far down it they read, seeing the form, starting it, choosing a date, failing a field, sending, succeeding, clicking WhatsApp, calling, emailing, pressing a button, opening the chatbot and what the conversation led to. Each one labelled by form, page and position.
> 3. **A reference code for every visitor, not only Google ad clicks.** Today the code that lets you connect a WhatsApp conversation back to a campaign is only created for visitors arriving from a Google ad on a desktop. It will be created for everyone — Instagram, email, Google search, iPhone — and the campaign that brought them is remembered for ninety days, so someone who finds you on Monday and books on Wednesday is still credited to what brought them.
> 4. **A cookie banner that works, with a separate advertising choice.** What a visitor chooses actually controls what Google stores, and measurement and advertising become separate decisions rather than one checkbox — which is what the data protection law coming into force in December 2026 is aimed at. Your published cookie policy is brought in line with what the site actually loads, which today it is not.
> 5. **Five funnel reports in Analytics.** Workers booking, companies booking, contact form, chatbot, and "any contact". Each shows how many people reach each step and where they leave, broken down by campaign, traffic source and device. Plus a report showing where people go instead of contacting you.
> 6. **Remarketing lists.** Everyone who started a form and did not finish, ready to advertise to. Built once, refreshed automatically, no extra cost.
> 7. **A recorded walkthrough in Spanish** of how to open and read the reports, with worked examples on your own numbers, after the one-month review.
> 8. **Documentation** of every signal, kept with the website code, so future changes stay consistent.
> 9. **A review after one month** with the first findings and a prioritised list of improvements for the site and the campaigns.
> 10. **Telling Google which contacts became real clients.** The join is already built into the work above; what you add is a mark in your sheet against each booking or conversation — client or not — kept up to date within 90 days of the click, and Google Ads reads it every day. The single highest-value step in the whole project, and the only one that depends on a habit rather than on software.
>
> **Optional**
>
> - **One-page dashboard** combining advertising spend with results: cost per booked call, per campaign, week by week. Shared as a link, no login into Analytics needed.
> - **A monthly reading of the reports**, done by hand and with AI reading the live data, with suggestions on what to change to get more contacts. The first one is included; continuing every month is a separate arrangement.
> - **Custom tables in Looker (EUR 200)**, for questions Analytics cannot answer — above all which Google searches bring people who actually make contact. Left for later, since the tables are built around questions that only surface once you have read the reports.
>
> **What does not change**
>
> The way your Google Ads conversions are counted is untouched — the same four actions, the same tags, no renaming or re-importing. Nothing visible changes on the website for visitors, apart from the cookie banner gaining a third option.
>
> **Two things to be clear about**
>
> **Your conversion numbers in Google Ads will drop, and that is the work doing its job.** Today the site tracks everyone regardless of what they choose in the cookie banner. Once the banner actually works, visitors who decline stop being counted. Nobody stops contacting you — the same number of people book and write as before — but Ads sees fewer of them. Expect a visible step down the week it goes live, and do not read it as campaigns getting worse. If your campaigns use automatic bidding, Google will take a couple of weeks to settle at the new numbers, and anything you compare afterwards has to be measured from that point rather than against the months before.
>
> **Visitors who decline cookies cannot be measured at all.** Google offers to estimate them statistically, but only for sites with far more traffic than yours, so they will simply be absent. The funnels describe the visitors who accept: the proportions between steps stay reliable, the absolute totals are an undercount.

### Effort

| Phase | What | Days |
| --- | --- | ---: |
| 2 | Site tracking, all signals, scroll, attribution, chatbot leads, testing on preview | 2.5 – 3 |
| 3 | Advertising consent category, Consent Mode, policy pages, verification | 1.5 |
| 4 | Tag Manager rule, Analytics labels, conversions, audiences, docs | 0.5 |
| 5 | Funnels, path reports, Reports menu collection | 1 |
| 7 | Review after one month | 0.5 |
| 10 | Case outcomes from the Sheet to Google Ads — in the core since 23 September 2026 | 0.5 |
| | **Core remaining** | **6.5 – 7** |
| 6 | Optional dashboard | 1 |
| | **With dashboard** | **7.5 – 8** |

Consider offering phase 7 as the start of a small monthly retainer (an hour or two per month) rather than a one-off: the reports only pay for themselves if someone reads them and acts. Phase 8 is what makes that retainer cheap enough to be worth selling — one day of setup, then about an hour a month.

### Pricing

Friend price, with the regular price shown alongside on the proposal so the discount is visible. Scope is what this document lists; anything else is quoted separately.

| | Friend price | Regular price |
| --- | ---: | ---: |
| Core (phases 1 to 5 and 7, plus the case-outcome upload) | EUR 1,000 | EUR 2,500 |
| Dashboard (phase 6), quoted separately | EUR 300 | EUR 700 |
| Custom Looker tables (Search Console × Analytics and similar blends), future | EUR 200 | EUR 500 |
| Monthly follow-up, including phase 8 | EUR 100 | EUR 250 |

The dashboard is quoted on its own and decided after the client has used the funnels for two or three weeks — not bundled into the core figure, so declining it is easy and costs nothing.

The 20 September revision added about a day of work — scroll depth, page-to-page tracking, the chatbot breakdown, attribution for non-Google traffic, the advertising consent category and the two policy pages. The friend price went from EUR 800 to EUR 1,000 to cover part of it; the rest is absorbed. Worth saying out loud in the conversation, since the scope visibly grew: the regular-price column is what it would have cost.

---

## 10. After this: getting the most out of it

In rough order of value. None of these are in the effort above.

### Count real clients, not clicks

This is the biggest lever by far. Today Ads optimises towards "someone clicked WhatsApp" or "someone booked". Neither is a client: some bookings are no-shows, some WhatsApp clicks never send a message. Google can be told, after the fact, which clicks became actual cases. It then finds more people like those, and stops paying for the ones that only click.

The Caso code already in the Sheet is exactly the join key needed, and after phase 2 it exists for every visitor rather than only Google ad clicks. What remains is a place for the firm to mark each booking or conversation as "became a client" or not (the existing Google Sheet is enough), and the upload back to Ads.

**Half a day, not the two days estimated earlier, and part of the core price** — decided 23 September 2026; only the Looker work is priced separately. Google Ads reads offline conversions on a schedule straight from a Google Sheet, so this is a conversion action plus a correctly shaped sheet plus a scheduled import — no code. It only grows if the sheet's shape has to change.

Two constraints to state before promising anything. Ads accepts an outcome only within **90 days of the click**, so a case that qualifies after six months cannot be sent. And an upload needs either a Google click ID or, for form and chatbot leads, hashed email and phone — which phase 2 already sends, so coverage is good for Google traffic and nil for Instagram or organic. For those the Sheet improves the firm's own reporting and nothing else.

**Built 23 September 2026.** `resultado` / `fecha_resultado` added to `Registro` as a dropdown and a validated date, columns A–O behind an edit warning, and an `Ads import` tab — first in the file, since Data Manager reads the first tab — shaping the `cliente` rows for Google Ads. Data Manager (Google Sheets, direct connection, offline conversions) reads it daily into `Cliente convertido`, linked from the action's "Connect source". Tested with a marked row in the tab; the first real sync is still to be confirmed. The formula, and why each part is there: `docs/tracking-events.md`. Two things found on the way: the Sheet's click column did not say which kind of click reference it held, fixed on the site with a `wbraid:` / `gbraid:` prefix; and the template upload the plan assumed is now legacy — Data Manager maps columns itself, so the tab needs clear headers rather than Google's template.

The Ads account's time zone is Santiago (checked 23 September 2026), which matters because Data Manager did not ask for one and reads `conversion_time` in the account's zone. Still open: confirming the first real sync, and after four weeks of real outcomes, whether `Cliente convertido` goes Primary.

**The firm agreed on 23 September 2026 to mark outcomes.** Three things follow. The upload goes to the existing `Cliente convertido` action (phase 1), whose website half — hashed email and phone through the User-provided Data tag — already works. Marking should start now, not when the upload is built: every outcome is only uploadable within 90 days of its click, so a case marked late is lost to Ads for good. And the columns are the ones already in the Sheet, `resultado` and `fecha_resultado`, beside the rows the site writes.

The hard part remains the firm actually marking the outcomes, week after week. Runs entirely between the Sheet and Google Ads; needs nothing from Analytics. Build it once the firm has marked a few real outcomes — about two weeks after they start — so the first upload is tested on real rows.

### Tell Ads what a contact is worth

A company advisory is worth far more than a worker consultation. Giving each conversion an estimated value lets Ads spend towards value rather than volume. Half a day, but only useful once the client can give honest rough numbers.

### Use the drop-off data to change the forms

Once the funnels show where people leave, the fixes are usually small: fewer required fields, the calendar offering more than the six afternoon slots, the form higher on the page, a phone-only option. The scroll data says whether the form is simply too far down. Each change can be shown to half the visitors and measured against the other half, which Vercel supports without extra tools. Ongoing work, an afternoon per experiment.

### Know what happens on the phone

Phone clicks will be tracked, but a click is not a call. Google Ads can show a forwarding number on ads and mobile pages for free and count calls and their duration. Worth switching on if the funnels show many phone clicks.

### Bring in organic search

With Search Console connected in phase 1, the funnels can be filtered to visitors who arrived from Google search, which shows whether the blog brings people who go on to contact the firm.

One limitation to know about before promising anything: the Search Console link only feeds two fixed reports inside Analytics, and its data — the search phrases, impressions, click-through rate — **cannot be used inside the funnel reports**. Google does not allow it. Question-level analysis ("which search phrases bring people who then book?") is the custom-tables item below, not a funnel filter.

### Custom tables in Looker — EUR 200

Some questions cannot be answered inside Analytics at all, because Google will not let the sources be crossed. The one that matters most: **which Google searches bring people who go on to contact the firm** — not which bring visits, which bring contacts. Search Console and Analytics can only be joined in Looker Studio, on the landing page. The same applies to any table that has to pull from several sources at once: campaigns, searches, on-site behaviour, the Caso sheet.

Distinct from the phase 6 dashboard, and the client document says so explicitly. The dashboard is one fixed page, spend against results, the same every week. These are blends built for a specific question.

Priced at EUR 200 and deliberately left for later. Most of the effort is discovery — working out which questions the firm actually wants answered — and those only surface after a few weeks of reading the funnels. Quoting it now means guessing at the tables.

### Keep the data clean

Small recurring hygiene: exclude the firm's traffic and ours, watch for bot spikes, check that signals still fire after each site release. The smoke test from phase 2 does most of this automatically; the rest is a five-minute check that can be added to the deployment checklist.

---

## 11. Plain-language glossary

**Google Tag Manager.** A container loaded on every page that holds the tracking snippets, so they can be changed without a code release. The site sends it signals; it decides where to forward them.

**Google Analytics (GA4).** Where visits and signals are stored and reported. "Property" is Google's word for one website's account inside it.

**Event / signal.** One recorded moment: a page view, a click, a form sent. Everything in Analytics is built from these.

**Custom dimension.** A label attached to a signal that Analytics is allowed to filter and group by. Must be registered once; otherwise the label is received but unusable.

**Key event / conversion.** A signal marked as "this is the goal". Analytics calls it a key event, Ads calls it a conversion. Same idea.

**Primary and secondary conversions.** In Ads, only primary conversions are used to decide how to bid. Marking everything primary means the bidding chases whatever is cheapest to achieve, which is rarely the one that makes money.

**Enhanced conversions.** Sending a scrambled version of the visitor's email or phone with a conversion, so Google can match it to the ad click even when cookies fail.

**Auto-tagging / gclid / wbraid / gbraid.** Ads adds a click reference to the URL of every ad click. `gclid` is the usual one; `wbraid` and `gbraid` are what arrive instead from iOS when tracking permissions are restricted. The site reads them, which is how a visit is tied to a campaign.

**UTM parameters.** The hand-written equivalent for campaigns that are not Google Ads — Instagram, newsletters, partner links. Added to the link by whoever publishes it.

**First touch.** The first campaign or source that ever brought a given visitor, kept for ninety days, so credit is not lost when someone thinks it over for a few days before contacting.

**Unwanted referrals.** A list telling Analytics to ignore certain sites as a traffic source. WhatsApp belongs on it, otherwise returning from the app looks like a brand-new visit from WhatsApp rather than the campaign that was actually paid for.

**Exploration.** Analytics' section for custom reports, including funnels and paths. Reports live under the person who built them and are shared to others.

**Funnel.** A report that counts how many people reached each step in a sequence, and therefore how many dropped between steps.

**Scroll depth.** How far down a page a visitor got, recorded at quarters. The difference between "the ad brought a reader" and "the ad brought a bounce".

**Audience / remarketing list.** A group of visitors defined by what they did — for instance, started a form and did not finish — that Ads can then advertise to again.

**Looker Studio.** Google's free report builder. Reads from Analytics, Ads, Search Console and Sheets and shows them on one shareable page.

**Offline conversion import.** Telling Ads afterwards which clicks turned into real business, so it can optimise towards those.

**Consent Mode.** A Google setting where the visitor's cookie choice is passed to every Google tag, which then restricts what it stores. Four storage types: analytics, ad storage, ad user data, ad personalisation.

**Behavioural modelling.** Google's statistical estimate of the visitors who declined cookies. Only available to sites above a high daily traffic threshold, which this site will not meet.

**URL passthrough.** A Consent Mode setting that keeps the ad click reference in the address for visitors who declined cookies, so the existing conversion counting survives.

**DebugView / Tag Assistant.** Google's live testing screens where you can watch signals arrive as you click through the site.

---

## 12. Banner off, tracking on

**24 September 2026.** The firm audited comparable legal practices in Chile and found none of them showing a cookie banner or publishing a cookie policy. They decided not to be the only site in their market asking, and to carry the same risk the rest of the market is carrying until the December launch. So: no banner, everyone tracked.

Phase 3 is not undone. Everything it built is still in the codebase and still works — Consent Mode still runs, the panel still opens from the footer, a recorded choice is still honoured to the letter. What changed is only what happens to a visitor who has *not* chosen.

### The switch

One constant, `CONSENT_REQUIRED` in `src/lib/utils/consent.ts`, next to `REPROMPT_BELOW_VERSION`. It is `false`. It feeds exactly one other export, `UNANSWERED_CHOICES`, which is what all three readers fall back to when there is no cookie to read:

| Reader | Where | With the flag off |
| --- | --- | --- |
| Bootstrap snippet | `consent.ts`, inlined by the root layout | Consent Mode default goes out `granted` for all four types, before hydration |
| `readStoredChoices` | `consent.ts` | `hasAdvertisingConsent()` is true, so `gclid`, `utm_*` and `rk_ft_*` are written and read into the Sheet |
| `getInitialState` | `CookieConsentProvider.tsx` | `showBanner: false`, so the banner never mounts; the context reports both categories granted |

Two surfaces follow the same constant so nothing on the page contradicts it: the **"Banner de cookies"** bullet on `/politica-cookies` is not rendered while there is no banner, and the footer's **"Configurar cookies"** stays — it is the live route to the same preferences, and it keeps that page honest.

### A recorded choice still wins

Both readers check the cookie *first* and fall back only when it is absent, unparsable, or below the re-prompt version. So a visitor who opens the footer panel and rejects is denied, flag or no flag, on every page load thereafter.

This is worth stating because it was one line away from not being true. The snippet used to *raise* its values from the fallback — `if (p.analytics === true) a = 'granted'` — which reads a stored `false` as "no information". Correct for as long as the fallback was denied; silently wrong the moment it is not, and it would have granted everyone who had explicitly refused. The snippet now reads a record as written (`a = p.analytics === true ? G : N`), and `src/lib/utils/__tests__/consent.test.ts` has a test named for that regression.

### How to revert

Set `CONSENT_REQUIRED = true` in `src/lib/utils/consent.ts` and deploy. That is the whole revert.

The banner comes back for everyone who has not answered, the Consent Mode default returns to denied, the site stops writing its own attribution cookies without permission, and the cookie-policy bullet reappears. Because `REPROMPT_BELOW_VERSION` was raised to 3 on the same day, nobody is carrying a stale acceptance: every visitor is asked fresh.

Two things make the revert stay one line, and both are worth not breaking:

- **The tests pass in both positions.** Rule tests pin their fallback explicitly (`DENIED` / `GRANTED` in `consent.test.ts`) instead of reading the live constant, and a `CONSENT_REQUIRED` block tests both modes. Verified by running `bun test` with the flag each way. A test that had to be edited alongside the flag would have made the revert a code review.
- **Nothing else branches on it.** No environment variable, no Vercel dashboard setting, no GTM change. The Tag Manager side of Consent Mode (`docs/consent-mode-runbook.md`) is unaffected — it reacts to the default it is sent, and it is sent `granted` now instead of `denied`.

After reverting, run `bun run test:tracking` against a production build, as always.

### What this costs

The December launch is also when **Ley 21.719** comes into force. The bet is dated, and the firm made it knowingly; the flag exists so that acting on it later is a deploy rather than a project. `docs/client-brief.md` is not updated for this — the decision came from the firm rather than going to them.
