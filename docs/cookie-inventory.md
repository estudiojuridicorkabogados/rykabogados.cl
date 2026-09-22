# Every cookie this site sets

The technical input for `/politica-cookies` and `/politicas-de-privacidad`. We
supply the facts; the firm writes the wording, since they are the lawyers and
it is their liability.

Accurate as of 22 September 2026, against the code rather than against what the
current policy pages claim — which is the point, since those pages list Google
Analytics and Vercel and nothing else.

## The table

| Cookie / storage | Set by | What it is for | Lifetime | Who receives it | Category |
| --- | --- | --- | --- | --- | --- |
| `cookie-consent` | The site | Remembers the visitor's own choice about cookies | 1 year if they accept anything, **30 days if they refuse everything** | Nobody — never leaves the browser | Necesarias |
| `rk_caso` | The site | The case reference quoted in the WhatsApp message, the booking emails and the intake sheet | 90 days | RK Abogados, via the Google Sheet | **Publicidad** |
| `gclid`, `wbraid`, `gbraid` | The site | Which Google ad click brought this visit | 90 days, or until advertising consent is withdrawn | RK Abogados, via the Google Sheet | **Publicidad** |
| `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term` | The site | Which campaign brought this visit, for anything that is not Google Ads | 90 days, or until advertising consent is withdrawn | RK Abogados, via the Google Sheet | **Publicidad** |
| `rk_ft_*` (the same eight, plus `rk_ft_landing`, `rk_ft_referrer`, `rk_ft_ts`) | The site | The *first* campaign that ever brought this visitor, kept so credit is not lost when they think it over for a few days | 90 days, or until advertising consent is withdrawn | RK Abogados, via the Google Sheet | **Publicidad** |
| `_ga` | Google Analytics, through Tag Manager | Distinguishes one visitor from another | 2 years | Google LLC | Análisis |
| `_ga_HE87DHS09F` | Google Analytics | Session state for this property | 2 years | Google LLC | Análisis |
| `_gcl_au` | Google Ads Conversion Linker | Attributes a conversion to an ad click | 90 days | Google LLC | Publicidad |
| `_gcl_aw` | Google Ads | Stores the click reference after an ad click | 90 days | Google LLC | Publicidad |
| `_gcl_dc` | Google Display | The same, for display clicks | 90 days | Google LLC | Publicidad |
| `_GRECAPTCHA` | Google reCAPTCHA v3 | Tells a person from a bot on the three forms | ~6 months | Google LLC | Necesarias (seguridad) |
| `am_short_code` (sessionStorage) | The site, historically | The previous home of the case reference. Read once for continuity, never written | Session | Nobody | Necesarias |

## What a visitor who rejects actually gets — read this before writing a word

The single easiest way to make this policy wrong is to write a sentence like
**"no se envía ningún dato a Google"**. It is the natural thing to write, it is
what most people assume "rechazar" means, and on this site it is **false**.

Rejecting stops cookies. It does not stop the request.

| When someone rejects | |
| --- | --- |
| Cookies written or read on their device | **none** |
| `_ga`, `_gcl_aw`, `_gcl_au`, `_gcl_dc` | **none** |
| `rk_caso`, `gclid`, `utm_*`, `rk_ft_*` | **none** |
| A persistent identifier for them | **none** |
| Any link between this visit and a previous one | **none** |
| Any link between this visit and an ad click | **none** |
| A request to Google | **yes, still sent** |
| What that request carries | page visited, referring page, language, screen size, browser, **IP address**, and the event's own labels |

That request is Google Consent Mode's "cookieless ping". It is lawful without
consent because the cookie rules — and Ley 21.719's concern — are about storing
or reading information *on the device*, and it stores nothing. But an IP address
is personal data, so a claim that nothing reaches Google is not one the firm can
stand behind.

### Claims the firm can make

- "Si rechazas, no instalamos cookies de análisis ni de publicidad en tu
  dispositivo."
- "Si rechazas, no podemos reconocerte entre una visita y otra."
- "Si rechazas, no vinculamos tu visita con ningún anuncio ni construimos un
  perfil publicitario."

### Claims the firm cannot make, as the site is configured today

- ~~"No se envía ningún dato a Google."~~
- ~~"No se recoge ninguna información."~~
- ~~"Tus datos no salen de nuestro sitio."~~
- ~~"Si rechazas, no te rastreamos."~~ — too broad to defend, and it is the
  sentence a complainant would quote.

### This is a choice, and the other option unlocks the stronger sentence

Google's tags can instead be blocked outright until consent — one setting in
Tag Manager, "Require additional consent for tag to fire", no code change,
reversible in minutes. Then nothing at all is sent and the firm *can* write
"no se envía ningún dato a Google".

What it costs: with the tags blocked, a declining visitor is completely
invisible, so the firm cannot tell "nobody came" from "everybody declined". The
usual argument against blocking is that the cookieless pings feed Google's
behavioural modelling — but that only switches on above roughly a thousand
declining visitors a day, which this site will not reach. So the main benefit
of keeping the pings does not apply here, and what remains is aggregate volume
visibility.

**This is the firm's call, not ours.** It is a judgement about how they want to
describe themselves to their own clients, and they are better placed to make it
than we are. Whichever way they go, the policy wording has to match.

## Four things the policy has to get right

**reCAPTCHA does not load on every page.** It is mounted on `/contacto`,
`/habla-con-nosotros/trabajadores` and `/habla-con-nosotros/empresas` only,
because it costs ~354 KB and those are the only pages that use it. The policy
should say "en los formularios" rather than "en el sitio". (This corrects
`docs/tracking-plan.md`, which says it loads on every page.)

**Vercel Analytics and Speed Insights set no cookie at all** and store nothing
on the visitor's device, so they sit outside the banner. That is a deliberate
position and the policy should state it rather than leave it looking like an
omission. One honest caveat for the privacy policy: Vercel derives a daily
hashed visitor identifier server-side from IP and user agent. Still not storage
on the device, so still no consent needed — but it *is* processing of personal
data and deserves a sentence.

**"Rechazar" does not mean zero cookies.** It means no Google cookies and none
of the site's own advertising cookies — and, for someone who had accepted
earlier, the campaign cookies already written are expired on the spot rather
than left to run out. `cookie-consent` itself and reCAPTCHA remain, because the
first is the record of the refusal and the second protects the forms. `rk_caso`
also survives a withdrawal, deliberately: it may already be quoted in a
WhatsApp conversation the firm is having, and it stops joining anything to a
campaign once the campaign cookies are gone. The banner copy must not promise
more than that.

Historic note: older builds stored a `cookie-banner-dismissed` flag in
localStorage when the banner was closed without an answer. Nothing reads or
writes it any more; whoever still carries it is asked again like anyone else.

**Google receives more than cookies.** When someone submits a form, a scrambled
(hashed) version of their email and phone is sent to Google Ads so a booking can
be matched to the ad click. It is hashed in the browser and the raw values never
leave it — but Google is still a recipient of personal data, and since phase 3
this only happens with advertising consent. `/politicas-de-privacidad` §9
currently says the firm shares no data with third parties, which does not sit
well beside it. Worth raising with them directly.

## Where these come from in the code

For whoever maintains this rather than for the client.

| Cookies | Written by |
| --- | --- |
| `cookie-consent` | `src/components/CookieConsent/utils.ts` |
| `rk_caso` | `src/lib/utils/tracking.ts` (`getSessionCode`) |
| `gclid`/`utm_*`/`rk_ft_*` | `src/components/Analytics/TrackingParamsCapture.tsx` |
| `_ga*`, `_gcl_*` | Google, inside container `GTM-PC49T6MC` |
| `_GRECAPTCHA` | `src/components/Recaptcha/RecaptchaScript.tsx` |

The site's own advertising cookies are gated on the advertising category; see
`src/lib/utils/consent.ts`. Google's are gated by Consent Mode, which is the
same choice expressed in Google's own vocabulary.
