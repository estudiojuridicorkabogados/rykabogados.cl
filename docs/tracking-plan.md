# Tracking and funnel plan

What we will build so RK Abogados can see which campaigns bring people who actually book a call or write on WhatsApp, and exactly where the others give up.

**This is the internal build plan — it does not go to the client.** It is written for whoever implements the work: it names files, events and settings, and it says what is wrong with the site today in plainer terms than a client document would. The client-facing proposal is a separate document, written in Spanish, derived from section 9.

Prepared 16 September 2026, revised 20 September 2026.

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

Everything below is planned out except these. Each is settled with the client rather than by us, and each blocks the phase it sits in.

| Decision | Whose call | Where it lands |
| --- | --- | --- |
| Banner copy, category names, whether "decline" is as prominent as "accept" | The firm — they are the lawyers | Phase 3, step 11 |
| Wording of `/politica-cookies` and `/politicas-de-privacidad` | The firm writes it, we supply the cookie inventory | Phase 3, step 10 |
| Which of the four Ads conversions are primary, and which become secondary | The firm, with our recommendation | Phase 1 record |
| Whether `digitalizame.cl` keeps editor access to Ads and Tag Manager | The firm | Phase 1 record |
| Whether chatbot leads get their own Ads conversion action | Revisit at phase 7 once volume is known — agreed it goes primary when created | Phase 2 |
| The consent go-live date, recorded as the reporting baseline | Agreed jointly before phase 3 ships | Phase 3, step 4 |
| Whether the phase 6 dashboard is wanted | The firm, after two or three weeks of reading the funnels | Phase 6 |
| Whether phase 7 becomes a monthly retainer | The firm | Section 9 |
| Whether the firm will mark case outcomes in the Sheet | The firm — and if not, the highest-value item in section 10 cannot happen | Section 10 |

### Where the current code lives

| What | File |
| --- | --- |
| Tag Manager loader | `src/components/Analytics/ConditionalAnalytics.tsx` (consent gate commented out) |
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

One change was published on its own: an exception trigger (`Page Hostname contains vercel.app`) on all eight tags, so preview deployments stop being measured as real traffic. This had to go live before phase 2 testing begins.

### What the inventory turned up, to fix during phase 4

- **The user-provided data variable maps only email and phone.** `First Name` and `Last Name` variables exist, read the right data layer keys, and are wired to nothing — so the names the site has been sending since the 8 September fix are being discarded. Two rows added to that variable, and enhanced-conversion match rates improve for free.
- **Cross-domain linking lists 13 dead Vercel preview hostnames.** Single-domain site; turn cross-domain off and empty the list.
- **`Solo enlaces`**, a link-click trigger matching `api.whatsapp`, fires no tag. Predecessor of the current WhatsApp conversion. Delete.
- **`url_passthrough` is off** and all eight tags are `consentStatus: NOT_SET` — both exactly as phase 3 assumed.
- **Conversion values are a flat 1000 CLP placeholder** on all four tags, ignoring the `conversion_value` the site pushes. Harmless, but it means the code sends a field nobody reads, and the "what is a contact worth" item in section 10 starts from nothing real.

### Findings that change what we expected

**Analytics has never received a conversion.** There is no GA4 event tag in the container at all — the Analytics tag is configuration only. All four conversions go to Google Ads and stop there. Phase 4 is therefore not an improvement to Analytics reporting; it is the first time Analytics will see a conversion at all.

**Two of the three forms have produced nothing** in the period the current conversion actions have existed, while the workers form produced two. A business fact rather than a tracking one, and precisely the asymmetry phase 5 exists to explain.

**The firm was previously RyO Asociados** and the rename was never carried through the tooling — the Ads account is still named that, and the Analytics stream was too until today. `ryoasociados.cl` still 301s to the current domain, so the old brand's inbound links keep their value.

### Left open

- Two stray Ads conversion actions to clean up: `Enviar formulario de conversion de RK Abogados` (Primary, no data, legacy — demote or remove, since an empty primary action distorts Smart Bidding) and `Envío de formulario para clientes potenciales` (auto-created, never fired, already Secondary — remove as noise).
- `contacto@digitalizame.cl` holds editor access and last modified the Ads link on 15 September 2026. Establish who they are, whether they are still engaged, and whether their access comes off. Two parties editing tracking configuration independently is how a container acquires thirteen dead linker domains.
- Primary versus secondary conversions, still to settle with the firm. Recommendation unchanged: the three form conversions primary, the WhatsApp click secondary.

---

## Phase 2: Make the site report every step

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
3. **Store first touch in a cookie, not `sessionStorage`.** `sessionStorage` is wiped when the tab closes. Someone who clicks an ad on Monday, thinks it over, and books on Wednesday is currently credited to nothing. A ninety-day cookie holding the first campaign seen keeps the original credit, and is what the Sheet logs.

> **What this deliberately does not do.** The Caso code stays where it is useful — in the WhatsApp message, the booking email and the Google Sheet, next to the campaign that brought the visitor. It is not sent to Analytics, and Analytics' own visitor references are not written back to the Sheet. Joining the two would mean a unique value per visitor in Analytics, which its reports collapse into an "(other)" bucket, so the join would be built and then never usable from the interface. The Sheet answers "which campaign produced this case"; Analytics answers "where do people give up". Keeping them apart is the honest version.

### Small fixes along the way

- The team page has a raw WhatsApp link that bypasses all tracking. It will use the shared component.
- `WhatsappLink` gets a **required** `location` prop. The component is used in roughly ten places; a required prop is the only thing that stops an eleventh being added untagged.
- The Google Sheet channel name for the workers form has a typo (`trabjadores`). Fixing it keeps the sheet clean; the old spelling stays readable in the sheet's history.
- The Tag Manager ID is written into the code in two places. It moves to a configuration variable so a staging site can use a separate container without touching code.

### Testing

On a preview deployment with Google's Tag Assistant open, walk through each form on desktop and phone, and confirm every signal arrives with the right labels before merging. `agent-browser` is already a development dependency here, so a smoke test that walks one form and asserts the signals fire is worth adding to the pipeline — it is the only thing that catches tracking quietly dying after an unrelated refactor.

### Checklist

- [ ] `trackEvent` helper and signal vocabulary in `src/lib/utils/analytics.ts`
- [ ] `rk_page_view` on navigation, with page type and previous page
- [ ] `rk_scroll` at 25/50/75/100, once per page, reset on navigation
- [ ] Booking forms (both): view, start, step, error, submit, success, fail
- [ ] Contact form: view, start, error, submit, success, fail
- [ ] WhatsApp link: labels added, `location` required, team grid routed through it
- [ ] Phone and email links tracked
- [ ] CTA buttons tracked
- [ ] Chatbot: open, first message, message, handoff, lead, lead fail, error
- [ ] Caso code written into both emails sent by `processUserInfoTool.ts`
- [ ] `wbraid`, `gbraid` and `utm_*` read alongside `gclid`
- [ ] Caso code generated for every visitor
- [ ] First touch stored in a 90-day cookie
- [ ] Sheet channel typo fixed
- [ ] Tag Manager ID moved to an environment variable
- [ ] Tested on preview, desktop and phone
- [ ] Smoke test in the pipeline
- [ ] Signal documentation written (see phase 4)

---

## Phase 3: Make the cookie banner real

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
3. **Send the update** when the visitor presses accept, decline, or saves preferences in the settings modal. This replaces the current full page reload in `src/components/CookieConsent/CookieConsentProvider.tsx`.
4. **Warn the client before this goes live, not after.** Today the site tracks every visitor regardless of the banner, so switching consent on will cut the recorded Ads conversions by whatever share of visitors decline. The firm will see a step down in their conversion numbers within days of this phase shipping, and automatic bidding will spend a fortnight recalibrating to it. It is a measurement change, not a business change, but it looks alarming on a dashboard and it is the sort of thing that gets blamed on the last person who touched the site. Agree a go-live date and note it, so the before and after are never compared.
5. **Switch on `url_passthrough` and `ads_data_redaction`.** Without the first, a visitor who declines advertising loses the ad click reference from the address the moment they navigate to a second page, which quietly breaks the Ads conversion counting that works today. These two settings are one line each and are the part of Consent Mode most often left out.
6. **Keep Tag Manager loading for everyone.** The disabled gate in `ConditionalAnalytics.tsx` is removed rather than re-enabled: with Consent Mode the container itself must load so it can receive the choice. The tags inside it are what get restricted.
7. **In Tag Manager:** switch on consent checks for the container, confirm each tag declares which storage types it needs, and verify with Tag Assistant that a declined visit sets no cookies.
8. **Remove the `noscript` Tag Manager iframe** from `src/app/layout.tsx`. It fires the container for visitors with JavaScript disabled, before any choice can exist, and Consent Mode cannot reach it. Nothing on this site works without JavaScript anyway — the forms, the calendar and the chatbot are all client-side — so it is loading a tracker for people who cannot use the site.
9. **Leave Vercel Analytics and Speed Insights outside the banner.** They sit in the same file as the Tag Manager loader (`ConditionalAnalytics.tsx`) and it would be easy to sweep them into the consent gate while rewriting it. They are cookieless and store nothing on the visitor's device, so they do not require consent. This is a deliberate position, not an oversight, and the cookie policy should say so.
10. **Update the public cookie policy and privacy policy.** This is the part that actually has to hold up. `/politica-cookies` today lists only Vercel Analytics and Speed Insights; Google Tag Manager, Google Analytics, Google Ads and reCAPTCHA all load on every page and appear nowhere on it. `/politicas-de-privacidad` mentions "Google Analytics y Vercel" in passing. Both need the new advertising category, a table of the cookies actually set, who receives the data and for how long. We supply the technical inventory — every cookie, its purpose, its lifetime, the recipient — and the firm writes the wording, since they are the lawyers and it is their liability.
11. **Review the banner copy** with the client. The wording, the three categories, and whether "decline" is as prominent as "accept" are their legal call, since they are the lawyers. The plan provides the mechanism; they provide the words.

### Checklist

- [ ] Advertising category added to types, banner, modal and stored cookie
- [ ] Go-live date agreed with the client and recorded as the reporting baseline
- [ ] Default consent state set before Tag Manager loads
- [ ] Update sent on accept, decline, and preference save; page reload removed
- [ ] Categories mapped to the four storage types
- [ ] `url_passthrough` and `ads_data_redaction` enabled
- [ ] Gate in `ConditionalAnalytics.tsx` removed, container loads for everyone
- [ ] Tag Manager consent settings on, tags checked
- [ ] Verified: declined visit sets no Google cookies, signals still arrive as cookieless pings
- [ ] Verified: ad click reference survives navigation for a declining visitor
- [ ] `noscript` Tag Manager iframe removed from `layout.tsx`
- [ ] Vercel Analytics and Speed Insights confirmed outside the consent gate
- [ ] Cookie inventory handed to the client
- [ ] `/politica-cookies` updated with the advertising category and the real cookie table
- [ ] `/politicas-de-privacidad` updated
- [ ] Banner copy reviewed with the client
- [ ] `COOKIE_CONSENT_SETUP.md` and `src/components/CookieConsent/README.md` updated

---

## Phase 4: Receive those steps in Analytics

| | |
| --- | --- |
| **Where** | Tag Manager and Analytics. No code. |
| **Effort** | About half a day |
| **Result** | Every signal from phase 2 shows up in Analytics with its labels, and the four "finished" actions are marked as conversions there too. |

1. **In Tag Manager:** one rule that forwards every signal whose name starts with `rk_` to Analytics, passing the labels along. One rule instead of twenty means a future signal needs no Tag Manager change.
2. **In Analytics:** register the labels so they can be used in reports (Google calls this "custom dimensions"; without it the labels arrive but cannot be filtered on). Four are needed: `form_name`, `page_type`, `location` and `percent_scrolled`. Mark the four finishing actions as conversions ("key events" in Google's current wording).
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

### Checklist

- [ ] Enhanced measurement: form interactions off, scroll off, page views on navigation verified
- [ ] Tag Manager: `rk_.*` trigger, data layer variables for the labels, one GA4 event tag
- [ ] Analytics: four custom dimensions registered
- [ ] Analytics: four key events marked
- [ ] Remarketing audiences built and exported to Ads
- [ ] Verified in DebugView
- [ ] Container published
- [ ] `docs/tracking-events.md` written

---

## Phase 5: Build the funnel reports

| | |
| --- | --- |
| **Where** | Analytics, "Explore" section. Shared with the client's login. |
| **Effort** | About one day, including a short written guide for the client |
| **Result** | Five reports the client can open any time, each showing how many people reach each step and where they leave, broken down by campaign, by source (ads, Google search, direct, social), and by device. |

### The funnels

**Workers booking**
Arrived → Scrolled half the page → Saw form → Started → Date and time chosen → Details sent → Booked

**Companies booking**
Arrived → Scrolled half the page → Saw form → Started → Date and time chosen → Details sent → Booked

**Contact form**
Arrived → Reached `/contacto` → Started → Sent → Received

**Chatbot**
Arrived → Opened the chat → Sent a first message → Gave contact details → Lead emailed to the studio

with the weaker branch alongside it: first message → handed the WhatsApp number → wrote on WhatsApp. Reading the two together answers whether the bot is finishing conversations itself or merely passing them on.

**Any contact**
Arrived → Read past half the page → Booked, wrote on WhatsApp, left contact details with the chatbot, called or emailed

The last one is the number the client cares about most: of everyone a campaign brought, what share made contact by any channel. The others tell us why the rest did not.

Alongside the funnels, one "path" report: for visitors who reached a landing page and left without contacting, where did they go instead? With `page_type` and scroll depth attached, this is the report that usually points at a missing piece of information — price, location, who the lawyers are.

### The written guide

Two pages, in Spanish, with screenshots: how to open each report, how to change the date range, how to read the drop-off between two steps, and three example questions with the clicks to answer them ("which campaign loses most people at the details step?").

### Checklist

- [ ] Workers funnel
- [ ] Companies funnel
- [ ] Contact form funnel
- [ ] Chatbot funnel
- [ ] Any-contact funnel
- [ ] Path report
- [ ] All shared with the client's Analytics user
- [ ] Guide in Spanish

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
| Analytics (GA4) | Google's own MCP server over the Data API | Ready. The important one: every phase 2 signal, its labels and the funnels live here. |
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
- [ ] MCP servers configured in `.mcp.json`, read-only credentials
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
> 7. **A short guide in Spanish** on how to open and read the reports, with worked examples.
> 8. **Documentation** of every signal, kept with the website code, so future changes stay consistent.
> 9. **A review after one month** with the first findings and a prioritised list of improvements for the site and the campaigns.
>
> **Optional**
>
> - **One-page dashboard** combining advertising spend with results: cost per booked call, per campaign, week by week. Shared as a link, no login into Analytics needed.
> - **A monthly reading of the reports**, done by hand and with AI reading the live data, with suggestions on what to change to get more contacts. The first one is included; continuing every month is a separate arrangement.
> - **Custom tables in Looker (EUR 200)**, for questions Analytics cannot answer — above all which Google searches bring people who actually make contact. Left for later, since the tables are built around questions that only surface once you have read the reports.
> - **Telling Google which contacts became real clients.** The join is already built into the work above; what is missing is a column in your sheet where somebody marks each booking as a case or not, kept up to date within 90 days of the click. Half a day on our side, quoted when you decide. The single highest-value step in the whole project, and the only one that depends on a habit rather than on software.
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
| 5 | Five funnels, path report, written guide | 1 |
| 7 | Review after one month | 0.5 |
| | **Core remaining** | **6 – 6.5** |
| 6 | Optional dashboard | 1 |
| | **With dashboard** | **7 – 7.5** |

Consider offering phase 7 as the start of a small monthly retainer (an hour or two per month) rather than a one-off: the reports only pay for themselves if someone reads them and acts. Phase 8 is what makes that retainer cheap enough to be worth selling — one day of setup, then about an hour a month.

### Pricing

Friend price, with the regular price shown alongside on the proposal so the discount is visible. Scope is what this document lists; anything else is quoted separately.

| | Friend price | Regular price |
| --- | ---: | ---: |
| Core (phases 1 to 5 and 7) | EUR 1,000 | EUR 2,500 |
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

**Half a day, not the two days estimated earlier.** Google Ads reads offline conversions on a schedule straight from a Google Sheet, so this is a conversion action plus a correctly shaped sheet plus a scheduled import — no code. It only grows if the sheet's shape has to change.

Two constraints to state before promising anything. Ads accepts an outcome only within **90 days of the click**, so a case that qualifies after six months cannot be sent. And an upload needs either a Google click ID or, for form and chatbot leads, hashed email and phone — which phase 2 already sends, so coverage is good for Google traffic and nil for Instagram or organic. For those the Sheet improves the firm's own reporting and nothing else.

The hard part remains the firm actually marking the outcomes. Runs entirely between the Sheet and Google Ads; needs nothing from Analytics. Offer it at the phase 7 review, once it is visible whether the outcome column is being filled in.

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
