# CLAUDE.md

## Project Overview

This is a **Next.js** (v16) website for **RK ABogados**, a law firm based in Chile. The site is deployed on **Vercel**.

## Runtime & Package Manager

This project uses **Bun** as its package manager and runtime. All commands should be run with `bun`.

## Available Scripts

```bash
bun run dev          # Start development server
bun run build        # Production build
bun run start        # Start production server
bun run lint         # Run oxlint
bun run lint:fix     # Run oxlint with auto-fix
bun run format:check # Check formatting with oxfmt
bun run format       # Format code with oxfmt
bun run typecheck    # Run TypeScript type checking
bun run verify       # lint + format:check + typecheck
bun run codegen      # Generate GraphQL types (graphql-codegen)
bun run db:generate  # Generate Drizzle migrations
bun run db:migrate   # Run Drizzle migrations
bun run db:check     # Check Drizzle migrations
```

## Project Structure

```
src/
├── actions/          # Server actions
├── app/              # Next.js App Router pages
│   ├── _components/  # Shared page-level components
│   ├── blog/         # Blog section
│   ├── habla-con-nosotros/
│   │   └── _components/  # Components local to this page only
│   ├── nosotros/
│   ├── ...other pages
│   ├── layout.tsx
│   └── page.tsx
├── components/       # Shared components (used across multiple pages)
├── graphql/          # GraphQL queries and generated types
├── hooks/            # Custom React hooks
├── lib/              # External library integrations and utilities
└── types/            # Shared TypeScript types
```

## Conventions

- **Server Actions**: Use Next.js server actions where possible for server-side operations. They live under `src/actions/`.
- **Page-local components**: Each page that needs local components should have a `_components/` folder inside its route directory. These components are only used by that specific page.
- **Shared components**: Components reused across multiple pages live in `src/components/`.
- **Library integrations**: Anything that interacts with external libraries (API clients, database, utilities) lives under `src/lib/`.

## Analytics and consent

Tracking and the cookie banner have a fair amount of context behind them, and
most of it is not derivable from the code:

| Document | What it is for |
| --- | --- |
| `docs/tracking-plan.md` | The internal build plan, phase by phase. Not for the client |
| `docs/client-brief.md` | **What to tell the firm** — decisions we are waiting on and warnings they must hear, written as ready-to-send Spanish |
| `docs/client-suggestions.md` | Improvements we may propose to the firm, each with its evidence and when to raise it. Internal, English; not yet agreed |
| `docs/tracking-events.md` | Every `rk_*` signal, its labels, and who may touch the dataLayer |
| `docs/cookie-inventory.md` | Every cookie the site sets — the input for the policy pages |
| `docs/consent-mode-runbook.md` | The Tag Manager half of Consent Mode |
| `docs/consent-performance.md` | What the inline consent script costs, measured |

Two rules worth knowing before editing anything here. `src/lib/utils/analytics.ts`
is the only file that pushes `rk_*` events and `src/lib/utils/consent.ts` is the
only one that issues gtag commands. And run `bun run test:tracking` against a
production build after touching tracking — `next dev` hides races that
production shows.

## Blog

The blog section (`/blog`) uses content authored in **Contentful** (headless CMS). Blog content is queried via **GraphQL** using Apollo Client. GraphQL types are auto-generated with `bun run codegen`.

## Deployment

The site is deployed on **Vercel**.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Agent Browser

- `agent-browser` is a local devDependency here, not a global install.
- Prefix every `agent-browser` command with `bunx` (e.g.
  `bunx agent-browser --session "$SESSION" --restore --headed --enable react-devtools open <url>`),
  since the binary lives in `node_modules/.bin` and is not on `PATH`.
- Use the `next-dev-loop` skill to verify runtime behavior after editing app code — it combines
  `/_next/mcp` (via the `next-devtools-mcp` server configured in `.mcp.json`) with `agent-browser`.
