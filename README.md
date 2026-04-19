# Resonance

AI-powered text-to-speech and voice tooling. The web app lets signed-in users explore voices, generate speech from text, and manage generations backed by PostgreSQL and object storage.

## Stack

- **Framework:** [Next.js](https://nextjs.org) (App Router), React 19, TypeScript
- **Auth & orgs:** [Clerk](https://clerk.com) (sign-in, organization context)
- **API:** [tRPC](https://trpc.io) with [TanStack Query](https://tanstack.com/query)
- **Database:** PostgreSQL via [Prisma](https://www.prisma.io) (client generated to `src/generated/prisma`)
- **Storage:** Cloudflare R2 (S3-compatible) for audio assets
- **TTS backend:** Chatterbox API (`CHATTERBOX_API_URL`, `CHATTERBOX_API_KEY`)
- **UI:** Tailwind CSS, Radix UI / Base UI, shadcn-style components
- **Observability:** [Sentry](https://sentry.io) (`@sentry/nextjs`)

## Prerequisites

- Node.js 20+ (matches `@types/node` in the repo)
- pnpm (lockfile: `pnpm-lock.yaml`)
- A PostgreSQL database
- Clerk application (publishable + secret keys)
- R2 bucket and API credentials for uploads
- Access to the Chatterbox TTS API (URL + key)

## Getting started

1. **Install dependencies**

   ```bash
   pnpm install
   ```

2. **Configure environment**

   Create a `.env` or `.env.local` file in the project root. Server-side variables validated in [`src/lib/env.ts`](src/lib/env.ts) are:

   | Variable | Purpose |
   |----------|---------|
   | `DATABASE_URL` | PostgreSQL connection string |
   | `APP_URL` | Canonical app URL (used by the tRPC client and server) |
   | `R2_ACCOUNT_ID` | Cloudflare account ID |
   | `R2_ACCESS_KEY_ID` | R2 S3 access key |
   | `R2_SECRET_ACCESS_KEY` | R2 S3 secret |
   | `R2_BUCKET_NAME` | Bucket name |
   | `CHATTERBOX_API_URL` | Base URL of the Chatterbox API (used by the app and by `pnpm sync-api` as `{url}/openapi.json`) |
   | `CHATTERBOX_API_KEY` | API key for Chatterbox |

   Clerk expects its [standard environment variables](https://clerk.com/docs/deployments/overview) (for example `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY`). Configure those in the same env file.

   For tooling that must run without full secrets (for example Docker builds), you can set `SKIP_ENV_VALIDATION=1` to skip strict env validation (see `src/lib/env.ts`).

3. **Database**

   Apply migrations and ensure the Prisma client is generated (also runs on `postinstall`):

   ```bash
   pnpm exec prisma migrate dev
   ```

4. **Run the dev server**

   ```bash
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000). Unauthenticated users are redirected to Clerk sign-in; after sign-in, users without an active organization are sent to `/org-selection`.

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start Next.js in development mode |
| `pnpm build` | Production build |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm sync-api` | Fetch Chatterbox OpenAPI from `CHATTERBOX_API_URL/openapi.json` and regenerate `src/types/chatterbox-api.d.ts` |

`sync-api` loads `.env` via `dotenv` (see [`scripts/sync-api.ts`](scripts/sync-api.ts)); set `CHATTERBOX_API_URL` before running.

## Deployment (Railway)

Deploy as a Node web service on [Railway](https://railway.com/) (not Vercel):

1. **Create a project** from this repository and add a **PostgreSQL** database. Railway provides `DATABASE_URL`; reference it for Prisma.
2. **Set environment variables** on the app service for everything listed under **Getting started** → **Configure environment**, including Clerk keys, R2, Chatterbox, and `APP_URL`. Use your Railway-generated HTTPS URL (or custom domain) for `APP_URL`.
3. **Build** — example: `pnpm install --frozen-lockfile && pnpm exec prisma generate && pnpm build`. Ensure Node 20+ (set `NIXPACKS_NODE_VERSION` or Railway’s Node version setting if needed).
4. **Start** — `pnpm start` (runs `next start`).
5. **Migrations** — run `pnpm exec prisma migrate deploy` on each release (Railway **Release Command**, a one-off deploy task, or your CI) so production schema matches `prisma/migrations`.
6. **Clerk** — in the Clerk dashboard, add the Railway URL (and production domain if any) to allowed origins, redirect URLs, and CORS as required.

## Project layout (high level)

- `src/app/` — App Router routes, layouts, providers
- `src/features/` — Feature UI (dashboard, text-to-speech, voices, etc.)
- `src/trpc/` — tRPC routers and client setup
- `prisma/` — Schema and migrations
- `scripts/sync-api.ts` — OpenAPI type generation for the TTS API

## License

Private project (`"private": true` in `package.json`).
