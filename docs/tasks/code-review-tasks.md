# Code Review — Implementation Tasks

Source: Code review of `src/` (April 2026)
Scope: React best practices, Next.js patterns, performance. SEO excluded.

Tasks are ordered by dependency and priority. Each task is scoped to a single session.

---

## Phase 1 — Bugs (fix first, highest risk)

### TASK-01 · Fix: `submitError` never shown to the user
**Files:** `src/app/habla-con-nosotros/empresas/_components/ReservaFormEmpresas/Form.tsx`
`src/app/habla-con-nosotros/trabajadores/_components/ReservaFormTrabajadores/Form.tsx`
**Complexity:** Low

`submitError` is declared in `FormProps` and passed by the parent but never destructured or rendered. Users hitting a server error see nothing.

- [ ] Destructure `submitError` from props in both `Form.tsx` files
- [ ] Render an error message below the submit button when `submitError` is non-null
- [ ] Verify error is visible in the UI with a test submission failure

---

### TASK-02 · Fix: `useDebounceCallback` is functionally broken
**Files:** `src/hooks/useDebounceCallback.ts`
**Complexity:** Low

`callback` is in the `useCallback` dependency array. Because the caller passes an inline function, the hook returns a new debounced function on every render, resetting the timer each time.

- [ ] Store `callback` in a `useRef` inside the hook and always call `callbackRef.current`
- [ ] Remove `callback` from the `useCallback` dependency array (only `delay` remains)
- [ ] Verify the chatbot notification sound still fires correctly after the fix

---

### TASK-03 · Fix: `generateStaticParams` fetches from the app's own URL
**Files:** `src/app/blog/[slug]/page.tsx`
**Complexity:** Low

`fetch(env.NEXT_PUBLIC_BASE_URL + '/api/posts')` is fragile at build time (URL must be live). Replace with a direct call to the existing query function.

- [ ] Import `getAllPosts` from `@/graphql/queries/get-all-posts.query`
- [ ] Replace the `fetch` call with `getAllPosts({ limit: 200 })`
- [ ] Remove the now-unused `/api/posts` route if it has no other consumers (verify first)

---

### TASK-04 · Fix: `new Audio()` created on every chatbot message
**Files:** `src/components/SupportChatbot/SupportChatbot.tsx`
**Complexity:** Low

A new `Audio` object is instantiated on every message. Move it to a `useRef` so the browser can cache/preload the file.

- [ ] Replace the inline `new Audio(...)` with a `useRef<HTMLAudioElement>` initialised once
- [ ] Confirm notification sound still plays correctly

---

## Phase 2 — Performance (high-impact, no breaking changes)

### TASK-05 · Perf: Deduplicate `getPost` / `getAllPosts` with `React.cache()`
**Files:** `src/graphql/queries/get-post.query.ts`, `src/graphql/queries/get-all-posts.query.ts`
**Complexity:** Low

`getPost` is called twice per blog post page (once in `generateMetadata`, once in the page component). Apollo Client does not deduplicate across these calls. Wrap the exported functions with `React.cache()`.

- [ ] Wrap `getPost` export with `React.cache()`
- [ ] Wrap `getAllPosts` export with `React.cache()`
- [ ] Confirm blog post pages still render correctly

---

### TASK-06 · Perf: Fix `getApolloServerClient` — move `registerApolloClient` to module level
**Files:** `src/graphql/getApolloServerClient.ts`
**Complexity:** Low

`registerApolloClient` is called inside the function body on every invocation. Per Apollo's Next.js integration docs it should be registered once per configuration at module level.

- [ ] Create two module-level registrations: one for production token, one for preview token
- [ ] `getApolloServerClient({ isPreview })` returns the appropriate pre-registered client
- [ ] Verify blog pages (preview and production) still work

---

### TASK-07 · Perf: Add `Suspense` boundaries on the homepage
**Files:** `src/app/page.tsx`
**Complexity:** Low–Medium

`BlogSection` is an async server component that fetches from Contentful. Without Suspense, the entire homepage waits for it. Wrapping it lets the hero and other static sections stream immediately.

- [ ] Create a `BlogSectionSkeleton` fallback component (can be a simple placeholder matching the section height)
- [ ] Wrap `<BlogSection />` in `<Suspense fallback={<BlogSectionSkeleton />}>` in `page.tsx`
- [ ] Audit other async server components on the homepage for the same pattern

---

### TASK-08 · Perf: Parallelize notification emails in both server actions
**Files:** `src/actions/submitBookACallFormEmpresas.ts`, `src/actions/submitBookACallFormTrabajadores.ts`
**Complexity:** Low

The two `sendEmail` calls in `dispatchNotificationEmails` are independent but run sequentially. Switch to `Promise.all`.

- [ ] Replace `await sendEmail(...); await sendEmail(...)` with `await Promise.all([sendEmail(...), sendEmail(...)])` in both actions

---

### TASK-09 · Perf: Memoize `DaySelectorCalendar` callbacks
**Files:** `src/components/ReservaForm/DaySelectorCalendar.tsx`
**Complexity:** Low

`tileClassName`, `tileDisabled`, and `formatShortWeekday` are inline callbacks that are new references on every render, causing `react-calendar` to recalculate all tiles.

- [ ] Wrap `tileClassName` in `useCallback` (depends on `value`)
- [ ] Wrap `tileDisabled` in `useCallback` (no deps)
- [ ] Wrap `formatShortWeekday` in `useCallback` (no deps)

---

### TASK-10 · Perf: Add ISR revalidation to the blog listing page
**Files:** `src/app/blog/page.tsx`
**Complexity:** Low

The blog page has no `revalidate` export, meaning it hits Contentful GraphQL on every request. The homepage already sets `revalidate = 3600`.

- [ ] Add `export const revalidate = 3600` to `src/app/blog/page.tsx`
- [ ] Consider whether the blog post `[slug]` page also needs this

---

## Phase 3 — Code Duplication (reduces maintenance surface)

### TASK-11 · Refactor: Merge duplicate `ClientsReel` into a shared component
**Files:** `src/app/habla-con-nosotros/empresas/_components/ClientsReel/`
`src/app/habla-con-nosotros/trabajadores/_components/ClientsReel/`
`src/components/` (target)
**Complexity:** Low

Both `ClientsReel.tsx`, `constants.ts`, and `Logo.tsx` are byte-for-byte identical (including image imports). One instance uses `bg-gradient-to-r` and the other `bg-linear-to-r`, indicating they've already begun to drift.

- [ ] Move `ClientsReel.tsx`, `Logo.tsx`, and `constants.ts` to `src/components/ClientsReel/`
- [ ] Update imports in both `empresas` and `trabajadores` pages
- [ ] Delete the two now-empty local `ClientsReel/` directories
- [ ] Fix the gradient class inconsistency (align to one utility class)

---

### TASK-12 · Refactor: Merge duplicate `Videos.tsx` into a shared component
**Files:** `src/app/habla-con-nosotros/empresas/_components/Videos/Videos.tsx`
`src/app/habla-con-nosotros/trabajadores/_components/Videos/Videos.tsx`
**Complexity:** Low–Medium

Both `Videos.tsx` are identical. The only intended difference is the video data from each page's `./constants.ts`. Extract a shared component that accepts the video list as a prop.

- [ ] Create `src/components/Videos/Videos.tsx` accepting a `videos: Video[]` prop
- [ ] Move shared sub-components (`VideoCard.tsx`, `VideoModal.tsx`) to `src/components/Videos/`
- [ ] Keep `constants.ts` (with page-specific video lists) in each page's `_components/` folder
- [ ] Update both page imports

---

### TASK-13 · Refactor: Extract shared multi-step `ReservaForm` shell
**Files:** `src/app/habla-con-nosotros/empresas/_components/ReservaFormEmpresas/Form.tsx`
`src/app/habla-con-nosotros/trabajadores/_components/ReservaFormTrabajadores/Form.tsx`
**Complexity:** Medium

Both `Form.tsx` files are ~95% identical. The only difference is the step-2 inner component. Extract the multi-step shell into a shared `<MultiStepReservaForm>` that accepts the step-2 content as a prop or render prop.

**Depends on:** TASK-01 (fix `submitError` first so it's wired correctly in the shared component)

- [ ] Design the shared `MultiStepReservaForm` component interface
- [ ] Create `src/components/ReservaForm/MultiStepReservaForm.tsx`
- [ ] Migrate `empresas` Form.tsx to use the shared component
- [ ] Migrate `trabajadores` Form.tsx to use the shared component
- [ ] Remove the duplicated `Form.tsx` files

---

## Phase 4 — Anti-patterns & Minor Polish

### TASK-14 · Fix: `stagger()` used incorrectly in `transition` prop
**Files:** `src/app/habla-con-nosotros/empresas/_components/ReservaFormEmpresas/ReservaFormEmpresas.tsx`
`src/app/habla-con-nosotros/empresas/_components/Videos/Videos.tsx`
`src/app/habla-con-nosotros/trabajadores/_components/Videos/Videos.tsx` (after TASK-12 merge)
**Complexity:** Low

`stagger(0.3)` is a Framer Motion utility for use inside `variants`, not in `transition.delayChildren` (which expects a number). Use the existing `containerVariants` from `@/lib/utils/animations`.

- [ ] Replace inline `transition={{ delayChildren: stagger(0.3) }}` with `variants={containerVariants}` in each affected component
- [ ] Verify animations still look correct visually

---

### TASK-15 · Fix: Remove `onClick={() => null}` from submit buttons
**Files:** `src/app/habla-con-nosotros/empresas/_components/ReservaFormEmpresas/Form.tsx`
`src/app/habla-con-nosotros/trabajadores/_components/ReservaFormTrabajadores/Form.tsx`
**Complexity:** Trivial

The step-2 submit button has `onClick={() => null}` which creates a new function reference on every render and does nothing.

- [ ] Remove `onClick={() => null}` from both submit buttons

---

### TASK-16 · Fix: `VideoModal` double-controls open state
**Files:** `src/app/habla-con-nosotros/empresas/_components/Videos/VideoModal.tsx`
`src/app/habla-con-nosotros/trabajadores/_components/Videos/VideoModal.tsx`
**Complexity:** Low

`AnimatePresence` gates the dialog with `{video && ...}` while `Dialog.Root` also sets `open={!!video}`. These two mechanisms are redundant.

- [ ] Remove the outer `AnimatePresence` + conditional wrapper; let `Dialog.Root open={!!video}` control visibility
- [ ] Keep the `motion.div` animations inside `Dialog.Content`

---

### TASK-17 · Fix: `HoverPopover` closes with unnecessary `setTimeout`
**Files:** `src/components/Navbar/HoverPopover.tsx`
**Complexity:** Trivial

`setTimeout(() => setOpen(false), 200)` is fragile. Radix Popover handles focus/blur closing natively.

- [ ] Replace `setTimeout` with a direct `setOpen(false)` call
- [ ] Verify popover closes correctly on link click without visual glitch

---

### TASK-18 · Fix: `useTracking` — move cookie read out of `useMemo`
**Files:** `src/hooks/useTracking.ts`
**Complexity:** Low

`document.cookie` is read inside `useMemo`, which is a side effect in a pure computation.

- [ ] Replace the `useMemo` with `useState` + `useEffect` for the cookie read
- [ ] Ensure the gclid value is still correctly derived from URL params first, cookie second

---

### TASK-19 · Fix: Remove `loading="eager"` redundancy on hero `Image`
**Files:** `src/components/Hero/HeroSection.tsx`
**Complexity:** Trivial

`priority={true}` already implies eager loading. `loading="eager"` is ignored when `priority` is set.

- [ ] Remove `loading="eager"` from the `<Image>` component

---

### TASK-20 · Fix: `formatDate` in `ReservaFormEmpresas` reinvents `date-fns`
**Files:** `src/app/habla-con-nosotros/empresas/_components/ReservaFormEmpresas/ReservaFormEmpresas.tsx`
**Complexity:** Trivial

A local `formatDate` manually builds a `"yyyy-MM-dd"` string. `date-fns` is already imported.

- [ ] Replace the `formatDate` function with `format(date, 'yyyy-MM-dd')` from `date-fns`
- [ ] Remove the local `formatDate` function

---

### TASK-21 · Fix: Typo "Nosostros" in `TeamSection`
**Files:** `src/app/_components/TeamSection/TeamSection.tsx:21`
**Complexity:** Trivial

- [ ] Fix `Nosostros` → `Nosotros` in the heading

---

### TASK-22 · Fix: `DaySelectorCalendar` — narrow `useRef<any>` type
**Files:** `src/components/ReservaForm/DaySelectorCalendar.tsx:45`
**Complexity:** Low

- [ ] Check if `react-calendar` exports a ref type; use it if available
- [ ] If not, define a local interface `{ activeStartDate: Date; setActiveStartDate: (d: Date) => void }` and use it
- [ ] Remove the `eslint-disable` comment

---

### TASK-23 · Cleanup: Remove commented-out favicon config in `layout.tsx`
**Files:** `src/app/layout.tsx:30-38`
**Complexity:** Trivial

- [ ] Either enable the icon configuration or delete the commented block

---

### TASK-24 · Cleanup: `Videos` — remove `.slice(0, 5)` magic number
**Files:** `src/app/habla-con-nosotros/empresas/_components/Videos/Videos.tsx`
`src/app/habla-con-nosotros/trabajadores/_components/Videos/Videos.tsx`
**Complexity:** Trivial

- [ ] If exactly 5 videos are intended, define only 5 in `constants.ts` and remove the `.slice`
- [ ] If the slice is intentional (more videos in constants for future use), add a comment explaining why

---

## Execution Order Summary

```
Phase 1 (Bugs):        TASK-01 → TASK-02 → TASK-03 → TASK-04
Phase 2 (Performance): TASK-05 → TASK-06 → TASK-07 → TASK-08 → TASK-09 → TASK-10
Phase 3 (Duplication): TASK-11 → TASK-12 → TASK-13 (depends on TASK-01)
Phase 4 (Polish):      TASK-14 through TASK-24 (any order, all independent)
```

Total tasks: 24
Estimated sessions: ~8–10 (grouping trivial tasks together)
