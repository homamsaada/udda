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
  blog/ar/                  Arabic blog posts (Markdown with frontmatter)
  blog/en/                  English blog posts (Markdown with frontmatter)
  layouts/                  LEGACY — NOT used by build (see Critical Notes)
  tools/                    Individual tool HTML templates
dist/                       Generated output — do NOT edit directly
docs/                       GitHub Pages deployment folder — do NOT edit directly
build.js                    Build script — contains the actual HTML layout template
```

## Tech Stack

- Vanilla HTML/CSS/JS — no frameworks or runtime dependencies
- Node.js for the build system only (`build.js`)
- `markdown-it` — the only npm dependency, used to convert blog Markdown to HTML

## Critical Notes

- `dist/` and `docs/` are auto-generated — always edit files in `src/` and `build.js`
- Layout changes go in `build.js` (function `buildPageHTML()`), not in `src/layouts/`
- Every tool must support both Arabic and English
- The site supports dark/light/auto themes via `data-theme` attribute
- Base URL: `https://udda.tools`

## Current Tools

| ID | Category | Description |
|---|---|---|
| `gpa-calculator` | calculators (other) | GPA calculator: semester, cumulative, target, max, converter, multi-semester |
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

<!-- Disclaimer (if needed) — must be last section before related tools -->
<div class="tool-disclaimer">
  <h4>⚠️ {{tool.disclaimerTitle}}</h4>
  <div class="tool-disclaimer-item"><span>📌</span> {{tool.disclaimer1}}</div>
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

## Adding a Blog Post — Step by Step

### Step 1: Create a Markdown file

Create a file at `src/blog/{lang}/my-post-slug.md` (e.g., `src/blog/ar/how-to-calculate-zakat.md`).

Each post file starts with YAML frontmatter:

```markdown
---
title: "كيف تحسب زكاة المال"
description: "شرح مبسط لطريقة حساب زكاة المال مع أمثلة عملية"
date: "2026-03-20"
topic: "zakat-calculator"
keywords: "حساب الزكاة، زكاة المال، نصاب الزكاة"
relatedTool: "zakat-calculator"
---

محتوى المقال هنا بصيغة Markdown...

## عنوان فرعي

نص الفقرة...
```

**Frontmatter fields:**

| Field | Required | Description |
|---|---|---|
| `title` | Yes | Article title (used as h1 and title tag) |
| `description` | Yes | Short description (meta description + index card) |
| `date` | Yes | Publish date in YYYY-MM-DD format |
| `topic` | Yes | Tool ID from `tools.json` (e.g. `zakat-calculator`, `inheritance-calculator`) or `"news"` for site news/updates. The build system auto-resolves the main category from `tools.json`. |
| `keywords` | Yes | Comma-separated keywords for SEO |
| `relatedTool` | No | Tool ID from tools.json — shows a link card at article end |

**Available `topic` values:**
- Any tool ID from `tools.json`: `zakat-calculator`, `inheritance-calculator`, `kaffara-calculator`, `percentage`, `interest-calculator`, `loan-calculator`, `gpa-calculator`, `body-calculator`, `age-calculator`, `family-tree`
- `"news"` — for site updates/announcements not tied to a specific tool
- Legacy `category` field (`"seo"`, `"news"`) still works as fallback if `topic` is not set

**Blog URL structure:**

```
/{lang}/blog/                                    ← Main index (all posts)
/{lang}/blog/{category}/                         ← Main category page (e.g. calculators)
/{lang}/blog/{category}/{tool-id}/               ← Tool topic page (e.g. calculators/zakat-calculator)
/{lang}/blog/{slug}.html                         ← Article page (unchanged)
```

Category and subcategory pages are auto-generated only when posts exist for them.

### Step 2: Build and verify

```bash
npm run build
npm run serve
# Check both http://localhost:3000/ar/blog/my-post-slug.html
# and   http://localhost:3000/en/blog/my-post-slug.html (if English version exists)
# Also check the blog index at http://localhost:3000/ar/blog/
# Check category page at http://localhost:3000/ar/blog/calculators/
# Check topic page at http://localhost:3000/ar/blog/calculators/zakat-calculator/
```

**Blog index page structure (`/{lang}/blog/`):**
1. **Header** — blog title and description
2. **Dropdown filter bar** — two `<select>` dropdowns side by side: Category (main categories with icons) and Topic (tools with shortName). Category dropdown dynamically updates Topic dropdown options. Filtering is client-side JS, no page reload.
3. **All Articles** — full post grid sorted by date (newest first)

**`shortName` field in i18n.json:**
Tools with blog posts should have a `shortName` field (e.g., "الزكاة" instead of "حاسبة الزكاة") used in blog dropdowns, topic badges, and subcategory page titles. Falls back to `name` if not set.

**Notes:**
- Each language is independent — a post in `src/blog/ar/` doesn't need a matching file in `src/blog/en/`
- Posts are sorted by date (newest first) on the blog index page
- The homepage automatically shows the latest 3 posts (if any exist)
- Blog posts are automatically added to sitemap.xml (including category/topic pages)
- Links inside blog content using absolute paths (`/ar/...` or `/en/...`) are automatically converted to relative paths at build time, so always write them in absolute form
- Use the `.blog-cta` class to add a prominent CTA block linking to a related tool. The CTA icon should match the tool's icon from `tools.json`. Ideal count: **two CTAs per article** (intro + mid-article), since the `relatedTool` card auto-appended at the end covers the closing CTA:

```html
<div class="blog-cta">
  <div class="blog-cta-icon">🕌</div>
  <div class="blog-cta-body">
    <p>CTA text here</p>
    <a href="/ar/tools/tool-id.html">Button label ←</a>
  </div>
</div>
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

### CSS scoping with wrapper class

Every tool should wrap its content in a container with a unique class (e.g., `.kaffara-calculator`, `.zakat-calculator`) and scope all CSS selectors under it. This prevents style conflicts between tools:

```css
.my-tool .calc-tab { /* scoped to this tool only */ }
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

### IIFE wrapping (required for all tool JS)

All tool-specific JavaScript MUST be wrapped in an IIFE to avoid polluting the global scope. Only expose functions that are referenced in HTML `onclick`/`oninput` attributes via `window.funcName`:

```js
<script>
(function() {
  var lang = document.documentElement.lang || 'ar';
  var isArabic = lang === 'ar';

  // Private helper — not accessible outside
  function formatNumber(n) { /* ... */ }

  // Public — referenced in HTML oninput="myCalc()"
  window.myCalc = function() { /* ... */ };
  window.myReset = function() { /* ... */ };
})();
</script>
```

### Calculator pattern (used in percentage tool)

Each calculator row follows this structure:
1. Inputs with `oninput="calculate(n)"` for instant results
2. Result displayed in `<span class="calc-result" id="resultN">`
3. Precision controls (+/−) and copy button
4. Results update in real-time, no submit button needed

### Shared computation pattern (used in GPA calculator)

When multiple sections depend on the same derived values, extract a shared helper function and call it from all sections. Never let sections compute the same values independently — this causes contradictions.

```js
// GOOD: Single source of truth
function getEffectiveEarned() {
  // Compute once, return object
  return { credits: earnedCredits, points: earnedPoints, gpa: effectiveGpa };
}
function calcTarget() { var eff = getEffectiveEarned(); /* use eff */ }
function calcMaxGpa() { var eff = getEffectiveEarned(); /* use eff */ }

// BAD: Each section reads inputs and computes independently
function calcTarget() { var credits = parseFloat($('#credits').value); /* ... */ }
function calcMaxGpa() { var credits = parseFloat($('#credits').value); /* different logic */ }
```

### Input → recalc wiring

When an input affects multiple sections, its `oninput` must trigger ALL dependent calculations, not just the nearest one. Use a combined handler:

```js
// Shared inputs trigger everything they affect
window.gpaCalcCumBoth = function() { calcCumulative(); calcTarget(); calcMaxGpa(); };
// In HTML: oninput="gpaCalcCumBoth()"
```

### Converter dropdowns — show all options

Never hide options from `<select>` dropdowns to prevent selecting the same value in both. Instead, show all options in both dropdowns. If the user selects the same value in "from" and "to", return the input as-is without error messages:

```js
var converted = (fromSys === toSys) ? inputVal : convertGpa(inputVal, fromSys, toSys);
```

### Clipboard

```js
navigator.clipboard.writeText(text).then(() => {
  App.showToast(App.state.lang === 'ar' ? 'تم النسخ!' : 'Copied!');
});
```

### CSV export (no CDN dependencies)

Never add CDN dependencies (like ExcelJS, SheetJS, etc.). Use native CSV generation with BOM for Arabic Excel compatibility:

```js
function exportCsv(rows, filename) {
  var bom = '\uFEFF';
  var csv = rows.map(function(r) {
    return r.map(function(c) { return '"' + String(c).replace(/"/g, '""') + '"'; }).join(',');
  }).join('\n');
  var blob = new Blob([bom + csv], { type: 'text/csv;charset=utf-8' });
  var a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
}
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
- `ar/blog/` and `en/blog/` — blog index and article pages
- `sitemap.xml` and `robots.txt` — SEO files
- `index.html` — language-detection redirect

## Deployment

GitHub Actions (`.github/workflows/deploy.yml`) auto-deploys `dist/` to GitHub Pages on push to `main`.

## Reusable UI Patterns

These patterns are already used in zakat-calculator and kaffara-calculator. Reuse them instead of inventing new ones:

### Tab-based tools

```html
<div class="calc-tabs">  <!-- or .kf-tabs for scrollable -->
  <button class="calc-tab active" onclick="switchTab('tab1')">Tab 1</button>
  <button class="calc-tab" onclick="switchTab('tab2')">Tab 2</button>
</div>
<div class="calc-section active" id="tab1-section">...</div>
<div class="calc-section" id="tab2-section">...</div>
```

- التبويبات دائماً تلتف (flex-wrap: wrap) ولا تستخدم scroll أبداً
- على الموبايل التبويبات تنضغط وتصغر وتنتقل لأسطر متعددة
- انظر أزرار المذاهب في حاسبة المواريث كمرجع

### Shared price/input bar

```html
<div class="price-bar my-color">
  <span class="bar-icon">🍽️</span>
  <div class="bar-input-wrap">
    <label>Label</label>
    <input type="number" oninput="recalc()">
  </div>
  <span class="bar-hint">Hint text</span>
</div>
```

### Disclaimer section

Use the shared `.tool-disclaimer` class from `main.css` (styled like `.how-to-use` with consistent background and border). Place the disclaimer as the **last section** in the tool template, after how-to-use — it will appear right before "Related Tools" which is appended by `build.js`.

Add `disclaimerTitle`, `disclaimer1`–`disclaimerN` keys to the tool's i18n translations (both `ar` and `en`).

```html
<div class="tool-disclaimer">
  <h4>⚠️ {{tool.disclaimerTitle}}</h4>
  <div class="tool-disclaimer-item"><span>📌</span> {{tool.disclaimer1}}</div>
  <div class="tool-disclaimer-item"><span>📋</span> {{tool.disclaimer2}}</div>
</div>
```

**Note:** The older `.zakat-disclaimer` class (amber-tinted, defined inside `zakat-calculator.html`) is used by zakat, inheritance, and kaffara calculators. For new tools, use `.tool-disclaimer` instead for consistent styling.

### Result display patterns

- **Stat cards**: `.stats-grid` > `.stat-card` (used in zakat for summary numbers)
- **Result box**: `.result-box` with gradient background (used for main results)
- **Total cost banner**: `.kf-total` with accent gradient (used in kaffara for totals)

## Inheritance Calculator Architecture

The inheritance calculator (`src/tools/inheritance-calculator.html`) is the most complex tool (~2800+ lines). Key architectural notes:

### Dynamic heir layers
- Users can add deeper descendant layers (sons of sons of sons...), higher grandfathers, higher grandmothers, and extended agnates
- Max 7 layers per category, tracked in `dynState` object
- Dynamic IDs: `dynDescM{N}`, `dynDescF{N}`, `dynGf{N}`, `dynGmP{N}`, `dynGmM{N}`, `dynExtFull{N}`, `dynExtPat{N}`
- `createHeirRow(heirId, name, maxCount)` — creates DOM elements for dynamic heirs
- `inhAddLayer(category)` — handles 'descendants', 'ascendants', 'extended'

### Blocking (hajb) system
- `getBlockReason(heirId)` — returns blocking reason or null
- `updateHeirStates()` — auto-unchecks blocked heirs and shows blocking reasons
- Blocking rules depend on madhab (Hanafi, Maliki, Shafi'i, Hanbali)

### Share assignment
- `assignShares()` — the core calculation engine
- Handles: fard (fixed shares), asaba (residuary), awl (proportional reduction), radd (redistribution of remainder)
- Special cases: mushtaraka (shared case), akdariyyah, umariyyatan, grandfather with siblings (muqasama)
- Radd varies by madhab: Shafi'i = no radd, Hanbali = radd to spouses when no other fard heirs

### Shared pool pattern
When multiple entries share a single fard fraction (e.g., maternal siblings sharing 1/3), use proportional distribution:
```js
entry.parts = sharedPoolParts * entry.count / entry.shared;
```

## GPA Calculator Architecture

The GPA calculator (`src/tools/gpa-calculator.html`) has 5 tabs and a shared grading system selector. Key architectural notes:

### Tabs
1. **Semester GPA** — per-course grade entry with what-if analysis
2. **Cumulative** — combines 3 sub-sections sharing common inputs:
   - Section 1: New cumulative GPA (previous + new semester)
   - Section 2: Target GPA required (needs graduation credits)
   - Section 3: Highest possible GPA (needs graduation credits)
3. **Multi-Semester** — track GPA across multiple semesters with chart
4. **Converter** — convert between 4.0, 5.0, and 100% systems
5. **Reference** — grade tables for each system

### Shared inputs in Cumulative tab
- "Current GPA" and "Earned credits" are shared across all 3 sections
- "Total graduation credits" is shared between sections 2 and 3
- `getEffectiveEarned()` computes effective earned credits/points once, accounting for new semester data from section 1 if entered
- Both `calcTarget()` and `calcMaxGpa()` call `getEffectiveEarned()` — this prevents contradictions

### Grading system switching
- `currentSystem` tracks active system ('4', '5', '100')
- `gradeSystems` object defines max value and classification brackets per system
- Switching system updates input max attributes and recalculates all sections

### Converter
- Uses piecewise linear interpolation via `conversionTable` (grade-bracket boundaries across systems)
- All 3 systems visible in both "from" and "to" dropdowns (no hiding)
- Same-system selection returns input value as-is
- Separate short i18n keys (`convSystem40`, `convSystem50`, `convSystem100`) for dropdown labels without "نظام"/"Scale"

## General Preferences

These reflect the current style of the project. They're guidelines, not hard rules — use your judgment and adapt as the project grows:

- Prefer instant results (`oninput`) over submit buttons where it makes sense
- Prefer vanilla JS; use external libraries only when genuinely needed — never add CDN dependencies
- Keep calculators in a math-sentence style when they fit that pattern
- Use `{{tool.xxx}}` placeholders instead of hardcoding text — never hardcode Arabic or English strings in HTML
- Ads are handled by the layout in `build.js`, not inside tool templates
- Islamic tools must include a "this is not a fatwa" disclaimer
- Financial tools involving interest/riba must include a disclaimer noting the Islamic prohibition
- Medical/health tools must include a "consult a professional" disclaimer
- Disclaimers use `.tool-disclaimer` class and are placed as the last section in the template (after how-to-use, before related tools)
- Tool page section order: tool content → how-to-use → disclaimer → related tools (auto-appended by build.js)
- Islamic terminology must be accurate — use proper fiqh terms with transliteration in English (e.g., "Kaffarat al-Yamin" not just "oath penalty")
- Place related fields on the same row (`.gpa-form-row` with 2 columns) to reduce vertical space — e.g., "graduation credits" and "target GPA" side by side
- Use short labels in dropdowns (e.g., "4.0" not "نظام 4.0") — add separate i18n keys if the full label is needed elsewhere
- When a tool has multiple sections that share inputs, place shared inputs above the sections, not duplicated inside each one
