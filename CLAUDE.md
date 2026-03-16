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
  assets/images/ads/        Ad placeholder images (replace with real ads later)
  data/i18n.json            All translations (AR/EN)
  data/tools.json           Tools registry and category order
  layouts/                  LEGACY — NOT used by build (see Critical Notes)
  tools/                    Individual tool HTML templates
dist/                       Generated output — do NOT edit directly
docs/                       GitHub Pages deployment folder — do NOT edit directly
build.js                    Build script — contains the actual HTML layout template
```

## Tech Stack

- Vanilla HTML/CSS/JS — no frameworks or runtime dependencies
- Node.js for the build system only (`build.js`)
- No external npm dependencies

## Critical Notes

- `dist/` and `docs/` are auto-generated — always edit files in `src/` and `build.js`
- Layout changes go in `build.js` (function `buildPageHTML()`), not in `src/layouts/`
- Every tool must support both Arabic and English
- The site supports dark/light/auto themes via `data-theme` attribute
- Base URL: `https://udda.tools`

## Current Tools

| ID | Category | Description |
|---|---|---|
| `percentage` | calculators | 13 inline percentage calculators |
| `interest-calculator` | calculators | Simple & compound interest |
| `loan-calculator` | calculators | Loan payments & amortization |
| `body-calculator` | calculators | BMI, BMR, ideal weight, body fat |
| `age-calculator` | calculators | Age, date difference, date math |
| `family-tree` | everyday | Interactive family tree builder (SVG) |
| `zakat-calculator` | calculators | Zakat calculation (gold, silver, cash, stocks, debt, real estate, trade) |
| `inheritance-calculator` | calculators | Islamic inheritance (faraid) calculator with 4 madhabs, awl, radd, hajb |
| `kaffara-calculator` | calculators | Kaffara & fidya calculator for 8 types of Islamic expiations |

## Adding a New Tool — Step by Step

This is the most common task. Follow these steps exactly:

### Step 1: Add translations in `src/data/i18n.json`

Location: inside `"tools"` object, add a new key matching your tool ID.

```json
"tools": {
  "my-tool": {
    "ar": {
      "name": "اسم الأداة",
      "title": "اسم الأداة - وصف قصير | عُدّة",
      "metaDescription": "وصف SEO بالعربي (150-160 حرف)",
      "keywords": "كلمة1، كلمة2، كلمة3",
      "description": "وصف قصير يظهر تحت اسم الأداة",
      "searchTerms": "كلمات بحث متنوعة بالعامي والفصحى والإنجليزي",
      "howToUseText": "شرح مختصر لكيفية الاستخدام",
      "customKey1": "نص مخصص 1",
      "customKey2": "نص مخصص 2"
    },
    "en": {
      "name": "Tool Name",
      "title": "Tool Name - Short Description | Udda",
      "metaDescription": "English SEO description (150-160 chars)",
      "keywords": "keyword1, keyword2, keyword3",
      "description": "Short description shown under tool name",
      "searchTerms": "various search terms synonyms misspellings",
      "howToUseText": "Brief usage instructions",
      "customKey1": "Custom text 1",
      "customKey2": "Custom text 2"
    }
  }
}
```

**Reserved keys** (handled automatically by build.js, do NOT use as `{{tool.xxx}}` in templates):
`name`, `title`, `metaDescription`, `keywords`, `description`, `searchTerms`, `howToUseText`

**Custom keys**: Any other key you add (like `customKey1`) becomes available as `{{tool.customKey1}}` in the HTML template. Add as many as needed for your tool's UI labels.

**searchTerms tips**: Include the word without "ال", slang/colloquial variants, common misspellings (مئوية/مئويه), and English equivalents.

### Step 2: Register in `src/data/tools.json`

```json
{
  "id": "my-tool",
  "category": "calculators",
  "icon": "🔢",
  "popular": true,
  "new": true,
  "related": ["percentage", "other-tool"]
}
```

Available categories: `calculators`, `converters`, `text`, `datetime`, `generators`, `image`, `developers`, `everyday`

### Step 3: Create HTML template `src/tools/my-tool.html`

The template gets wrapped automatically by `build.js` inside the full page layout. You only write the tool content.

```html
<!-- Tool card with header -->
<div class="tool-card">
  <div class="tool-header">
    <div class="tool-icon">🔢</div>
    <div>
      <h1 class="tool-title">{{tool.name}}</h1>
      <p class="tool-description">{{tool.description}}</p>
    </div>
  </div>

  <!-- Your tool UI here -->
</div>

<!-- How to Use section -->
<div class="how-to-use">
  <h3>📖 {{ui.howToUse}}</h3>
  <p>{{tool.howToUseText}}</p>
</div>

<!-- Scoped styles -->
<style>
/* Your tool-specific CSS */
</style>

<!-- Scoped script -->
<script>
// Your tool-specific JS
</script>
```

### Step 4: Build and verify

```bash
npm run build
npm run serve
# Check both http://localhost:3000/ar/tools/my-tool.html
# and   http://localhost:3000/en/tools/my-tool.html
```

## Adding a Sub-Calculator to `percentage`

The percentage tool uses a numbered calculator pattern (`calc1` through `calc13`). To add a new one:

1. Add HTML block in `src/tools/percentage.html` following the `calc-row-inline` pattern with `id="calcN-*"` inputs and `id="resultN"`
2. Add translations in `src/data/i18n.json` under `percentage.ar` and `percentage.en` (at minimum `calcNTitle`)
3. Update the JS in the same file:
   - Increase the loop bound: `for (let i = 1; i <= N; i++)`
   - Add `N` to the `isPercent` array if the result is a percentage
   - Add `N` to the `signed` array if the result can be negative (shows +/− and color)
   - Add `case N` in the `calculate()` switch
4. Run `npm run build`

## Template Placeholder System

Placeholders use `{{key}}` syntax and are replaced at build time.

| Placeholder | Source | Example |
|---|---|---|
| `{{tool.name}}` | `i18n.json → tools.{id}.{lang}.name` | حاسبة النسبة المئوية |
| `{{tool.description}}` | `i18n.json → tools.{id}.{lang}.description` | احسب النسبة بسهولة |
| `{{tool.howToUseText}}` | `i18n.json → tools.{id}.{lang}.howToUseText` | أدخل الأرقام... |
| `{{tool.customKey}}` | `i18n.json → tools.{id}.{lang}.customKey` | أي نص مخصص |
| `{{ui.calculate}}` | `i18n.json → ui.{lang}.calculate` | احسب |
| `{{ui.result}}` | `i18n.json → ui.{lang}.result` | النتيجة |
| `{{ui.howToUse}}` | `i18n.json → ui.{lang}.howToUse` | كيفية الاستخدام |
| `{{validationMsg}}` | Hardcoded in build.js | أدخل أرقاماً صحيحة |

Language detection at runtime:

```js
const lang = App.state.lang; // 'ar' or 'en'
const isArabic = lang === 'ar';
```

Toast messages:

```js
App.showToast(App.state.lang === 'ar' ? 'تم النسخ!' : 'Copied!');
```

## CSS Architecture

### Theme colors (use these CSS variables, never hardcode colors)

```css
var(--bg-primary)         /* Page background */
var(--bg-secondary)       /* Cards, inputs */
var(--bg-tertiary)        /* Alternate sections */
var(--text-primary)       /* Main text */
var(--text-secondary)     /* Secondary text */
var(--text-muted)         /* Placeholders, hints */
var(--accent-primary)     /* Primary brand color (indigo) */
var(--accent-secondary)   /* Secondary accent */
var(--accent-gradient)    /* Gradient for buttons/results */
var(--border-color)       /* Borders */
var(--border-radius)      /* Standard radius */
var(--border-radius-lg)   /* Large radius */
var(--transition-fast)    /* Fast transition */
```

**Dark mode note:** The dark theme does NOT override `--accent-primary`, `--accent-secondary`, or `--accent-gradient` — it inherits them from the light theme. Only backgrounds, text colors, borders, and shadows are overridden.

### RTL support

```css
/* Use logical properties */
margin-inline-start: 8px;   /* NOT margin-left */
padding-inline-end: 12px;   /* NOT padding-right */

/* For directional overrides */
[dir="rtl"] .my-element { /* RTL-specific */ }
```

### Key UI classes

- `.tool-card` — Main tool container (no border/background/shadow — tools render directly on page background)
- `.tool-header` — Icon + title + description row
- `.tool-icon` — Emoji icon container
- `.tool-title` — H1 tool name
- `.how-to-use` — Usage instructions section

### Responsive breakpoints

| Breakpoint | Changes |
|---|---|
| ≤1024px | Sidebar hidden, bottom sticky ad shown |
| ≤768px | Reduced padding, smaller hero, compact layouts |
| ≤480px | Compact search bar, smaller header, 2-col categories |

## JavaScript Patterns

### Global App object (defined in `src/assets/js/app.js`)

```js
App.state.lang      // Current language: 'ar' | 'en'
App.state.theme     // Current theme: 'light' | 'dark' | 'auto'
App.showToast(msg)  // Show temporary notification
```

### Calculator pattern (used in percentage tool)

Each calculator row follows this structure:
1. Inputs with `oninput="calculate(n)"` for instant results
2. Result displayed in `<span class="calc-result" id="resultN">`
3. Precision controls (+/−) and copy button
4. Results update in real-time, no submit button needed

### Clipboard

```js
navigator.clipboard.writeText(text).then(() => {
  App.showToast(App.state.lang === 'ar' ? 'تم النسخ!' : 'Copied!');
});
```

## Page Layout Architecture

Controlled by `isHome`/`isCategory` flags in `build.js` → `buildPageHTML()`:

### Homepage & Category Pages (full-width)
- No sidebar — `.page-content--full`
- Horizontal ad banner (728×90) between hero and categories
- Mobile: banner scales to 320×100

### Tool Pages (with sidebar)
- Content + sidebar via `.content-wrapper` (flexbox)
- Sidebar (`.ad-sidebar`): two 300×250 ad units, sticky
- Sidebar hidden on ≤1024px
- No inline ads inside tool content

### All Pages
- Mobile bottom sticky ad (320×50), visible only ≤1024px
- `body` has `padding-bottom: 58px` on mobile to prevent content overlap
- Footer with links to about, contact, privacy, terms, disclaimer

## Ad Placements (Google AdSense)

| Placement | Size | Class | Visibility |
|---|---|---|---|
| Sidebar (desktop) | 300×250 × 2 | `.ad-unit` | >1024px only |
| Homepage banner | 728×90 | `.ad-banner` | All devices |
| Mobile bottom sticky | 320×50 | `.ad-bottom-sticky` | ≤1024px only |

- All ad containers have `border-radius: 0` (square corners)
- Ads currently use placeholder images from `src/assets/images/ads/`:
  - `ad-sidebar-300x250.png` — sidebar ad (desktop)
  - `ad-banner-728x90.png` — homepage banner
  - `ad-mobile-320x50.png` — mobile bottom sticky
- Replace these with real ad creatives or AdSense code when ready

## Header Structure

- One button: Settings (gear icon)
- Favorite and Share are inside Settings panel
- Search bar visible on all screen sizes

## Build Output

`build.js` generates under `dist/`:
- `ar/` and `en/` — full site in both languages
- `ar/tools/` and `en/tools/` — individual tool pages
- `ar/category/` and `en/category/` — category listing pages
- `sitemap.xml` and `robots.txt` — SEO files
- `index.html` — language-detection redirect

## Deployment

GitHub Actions (`.github/workflows/deploy.yml`) auto-deploys `dist/` to GitHub Pages on push to `main`.

## General Preferences

These reflect the current style of the project. They're guidelines, not hard rules — use your judgment and adapt as the project grows:

- Prefer instant results (`oninput`) over submit buttons where it makes sense
- Prefer vanilla JS; use external libraries only when genuinely needed
- Keep calculators in a math-sentence style when they fit that pattern
- Use `{{tool.xxx}}` placeholders instead of hardcoding text
- Ads are handled by the layout in `build.js`, not inside tool templates
