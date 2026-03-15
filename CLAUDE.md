# Udda | عُدّة

A free, multilingual (Arabic/English) online tools website with calculators, converters, text tools, and more.

## Commands

- `npm run build` — Build the site (generates `dist/`)
- `npm run serve` — Start local server on port 3000
- `npm run dev` — Build + serve

No test or lint commands are configured.

## Project Structure

```
src/                        Source files (edit here)
  assets/css/main.css       Main stylesheet (CSS variables, RTL/LTR, themes)
  assets/js/app.js          Main application JS (global App object)
  data/i18n.json            All translations (AR/EN)
  data/tools.json           Tools registry and category order
  layouts/                  Base HTML layout templates (NOT used by build — see note below)
  tools/                    Individual tool HTML templates
dist/                       Generated output — do NOT edit directly
build.js                    Build script (Node.js) — contains the actual HTML template
```

## Tech Stack

- Vanilla HTML/CSS/JS — no frameworks or runtime dependencies
- Node.js for the build system only (`build.js`)
- No external npm dependencies

## Code Conventions

- **JS**: ES6+, global `App` object with methods, `localStorage` for state, event delegation
- **CSS**: CSS custom properties for theming, `[dir="rtl"]`/`[dir="ltr"]` selectors, responsive breakpoints at 1024px/768px/480px, light/dark/auto themes
- **HTML**: Template placeholders `{{variable}}`, semantic HTML with ARIA attributes
- **i18n**: Keyed by `tools[toolId][lang][property]` in `i18n.json`

## Critical: build.js Contains the HTML Template

**`build.js` uses an inline HTML template** inside `buildPageHTML()` — it does NOT read from `src/layouts/base.html`. Any layout changes (header, footer, ads, page structure) must be made directly in `build.js`. The `src/layouts/` directory is legacy and not used.

## Current Tools

- `percentage` — Percentage calculator
- `interest-calculator` — Simple & compound interest calculator
- `loan-calculator` — Loan payment & amortization calculator
- `body-calculator` — BMI, BMR, ideal weight, body fat calculators
- `age-calculator` — Age, date difference, add/subtract dates
- `family-tree` — Interactive family tree builder (SVG/Canvas)

## Adding a New Tool

1. Create an HTML template in `src/tools/<tool-name>.html`
2. Register the tool in `src/data/tools.json`
3. Add translations (both AR and EN) in `src/data/i18n.json`
4. Run `npm run build` to generate pages
5. Do NOT add `ad-inline` inside tool templates — ads are handled by the layout in `build.js`

## Page Layout Architecture

The site uses different layouts depending on page type (controlled by `isHome`/`isCategory` flags in `build.js`):

### Homepage & Category Pages (full-width)
- No sidebar — content takes full width (`.page-content--full`)
- Horizontal ad banner (728×90 Leaderboard) between hero and categories
- Mobile: banner scales to 320×100

### Tool Pages (with sidebar)
- Content + sidebar layout via `.content-wrapper` (flexbox)
- Sidebar (`.ad-sidebar`): two 300×250 ad units, sticky, centered
- Sidebar hidden on screens ≤1024px
- No inline ads inside tool content

### All Pages
- Mobile bottom sticky ad (320×50) — fixed at bottom, visible only ≤1024px
- `body` has `padding-bottom: 58px` on mobile to prevent content overlap
- Footer with privacy policy & terms of service links

## Ad Placements & Sizes (Google AdSense)

Standard AdSense sizes are used throughout:

| Placement | Size | Class | Visibility |
|---|---|---|---|
| Sidebar (desktop) | 300×250 × 2 | `.ad-unit` | >1024px only |
| Homepage banner | 728×90 | `.ad-banner` | All devices |
| Mobile bottom sticky | 320×50 | `.ad-bottom-sticky` | ≤1024px only |

- All ad containers have `border-radius: 0` (square corners, matching AdSense default)
- AdSense Publisher ID placeholder: `ca-pub-XXXXXXXXXXXXXXXX` — must be replaced with real ID
- Each `data-ad-slot` placeholder: `XXXXXXXXXX` — must be replaced per ad unit

## Header Structure

- Only one button in header: Settings (gear icon)
- Favorite and Share buttons are inside the Settings panel, not the header
- Search bar is visible on all screen sizes (compact on mobile ≤480px)

## Responsive Breakpoints

| Breakpoint | Changes |
|---|---|
| ≤1024px | Sidebar hidden, bottom sticky ad shown, search bar narrower |
| ≤768px | Reduced padding, smaller hero, compact ad sizes |
| ≤480px | Compact search bar (140px), smaller header padding, 2-col categories |

## Build Output

`build.js` generates under `dist/`:
- `ar/` and `en/` — full site in both languages
- `sitemap.xml` and `robots.txt` — SEO files
- `index.html` — language-detection redirect

## Deployment

GitHub Actions (`.github/workflows/deploy.yml`) auto-deploys `dist/` to GitHub Pages on push to `main`.

## Important Notes

- `dist/` is auto-generated — always edit files in `src/` and `build.js`
- **Layout changes go in `build.js`**, not in `src/layouts/base.html`
- Every tool must support both Arabic and English
- The site supports dark/light/auto themes via `data-theme` attribute
- `.tool-card` has no visual styling (no border/background/shadow) — tools render directly on page background
- Base URL: `https://udda.tools`
