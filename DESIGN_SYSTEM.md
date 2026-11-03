# Willow storefront design system

This documents the existing `wwilloww.ai` implementation. Read with [AGENTS.md](AGENTS.md). Values and selectors below come from `styles.css`, with markup and interaction rules from `index.html` and `script.js`. Reuse these choices before adding new styles.

## Direction and brand scope

Calm, warm, literate, spacious, and practical. Reduce cognitive load through clear hierarchy, readable text, predictable controls, and small next steps. Keep the page focused on PDF study supports for neurodivergent students and supporters; it is not the whole Willow ecosystem.

Voice is restrained, emotionally precise, intelligent, and warm. Write concrete labels and useful explanations. Avoid urgency, hype, corporate jargon, generic luxury language, toxic positivity, and patronizing reassurance. Do not describe neurodivergence as a deficit to fix or a superpower to sell. Do not invent testimonials, availability, clinical claims, or promised outcomes. Willow tools support daily life; they are not diagnosis, therapy, or medical advice.

Preserve the inline willow-leaf mark and `wwilloww.ai` wordmark in header/footer. Decorative SVGs remain hidden from assistive technology; home links retain accessible names. Do not replace the brand mark with a new logo or decorative icon library.

### Known differences between brand references and the site

| Reference | Guidance | Storefront treatment |
| --- | --- | --- |
| Earlier Brand Guide | Cormorant Garamond with Lato/Raleway; forest/cream palette | Site uses Boska/Supreme and its own warm sand/teal tokens. Preserve the implemented web pairing and palette. |
| October 2026 Copilot Brief | Stone, near-black, sage; never place text on green backgrounds; PDF document defaults | Site already has teal primary buttons and tinted illustrations. Record this conflict; do not silently recolor existing controls. Do not introduce new green text panels. Obtain Candan's direction before a redesign or extending the conflicting treatment. |
| General brand restraint | Avoid decorative excess, heavy shadows, gradient overlays | Preserve the site's existing subtle radial hero wash and restrained token shadows. Do not interpret the guide as a mandate to remove them or add new dramatic effects. |

These documents record a storefront baseline, not approval resolving those differences. Brand changes require an explicit decision; they are not part of adding documentation.

## Color tokens

Use semantic CSS custom properties rather than new literal colors. Light is `:root`; dark overrides live in `[data-theme="dark"]`.

| Token | Light | Dark | Role |
| --- | --- | --- | --- |
| `--bg` | `#f3eddf` | `#141b18` | Page background |
| `--bg-soft` | `#efe7d4` | `#111815` | Alternating section backgrounds |
| `--surface` | `#faf6ec` | `#1a221e` | Cards and form |
| `--surface-2` | `#f7f1e1` | `#1f2723` | Secondary surfaces, thumbnails |
| `--border` | `#d9cfb6` | `#2d3833` | Subtle boundaries |
| `--border-strong` | `#c4b896` | `#3c4944` | Stronger control borders |
| `--ink` | `#1f2a26` | `#e8e2d2` | Primary text |
| `--ink-soft` | `#3a4742` | `#c9c4b6` | Supporting text |
| `--ink-muted` | `#6a7570` | `#8e9690` | Metadata and small labels; verify contrast |
| `--ink-faint` | `#94978f` | `#5b6360` | Placeholder treatment; not essential body text |
| `--willow` | `#2f5d52` | `#7fbcaf` | Links, primary action, brand accents |
| `--willow-hover` | `#224740` | `#a5d4c8` | Accent hover |
| `--sage` | `#7d9684` | `#9bb3a0` | Secondary decorative accent |
| `--lavender` | `#8472a8` | `#b9a8de` | Small emphasis; current form error text |
| `--gold` | `#8a672a` | `#d4a657` | Coming-soon status |
| `--focus` | `#2f5d52` | `#a5d4c8` | Keyboard focus |

`--focus-ring` is `3px solid var(--focus)`; `--focus-offset` is `3px`. Color tokens are roles, not a blanket contrast certification. Never communicate availability, error, or selection through color alone. No separate danger/warning component system exists; do not invent one for this documentation.

## Typography

- Display: `--font-display: "Boska", Georgia, "Iowan Old Style", serif`.
- Body: `--font-body: "Supreme", -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif`.
- Fontshare loads Boska 500/600/700 and Supreme 400/500/600 with `display=swap`. Preserve fallbacks and readable layout when remote fonts fail; no new font provider is needed.

| Token | CSS value |
| --- | --- |
| `--text-xs` | `0.78rem` |
| `--text-sm` | `0.92rem` |
| `--text-base` | `1.0625rem` |
| `--text-lg` | `1.25rem` |
| `--text-xl` | `clamp(1.5rem, 2.2vw + 0.7rem, 2rem)` |
| `--text-2xl` | `clamp(2rem, 3.6vw + 0.8rem, 3rem)` |
| `--text-hero` | `clamp(2.5rem, 5vw + 1rem, 4.5rem)` |

Body is about 17px at a 16px root, line-height 1.6. Do not lower body copy below 16px; small metadata is a separate existing treatment. Keep text scalable rather than fixing the root font size.

`.display` uses the hero scale, weight 600, line-height 1.08, tracking -0.02em (-0.015em on small screens). `.display-sm` uses the 2xl scale, weight 600, line-height 1.12, tracking -0.012em. `h3` uses the body face at 1.25rem/1.3 and weight 600. `.lede` uses 1.25rem/1.55 with a 56ch maximum; `.prose p` has a 62ch maximum. `.eyebrow`/`.kicker` use small uppercase labels with 0.12em tracking; uppercase is not a body-copy style.

## Spacing, geometry, and layout

| Token | Value | At a 16px root |
| --- | --- | --- |
| `--space-1` | `0.25rem` | 4px |
| `--space-2` | `0.5rem` | 8px |
| `--space-3` | `0.75rem` | 12px |
| `--space-4` | `1rem` | 16px |
| `--space-5` | `1.5rem` | 24px |
| `--space-6` | `2rem` | 32px |
| `--space-8` | `3rem` | 48px |
| `--space-10` | `4rem` | 64px |
| `--space-12` | `5.5rem` | 88px |
| `--space-16` | `7rem` | 112px |

Suffixes are names, not a multiplication rule: do not substitute a generic spacing scale. Radii are `--radius-sm: 8px`, `--radius-md: 14px`, `--radius-lg: 22px`, and `--radius-xl: 28px`; buttons/tags use 999px pills and the theme toggle is circular. Reuse `--shadow-sm` and `--shadow-md` exactly from CSS, including their dark overrides; do not add stronger shadows.

`.container` centers content at `--container: 1180px`, with inline padding `clamp(1rem, 4vw, 2.5rem)`. `--container-tight` is defined as 880px; do not assume every section uses it. `.section` uses block padding `clamp(var(--space-10), 8vw, var(--space-16))`. Preserve generous spacing and content-driven height.

| Existing breakpoint | Behavior |
| --- | --- |
| Up to 600px | Header gaps reduce; header small CTA hides (hero CTA remains); contact rows stack |
| From 720px | Accessibility cards and footer use wider layouts |
| From 880px | Primary nav appears; two-column, featured, waitlist, and contact layouts expand |
| From 980px | Hero grid expands |

Product grid uses `repeat(auto-fill, minmax(280px, 1fr))` with `--space-5` gaps; other grids use their existing auto-fit rules. Do not add a mobile drawer, sidebar, or framework breakpoint system without a task requiring it. Verify 320px reflow and zoom rather than assuming these rules cover every new content length.

## Reusable component rules

| Pattern | Existing rules to preserve |
| --- | --- |
| Links | Willow color, underline, 3px underline offset; hover increases underline thickness. Navigation and button links have specific exceptions. |
| `.btn` | Inline-flex pill, gap `--space-2`, padding `0.85rem 1.4rem`, body face at small size/500, line-height 1; `.btn-sm` padding `0.55rem 0.95rem`; `.btn-block` full width. |
| `.btn-primary` | Willow fill/border; light text `#fbf6e8` (white on hover), dark-theme text `#0c1310`. Keep theme-specific contrast. Existing green-background conflict is recorded above. |
| `.btn-ghost` | Transparent, ink text, strong border; hover uses surface and Willow accent. |
| `.product-card` | Surface, 1px border, large radius, `--space-5` padding, `--space-4` internal gap. Hover raises 2px and uses medium shadow; reduced motion removes lift. |
| `.product-thumb` | 4:3 ratio, secondary surface, medium radius, inline SVG art; decorative art must not duplicate accessible product text. |
| Availability | `.status-live` uses Willow (sage for product status in dark); coming-soon uses gold. Keep explicit status words and accurate CTA labels. |
| Header | Sticky, translucent background and subtle blur; border appears after scroll. Preserve uncluttered header and accessible theme toggle. |
| Waitlist | Surface, 1px border, extra-large radius, responsive padding; visible email label, fieldset/legend for optional stages. |
| Email input | Body-scale text, background token, strong border, medium radius; focus uses Willow border and 4px tinted shadow. Preserve a clearly visible focus indicator. |
| Feedback | Reserved status height; success/status in Willow, `.is-error` in lavender; descriptive message is required. Submit pending label/disabled state must recover on failure. No generic loading overlay or empty-state component is established. |
| FAQ | Native `details`/`summary`, clear expanded/collapsed state and keyboard operation. |

Use anchors for navigation and purchases, buttons for actions. Existing inline SVG stroke icons and CSS paper illustrations are sufficient; no icon package is needed. Keep decorative marks noninteractive and `aria-hidden="true"` where appropriate.

## Accessibility and motion requirements

These are acceptance requirements for changed UI, not a claim that the entire existing site has been audited.

- Preserve `lang="en"`, one clear h1, logical heading levels, main/nav/footer landmarks, section labels, visible form labels, optional-stage legend, and the first-focusable skip link to `#main`.
- Make all actions usable by keyboard; keep DOM order logical. Theme toggle announces its action and pressed state. Native FAQ controls remain usable. In-page navigation transfers focus without trapping it.
- Preserve global `:focus-visible` styling and component-specific focus styles. The current CSS suppresses generic `:focus` outlines and supplies explicit replacements; never copy outline suppression without a visible replacement. Check the email field, FAQ, links, and controls in both themes.
- Measure changed text/background pairs: target at least 4.5:1 for normal text, 3:1 for large text, and 3:1 for relevant control boundaries and focus indicators. Muted/faint tokens and tinted surfaces need particular attention. Fix a changed inaccessible pairing deliberately; do not claim all existing combinations pass.
- Keep status and errors understandable without color. Preserve the polite live region, invalid-email focus, pending feedback, retry guidance, and accessible names for new-tab purchase links. Placeholder text never replaces a label.
- Test reflow at 320 CSS px, 200% zoom, and text enlargement. Avoid clipped labels, forced horizontal scrolling, fixed-height text boxes, hover-only information, and motion-dependent feedback. Keep controls comfortably operable; do not shrink existing targets.
- Under `prefers-reduced-motion: reduce`, scrolling becomes automatic; animations/transitions reduce to 0.001ms with one iteration, and product-card hover transforms are removed. New effects must honor this preference. Avoid autoplay, flashing, parallax, or decorative motion.
- Keep readable font fallbacks and meaningful alt text for informative images; hide purely decorative illustrations. If adding Turkish content, verify characters such as ğ, ş, ı, and İ in the chosen fonts.
- Preserve the existing print treatment: hide header/footer, theme toggle, CTA row, waitlist form, and skip link; print with white background and black text. Screen palette rules do not override this print exception.

## Maintenance and sources

Reviewed on 2026-10-23 against [`main` at 6f14b4d](https://github.com/weepingwillowwhisperer/v0-wwilloww-ai/tree/6f14b4d07d508f6ef5735d1f6f189f94bb73d780). Update this file with deliberate implementation changes; do not let descriptive values drift from CSS. For validation and production boundaries, follow `AGENTS.md`.

- [Stylesheet baseline](https://github.com/weepingwillowwhisperer/v0-wwilloww-ai/blob/6f14b4d07d508f6ef5735d1f6f189f94bb73d780/styles.css)
- [Willow Brand Guide](https://docs.google.com/document/d/1OhfGMbMW2Ucd87bWngkwt35Ad8bxbIB-RUGilNMwFPE/edit)
- [Brand Voice Guidelines v1](https://docs.google.com/document/d/1I34Tcdlk9o690j3UF32nTQ36Y9hREZAa9amsOtjf-_8/edit)
- [October 2026 Copilot Brief](https://drive.google.com/file/d/18jviNZlsHWE5Y0-kSMO-5L-E85ZQlDdT/view)
- [The Vibe Coding Blueprint](https://docs.google.com/document/d/1XYyb0LsFbRNtqdcBWLktXNh-YkscbhpVo8C_Mb5xNEs/edit)

Brand references may require access. Their relevant storefront rules are summarized here so everyday coding does not depend on opening external documents.
