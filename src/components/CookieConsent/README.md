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
├── CookieBanner.tsx            # first layer: Personalizar / Aceptar todas
├── CookieSettingsModal.tsx     # three categories, and Rechazar todas
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

## Where rejecting lives, and why it is not on the banner

The banner has two buttons. "Rechazar todas" is inside "Personalizar".

Nothing in force requires a first-layer reject button here: Ley 21.719
prescribes no banner layout and Chile's agency has published no cookie
guidance, while the first-layer rule is EU supervisory-authority doctrine that
does not reach a Chilean firm advising Chilean clients. The residual risk is
the asymmetry — accept in one click, decline in two — and it went to the firm
as a decision rather than being taken for them. **Revisit if they ever market
to the EU**; the button then goes on the banner. `docs/client-brief.md` has the
full note.

Within the modal, reject and confirm are the same component with the same
variant, so their relative weight is not a matter of opinion.

## Storage

`cookie-consent`, `path=/`, `SameSite=Lax`, `Secure` over https:

```json
{
  "necessary": true,
  "analytics": false,
  "advertising": false,
  "timestamp": "2026-09-22T15:07:58.003Z",
  "version": 2
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

`version` is 2. `REPROMPT_BELOW_VERSION` in `utils.ts` is 0, so nothing is
re-prompted; raise it to 2 if the firm decides people who accepted before the
advertising category existed must choose again.

`cookie-banner-dismissed` in localStorage survives from an older design. Only
`dismissBanner` sets it and nothing in the UI calls that any more.

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
values while "Confirmar elecciones" wrote them back — silently revoking what
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
