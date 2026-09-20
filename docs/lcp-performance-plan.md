# LCP and page speed plan

Why Google Search Console reports Largest Contentful Paint as poor on both mobile and desktop, what actually causes it, and the work to fix it.

**This is the internal build plan — it does not go to the client.** It names files, numbers and settings, and it is blunter about the state of the site than a client document would be.

Prepared 20 September 2026.

Status: diagnosis complete and evidenced. Phase 1 and the mechanical part of phase 2 are done and verified locally; awaiting a preview deploy for real measurement. Phase 3 not started.

## Contents

1. [What was measured, and what was not](#1-what-was-measured-and-what-was-not)
2. [The numbers](#2-the-numbers)
3. [The cause: JavaScript starves the hero image of bandwidth](#3-the-cause-javascript-starves-the-hero-image-of-bandwidth)
4. [Secondary findings](#4-secondary-findings)
5. [Phase 1: Stop the bandwidth contention](#phase-1-stop-the-bandwidth-contention)
6. [Phase 2: Cheap multipliers](#phase-2-cheap-multipliers)
7. [Phase 3: Correctness cleanup](#phase-3-correctness-cleanup)
8. [How we will know it worked](#how-we-will-know-it-worked)
9. [Open questions](#open-questions)

---

## 1. What was measured, and what was not

**Not measured: the actual field data.** The PageSpeed Insights API refused anonymous requests with `RESOURCE_EXHAUSTED` — Google now sets the keyless daily quota to zero. So the CrUX p75 figures that Search Console is actually complaining about were never retrieved, and we do not yet know with certainty which URL groups are flagged or how far over the 2.5s threshold they sit. Getting a Google Cloud API key with the PageSpeed Insights API enabled would close this gap in minutes, and it should be done before and after the work so the improvement is provable rather than assumed. See [open questions](#open-questions).

**What was measured:** production `www.rkabogados.cl`, driven through Chrome DevTools Protocol under Lighthouse-equivalent conditions — Slow 4G (1.6 Mbps down, 150ms RTT), 4× CPU throttling, browser cache disabled, Moto G Power viewport at DPR 2.625. Desktop runs used 10 Mbps, 40ms RTT, no CPU throttling. LCP was captured via `PerformanceObserver` with element attribution, alongside full resource timing.

One important caveat on every number below: **the measured TTFB of roughly 75ms is unrealistically good.** The test machine sits beside a Vercel edge node (`fra1`) with a warm cache. Real visitors in Chile route differently and pay more. Every LCP figure here should be read as a floor, not an estimate.

## 2. The numbers

Mobile, Slow 4G, 4× CPU, cold cache:

| Page | TTFB | FCP | LCP | JS transferred |
|---|---|---|---|---|
| `/` | 73ms | 1592ms | **2656ms** | 790 KB |
| `/blog/contrato-de-trabajo-en-chile` | 78ms | 2144ms | **3812ms** | 797 KB |
| `/habla-con-nosotros/trabajadores` | 223ms | 2052ms | **4100ms** | 1032 KB |

Desktop, 10 Mbps, no CPU throttle:

| Page | TTFB | FCP | LCP |
|---|---|---|---|
| `/` | 76ms | 860ms | 1560ms |
| `/blog/contrato-de-trabajo-en-chile` | 69ms | 336ms | 704ms |

The LCP element on every page tested is the hero `<img>`, served through `/_next/image`.

The desktop and mobile runs differ in only two variables, bandwidth and CPU. CPU was not the constraint — the mobile runs recorded only 173ms of long tasks in total, nowhere near enough to explain a 1.1-second gap. That leaves bandwidth, and it makes the two tables above a reasonably clean controlled experiment.

## 3. The cause: JavaScript starves the hero image of bandwidth

LCP phase breakdown for the homepage:

| Phase | Time | Share |
|---|---|---|
| Time to first byte | 73ms | 3% |
| Resource load delay | ~95ms | 4% |
| **Resource load duration** | **~2344ms** | **88%** |
| Element render delay | ~64ms | 5% |

Everything Next.js is supposed to get right here, it gets right. The hero image is preloaded with a correct `imageSrcSet`, it is discovered at 168ms, and the server starts responding at 248ms. None of that is the problem.

**The problem is that the image is 38 KB and takes 2.3 seconds to transfer.** At 1.6 Mbps that payload should take about 190ms. It takes twelve times longer because all twenty-one JavaScript chunks are requested in the same instant, at roughly 200ms, and the connection is shared fairly between them. 790 KB at 1.6 Mbps is about four seconds of completely saturated link; the image simply queues behind its share of that.

The same mechanism sets first paint. The single render-blocking stylesheet is 83 KB raw, 14.7 KB compressed, and takes **1.3 seconds** to arrive for exactly the same reason. That is most of the 1592ms FCP.

### What is in the 790 KB

Measured against the live deployment, largest first:

| Chunk | Decoded | Gzip | Contents |
|---|---|---|---|
| `3ofxe5ucaw_d7.js` | 293 KB | 83 KB | **AI SDK chat client** (72 `toolCall` references) |
| `134pcoqak48_1.js` | 223 KB | 72 KB | react-hook-form and dependencies |
| `0qky22r0myers.js` | 170 KB | 48 KB | **Zod** (946 references — this is Zod itself) |
| `38l1iyf4tzjjw.js` | 133 KB | 46 KB | **motion** |
| `2ksdk5lz194p0.js` | 126 KB | 35 KB | react-calendar, headlessui, react-fast-marquee |
| — | 166 KB | — | Apollo Client, on the client |

The single largest item is the chatbot, and it is on the homepage because of how it is mounted rather than because anyone uses it.

`src/app/layout.tsx:47` loads `SupportChatbot` through `dynamic()`, but without `ssr: false` and without any gate on user interaction, so the component renders immediately on every route. `src/components/SupportChatbot/SupportChatbot.tsx:20` then calls `useChat()` at the top level of that component. The consequence is that the AI SDK and Zod — about 130 KB compressed, 460 KB decoded — are downloaded on **every page load of every page on the site**, including blog articles and the privacy policy, whether or not the visitor ever opens the chat. Almost nobody does, and everybody pays for it.

## 4. Secondary findings

**reCAPTCHA loads site-wide.** `src/app/layout.tsx:96` puts the reCAPTCHA script in the root layout, so it loads on blog posts and policy pages that contain no form at all. It transfers 354 KB and decodes to **846 KB**. It is `strategy="lazyOnload"`, so on the test connection it lands after LCP and does not directly inflate the numbers in section 2 — but on a genuinely slow connection it overlaps, and it burdens the main thread and INP everywhere regardless.

**The image optimizer is cache-missing.** Repeated requests for the same blog hero returned `x-vercel-cache: MISS` with `age: 0`. On the blog post measurement the browser waited **856ms for the first byte** of an image it had already preloaded. Note also that the image is a ChatGPT-generated PNG that Contentful has already transformed (`?fm=webp&q=80`) and that Next then re-optimizes — the same bytes processed twice. Local static images return `immutable`, while remote ones return `must-revalidate`, which is worth investigating as the cause.

**Seventeen elements are served invisible.** `src/components/Hero/HeroContent.tsx` animates with `whileInView` and `initial="hidden"`, so the homepage `<h1>` reaches the browser as:

```html
<h1 ... style="opacity:0;transform:translateY(30px)">Excelencia, Lealtad <br/>e Integridad</h1>
```

This is not what is costing us LCP today, because the hero image wins the LCP candidacy and elements at `opacity:0` are disqualified from consideration anyway. It matters for three other reasons: the largest text on the page can never become an LCP candidate, the copy is invisible until hydration finishes, and the pattern is repeated across 31 files. Commit `93180e9` fixed precisely this on the blog and the rest was never followed up.

**AVIF is not enabled.** `next.config.ts` configures `remotePatterns` but never sets `formats`, so every image is served as WebP. AVIF is typically 25–35% smaller for this kind of photographic content.

---

## Phase 1: Stop the bandwidth contention

This phase is where essentially all of the LCP improvement lives. Everything after it is worth doing, but none of it will move the metric like this does.

**Done.** The Next.js lazy-loading guide states the mechanism outright: *"When a Server Component dynamically imports a Client Component, automatic code splitting is currently not supported."* `layout.tsx` was a Server Component calling `dynamic()` on the chatbot, so the chunk was never split out at all — the `dynamic()` call was decorative.

1. **Gate the chatbot behind a real user gesture.** *(done)* `ChatbotPanel.tsx` now holds `useChat` and everything heavy; `SupportChatbot.tsx` is a small Client Component that renders only the launcher and `dynamic(..., { ssr: false })`-imports the panel on first click, warming the chunk on pointer-enter, focus and touch-start so the click feels instant. The panel stays mounted once opened, so a conversation survives closing. Render only `ChatboatFloatingButton` on first load and `import()` the component that calls `useChat` when the button is first clicked. This removes roughly 130 KB compressed and 460 KB decoded from every page on the site. It is the single biggest win available and it changes nothing a visitor can perceive until they open the chat, at which point a brief loading state is entirely acceptable.
2. **Load reCAPTCHA only where there is a form.** *(done)* New `src/components/Recaptcha/RecaptchaScript.tsx`, mounted on `/contacto`, `/habla-con-nosotros/trabajadores` and `/habla-con-nosotros/empresas` — the only three routes that call `getCaptchaToken()`, and, reassuringly, already the only three with a `.grecaptcha-badge` visibility override. Move the `<Script>` out of the root layout into the contact and reserva routes. This removes 354 KB from blog and policy pages, which is where most organic search traffic lands and therefore where Search Console is most likely judging us.
3. **Not started.** Establish whether Apollo Client is needed on the client at all. Blog content is fetched server-side. If nothing genuinely needs the client runtime, 166 KB leaves the bundle.

## Phase 2: Cheap multipliers

4. **Enable AVIF.** *(done)* `formats: ["image/avif", "image/webp"]` added to `next.config.ts`.

   Also done while in here: `priority` on `<Image>` is deprecated in Next 16 in favour of `preload`. Checking `get-img-props.js`, `preload` alone is exactly equivalent — line 271 derives laziness from `!priority && !preload`, line 587 emits `preload: preload || priority`, and passing both now throws. All eight usages were migrated, and the hero's redundant `loading="eager"` dropped.
5. **Deferred, needs your call.** Tighten the hero `sizes`. `src/components/Hero/HeroSection.tsx` passes `sizes="100vw"`, so a 412px phone at DPR 2.625 resolves to 1081 and fetches the 1200px variant. A capped `sizes`, or a lower `quality` on the hero specifically, cuts the bytes that sit directly on the critical path.
6. **Not started.** Stop double-optimizing Contentful images, and investigate the `must-revalidate` header on remote images as the likely cause of the optimizer cache misses in section 4.

## Phase 3: Correctness cleanup

7. **Make above-the-fold content visible before hydration.** Replace `whileInView` with `initial="hidden"` on hero content with a CSS-only animation, or at minimum drop `initial="hidden"` for the hero. Then apply the treatment from `93180e9` to the remaining files.
8. **Consider removing `motion` from static sections.** Most of these are simple fade-ups that CSS handles for free, and `motion` is 46 KB compressed.

## Measured result so far

Both builds measured identically — same harness, same throttling, `next start` on loopback:

| Page | JS before | JS after | LCP before | LCP after |
|---|---|---|---|---|
| `/` | 770 KB | **295 KB** (−62%) | 1260ms | 996ms |
| `/blog/contrato-de-trabajo-en-chile` | 777 KB | **314 KB** (−60%) | 1808ms | 1360ms |

Verified by inspection of the built output rather than inferred: no chunk referenced by the homepage contains the AI SDK or Zod any more, and reCAPTCHA now appears on three routes instead of all of them.

**The LCP figures in that table understate the real win, and should not be quoted.** Loopback does not reproduce the bandwidth contention described in section 3 — the same old build measures 1260ms on localhost and 2656ms on production, a gap far larger than the 60ms of TTFB between them. Removing 475 KB of JavaScript matters in proportion to how contended the link is, and on loopback it is barely contended at all. The payload numbers are the transferable result; the LCP numbers need a preview deploy to be meaningful.

Functionally verified in a real browser: the launcher renders, clicking it loads the panel chunk and opens it, the initial bot message and WhatsApp link render, the textarea and send button are present, closing restores the launcher, and the page logs no errors.

## How we will know it worked

Expected outcome is mobile LCP falling from 2.7–4.1s to roughly 1.2–1.8s, and FCP from 1.6–2.1s to under a second — the majority of it from phase 1 alone.

Two things to keep in mind when checking. First, the lab harness used for section 2 should be re-run identically so the comparison is like for like. Second, and more importantly, **Search Console will not confirm the fix for roughly 28 days**, because CrUX reports a rolling 28-day p75. The lab numbers will move on the day of deploy; the Search Console verdict will lag by a month. Nobody should conclude the work failed in week two.

## Open questions

- **Get a PageSpeed Insights API key.** Without it we are inferring which pages Google is unhappy about rather than reading it. With it we can pull real CrUX p75 per URL group, confirm the diagnosis against field data, and measure the improvement honestly.
- **Decide the scope.** Phases 1 and 2 are mechanical and low-risk. Phase 3 touches 31 files of animation code and is a larger, more visual change — it can reasonably wait.
