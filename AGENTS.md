# Willow storefront: agent instructions

Applies to this repository and its subdirectories. Read this file and [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) before changing the storefront.

## Purpose and scope

`wwilloww.ai` is a calm, accessible, single-page storefront for PDF study guides for neurodivergent students, from high school through postgraduate study, and their supporters. The page currently lists seven available titles with external Payhip purchase links and a library-wide waitlist. Preserve product names, destinations, availability, and the distinction between purchasing and subscribing unless the task explicitly changes them.

Use the Vibe Coding Blueprint's useful disciplines: read context, reuse decisions, make focused changes, validate, and update documentation. These two files consolidate the relevant design, architecture, security, code-style, testing, and agent guidance. Do not generate a database, authentication system, framework migration, or the blueprint's full documentation tree for this site.

## Read first and resolve conflicts

1. Read the current task, this file, `DESIGN_SYSTEM.md`, and `README.md`.
2. Inspect the actual files affected, including callers, selectors, and linked sections. Current code establishes existing behavior; documentation is not evidence that every accessibility or security requirement has been met.
3. Keep the storefront's implemented design as the baseline. Broader Willow guides supply voice and intent, not permission to replace site-specific choices. Known differences are recorded in `DESIGN_SYSTEM.md`.
4. If an instruction would change an established product decision or conflict with a brand rule, identify the conflict and obtain direction before that dependent change. Continue independent work. Never invent prices, release dates, testimonials, product claims, pillar definitions, or approvals.
5. Before nontrivial work, briefly state the intended behavior, affected files, risks, and validation. Ask only when an essential missing decision prevents progress.

## Repository map and conventions

| File | Responsibility |
| --- | --- |
| `index.html` | Whole page, semantic sections, metadata, inline SVG illustrations and purchase links |
| `styles.css` | Shared tokens, themes, utilities, components, media queries, print styles |
| `script.js` | Deferred browser behavior: theme, header, FAQ, waitlist, anchor focus, footer year |
| `api/waitlist.js` | Vercel serverless POST handler; webhook or Google Sheets persistence |
| `package.json` | ES modules, local static server, JavaScript syntax checks |
| `vercel.json` | Clean URLs and existing response security headers |

- No frontend build step, router, component framework, or application database is configured. Vercel serves the root static files and runs the API separately. `googleapis` is the server-side integration dependency; `serve` supports local static development.
- Keep changes small and in these existing files. Reuse classes, tokens, markup patterns, and functions before adding abstractions. Add dependencies only when the requested behavior warrants them; explain the need.
- Match local formatting; do not reformat unrelated code. Existing files use two-space indentation. HTML uses double-quoted attributes and named section IDs. CSS uses descriptive kebab-case classes, custom properties, and section comments.
- Browser JS uses a strict-mode IIFE, `var`, camelCase names, double quotes, semicolons, guarded DOM lookups, and event listeners. The API uses ES-module `export default`, `const`, single quotes, async functions, and semicolons. Preserve each file's style rather than imposing one style across both.
- Keep JavaScript out of inline event attributes. Preserve `defer`, semantic HTML, section IDs, accessible names, and selectors used by JS. Use `textContent` for status text; do not render user input or server messages as HTML.
- Comments explain reasons and constraints. Keep the `__PORT_8000__` API-base convention unless the task deliberately changes the preview/local integration.

## Behavior to preserve

- Theme initializes from the system preference, then light as fallback. `data-theme="dark"` selects dark tokens; light removes the attribute. Manual choice lasts only for the current page session; storage APIs are deliberately avoided for iframe compatibility. System changes apply until the visitor chooses a theme. Keep toggle `aria-pressed` and action label synchronized.
- FAQ uses native `details`/`summary`; JS allows one open item or all closed. Content remains available through native controls without JS.
- Anchor navigation moves focus to the destination using temporary `tabindex="-1"`, cleaned up on blur. Preserve the skip link and avoid focus traps or forced focus jumps.
- Waitlist requires email; study-stage checkboxes are optional. Validation returns focus to invalid email. Submission disables the button and shows `Joining...`, restores it in `finally`, resets the form only on success, and announces status through `role="status"` / `aria-live="polite"`. Failure offers retry and the existing contact email.
- Product purchases leave the site for Payhip. Preserve `rel="noopener"` and the accessible new-tab notice for links using `target="_blank"`. Do not build a checkout or change payment destinations as a documentation task.

## Waitlist contract and data safety

The browser POSTs JSON to `/api/waitlist` (localhost currently targets port 8000). Fields are `email`, `stage` (array), `product_interest`, `source`, `consent`, and `notes`. The existing browser supplies library-wide interest, the storefront source, `consent: "yes"`, and empty notes. This is current behavior, not proof of verified consent.

The handler accepts OPTIONS (204) and POST; other methods return 405. Invalid email returns 400. Successful persistence returns 201 with `{ ok: true, message }`; integration failure returns 503 with `{ ok: false, message }`. Preserve this contract when changing either side. The handler normalizes email and trims/bounds selected fields; client validation alone is not a security boundary.

| Server configuration | Use |
| --- | --- |
| `WAITLIST_WEBHOOK_URL` | Preferred path when configured: Google Apps Script webhook |
| `GOOGLE_SHEET_ID` | Service-account destination spreadsheet |
| `GOOGLE_SHEET_NAME` | Tab name; defaults to `Signups` |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | Service-account identity |
| `GOOGLE_PRIVATE_KEY` | Service-account credential; code converts escaped newlines |

- Keep integration configuration server-side in Vercel environment variables. Never commit credentials, webhook URLs, tokens, real signup data, or secret-bearing logs. Never put private configuration in HTML, CSS, browser JS, examples, or public documentation. Do not copy `.env` files into commits.
- Preserve webhook precedence over service-account persistence. Missing configuration is an unavailable service, never a successful signup. Do not change production configuration, sheet contents, DNS, Wix Google Workspace MX/TXT records, or Vercel settings as incidental work.
- Treat email, optional study stage, and visitor IP as personal data. The current API forwards visitor IP to the webhook or uses it in the sheet's notes fallback; do not claim anonymous collection. Do not add sensitive health fields or tracking without a defined need and approval.
- Existing limitations: wildcard CORS, no application-level rate limit or bot control, client-supplied/defaulted consent, Google Sheets `USER_ENTERED` writes, and raw error-object logging. These are not approved security guarantees. If touching this endpoint, assess abuse protection, server-side field/consent validation, formula-injection prevention, and redacted logging; propose focused fixes separately rather than silently expanding this documentation change. CORS is not authentication or abuse prevention.
- Keep `nosniff` and referrer-policy headers. Review third-party scripts, embeds, and external requests before adding them. Do not introduce a restrictive CSP without accounting for current fonts, inline SVG, JSON-LD, and API behavior.

## Validation appropriate to the change

Commands from repository root:

```bash
npm install
npm run check
npm run dev
```

`npm run check` runs `node --check` on `script.js` and `api/waitlist.js`. It is a syntax check, not linting, type checking, an automated test suite, or a production build. No such additional scripts are currently configured. `npm run dev` serves static files at `http://localhost:3000`; it does not run the API. Do not report successful persistence from this static preview.

- Documentation-only changes: verify links, filenames, token values, commands, and statements against source; inspect the diff for exactly the intended Markdown files. Runtime/browser tests are unnecessary when runtime bytes do not change.
- HTML/CSS/browser changes: run the syntax check when JS changes; review light and dark themes, narrow and wide layouts, font fallbacks, 200% zoom, keyboard-only use, focus visibility, skip/anchor links, FAQ, and reduced motion. Check console/network errors. Measure contrast for changed text/control combinations; existing tokens do not guarantee compliance.
- Form/API changes: use mocked responses or an isolated preview with test-only integration configuration. Cover missing/invalid email, optional stages, pending state, success, API/network failure, missing configuration, and submit-button recovery; verify relevant API status codes and payload shape. Do not submit test signups to production or execute purchases as a smoke test.
- State exactly which checks ran, their results, and what was not exercised. Report pre-existing issues separately from regressions.

## Safe integration and completion

Every push to `main` deploys to production; other branches receive Vercel previews according to `README.md`. Work on a feature branch and open a documentation-only pull request. Do not push directly to `main`, merge, enable auto-merge, or trigger a production deployment without explicit authorization for that action.

For this initial integration, add only root `AGENTS.md` and root `DESIGN_SYSTEM.md`. Root placement makes agent guidance discoverable without adding a `docs/` hierarchy; some agents may still need an explicit instruction to read `AGENTS.md`. A README link can be a later optional edit. No runtime, dependency, domain, or deployment-configuration change is required. Review the PR's two-file diff before merging; merging may still cause a Vercel deployment even though page behavior is unchanged. Roll back with a focused revert through the same reviewed workflow, never a force-push to production.

At completion, summarize what changed, why, validation performed, and remaining limitations. Update these documents alongside future changes to tokens, behavior, conventions, API/configuration, or deployment decisions.

## Sources and review baseline

Reviewed against repository `main` at [`6f14b4d07d508f6ef5735d1f6f189f94bb73d780`](https://github.com/weepingwillowwhisperer/v0-wwilloww-ai/tree/6f14b4d07d508f6ef5735d1f6f189f94bb73d780), on 2026-10-23. Reinspect current source before future work.

- [The Vibe Coding Blueprint](https://docs.google.com/document/d/1XYyb0LsFbRNtqdcBWLktXNh-YkscbhpVo8C_Mb5xNEs/edit): documentation workflow, adapted to this site's scope.
- [Willow Brand Guide](https://docs.google.com/document/d/1OhfGMbMW2Ucd87bWngkwt35Ad8bxbIB-RUGilNMwFPE/edit), [Brand Voice Guidelines v1](https://docs.google.com/document/d/1I34Tcdlk9o690j3UF32nTQ36Y9hREZAa9amsOtjf-_8/edit), and [October 2026 Copilot Brief](https://drive.google.com/file/d/18jviNZlsHWE5Y0-kSMO-5L-E85ZQlDdT/view): brand references; access may require permission.
