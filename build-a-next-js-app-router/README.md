# Operations Command Dashboard

A Next.js App Router dashboard for managing projects, tasks, expenses, revenue, clients, content, partnerships, social media, meetings, AI systems, proposals, reports, and settings.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui-style local components
- Supabase typed client
- Recharts

## Run Locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Supabase Setup

1. Copy `.env.example` to `.env.local`.
2. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
3. Run `supabase-schema.sql` in your Supabase SQL editor.

The first build phase uses sample records in `lib/sample-data.ts` so the dashboard is usable before Supabase credentials are added. Typed Supabase helpers live in `lib/supabase-crud.ts`, and table types live in `types/database.ts`.
