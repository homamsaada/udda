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
  layouts/                  Base HTML layout templates
  tools/                    Individual tool HTML templates
dist/                       Generated output — do NOT edit directly
build.js                    Build script (Node.js)
```

## Tech Stack

- Vanilla HTML/CSS/JS — no frameworks or runtime dependencies
- Node.js for the build system only (`build.js`)
- No external npm dependencies

## Code Conventions

- **JS**: ES6+, global `App` object with methods, `localStorage` for state, event delegation
- **CSS**: CSS custom properties for theming, `[dir="rtl"]`/`[dir="ltr"]` selectors, responsive breakpoint at 1024px, light/dark/auto themes
- **HTML**: Template placeholders `{{variable}}`, semantic HTML with ARIA attributes
- **i18n**: Keyed by `tools[toolId][lang][property]` in `i18n.json`

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

## Build Output

`build.js` generates under `dist/`:
- `ar/` and `en/` — full site in both languages
- `sitemap.xml` and `robots.txt` — SEO files
- `index.html` — language-detection redirect

## Deployment

GitHub Actions (`.github/workflows/deploy.yml`) auto-deploys `dist/` to GitHub Pages on push to `main`.

## Important Notes

- `dist/` is auto-generated — always edit files in `src/`
- Every tool must support both Arabic and English
- The site supports dark/light/auto themes via `data-theme` attribute
- Base URL: `https://udda.tools`
