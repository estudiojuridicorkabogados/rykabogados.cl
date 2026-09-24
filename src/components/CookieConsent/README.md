# Cookie consent

The banner, the settings modal, and the record of what the visitor chose.
What that choice then _does_ lives in `src/lib/utils/consent.ts`, which
translates it into Google's Consent Mode vocabulary.

## Files

```
CookieConsent/
├── types.ts                    # the stored record and the context's shape
├── utils.ts                    # the cookie: read, write, normalise, expire
├── CookieConsentProvider.tsx   # state, and the single write path
├── useCookieConsent.ts         # the hook
├── CookieBanner.tsx            # first layer: Rechazar / Personalizar / Aceptar
├── CookieSettingsModal.tsx     # three categories, three choices, an X
├── CookieSettingsModalLoader.tsx  # lazy-loads the modal on first open
└── index.ts
```

## Categories

| Banner category | Google storage types                                         |
| --------------- | ------------------------------------------------------------ |
| Necesarias      | `functionality_storage`, `security_storage` — always granted |
| Análisis        | `analytics_storage`                                          |
| Publicidad      | `ad_storage`, `ad_user_data`, `ad_personalization`           |

`personalization_storage` is always denied: this site personalises no content.
All seven are declared rather than only the four a choice moves, because an
undeclared type behaves as _granted_.

The advertising category also gates the site's own cookies — `rk_caso`, the
click references, the `utm_*` pair and the `rk_ft_*` set. Consent Mode does not
reach those; they are ours, and they are marketing cookies by any honest
reading. See `docs/cookie-inventory.md`.

## Where rejecting lives

**On the banner, since 24 September 2026.** Three buttons — **Rechazar
todas**, **Personalizar**, **Aceptar todas** — and the same three inside the
panel, where the middle one becomes "Guardar preferencias". Cancelling is an X
in the panel's header, not a fourth button: it is not a decision about cookies,
so it does not belong in the decision row. Esc and a backdrop click do the same
thing, and always did — headlessui gives both from `onClose`.

Reject and accept are the same component with the same variant, on the banner
and in the panel, so their relative weight is not a matter of opinion. Reject
comes first in the DOM, which is also first when the row stacks on a phone and
first for a screen reader.

It did not have to be this way, and for two days it was not: rejecting lived
one click inside "Personalizar". Nothing in force in Chile requires a
first-layer reject — Ley 21.719 prescribes no banner layout and Chile's agency
has published no cookie guidance, while the first-layer rule is EU
supervisory-authority doctrine. The firm asked for it anyway, going past the
rename we had recommended: they align their own policy with the European rules,
so accept-in-one-click against reject-in-two was not an asymmetry they wanted
to defend. Decision 3 of `docs/client-brief.md`.

## The switches start off

Both optional categories start **off** for a visitor who has not chosen yet, as
of 24 September 2026. The firm's answer to decision 2 of
`docs/client-brief.md`, and it agreed with our recommendation: no pre-ticked
boxes, no implied consent. Ley 21.719 requires consent to be _inequívoca_,
which is the precise word a pre-ticked box fails, and _Planet49_ (C-673/17)
settled the same point.

The consequence to keep in mind: "Guardar preferencias" pressed without
touching a switch now means the same thing as "Rechazar todas". It used to mean
the same thing as "Aceptar todas", which was the objection.

It never changed what is stored by default. Nothing is granted until "Guardar
preferencias" or "Aceptar todas" is pressed: `createDefaultPreferences()`
denies everything, and so does the Consent Mode default. A visitor who never
opens the panel is denied.

## Storage

`cookie-consent`, `path=/`, `SameSite=Lax`, `Secure` over https:

```json
{
  "necessary": true,
  "analytics": false,
  "advertising": false,
  "timestamp": "2026-09-22T15:07:58.003Z",
  "version": 3
}
```

**A record that grants nothing lives 30 days; one that grants anything lives a
year.** Someone who declines is asked again in a month rather than held to one
click for a year. Deliberately not shorter — a refusal that expires overnight
turns the banner into a daily toll, which is how consent stops being freely
given. A partial choice is not a refusal: they answered, so it keeps the year.

**`advertising` missing means declined.** Records written before the category
existed have no such key, and `normalizePreferences` enforces `=== true` rather
than letting truthiness propagate. The same rule is written a second time, in
ES5, inside `CONSENT_BOOTSTRAP_SNIPPET` — the two are checked against each
other by `src/lib/utils/__tests__/consent.test.ts`. Change them together.

`version` is 3, and `REPROMPT_BELOW_VERSION` in `src/lib/utils/consent.ts` is
3 too, so **everything written before 24 September 2026 is asked again** —
version 1 records, from before the advertising category, and version 2 records
alike. The firm's answer to decision 4 of `docs/client-brief.md`: ask again
even where consent was already given. Version 2 is the part worth pausing on,
because those were complete, current-shaped records — but they were collected
through a panel whose switches started ticked and a banner with no first-layer
reject, which is exactly what the firm has now ruled out.

The constant lives there rather than here because three readers apply it —
`isConsentValid` for the banner, `readStoredChoices` for the site's own
cookies, and the bootstrap snippet for the Consent Mode default — and a gate
only the banner applied left Google being told "granted" by a record the UI had
stopped honouring.

**There is no "dismissed" state.** An older design let the banner be closed
without an answer and remembered that in `cookie-banner-dismissed` in
localStorage, with no expiry. Under Consent Mode that would have been a
permanent, silent denial for everyone who once clicked it. Nothing reads or
writes the key any more; whoever has it is asked again like anyone else.

**Withdrawing advertising consent clears the site's own advertising cookies.**
`applyChoice` calls `clearAttributionCookies` whenever the stored choice has
advertising off, so `gclid`/`wbraid`/`gbraid`, the `utm_*` set and every
`rk_ft_*` copy are expired on the spot rather than left for their ninety days.
`rk_caso` is deliberately kept — see `getSessionCode` — so a reference the firm
may already be quoting on WhatsApp does not vanish mid-conversation.

## Two traps

**The provider's state is `choice ?? storedState`.** It was
`useState(initialState)` fed from `useSyncExternalStore`, and that is why the
banner did not render for anyone between 27 August and 22 September 2026:
`useState` runs its initialiser once, during hydration, where the store
correctly returns the _server_ snapshot so the markup matches — and then
ignores the client snapshot that arrives on the next render. If you refactor
this, that is the shape to avoid.

**The modal re-seeds its switches on open, not on mount.** The loader keeps it
mounted after the first open, so `useState` alone went stale: accept from the
banner, reopen from the footer, and the switches showed their first-mount
values while saving wrote them back — silently revoking what
had just been granted.

## Using it

```tsx
const { hasAnalyticsConsent, hasAdvertisingConsent, openSettings } =
  useCookieConsent();
```

Do not gate rendering on consent. Under Consent Mode the container must load
for everyone so it can receive the choice; what gets restricted is the tags
inside it. `SiteAnalytics` used to do the former and the comment there explains
what it cost.

## Adding a category

1. `types.ts` — add the field.
2. `utils.ts` — `normalizePreferences` and `createDefaultPreferences`.
3. `consent.ts` — `consentStateFrom` **and** `CONSENT_BOOTSTRAP_SNIPPET`.
4. `CookieSettingsModal.tsx` — one more `ConsentToggleRow`.
5. `docs/cookie-inventory.md` and both policy pages.
6. Extend the parity test; it will not fail on its own if you forget step 3.
