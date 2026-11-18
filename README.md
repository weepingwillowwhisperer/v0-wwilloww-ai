# Willow Academy storefront (willowpdf.com)

Willow Academy is the learning pillar of Willow, owned and operated by Weeping Willow Whisperer LLC. This repository holds its storefront: calm, accessible PDF study guides for neurodivergent students (high school through postgraduate), sold through Payhip.

Live: https://willowpdf.com

## What's here

| Path | Purpose |
| --- | --- |
| `index.html` | The storefront (single page) |
| `privacy.html`, `terms.html`, `notices.html` | Legal pages, served at `/privacy`, `/terms`, `/notices` |
| `tokens.css` | Willow brand v2 tokens. A copy of `willow-brand/tokens/tokens.css`; never edit it here |
| `styles.css` | Layout and components. Uses only the variables in `tokens.css`, no hex values |
| `script.js` | Reading-theme switch, FAQ accordion, updates form |
| `logos/` | The W mark used as the tab icon, plus the Academy lockup and company line as files, unchanged from `willow-brand/logos` |
| `og.png` | Social share image |
| `api/waitlist.js` | Vercel serverless function that saves update-list signups |
| `vercel.json` | Clean URLs and security headers |

There is no build step. Vercel serves the static files as-is and runs `api/waitlist.js` as a function. The header and footer are repeated in each of the four HTML pages, so a change to either must be made in all four.

## Brand

The site follows Willow brand v2 (`weepingwillowwhisperer/willow-brand`, commit `13b1302`).

- To pick up a brand change, copy the new `tokens/tokens.css` over `tokens.css` and the new logo files over `logos/`. The header lockup (`willow-academy`) and the footer company line (`wwwllc-line`) are also placed inline in each HTML page, with the same paths as the brand files; `styles.css` switches them to Moon on the Dusk theme.
- Themes: Daylight (default), Dusk and Mist, chosen with the switch in the header and remembered in the browser under `academy-theme`. Dusk is used on first visit when the system is set to dark.
- Public copy says "Willow Academy". The legal name, Weeping Willow Whisperer LLC, appears only in the footer imprint, the legal pages and structured data.

## Deploying

**The Vercel project `wwilloww-ai` is shared with Willow Nest (wwilloww.ai).** An ordinary production deployment or project-wide promotion can put this storefront on Nest's addresses, or Nest on these.

- Publish with `vercel deploy --prod --skip-domain`, then assign only `willowpdf.com` and `www.willowpdf.com` to the new deployment, one at a time.
- Afterwards, check that `wwilloww.ai` and `www.wwilloww.ai` still show Willow Nest.
- Do not merge into `main` as a way to publish. `main` is behind the live site.

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
