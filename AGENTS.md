# Project Context for OpenCode

## Stack
- Next.js 15 App Router + TypeScript
- PostgreSQL (Neon) with Drizzle ORM
- NextAuth v5 (Google OAuth only)
- shadcn/ui + TailwindCSS
- AI SDK with Mistral, Google (Gemini), and XAI providers

## Package Manager
Uses **pnpm** (pinned version in package.json).

## Database
- Schema: `db/schema.ts`
- Connection: `db/drizzle.ts` (loads `.env.local`)
- Push schema changes: `pnpm push` (drizzle-kit push)
- Seed database: `pnpm seed`

Required `.env.local`:
```
DATABASE_URL=<neon-postgresql-connection-string>
AUTH_SECRET=<random-string>
AUTH_GOOGLE_ID=<google-oauth-client-id>
AUTH_GOOGLE_SECRET=<google-oauth-client-secret>
MISTRAL_API_KEY=<mistral-api-key>
```

## Commands
- `pnpm dev` - Start dev server (uses Turbopack)
- `pnpm build` - Production build
- `pnpm lint` - ESLint (Next.js + TypeScript config)
- `pnpm push` - Push database schema to Neon
- `pnpm seed` - Seed database with test data

Note: No tests configured.

## Architecture
- App Router with route group `(f)` for authenticated pages
- Server actions in `lib/action/`
- AI routes in `app/api/` (chat, completion, guide, review)
- Auth middleware protects all routes except `/api`, `/_next/static`, `/_next/image`, `/favicon.ico`

## Code Conventions
- Path alias: `@/*` maps to root
- Components: shadcn/ui patterns (`components/ui/`)
- Server actions use `"use server"` directive
- API routes use Edge runtime (`export const runtime = "edge"`)

## Note
- `contants/` folder is intentionally misspelled (not "constants")