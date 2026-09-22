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

| Tag | Additional consent | What it already checks by itself |
| --- | --- | --- |
| Google tag, Ads (`AW-11083927345`) | **None** | `ad_storage`, `ad_user_data` |
| Google tag, Analytics (`G-HE87DHS09F`) | **None** | `analytics_storage` |
| Formulario RK, Formulario Trabajadores, Formulario Empresa, Clic WhatsApp | **None** | `ad_storage`, `ad_user_data` |
| User-Provided Data Event | **None** | `ad_user_data` |
| The phase 4 `rk_.*` GA4 forwarder, when it exists | **None** | `analytics_storage` |
| Any Custom HTML or non-Google tag | **Set it explicitly** | nothing — they have no built-in checks |

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
  fire, marked consent-restricted.

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

**Write down what actually happens**, in `docs/tracking-plan.md`. Whichever way
it goes, `ads_data_redaction` is the load-bearing half of the pair.

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
- `Click Whatsapp RK` — Primary, no data, distinct from the action the tag
  actually fires. Demote or remove; an empty Primary action distorts Smart
  Bidding.
- `Cliente convertido` — an offline import nobody has a record of setting up.
  Establish what feeds it before building another.
