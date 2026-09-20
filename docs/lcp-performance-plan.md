# LCP and page speed plan

Why Google Search Console reports Largest Contentful Paint as poor on both mobile and desktop, what actually causes it, and the work to fix it.

**This is the internal build plan — it does not go to the client.** It names files, numbers and settings, and it is blunter about the state of the site than a client document would be.

Prepared 20 September 2026.

Status: phases 1 and 2 done; phase 3 done for the pages organic search lands on. The `habla-con-nosotros` ad landing pages are the remaining outlier. Awaiting a preview deploy for real measurement.

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
3. **Dropped — this was never an opportunity.** Apollo measures **0 KB** on every landing page; it is server-side only. The 166 KB Apollo chunk exists in the build but no visitor downloads it on a first load. The original diagnosis in section 3 was wrong to list it. Blog content is fetched server-side. If nothing genuinely needs the client runtime, 166 KB leaves the bundle.

## Phase 2: Cheap multipliers

4. **Enable AVIF.** *(done)* `formats: ["image/avif", "image/webp"]` added to `next.config.ts`.

   Also done while in here: `priority` on `<Image>` is deprecated in Next 16 in favour of `preload`. Checking `get-img-props.js`, `preload` alone is exactly equivalent — line 271 derives laziness from `!priority && !preload`, line 587 emits `preload: preload || priority`, and passing both now throws. All eight usages were migrated, and the hero's redundant `loading="eager"` dropped.
5. **Deferred, needs your call.** Tighten the hero `sizes`. `src/components/Hero/HeroSection.tsx` passes `sizes="100vw"`, so a 412px phone at DPR 2.625 resolves to 1081 and fetches the 1200px variant. A capped `sizes`, or a lower `quality` on the hero specifically, cuts the bytes that sit directly on the critical path.
6. **Not started.** Stop double-optimizing Contentful images, and investigate the `must-revalidate` header on remote images as the likely cause of the optimizer cache misses in section 4.

## Phase 3: Correctness cleanup

7. **Done for search landing pages.** `HeroContent` is now a server component with a CSS `@keyframes` entrance that runs at first paint. A shared `Reveal` component (`src/components/Reveal/Reveal.tsx`) replaces the `whileInView` pattern using one IntersectionObserver and a CSS transition.

   Two traps worth remembering. Content is served **visible** and only hidden once JavaScript has confirmed the element is below the fold, so slow or failed hydration degrades to readable content rather than a blank page. And the observer uses `rootMargin: "100000px 0px -5% 0px"`, which makes "intersecting" mean "has been reached" rather than "is on screen": with an ordinary root, a jump that carries the viewport straight past an element — an anchor link, a restored scroll position, a flick on a phone — crosses no threshold, the callback never fires, and the content stays invisible for the rest of the session. That bug was caught in testing, not in review.
8. **Consider removing `motion` from static sections.** Most of these are simple fade-ups that CSS handles for free, and `motion` is 46 KB compressed.

## Measured result

Browser-measured, Slow 4G + 4x CPU, cold cache, `next start`, identical harness for both builds:

| Page | JS before | JS after | LCP before | LCP after |
|---|---|---|---|---|
| `/` | 770 KB | **260 KB** (-66%) | 1260ms | 996ms |
| `/blog/contrato-de-trabajo-en-chile` | 777 KB | **268 KB** (-66%) | 1808ms | 1448ms |
| `/blog` | — | 269 KB | — | 1228ms |
| `/nosotros` | — | 262 KB | — | 1060ms |
| `/habla-con-nosotros/trabajadores` | — | **926 KB** | — | 1272ms |

First contentful paint moved from ~810ms to ~850ms — flat, because on loopback the stylesheet was never contended in the first place. On production it was taking 1.3 seconds to arrive purely through contention, and that is where the removed payload should show up.

Verified structurally rather than inferred:

- No chunk on `/`, `/blog`, `/blog/[slug]` or `/nosotros` contains the AI SDK, Zod, sonner or the animation library. Confirmed with a positive control: the same scan still finds the animation library on `/habla-con-nosotros/trabajadores`, which has not been converted.
- reCAPTCHA appears on three routes instead of all of them.
- `opacity:0` in the served HTML: `/` went from 17 to **0**, `/blog` to 0. The hero `<h1>` now ships as `class="hero-enter ..."` with no inline opacity, so the copy is readable before hydration.
- AVIF is being served and is **25.6 KB against WebP's 38.1 KB** for the hero — 33% smaller.

**Do not quote the LCP column.** Loopback reproduces neither the bandwidth contention of section 3 nor production's HTTP/2 multiplexing; `next start` serves over HTTP/1.1, so these runs are dominated by connection queueing that production does not have. The same old build measures 1260ms here and 2656ms on production. The payload and structural numbers are the transferable results.

### Phase 3b: LazyMotion

Converting every animation to CSS was the wrong shape of fix for the rest of the site — too many files, too much regression risk on pages that genuinely animate. Instead the remaining components use motion's own `LazyMotion`, copied from `valtiberina.travel`:

- `src/components/Motion/` holds the provider, with `domAnimation` (not `domMax` — nothing here drags) re-exported from its own module so the feature chunk carries only the feature set, and a `loadMotionFeatures` callback so it is fetched after hydration.
- `LazyMotionProvider` wraps the root layout with `strict`, which makes a stray `motion.*` element throw in development.
- All 40 remaining files import `* as m from "motion/react-m"`. This entry point matters: `m` re-exported from the `motion/react` index drags the full runtime into every chunk that touches it, and the split silently does not happen.
- `Variants` is now a type-only import in five files, which removes their runtime edge to the index entirely.
- `src/app/_components/Parallax.tsx` was dead code (nothing imported it) and is deleted.

The homepage carousel is loaded on approach through `TestimonialsCarouselLoader`, with a static first slide as the fallback so there is no layout shift. It is the only component left on the homepage needing `AnimatePresence`, and it sits below the fold.

Result on the homepage: **260 KB to 240 KB**. Less than the 44 KB the animation library appeared to cost, because `AnimatePresence`, `stagger` and friends are still imported from the index by components elsewhere, and the core runtime still ships. The remaining motion payload is now three chunks of 14 KB, 33 KB and 6 KB rather than one of 133 KB.

### Phase 4: the habla-con-nosotros pages

**A 183 KB gzipped chunk of Node polyfills was being shipped to browsers.** `src/lib/google/re-captcha/getCaptchaToken.ts` is imported by three client components, and it imported `@/lib/env`, which does `import "dotenv/config"`. Once that module is reachable from the client graph the bundler follows it and pulls in dotenv plus the Node polyfills — `Buffer`, and a full crypto/elliptic-curve implementation. The chunk was 684 KB raw, and it was the largest single thing on `/contacto` and both booking pages, bigger than react-dom.

It was visible in the very first analysis as "a 183 KB chunk containing zod" and dismissed. The giveaway, once looked at properly, was a string of elliptic-curve constants and 137 references to `jwt` in a chunk that a law firm's contact form has no business carrying.

`getCaptchaToken` now reads `process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY` directly, which Next inlines at build time. Nothing else client-reachable imports `@/lib/env`. That alone took the booking pages from 914 KB to 778 KB.

**The booking form is deferred, not removed.** react-calendar, react-hook-form and Zod are ~143 KB gzipped between them and all three are genuinely needed — but none of it is needed to paint the page. `useForm` drives both wizard steps, so the dependency cannot be split per-step without restructuring; the whole `<Form>` is loaded through `next/dynamic` instead, behind `useDeferredMount`.

That hook races two signals and takes whichever fires first. Intersection alone is wrong here: the form sits directly beneath the hero, so waiting for a scroll would make the first interaction on a paid landing page feel slow. Idle alone is wrong too — on a busy page it may not fire before the user arrives. Racing them keeps 143 KB off the path the hero image competes for while still having the form ready on arrival. A skeleton sized to the real form holds the space so nothing shifts.

| Page | JS before | JS after | Critical-path JS |
|---|---|---|---|
| `/habla-con-nosotros/trabajadores` | 1032 KB | 783 KB | **311 KB** |
| `/habla-con-nosotros/empresas` | — | 783 KB | **308 KB** |
| `/contacto` | — | 605 KB | **270 KB** |
| `/` | 770 KB | 242 KB | **257 KB** |

"Critical-path JS" is what the initial HTML references — what actually competes with the LCP image. The deferred form chunk is confirmed absent from it on both booking pages. The totals still include reCAPTCHA, which is ~354 KB on the three form pages and is required there.

The full booking flow was walked end to end after the change: pick a day, pick a time slot, "Próximo", and step 2 renders with all six fields and working validation. No console errors.

### Still outstanding

- reCAPTCHA is ~354 KB on the three form pages. It is `lazyOnload` so it lands after LCP, but it is the biggest remaining item on those routes and worth questioning: v3 runs on every page view, and the site already has a honeypot-free server-side validation path.
- Item 2.6 (Contentful double-optimization, and the `must-revalidate` header that appears to cause the image-optimizer cache misses) is untouched. The blog LCP image still waited 856 ms for its first byte on production.
- `AnimatePresence` and `stagger` are still imported from the `motion/react` index in a dozen components, which is why LazyMotion returned less than its headline figure.

## How we will know it worked

Expected outcome is mobile LCP falling from 2.7–4.1s to roughly 1.2–1.8s, and FCP from 1.6–2.1s to under a second — the majority of it from phase 1 alone.

Two things to keep in mind when checking. First, the lab harness used for section 2 should be re-run identically so the comparison is like for like. Second, and more importantly, **Search Console will not confirm the fix for roughly 28 days**, because CrUX reports a rolling 28-day p75. The lab numbers will move on the day of deploy; the Search Console verdict will lag by a month. Nobody should conclude the work failed in week two.

## Open questions

- **Get a PageSpeed Insights API key.** Without it we are inferring which pages Google is unhappy about rather than reading it. With it we can pull real CrUX p75 per URL group, confirm the diagnosis against field data, and measure the improvement honestly.
- **Decide the scope.** Phases 1 and 2 are mechanical and low-risk. Phase 3 touches 31 files of animation code and is a larger, more visual change — it can reasonably wait.
