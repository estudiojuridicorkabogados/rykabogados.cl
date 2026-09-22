# Tracking events

Every signal the website sends to Google Tag Manager, what it means, and which
labels it carries. This is the hand-off note referred to in
[`docs/tracking-plan.md`](./tracking-plan.md) phase 4, step 5: if you are reading
a funnel report and wondering what a number counts, this is the page that
answers it.

All of them are pushed to `window.dataLayer` from
[`src/lib/utils/analytics.ts`](../src/lib/utils/analytics.ts), which is the only
file on the site allowed to do so. Nothing calls `gtag` directly — the Google
tag is loaded inside the container, which keeps that API internal.

Names are never written out at a call site. They live once in the `RK_EVENTS`
constant, and `trackEvent` is typed per event, so an event carrying the wrong
label — `rk_scroll` with a `form_name`, or a form event with no `form_name` at
all — is a compile error rather than a dimension quietly filling with the wrong
values. If you are adding a signal, add it to `RK_EVENTS` and give it a payload
shape in `EventPayloads`; the compiler will then find every place that needs
updating. If you are adding a label, add it to `RESET_LABELS` too — the
compiler insists.

Every push carries **every** label, the absent ones as `undefined`. Tag
Manager folds each push into one persistent model and its variables read from
that, so a `form_name` set by one event would otherwise still be there when the
next page view is forwarded. The reset is what keeps a dimension honest to the
event it arrived on.

Tag Manager forwards the whole family to Analytics with one rule matching
`rk_.*`, so a signal added here needs no Tag Manager change. The rule is phase 4
work; until it is published these events reach the dataLayer and no further.

## Who is allowed to touch the dataLayer

Three files, and the rule is narrower than it used to be:

- **`src/lib/utils/analytics.ts`** is the only file that pushes `rk_*` *events*.
- **`src/lib/utils/consent.ts`** is the only file that issues *gtag commands* —
  `consent default`, `consent update`, `set`. These are not events: no `event`
  key, and an `arguments` object rather than a plain one.
- **The inline snippet in `src/app/layout.tsx`** is the only thing that touches
  `window.dataLayer` before hydration. It is `CONSENT_BOOTSTRAP_SNIPPET`, and
  it is a second, ES5 implementation of the same mapping, checked against the
  first by a test.

Nothing else writes to it.

## Consent

Since phase 3 the visitor's choice reaches Google through Consent Mode v2
rather than being collected and ignored. Three categories map onto seven
storage types:

| Banner category | Storage types |
| --- | --- |
| Necesarias | `functionality_storage`, `security_storage` — always granted |
| Análisis | `analytics_storage` |
| Publicidad | `ad_storage`, `ad_user_data`, `ad_personalization` |
| — | `personalization_storage` — always denied; this site personalises no content |

All seven are declared rather than only the four a choice moves, because an
*undeclared* type behaves as granted.

**A declined visit still sends every signal.** The `rk_*` events are pushed
regardless of consent; what changes is what the tags downstream are allowed to
store. Google receives a cookieless ping rather than nothing, which is what
keeps the proportions between funnel steps meaningful even though the absolute
totals undercount.

Two things *are* withheld without advertising consent:

- **`user_data`.** `buildUserData` returns nothing, so a declining visitor's
  email and phone never enter the dataLayer at all. GTM's User-Provided Data
  tag would have suppressed the send anyway — but suppressing the send is not
  suppressing the exposure, and raw PII in a global object readable by every
  tag in the container is the same objection that took first and last name out
  of that payload.
- **Every attribution cookie the site sets itself** — `rk_caso`, the click
  references, the `utm_*` pair and the eleven `rk_ft_*`. Consent Mode does not
  reach these; they are ours. A declining visitor's Sheet row still gets
  written, with no code and no campaign against it.

The campaign parameters are read from the landing URL at hydration and held in
memory until the visitor answers, because by the time they press accept the
router has usually stripped them from the URL. Memory is not storage on their
device, so holding it pending an answer costs them nothing.

Ordering is the part that can break silently. GTM replays the dataLayer in
order rather than reading it as state at initialisation, so the consent default
has to be *first* — ahead of the `rk_page_view` that fires as soon as hydration
runs. That is why it is an inline script rather than anything in a component,
and `bun run test:tracking` asserts the position on every run.

## Labels

Every label below, plus the per-event ones listed with each signal, is
registered as an event-scoped custom dimension in Analytics — twelve in all,
`previous_page` excepted. A signal carries the ones that apply to it;
`page_type` is attached to every single one, automatically, from the URL at
the moment of the push.

| Label | Values |
| --- | --- |
| `page_type` | `home`, `landing_trabajadores`, `landing_empresas`, `asesoria_trabajadores`, `asesoria_empresas`, `otras_areas`, `contacto`, `nosotros`, `faqs`, `blog_index`, `blog_post`, `legal`, `other` |
| `form_name` | `trabajadores`, `empresas`, `contacto` |
| `location` | `hero`, `slogan`, `navbar`, `footer`, `contact_section`, `contact_page`, `faqs`, `blog_post`, `team_grid`, `chatbot`, `about_section`, `team_section` |
| `percent_scrolled` | `25`, `50`, `75`, `100` |

Server-rendered links carry their `location` as a plain `data-track-location`
attribute on an ancestor — the footer's contact block, each team card, the FAQ
answer — which one delegated listener reads. That keeps the footer, the contact
sidebar and the team page as server components instead of converting four of
them to client components to hang an onClick on twenty-odd anchors.

`page_type` is a closed set on purpose. A free-form value here becomes a
high-cardinality dimension in Analytics, which its reports collapse into an
`(other)` bucket — built, then never usable from the interface.

## Moving around the site

| Event | Meaning | Extra labels |
| --- | --- | --- |
| `rk_page_view` | Every navigation. The site never reloads, so without this the whole journey is one page view on the landing page. | `previous_page`, `previous_page_type`, `is_first_page` |
| `rk_scroll` | 25/50/75/100 percent of the page, once each per page per visit. Analytics' own scroll event fires at 90% and cannot be moved. | `percent_scrolled` |

> Read scroll depth on the long pages — the two landing pages and blog posts.
> On `/contacto` and `/faqs` the whole page fits on screen, so all four marks
> fire at once and mean nothing on their own.

## The three forms

| Event | Meaning | Extra labels |
| --- | --- | --- |
| `rk_form_view` | The visitor scrolled far enough to actually see the form. Separates "never saw it" from "saw it and left". | `form_name` |
| `rk_form_start` | First interaction — a date picked or any field focused. Once per visit. | `form_name` |
| `rk_form_step` | A step was completed. On the two booking forms the calendar is step 1, personal details step 2. | `form_name`, `step` |
| `rk_form_error` | The form refused to continue, and which fields caused it. On the contact form this includes the browser's own `required` and email checks, which stop a send before any request is made. | `form_name`, `error_fields` |
| `rk_form_submit` | The visitor tried to send. Compared with the success events, this is what exposes technical failures. | `form_name` |
| `rk_form_fail` | The send did not go through — captcha, calendar or server error. | `form_name`, `fail_reason` |

There is no `rk_form_success`: the success step is the conversion event below.

## Finishing — the four Google Ads conversions

These four names are **load-bearing**. The Ads conversion tags in container
`GTM-PC49T6MC` trigger on them, so renaming one silently stops a live
conversion. They existed before this work and keep their names; what phase 2
added is the labels.

| Event | Ads conversion | Extra labels |
| --- | --- | --- |
| `rk_conv_contact_form` | Formulario RK | `form_name`, `user_data` |
| `rk_conv_trabajadores_booking` | Formulario Trabajadores | `form_name`, `user_data` |
| `rk_conv_empresas_booking` | Formulario Empresa | `form_name`, `user_data` |
| `rk_conv_whatsapp` | Clic WhatsApp | `location` |

`user_data` carries the visitor's email and phone for enhanced conversions.
Tag Manager's User-Provided Data tag hashes both before anything leaves the
browser. Names are deliberately not sent — see the note at the top of
`src/lib/utils/analytics.ts`.

`conversion_value` and `conversion_currency` ride along on all four, but all
four Ads tags send a flat 1000 CLP regardless. The fields are the hook for real
per-conversion values whenever the firm decides what a contact is worth.

## Reaching the firm without a form

| Event | Meaning | Extra labels |
| --- | --- | --- |
| `rk_contact_click` | A phone number or email address was clicked — footer, contact page, team page. Mostly mobile visitors. | `location`, `contact_method` |
| `rk_cta_click` | An "Agenda una asesoría" or similar button that leads to a form. | `location`, `cta_label` |

## The chatbot

The assistant is a conversation, not a widget, so one signal cannot describe it.

| Event | Meaning | Extra labels |
| --- | --- | --- |
| `rk_chat_open` | The floating button was pressed. | |
| `rk_chat_first_message` | The visitor actually started talking. This is the one that belongs in the funnels. | |
| `rk_chat_message` | Every subsequent message, numbered, so it is visible whether conversations go anywhere or die on turn two. | `message_number` |
| `rk_chat_handoff` | The bot offered the WhatsApp number. The visitor still has to write. | |
| `rk_chat_lead` | The bot collected name, email, phone and the legal issue and emailed the studio. A finished enquiry — the strongest outcome the chatbot has. | `user_data` |
| `rk_chat_lead_fail` | The lead was collected but the email did not send. Observed live: the assistant improvises an apology and offers WhatsApp, so the visitor is told something — but the firm never learns the enquiry existed, and this signal is its only trace. | |
| `rk_chat_error` | The assistant errored out. | |

The bot's two endings are not equal: a handoff passes the visitor to a channel
where they still have to write, while a captured lead finishes the job. The
funnels must tell them apart.

There is no fifth Ads conversion action for chatbot leads yet — the volume is
unknown and an action that fires twice a month is noise. It is created after the
phase 7 review, and goes **primary** alongside the three forms. `user_data`
rides on `rk_chat_lead` from the start so enhanced conversions work the day it is
switched on.

## Attribution, and what the Caso code is

Every visitor who reaches a contact surface is issued a **Caso code** — six
characters, quoted in the WhatsApp message, the booking and chatbot emails, and
the Google Sheet row. It is what lets a real conversation be matched back to
the campaign that paid for it.

It lives in a ninety-day cookie. It used to live in `sessionStorage`, which is
wiped when the tab closes, so somebody who clicked an ad on Monday, thought it
over and booked on Wednesday arrived as a different person with a different
code and the two halves could never be joined.

Campaign markers are recorded **twice**, deliberately:

| Cookie | Meaning |
| --- | --- |
| `gclid`, `wbraid`, `gbraid`, `utm_*` | **Last touch.** Overwritten on every campaign visit, because the click happening now is the one Google Ads should attribute this visit to. |
| `rk_ft_utm_*`, `rk_ft_gclid` and siblings | **First campaign touch.** Written once and then left alone for ninety days, so the credit stays with the campaign that actually found this person rather than the one they happened to click on the way back. |
| `rk_ft_landing`, `rk_ft_referrer`, `rk_ft_ts` | **First visit**, campaign or not. An organic or referral first visit records where it came in, so a paid click a week later cannot claim to have been the first. |

Neither is a substitute for the other, which is why both are kept. Ads sees no
change: nothing about the last-touch path was altered.

### The Sheet row

Every row the site writes carries these parameters. The Apps Script behind the
Sheet reads them by name; **the `ft_*` columns still have to be added to it**,
and until then they arrive and are ignored.

| Parameter | Value |
| --- | --- |
| `code` | The Caso code |
| `channel` | `whatsapp`, `contacto-form`, `reserva-form-trabajadores`, `reserva-form-empresas`, `chatbot-lead` |
| `landing` | The page the action happened on, full URL |
| `gclid` | Last-touch click reference — `gclid`, `wbraid` or `gbraid`, whichever the most recent ad click carried |
| `phone`, `email` | As typed, for forms and chatbot leads; empty for WhatsApp |
| `ft_source`, `ft_medium`, `ft_campaign`, `ft_content`, `ft_term` | First campaign touch, from `utm_*`; empty for a visitor who never arrived on a tagged link |
| `ft_landing`, `ft_referrer`, `ft_ts` | First visit: entry path, referring site or `direct`, and when |

Classification belongs in the Sheet, not the site: an organic Google visit
arrives with an empty `ft_source` and `google.com` in `ft_referrer`, and a
formula or the script turns that into "google / organic". Keeping the site to
raw values means a change of classification is a Sheet edit, not a release.

**Apps Script change.** The web app receives the parameters as
`e.parameter.<name>` in `doGet`. Whatever the existing row-building line looks
like, append the eight first-touch values to it in this order, and add eight
matching header cells to the sheet. Until this is deployed the site's extra
parameters are ignored, so there is no urgency and nothing breaks.

```js
// inside doGet(e), where the row is assembled:
const p = e.parameter;
const firstTouch = [
  p.ft_source   || "",
  p.ft_medium   || "",
  p.ft_campaign || "",
  p.ft_content  || "",
  p.ft_term     || "",
  p.ft_landing  || "",
  p.ft_referrer || "",
  p.ft_ts       || "",
];
sheet.appendRow([...existingColumns, ...firstTouch]);
```

Header cells, in the same order: `ft_source`, `ft_medium`, `ft_campaign`,
`ft_content`, `ft_term`, `ft_landing`, `ft_referrer`, `ft_ts`. After editing,
**Deploy → Manage deployments → edit → New version**, or the running URL keeps
serving the old code.

`wbraid` and `gbraid` are what Google Ads sends instead of `gclid` from iOS
when tracking permissions are restricted — the same click under a different
name. Reading only `gclid`, as the site did until September 2026, made every
iOS ad click look like organic traffic.

## What is deliberately not sent

The **Caso code** is not sent to Analytics, and Analytics' own visitor reference
is not written back to the Google Sheet. The code stays where it is useful — in
the WhatsApp message, the booking and chatbot emails, and the Sheet, next to the
campaign that brought the visitor.

Joining the two would mean a unique value per visitor in Analytics, which its
reports collapse into `(other)`. The Sheet answers "which campaign produced this
case"; Analytics answers "where do people give up". Keeping them apart is the
honest version.
