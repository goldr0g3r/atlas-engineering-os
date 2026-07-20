# Atlas Engineering OS

A mobile-first personal engineering workspace for projects, BOMs, research and experiments.

## Stack

- Next.js App Router with TypeScript
- NextAuth/Auth.js GitHub OAuth
- MongoDB Atlas
- Tailwind CSS
- Vercel-compatible deployment

## Local setup

1. Install Node.js 20 or newer.
2. Copy `.env.example` to `.env.local`.
3. Create a MongoDB Atlas free cluster and enter `MONGODB_URI`.
4. Create a GitHub OAuth app. Use `http://localhost:3000/api/auth/callback/github` as the local callback URL.
5. Set `AUTH_ALLOWED_EMAIL` to lock the app to your account.
6. Run:

```bash
npm install
npm run typecheck
npm run build
npm run dev
```

## Vercel deployment

Add the same environment variables in Vercel. Change the GitHub OAuth callback URL to:

```text
https://YOUR_DOMAIN/api/auth/callback/github
```

Set `AUTH_URL` to your production URL.

## Current MVP limitations

- Module pages are read-only lists. Create records through the POST APIs or extend the included Quick Capture UI.
- Quick Capture stores inbox items separately and intentionally does not create full BOM/research/experiment records.
- The manifest enables an installable standalone shell, but offline caching and push notifications are not included yet.
