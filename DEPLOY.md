Vercel Deployment Guide
----------------------

1. Connect repository
- Go to https://vercel.com/new and import the GitHub repository `diyashah31/Cineverse`.

2. Environment variables
- Add the following Environment Variable in the Vercel project settings (Settings → Environment Variables):
  - `WATCHMODE_API_KEY` = <your Watchmode API key>

3. Build & Framework
- Vercel will auto-detect Next.js. Build command: `npm run build` (default).
- Output directory: (leave default)

4. Deploy
- Trigger a deploy from the Vercel dashboard or push to `master`/`main`.

Notes
- Do NOT commit `.env.local` or any secrets. Use Vercel Environment Variables for production keys.
- If you prefer CI-based deploys, generate a `VERCEL_TOKEN` and use the Vercel GitHub App or `vercel` CLI in GitHub Actions.
