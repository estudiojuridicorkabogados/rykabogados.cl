# Tracking and funnel plan

What we will build so RK Abogados can see which campaigns bring people who actually book a call or write on WhatsApp, and exactly where the others give up.

Prepared 16 September 2026. Section 8 is written to be lifted into a client proposal.

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
9. [What the client gets, and effort](#9-what-the-client-gets-and-effort)
10. [After this: getting the most out of it](#10-after-this-getting-the-most-out-of-it)
11. [Plain-language glossary](#11-plain-language-glossary)

---

## 1. Where things stand today

The site already tells Google Ads when someone finishes one of four things: sends the contact form, clicks WhatsApp, books a call as a worker (trabajadores), or books a call as a company (empresas). Since the fix in the week of 8 September 2026 it also sends name, email and phone alongside, which lets Google match the person to the ad click more reliably. That part works and we will not touch it.

There is a second, home-made system: when a visitor arrives from an ad, the site generates a six-character "Caso" code, appends it to the WhatsApp message and to the booking emails, and writes the code plus the ad click reference to a Google Sheet. That is the only way today to connect a real conversation back to a campaign. It is useful and we will keep it.

What is missing:

- **Nothing between arriving and finishing is recorded.** If a visitor opens the booking form, picks a date and time, then closes the tab on the personal details step, nobody knows. Neither does anybody know if they never scrolled down to the form at all.
- **Several ways of contacting the firm are invisible.** The two phone numbers, the email address, the "Agenda una asesoría" buttons, the chatbot, and one WhatsApp link on the team page fire nothing.
- **Analytics and Ads are not connected.** Ads knows which campaign got the click. Analytics knows what happened on the site. Today those two facts live in separate places and cannot be combined.
- **We do not yet know what Analytics itself is collecting.** The Analytics tag lives inside Tag Manager, which we have not opened yet. It may be collecting page views only, or it may be misconfigured. Phase 1 checks this first.
- **The cookie banner does nothing.** Visitors can decline, but tracking runs anyway because the switch in the code is disabled, and Google is never told what the visitor chose. Phase 3 fixes this.

One detail to keep in mind: the address `/habla-con-nosotros` is not a page, it forwards to the workers landing page. So there are really three separate paths to contact: workers booking, companies booking, and the generic contact form at `/contacto`. WhatsApp is a side exit available from all of them.

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
| Untracked WhatsApp link | `src/app/nosotros/_components/TeamGrid/TeamGrid.tsx` |
| Cookie consent | `src/components/CookieConsent/` |

---

## Phase 1: Check the accounts and connect them

| | |
| --- | --- |
| **Where** | Google Analytics, Google Ads, Tag Manager, Search Console. No code. |
| **Effort** | About half a day |
| **Result** | Every visit in Analytics shows which campaign, ad group and keyword brought it. Basic settings are correct, so the data collected from now on can be trusted. |

### Steps

1. **Open the Tag Manager container and inventory it.** Confirm there is an Analytics tag with a measurement ID (it starts with `G-`) that fires on every page. Confirm the four Ads conversion tags exist, fire on the right events, and have "enhanced conversions" switched on. Remove anything dead. Write down what is there.
2. **Fix the Analytics property basics.** Time zone Santiago, currency CLP. Data retention set to 14 months (Google's default is 2 months, after which detailed data is deleted, which would make month-on-month comparisons impossible). Turn on "Google signals" so device and demographic reports work. Add the firm's own office IP addresses as internal traffic so their own visits are excluded.
3. **Connect Analytics to Google Ads.** In Analytics under Admin, Product links, add the Ads account. This is a two-click setting, but it needs an account that is administrator on both sides.
4. **Confirm auto-tagging is on in Ads.** This is what adds the click reference to the landing URL. The site already reads it, so it is almost certainly on; we check anyway.
5. **Connect Search Console to Analytics.** Same place. This adds the search phrases people used on Google before arriving, for free.
6. **Decide what not to do.** After linking, Ads will offer to import Analytics conversions. We say no for the four actions already reported by Tag Manager, otherwise every booking counts twice. Analytics is for understanding, Ads keeps its own count.

> **Possible surprise:** if step 1 shows Analytics was not collecting properly, the historical data is useless and reports only become meaningful from the day we fix it. That is fine, but the client should hear it up front rather than after.

### Checklist

- [ ] Tag Manager inventory written down
- [ ] Analytics tag confirmed firing on every page
- [ ] Four Ads conversion tags confirmed, enhanced conversions on
- [ ] Time zone, currency, data retention, Google signals, internal traffic
- [ ] Ads linked
- [ ] Auto-tagging confirmed
- [ ] Search Console linked
- [ ] Analytics conversions NOT imported into Ads

---

## Phase 2: Make the site report every step

| | |
| --- | --- |
| **Where** | The website code. One pull request. |
| **Effort** | One and a half to two days including testing on the real forms |
| **Result** | The site sends a signal at every meaningful moment on the way to a contact, not only at the end. All of them carry the same labels so they can be compared. |

Today there is one tracking file (`src/lib/utils/analytics.ts`) that knows how to talk to Tag Manager. We extend it, so there is a single place where every signal is defined and named, and no one can invent a new inconsistent one later. Every signal carries the same three labels: which form (workers, companies, contact), which page it happened on, and where on the page (hero button, footer, chatbot, and so on).

### Signals we add

| Signal | Name | Meaning |
| --- | --- | --- |
| Form comes into view | `rk_form_view` | The visitor scrolled far enough to see the booking form. Separates "never saw it" from "saw it and left". |
| Form started | `rk_form_start` | First interaction: a date is picked or a field gets focus. Fires once per visit. |
| Step completed | `rk_form_step` | Date and time chosen, "next" pressed. On the two booking forms the calendar is step 1, personal details are step 2. |
| Validation error | `rk_form_error` | The form refused to continue and which field caused it. Shows whether people fail on the phone number, the email, or the required message. |
| Send pressed | `rk_form_submit` | The visitor tried to send. Compared with the next two, this shows technical failures. |
| Sent successfully | `rk_form_success` | Already exists as the Ads conversion. We keep it and add the same labels. |
| Send failed | `rk_form_fail` | Server or captcha error, with the reason. Today these are silent. |
| WhatsApp clicked | `rk_conv_whatsapp` | Already exists. We add the page and location labels, and route the untracked team-page link through the same component. |
| Phone or email clicked | `rk_contact_click` | The two phone numbers and the email address in the footer and contact page. Mostly mobile visitors. |
| Call-to-action clicked | `rk_cta_click` | The "Agenda una asesoría" and similar buttons that scroll to the form or lead to the landing pages, with their position on the page. |
| Chatbot used | `rk_chat` | Opened, sent a message, was handed the WhatsApp number. |

Labels carried by every signal:

| Label | Values |
| --- | --- |
| `form_name` | `trabajadores`, `empresas`, `contacto` |
| `page_type` | `landing_trabajadores`, `landing_empresas`, `contacto`, `blog`, `home`, `faqs`, `nosotros`, ... |
| `location` | `hero`, `slogan`, `footer`, `contact_section`, `chatbot`, `team_grid`, ... |

Existing Ads conversion signals (`rk_conv_contact_form`, `rk_conv_whatsapp`, `rk_conv_empresas_booking`, `rk_conv_trabajadores_booking`) keep their names so the Ads tags in Tag Manager do not break.

### Small fixes along the way

- The team page has a raw WhatsApp link that bypasses all tracking. It will use the shared component.
- The Google Sheet channel name for the workers form has a typo (`trabjadores`). Fixing it keeps the sheet clean; the old spelling stays readable in the sheet's history.
- The Tag Manager ID is written into the code in two places. It moves to a configuration variable so a staging site can use a separate container without touching code.

### Testing

On a preview deployment with Google's Tag Assistant open, walk through each form on desktop and phone, and confirm every signal arrives with the right labels before merging.

### Checklist

- [ ] `trackEvent` helper and signal vocabulary in `src/lib/utils/analytics.ts`
- [ ] Booking forms (both): view, start, step, error, submit, success, fail
- [ ] Contact form: view, start, error, submit, success, fail
- [ ] WhatsApp link: labels added, team grid routed through it
- [ ] Phone and email links tracked
- [ ] CTA buttons tracked
- [ ] Chatbot tracked
- [ ] Sheet channel typo fixed
- [ ] Tag Manager ID moved to an environment variable
- [ ] Tested on preview, desktop and phone
- [ ] Signal documentation written (see phase 4)

---

## Phase 3: Make the cookie banner real

| | |
| --- | --- |
| **Where** | The website code and Tag Manager. |
| **Effort** | About one day |
| **Result** | What a visitor chooses in the banner actually controls what Google is allowed to store. Visitors who decline are still counted, anonymously, so the funnels stay usable. The firm can point to a banner that does what it says, ahead of Chile's new data protection law (Ley 21.719, in force December 2026). |

### How it works

Google has a mechanism called Consent Mode. Before Tag Manager loads, the site tells it the visitor's current choice (defaults to "not granted" until they decide). When the visitor accepts or declines, the site tells Google again. Every tag inside Tag Manager then behaves accordingly:

- **Accepted:** everything works as today.
- **Declined:** no cookies are set and nothing identifies the person. Google still receives a bare, cookieless ping per page and per signal, which it uses to estimate the missing part of the funnel statistically. Ads conversion matching for declined visitors is lost, which is unavoidable.
- **Not yet decided:** treated as declined.

This is Google's recommended setup and it is what keeps the reports from going dark when a good share of visitors decline.

### Steps

1. **Set the default consent state** in the site before the Tag Manager snippet runs, reading the existing `cookie-consent` cookie so a returning visitor's choice applies immediately.
2. **Send the update** when the visitor presses accept, decline, or saves preferences in the settings modal. This replaces the current full page reload in `src/components/CookieConsent/`.
3. **Map the banner's categories** (analytics, marketing) to Google's four storage types: analytics storage, ad storage, ad user data, ad personalisation.
4. **Keep Tag Manager loading for everyone.** The disabled gate in `ConditionalAnalytics.tsx` is removed rather than re-enabled: with Consent Mode the container itself must load so it can receive the choice. The tags inside it are what get restricted.
5. **In Tag Manager:** switch on consent checks for the container, confirm each tag declares which storage types it needs (the Analytics and Ads tags need it, the built-in behaviour is correct for Google's own tags), and verify with Tag Assistant that a declined visit sets no cookies.
6. **Review the banner copy** with the client. The wording, the categories, and whether "decline" is as prominent as "accept" are their legal call, since they are the lawyers. The plan assumes the current two-category banner and only changes what it controls.

### Checklist

- [ ] Default consent state set before Tag Manager loads
- [ ] Update sent on accept, decline, and preference save; page reload removed
- [ ] Categories mapped to the four storage types
- [ ] Gate in `ConditionalAnalytics.tsx` removed, container loads for everyone
- [ ] Tag Manager consent settings on, tags checked
- [ ] Verified: declined visit sets no Google cookies, signals still arrive as cookieless pings
- [ ] Banner copy reviewed with the client
- [ ] `COOKIE_CONSENT_SETUP.md` updated

---

## Phase 4: Receive those steps in Analytics

| | |
| --- | --- |
| **Where** | Tag Manager and Analytics. No code. |
| **Effort** | About half a day |
| **Result** | Every signal from phase 2 shows up in Analytics with its labels, and the four "finished" actions are marked as conversions there too. |

1. **In Tag Manager:** one rule that forwards every signal whose name starts with `rk_` to Analytics, passing the three labels along. One rule instead of eleven means a future signal needs no Tag Manager change.
2. **In Analytics:** register the three labels so they can be used in reports (Google calls this "custom dimensions"; without it the labels arrive but cannot be filtered on). Mark the four finishing actions as conversions ("key events" in Google's current wording).
3. **Verify:** in Analytics "DebugView", walk through the forms again and watch the signals arrive live. Publish the Tag Manager container.
4. **Hand-off note:** a one-page list of every signal, its labels and what it means, saved in this repository (`docs/tracking-events.md`), so whoever looks at this in a year can understand the reports.

### Google's automatic events

Analytics has a set of built-in events ("enhanced measurement"), each with its own switch. We keep the useful ones and turn off the ones that would collide with our signals:

| Automatic event | Keep? | Why |
| --- | --- | --- |
| Page views on navigation | **Yes, and verify** | The site never reloads between pages. Without this only the landing page counts. Verify in phase 1 that page views are neither missing nor doubled. |
| Form start and submit | **Off** | Guessed from the HTML, wrong for a two-step form. Would sit next to our signals with similar names and contradict them. |
| Scroll (90%) | Keep | Harmless. Our "form came into view" is the one the funnels use. |
| Outbound clicks | Keep | Also logs WhatsApp clicks under a generic name, a useful cross-check. |
| File downloads | Keep | Harmless. |
| Site search, video | Irrelevant | Nothing on the site for them to see. |

Rule for everything else: the site decides what a signal means and sends it; Tag Manager only forwards. No click-on-selector or form-submission triggers built inside Tag Manager, because they break silently when the site's markup changes and cannot know which step or field the visitor was on.

### Checklist

- [ ] Enhanced measurement: form interactions off, page views on navigation verified
- [ ] Tag Manager: `rk_.*` trigger, data layer variables for the three labels, one GA4 event tag
- [ ] Analytics: three custom dimensions registered
- [ ] Analytics: four key events marked
- [ ] Verified in DebugView
- [ ] Container published
- [ ] `docs/tracking-events.md` written

---

## Phase 5: Build the funnel reports

| | |
| --- | --- |
| **Where** | Analytics, "Explore" section. Shared with the client's login. |
| **Effort** | About one day, including a short written guide for the client |
| **Result** | Four reports the client can open any time, each showing how many people reach each step and where they leave, broken down by campaign, by source (ads, Google search, direct, social), and by device. |

### The four funnels

**Workers booking**
Arrived → Saw form → Started → Date and time chosen → Details sent → Booked

**Companies booking**
Arrived → Saw form → Started → Date and time chosen → Details sent → Booked

**Contact form**
Arrived → Reached `/contacto` → Started → Sent → Received

**Any contact**
Arrived → Reached a landing or contact page → Booked, wrote on WhatsApp, or called

The last one is the number the client cares about most: of everyone a campaign brought, what share made contact by any channel. The first three tell us why the others did not.

Alongside the funnels, one "path" report: for visitors who reached a landing page and left without contacting, where did they go instead? That usually points at a missing piece of information (price, location, who the lawyers are).

### The written guide

Two pages, in Spanish, with screenshots: how to open each report, how to change the date range, how to read the drop-off between two steps, and three example questions with the clicks to answer them ("which campaign loses most people at the details step?").

### Checklist

- [ ] Workers funnel
- [ ] Companies funnel
- [ ] Contact form funnel
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

Build this only after the client has looked at the phase 5 funnels for two or three weeks and told us what they keep wanting to see. Otherwise we guess at the layout.

---

## Phase 7: Watch, then review

| | |
| --- | --- |
| **Where** | A call with the client, plus a short written summary. |
| **Effort** | Half a day, about four weeks after phase 5 goes live |
| **Result** | The first concrete findings and a prioritised list of what to change on the site and in the campaigns. |

Funnels need a few hundred visits per step to say anything reliable. After roughly a month we read them together and write down what stands out: the step with the largest loss, the campaign with the worst ratio, the device where the form fails, the field that produces the most errors. Each finding comes with one suggested change. This is where the value of the whole project shows, so it belongs in the offer rather than being left to chance.

---

## 9. What the client gets, and effort

Written so it can be lifted into a proposal. Effort is in working days; pricing goes on top.

### Proposal text

> #### Understanding which campaigns bring clients, and where you lose the rest
>
> Today your Google Ads account counts how many people booked a call or wrote on WhatsApp. It cannot tell you why the others did not, and your Analytics account cannot tell you which campaign each visitor came from. This work connects the two and makes the site report every step a visitor takes towards contacting you.
>
> **You will receive**
>
> 1. **Connected accounts.** Google Ads, Analytics and Search Console linked, with the Analytics property configured to keep 14 months of history and exclude your own office traffic.
> 2. **Step-by-step tracking on the site.** Eleven moments recorded on the way to a contact: seeing the form, starting it, choosing a date, failing a field, sending, succeeding, clicking WhatsApp, calling, emailing, pressing a button, using the chatbot. Each one labelled by form, page and position.
> 3. **A cookie banner that works.** What a visitor chooses actually controls what Google stores. Visitors who decline are still counted anonymously, so your reports stay complete, and you are ahead of the data protection law that comes into force in December 2026.
> 4. **Four funnel reports in Analytics.** Workers booking, companies booking, contact form, and "any contact". Each shows how many people reach each step and where they leave, broken down by campaign, traffic source and device. Plus a report showing where people go instead of contacting you.
> 5. **A short guide in Spanish** on how to open and read the reports, with worked examples.
> 6. **Documentation** of every signal, kept with the website code, so future changes stay consistent.
> 7. **A review after one month** with the first findings and a prioritised list of improvements for the site and the campaigns.
>
> **Optional**
>
> - **One-page dashboard** combining advertising spend with results: cost per booked call, per campaign, week by week. Shared as a link, no login into Analytics needed.
>
> **What does not change**
>
> Your existing Google Ads conversion counting keeps working exactly as it does now. Nothing visible changes on the website for visitors.

### Effort

| Phase | What | Days |
| --- | --- | ---: |
| 1 | Check accounts, fix settings, connect Ads and Search Console | 0.5 |
| 2 | Site tracking, all signals, testing on preview | 1.5 – 2 |
| 3 | Cookie banner wired to Consent Mode, Tag Manager consent settings, verification | 1 |
| 4 | Tag Manager rule, Analytics labels and conversions, verification, docs | 0.5 |
| 5 | Four funnels, path report, written guide | 1 |
| 7 | Review after one month | 0.5 |
| | **Core** | **5 – 5.5** |
| 6 | Optional dashboard | 1 |
| | **With dashboard** | **6 – 6.5** |

Consider offering phase 7 as the start of a small monthly retainer (an hour or two per month) rather than a one-off: the reports only pay for themselves if someone reads them and acts.

### Pricing (internal, remove before sending)

Friend price, with the regular price shown alongside on the proposal so the discount is visible. Scope is what this document lists; anything else is quoted separately.

| | Friend price | Regular price |
| --- | ---: | ---: |
| Core (phases 1 to 5 and 7) | EUR 800 | EUR 2,500 |
| With dashboard (adds phase 6) | EUR 1,100 | EUR 3,200 |
| Monthly follow-up | EUR 100 | EUR 250 |

---

## 10. After this: getting the most out of it

In rough order of value. None of these are in the effort above.

### Count real clients, not clicks

This is the biggest lever by far. Today Ads optimises towards "someone clicked WhatsApp" or "someone booked". Neither is a client: some bookings are no-shows, some WhatsApp clicks never send a message. Google can be told, after the fact, which clicks became actual cases. It then finds more people like those, and stops paying for the ones that only click. The Caso code already in place is exactly the join key needed. The work: a place for the firm to mark each booking or conversation as "became a client" or not (the existing Google Sheet is enough), and a small routine that sends that back to Ads. Roughly two days. Requires the firm to actually mark the outcomes, which is the hard part.

### Tell Ads what a contact is worth

A company advisory is worth far more than a worker consultation. Giving each conversion an estimated value lets Ads spend towards value rather than volume. Half a day, but only useful once the client can give honest rough numbers.

### Use the drop-off data to change the forms

Once the funnels show where people leave, the fixes are usually small: fewer required fields, the calendar offering more than the six afternoon slots, the form higher on the page, a phone-only option. Each change can be shown to half the visitors and measured against the other half, which Vercel supports without extra tools. Ongoing work, an afternoon per experiment.

### Know what happens on the phone

Phone clicks will be tracked, but a click is not a call. Google Ads can show a forwarding number on ads and mobile pages for free and count calls and their duration. Worth switching on if the funnels show many phone clicks.

### Bring in organic search

With Search Console connected in phase 1, the same funnels can be filtered to visitors from Google search. That shows which blog posts and pages bring people who then contact the firm, and which bring readers who never do. That guides what to write next.

### Keep the data clean

Small recurring hygiene: exclude the firm's traffic and ours, watch for bot spikes, check that signals still fire after each site release. A five-minute check per release, which can be added to the deployment checklist.

---

## 11. Plain-language glossary

**Google Tag Manager.** A container loaded on every page that holds the tracking snippets, so they can be changed without a code release. The site sends it signals; it decides where to forward them.

**Google Analytics (GA4).** Where visits and signals are stored and reported. "Property" is Google's word for one website's account inside it.

**Event / signal.** One recorded moment: a page view, a click, a form sent. Everything in Analytics is built from these.

**Custom dimension.** A label attached to a signal that Analytics is allowed to filter and group by. Must be registered once; otherwise the label is received but unusable.

**Key event / conversion.** A signal marked as "this is the goal". Analytics calls it a key event, Ads calls it a conversion. Same idea.

**Enhanced conversions.** Sending a scrambled version of the visitor's email or phone with a conversion, so Google can match it to the ad click even when cookies fail.

**Auto-tagging / gclid.** Ads adds a click reference to the URL of every ad click. The site reads it, which is how a visit is tied to a campaign.

**Exploration.** Analytics' section for custom reports, including funnels and paths. Reports live under the person who built them and are shared to others.

**Funnel.** A report that counts how many people reached each step in a sequence, and therefore how many dropped between steps.

**Looker Studio.** Google's free report builder. Reads from Analytics, Ads, Search Console and Sheets and shows them on one shareable page.

**Offline conversion import.** Telling Ads afterwards which clicks turned into real business, so it can optimise towards those.

**Consent Mode.** A Google setting where visitors who decline cookies are counted anonymously and statistically instead of not at all.

**DebugView / Tag Assistant.** Google's live testing screens where you can watch signals arrive as you click through the site.
