# wwilloww.ai

Storefront for calm, accessible PDF study guides for neurodivergent students (high school through postgraduate).

Live: https://www.wwilloww.ai

## What's here

| Path | Purpose |
| --- | --- |
| `index.html` | The whole storefront (single page) |
| `styles.css` | Willow palette, light/dark themes, responsive layout |
| `script.js` | Theme toggle, FAQ accordion, waitlist form |
| `api/waitlist.js` | Vercel serverless function that saves waitlist signups to Google Sheets |
| `vercel.json` | Clean URLs and security headers |

There is no build step. Vercel serves the static files as-is and runs `api/waitlist.js` as a function.

## Deploying

The Vercel project `wwilloww-ai` is connected to this repo. Every push to `main` deploys to production at `wwilloww.ai`. Other branches get preview URLs.

Domain: registered at Wix, DNS points to Vercel (`A @ 76.76.21.21`, `CNAME www cname.vercel-dns.com`). Keep the Google Workspace MX/TXT records in Wix unchanged.

## Waitlist setup

`api/waitlist.js` saves signups using one of two options, set as Vercel environment variables:

1. **Google Apps Script webhook (simplest):** `WAITLIST_WEBHOOK_URL`
2. **Google service account:** `GOOGLE_SHEET_ID`, `GOOGLE_SHEET_NAME` (default `Signups`), `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY`

If neither is set, the form returns a "temporarily unavailable" message.

## Local development

```bash
npm install
npm run dev     # serves the site at http://localhost:3000 (API not included)
npm run check   # syntax-check the JavaScript
```
