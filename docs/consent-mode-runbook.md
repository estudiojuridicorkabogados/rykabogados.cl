# Tag Manager: turning on Consent Mode

The container side of phase 3. The code is done and merged; this is the part
that happens in Google's interface, and it is deliberately written out rather
than done ad hoc, because one of the steps is counter-intuitive enough to break
the whole thing quietly.

Container `GTM-PC49T6MC`, 8 tags. All eight are `consentStatus: NOT_SET` today.

**Do not publish this before the code is live.** Tags would become
consent-restricted with no defaults ever arriving, and every visitor would be
silently denied.

Work in a workspace, preview, then publish.

## 1. Turn on the consent overview

Admin → Container Settings → Additional Settings → **Enable consent overview**.

A shield icon appears beside Tags and a Consent column appears in the tag list.
Every tag reads "Not configured" until reviewed; there is a bulk "mark as
reviewed" action once you have been through them.

## 2. Leave every Google tag on "No additional consent required"

**This is the step to get right.** The two things look alike and do the
opposite:

- **Built-in consent checks** — what Google-built tags already have. The tag
  *fires*, reads the consent state itself, and adapts: no cookies, a cookieless
  ping instead of nothing.
- **Additional consent required** — the field you can edit. The tag **does not
  fire at all**.

Setting `analytics_storage` as *additional* consent on the GA4 tags is the
obvious-looking move and it blocks the cookieless ping, which is the one thing
Consent Mode exists to preserve. So:

All eight tags in this container, as reviewed on 22 September 2026:

| Tag | Type | Built-in checks it already does | Additional consent |
| --- | --- | --- | --- |
| Etiqueta de Google ads (`AW-11083927345`) | Google Tag | `ad_storage`, `ad_personalization`, `ad_user_data`, `analytics_storage` | **None** |
| Etiqueta de Google analitics (`G-HE87DHS09F`) | Google Tag | the same four | **None** |
| Formulario RK, Formulario Trabajadores, Formulario Empresa, Clic WhatsApp | Google Ads Conversion Tracking | `ad_storage`, `ad_user_data` | **None** |
| Google Ads User-provided Data Event | Google Ads UPD | `ad_storage`, `ad_personalization`, `ad_user_data` | **None** |
| Vinculación de conversiones | Conversion Linker | `ad_storage`, `ad_personalization`, `ad_user_data` | **None** |
| The phase 4 `rk_.*` GA4 forwarder, when it exists | GA4 Event | `analytics_storage` | **None** |

The bulk editor calls this "No additional consent required", which is also what
clears the "Not configured" warning — there is no separate "mark as reviewed".
"Not set" behaves identically at fire time; it just leaves the warning up.

## 2b. The rule for anything that is not a Google tag

**Read this before adding a Meta Pixel, Hotjar, Clarity, a LinkedIn Insight
tag, TikTok, an A/B testing snippet, or any Custom HTML.** Step 2 says "leave
it on none" and that answer is correct *only* because every tag in this
container today is Google-built and carries its own consent checks. A
third-party tag carries none. It knows nothing about the visitor's choice and
will fire, set cookies and phone home regardless — and because the rest of the
container is configured correctly, nothing will look wrong.

So for any non-Google tag, **"Require additional consent for tag to fire" is
mandatory**, with the types below. That setting is a blunt gate — the tag does
not fire at all — which is exactly right for a tag that cannot be trusted to
restrain itself.

| What you are adding | Require |
| --- | --- |
| Meta/Facebook Pixel, TikTok, LinkedIn Insight, X/Twitter, any ad network | `ad_storage`, `ad_user_data`, `ad_personalization` |
| Hotjar, Microsoft Clarity, heatmaps, session recording | `analytics_storage` |
| Matomo, Plausible-with-cookies, any second analytics tool | `analytics_storage` |
| Optimizely, VWO, any A/B or personalisation tool | `analytics_storage`, and `personalization_storage` if it personalises content |
| A chat widget that persists an identity across visits | `functionality_storage` |

Session recording deserves a flag of its own: Hotjar and Clarity capture form
contents and mouse movement, so on `/contacto` and the two booking pages they
would record a visitor typing their name, email, phone and the details of their
legal problem. That is not an analytics decision, it is a
professional-confidentiality one, and it goes to the firm before it goes in the
container.

**Three things have to move together**, every time. Only the first is in Tag
Manager, and the other two are what actually get forgotten:

1. The tag's additional consent setting, per the table above.
2. A new row in `docs/cookie-inventory.md` — name, purpose, lifetime,
   recipient, category — since that file is what the policy pages are written
   from.
3. `/politica-cookies` and `/politicas-de-privacidad`, which name every
   recipient. A new vendor is a new recipient of personal data, and the privacy
   policy currently says the firm shares data with nobody.

And if the *site* starts setting a cookie of its own for that vendor, it is
gated in code rather than in the container — `hasAdvertisingConsent()` in
`src/lib/utils/consent.ts`, the way `rk_caso` and the `rk_ft_*` set already
are. Consent Mode only reaches Google's tags; it has never reached ours.

## 3. Confirm the conversion triggers still match

Nothing in phase 3 touches them, but the consent review is the natural moment
to check the four trigger names against `RK_EVENTS` in
`src/lib/utils/analytics.ts`: `rk_conv_contact_form`, `rk_conv_whatsapp`,
`rk_conv_empresas_booking`, `rk_conv_trabajadores_booking`.

## 4. Preview, against a production build

Tag Assistant, fresh incognito profile, and a **production build** — not
`next dev`. Compiling a route on demand is slow enough to hide races that
production shows, which is exactly what hid the `_gcl_aw` problem in commit
26d8283.

- **Consent tab → on-page default** must read:
  `ad_storage: denied`, `ad_user_data: denied`, `ad_personalization: denied`,
  `analytics_storage: denied`, `functionality_storage: granted`,
  `personalization_storage: denied`, `security_storage: granted`.
  If it says there is no default consent, the `arguments` form is broken — see
  the header of `src/lib/utils/consent.ts` for why that fails silently.
- The consent default must appear **above** the first `rk_page_view` in the
  event list. `bun run test:tracking` asserts this too.
- Press **Aceptar todas** → a Consent entry appears with the four mutable types
  flipping to granted.
- In a second fresh profile, **Personalizar → Rechazar todas** → tags still
  **fire**, marked consent-restricted. Fired-and-restricted is the correct
  result, not a fault: the built-in checks strip the identifiers and send a
  cookieless ping rather than nothing.
- **The `gcs` parameter is the proof, and it is worth looking at once.** Open a
  fired tag's outgoing request and read `gcs=G1XY`, where X is `ad_storage` and
  Y is `analytics_storage`: `G100` both denied, `G111` both granted, `G110` and
  `G101` the mixed cases. A declining visitor should show a request that exists
  and carries `G100`. If instead the tag shows as blocked with no request at
  all, someone has set "Require additional consent" on a Google tag — see
  step 2.

## 5. A declined visit sets no Google cookies

Fresh profile → reject → make GTM load (scroll, or land with `?gclid=TEST123`)
→ DevTools → Application → Cookies.

**Absent:** `_ga`, `_ga_HE87DHS09F`, `_gcl_au`, `_gcl_aw`, `_gcl_dc`.
**Present:** `cookie-consent`, containing `"advertising":false`, and
`_GRECAPTCHA` on the three form pages.

**Also absent, and this is new:** `rk_caso`, `gclid`, and the `rk_ft_*` set.
The site's own advertising cookies are gated in the code now, so a declining
visitor should have none of them. If they appear, that is a code bug, not a
container one.

## 6. `url_passthrough` across a navigation — measure it, do not assume

Land on `/?gclid=TEST123` with advertising declined, click an internal link,
then read `location.search` on the destination.

`docs/tracking-plan.md` asserts that `url_passthrough` fixes the
cross-navigation loss. On a client-side-routed app that is an assumption rather
than a fact: `url_passthrough` works by decorating `<a>` clicks and `history`
navigations, and every internal link here is a Next `<Link>` whose router
intercepts the click and calls `pushState` with a URL of its own. It may well
strip the decoration.

**Measured on production, 22 September 2026, clean incognito: it does not
survive.** Landing on `/?gclid=TEST123`, declining advertising, then clicking
through to `/nosotros` left no `gclid` and no `_gl` on the destination. Next's
`<Link>` intercepts the click and calls `pushState` itself, so Google's link
decorator never gets to run.

Leave `url_passthrough` switched on regardless — it costs nothing and covers
the ordinary `<a href>` links that do exist, such as the WhatsApp ones. But do
not rely on it, and do not repeat the claim that it protects attribution across
navigation on this site.

`ads_data_redaction` is the load-bearing half of the pair and does work.

Re-test this if the site ever moves off the App Router, or if Next changes how
`<Link>` handles clicks.

Note that the site's own `gclid` cookie, which used to be the fallback here, is
now gated on advertising consent — so for a declining visitor there is no
fallback by design. That is coherent with declining; it is worth knowing it is
a second effect rather than the same one.

## 7. Publish

Version note:

> Consent Mode v2 — live from &lt;go-live date&gt;. Reporting baseline changes;
> see docs/tracking-plan.md phase 3.

The go-live date is the firm's to agree, and it is also the baseline for every
report from phase 7 onward. `docs/client-brief.md` has what to tell them, and
why they must hear it before rather than after.

## Still open from phase 1, worth doing in the same sitting

- The non-production exception, rebuilt on 22 September as a Custom Event `.*`
  trigger, has not been verified on a preview URL.
- ~~`Click Whatsapp RK`~~ — removed 24 September 2026. It was Primary with no
  data, distinct from the action the tag actually fires.
- ~~`Cliente convertido`~~ — understood 23 September 2026: nothing uploaded to
  it until the Sheet's `Ads import` tab was connected the same day. See
  `docs/tracking-plan.md`, phase 1 and section 10.
