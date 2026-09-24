# What the consent bootstrap script costs

Phase 3 puts an inline script in the body of every page, before anything else.
An inline script in the body is the one thing on this site that genuinely
blocks the parser, and the whole reason GTM is deferred at all
(`docs/lcp-performance-plan.md`) is that main-thread cost on this site is taken
seriously. So this was measured rather than argued.

Measured 22 September 2026, `main` (d549f13) against `feat/consent-mode-v2`.

## How to reproduce it

```bash
git checkout main
bun run build && bun run start
bun run perf:probe -- --label before

git checkout feat/consent-mode-v2
bun run build && bun run start
bun run perf:probe -- --label after

bun run perf:probe -- --compare before after
```

`scripts/perf-probe.ts` drives Chrome for Testing over CDP at 4x CPU
throttling and Slow 4G with a cold cache, against `next start` — the same
conditions as the earlier LCP work, so the numbers sit beside it. Median of
five runs per page, on `/` and `/habla-con-nosotros/trabajadores`.

Use `next start`, never `next dev`: compiling a route on demand is slow enough
to hide main-thread costs that production shows, which is the same effect that
hid the `_gcl_aw` race in commit 26d8283.

## Result

| | `/` before | `/` after | landing before | landing after |
|---|---:|---:|---:|---:|
| **TBT** | 236 ms | **232 ms** | 287 ms | **290 ms** |
| Longest task | 215 ms | 214 ms | 214 ms | 205 ms |
| Long tasks | 3 | 3 | 4 | 4 |
| **HTML transfer** | 20 531 B | **21 125 B** | 25 664 B | **26 262 B** |
| HTML decoded | 91 482 B | 92 568 B | 151 374 B | 152 460 B |
| FCP | 904 ms | 896 ms | 904 ms | 896 ms |
| LCP | 904 ms | 896 ms | 904 ms | 896 ms |

**TBT is unchanged.** −4 ms and +3 ms, against a run-to-run spread of 222–256
and 270–325 on the same build — noise in both directions. The long task count
and the longest task are identical.

That is not luck. TBT counts only the part of a task that exceeds 50 ms, and
the snippet is its own task doing one regex, one `JSON.parse` and three array
pushes. It cannot reach the threshold, so it cannot contribute, however often
it runs. The measurement exists to confirm that reasoning, not to replace it.

**FCP and LCP did not regress** — both moved 8 ms in the *good* direction,
which is noise. Do not read the absolute figures as production's: loopback
reproduces neither production's bandwidth contention nor its HTTP/2
multiplexing, and `next start` serves over HTTP/1.1. The earlier work measured
the same build at 1260 ms locally and 2656 ms live. The delta between two
builds on one harness is what transfers.

**The cost is 594–598 bytes compressed per HTML document**, about 2.5%. That is
the whole cost, and it is deterministic rather than measured.

> **Since measured:** the snippet gained the `REPROMPT_BELOW_VERSION` gate (a
> record below that version grants nothing), which took it from 713 to 784
> bytes before compression — about 70 bytes more, paid twice like everything
> else here, so roughly 40–50 bytes compressed on top of the figures below.
> Not re-measured; well inside the noise of the harness.
>
> **24 September 2026:** the unanswered fallback became a build-time value
> (`CONSENT_REQUIRED`) and the stored record is now read with a ternary rather
> than raised from that fallback. Net **766 bytes**, 18 *fewer* than before:
> the two ternaries cost less than hoisting `'granted'`/`'denied'` into `G` and
> `N` across all seven storage types saved. Measured with
> `bun -e 'import {CONSENT_BOOTSTRAP_SNIPPET as s} …; s.length'`, not
> re-probed — it is smaller than the figure the probe already accepted.

## Why the decoded number is 1086 bytes for a 713-byte script

The script ships twice: once as itself, and once backslash-escaped inside the
RSC flight payload, because anything a Server Component renders is also
serialised there. That is inherent to inlining a script in the root layout and
cannot be avoided without moving it into a Client Component — which would put
it in the JS bundle and run it after hydration, losing the entire point.

It can be made cheaper, and was. Two changes took the decoded delta from 1300
bytes to 1086:

- **Single-quoted strings inside the snippet.** JSON escapes `"` and not `'`,
  so every double quote was costing three extra bytes in the second copy.
  Escaping overhead went from substantial to 2 bytes.
- **Hoisting `granted`/`denied` into two variables** instead of writing them
  out at each of the seven storage types — paid for twice, like everything
  else here. The two ternaries that read the stored record are the exception
  that pays for itself; see the note above.

If the snippet ever grows, those two rules are why it is written the way it is.

## The thing this buys

`consentDefaultIndex` in the probe output is the consent default's position in
`window.dataLayer`. It reads **0** on both pages after the change and **-1**
(absent) before it.

That is the point of the placement. GTM replays the dataLayer in order rather
than reading it as state at initialisation, and a consent type it has not been
told about behaves as *granted*. `PageViewTracker` pushes `rk_page_view` from
an effect that runs before the GTM loader's own effect, so a default sent from
any component can end up behind it — and that page view would then be processed
with nothing restricting it.

Index 0 is the guarantee, and it is checked on every probe run.

## One thing that did not change, and had to be checked

Every route is still **prerendered as static content** after the change. The
alternative placement — reading the consent cookie server-side with `cookies()`
in the root layout — would have opted the entire route tree out of static
rendering. The build output is the evidence; re-read it if the layout is
touched again.
