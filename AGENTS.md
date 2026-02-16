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
bun run lint         # Run ESLint
bun run lint:fix     # Run ESLint with auto-fix
bun run format:check # Check formatting with Prettier
bun run format       # Format code with Prettier
bun run typecheck    # Run TypeScript type checking
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

## Blog

The blog section (`/blog`) uses content authored in **Contentful** (headless CMS). Blog content is queried via **GraphQL** using Apollo Client. GraphQL types are auto-generated with `bun run codegen`.

## Deployment

The site is deployed on **Vercel**.
