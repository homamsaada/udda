# Udda | عُدّة

> Free, multilingual (Arabic/English) online tools website. Static site, vanilla JS, no frameworks. Lives at [https://udda.tools](https://udda.tools).

📚 **Full documentation:** [`docs/`](docs/) — start with [`docs/README.md`](docs/README.md).

The docs follow a **fractal pattern**: site and tool levels mirror each other.
- Site identity → `docs/00-VISION.md`, `01-ARCHITECTURE.md`, `02-PRINCIPLES.md`
- Site workspace → `docs/03-ROADMAP.md`, `04-PROGRESS.md`, `05-MEMORY.md`, `06-TODO.md`
- Tool identity → `docs/tools/{tool}.spec.md`
- Tool workspace → `docs/development/{tool}/{progress,memory,instructions,todo}.md`

---

## Commands

```bash
npm run build      # → dist/
npm run serve      # → port 3000
npm run dev        # build + serve
```

No tests or lint configured.

## Project Structure

```
src/
├── assets/css/main.css       Stylesheet (CSS vars, themes, RTL/LTR)
├── assets/js/app.js          App object (theme, search, settings, favorites)
├── assets/data/ai-readiness/ AI readiness question bank (44 JSON files)
├── data/i18n.json            All translations (single source of truth)
├── data/tools.json           Tool registry + categoryOrder
├── tools/                    11 tool HTML templates
├── blog/{ar,en}/             Markdown blog posts
└── pages/{ar,en}/            Static pages (about, contact, privacy, terms, disclaimer)

build.js                      Build script (~1,400 lines) — contains the actual HTML
                              template inline in buildPageHTML(), NOT in src/layouts/
docs/                         Full project documentation (markdown)
dist/                         Build output (gitignored, regenerated each deploy)
```

## Current Rules (full list + categories in [`docs/02-PRINCIPLES.md`](docs/02-PRINCIPLES.md))

🔒 = philosophical (won't change) · ⚙️ = current implementation choice (may evolve under specific conditions — see [`docs/05-MEMORY.md`](docs/05-MEMORY.md))

1. ⚙️ **Vanilla JS** by default — no React/Vue/Svelte, no CDN scripts in production
2. 🔒 **Bilingual by default** — every user-facing string in `i18n.json` with both `ar` and `en`
3. ⚙️ **Static-first** — no backend or DB by default (a specific tool may add backend if it genuinely needs it)
4. 🔒 **Privacy-first** — no tracking, no cookies beyond essentials, no data sale
5. 🔒 **Disclaimers required** for Islamic / financial-with-interest / medical tools
6. **CSS variables, not hex hardcoded** — `var(--success)` not `#22c55e`
7. **Logical properties** — `margin-inline-start` not `margin-left`
8. **IIFE wrapping** for all tool JS (only `window.x` for HTML-referenced functions)
9. **Scoped CSS** via wrapper class — `.zakat-calculator .calc-tab { ... }`
10. 🔒 **Mobile-first** — reference: `inheritance-calculator` (see [`docs/standards/mobile-design.md`](docs/standards/mobile-design.md))

## Reserved i18n Keys

These keys are processed specially by `build.js` and **must not be used as `{{tool.xxx}}` placeholders**:
`title`, `metaDescription`, `keywords`, `searchTerms`

These ARE valid as placeholders (build.js provides them explicitly): `name`, `description`, `howToUseText`.

Any other key in `tools.{id}.{lang}` becomes available as `{{tool.{customKey}}}`.

## Adding Things

| Task | Step-by-step guide |
|---|---|
| New tool | [`docs/standards/tool-template.md`](docs/standards/tool-template.md) |
| New blog post | [`docs/standards/blog-template.md`](docs/standards/blog-template.md) |
| Sub-calculator (percentage) | [`docs/tools/percentage.spec.md`](docs/tools/percentage.spec.md) §4 |
| Edit tool spec | [`docs/tools/{tool-id}.spec.md`](docs/tools/) |

## Tools (11)

| Tool | Category | Spec |
|---|---|---|
| zakat-calculator | calculators | [spec](docs/tools/zakat-calculator.spec.md) — 7 wealth types + Zakat al-Fitr |
| inheritance-calculator | calculators | [spec](docs/tools/inheritance-calculator.spec.md) — 4 madhabs, hajb, awl, radd |
| kaffara-calculator | calculators | [spec](docs/tools/kaffara-calculator.spec.md) — 8 expiation types |
| percentage | calculators | [spec](docs/tools/percentage.spec.md) — 13 sub-calculators |
| interest-calculator | calculators | [spec](docs/tools/interest-calculator.spec.md) — simple + compound + riba warning |
| loan-calculator | calculators | [spec](docs/tools/loan-calculator.spec.md) — 3 amortization methods |
| gpa-calculator | calculators (other) | [spec](docs/tools/gpa-calculator.spec.md) — 20 grading systems |
| body-calculator | calculators (other) | [spec](docs/tools/body-calculator.spec.md) — BMI, BMR, IBW, BF, WHR |
| age-calculator | calculators (other) | [spec](docs/tools/age-calculator.spec.md) — date math |
| ai-readiness | generators | [spec](docs/tools/ai-readiness.spec.md) — 41 specialties × ~100 questions |
| family-tree | everyday | [spec](docs/tools/family-tree.spec.md) — SVG tree builder |

## Build & Deploy

- `npm run build` → `dist/` (gitignored, regenerated each deploy)
- Push to `claude/**` branch → auto-merge to `main` (via `.github/workflows/auto-pr.yml`)
- Push to `main` → deploy via `.github/workflows/deploy.yml`
- Base URL: `https://udda.tools`

## 📅 Session Resume Protocol

When starting work on this project, **always begin with this temporal check** (multi-level, fractal — mirrors the docs structure).

### 1. Site-level check (always)
```bash
git log -1 --format='%ai' main           # last commit on main
```
Compare with today's date. **If gap > 30 days:**
- [ ] `npm outdated` — stale or insecure dependencies?
- [ ] Review `.github/workflows/*.yml` — actions versions still current?
- [ ] Skim recent commits: `git log --oneline -10`
- [ ] **Compare today's date with your own training cutoff.** If you might be working on a topic that evolved since your cutoff, use WebFetch or ask the user before asserting facts.

### 2. Tool-level check (when working on a specific tool)
```bash
git log -1 --format='%ai' -- src/tools/{tool-id}.html
```
Compare with today's date. **If gap > 90 days:**
- [ ] Open `docs/development/{tool}/progress.md` — review the temporal markers and tool-specific compatibility checklist
- [ ] Open `docs/development/{tool}/memory.md` — are decisions still valid?
- [ ] Tool-specific external concerns (examples — see each tool's `progress.md` for the canonical list):
  - **ai-readiness:** AI tools mentioned in `src/assets/data/ai-readiness/*.json` (ChatGPT, Sora, Midjourney, Copilot, Stitch, etc.) — still real and named correctly?
  - **zakat / inheritance / kaffara:** new contemporary fiqh rulings (AAOIFI, مجمع الفقه الإسلامي الدولي)?
  - **gpa-calculator:** grading systems in covered countries — any changes?
  - **body-calculator:** WHO update to BMI standards or WHR criteria?
- [ ] Review `git log -- src/tools/{tool-id}.html` for recent code changes

### 3. Update temporal markers after work
- Update `docs/04-PROGRESS.md` header date
- Update `docs/development/{tool}/progress.md` header date (if you worked on a tool)
- For major sessions, add an entry to `docs/_sessions.md`

### Why this matters
Each session may have a different agent with a different training cutoff. External dependencies and standards drift. AI tool names change monthly. Fiqh references evolve with new resolutions. The protocol prevents acting on stale assumptions. **The detailed file history is `git log` — don't maintain manual per-tool changelogs.**

## 🎯 Standard Workflow (Playbooks)

For **any user request**, the agent follows a recognized playbook from [`docs/standards/playbooks.md`](docs/standards/playbooks.md). Each request type has its own light workflow:

| Request type | Playbook | Reference |
|---|---|---|
| 🆕 New tool ("أنشئ", "بدّي") | Full development cycle | [playbook §1](docs/standards/playbooks.md#1-أداة-جديدة-) |
| ✏️ Tool extension ("حدّث", "طوّر") | Partial update | [playbook §2](docs/standards/playbooks.md#2-توسيع-أداة-موجودة-) |
| 🐛 Bug fix ("أصلح", "fix") | Reproduce → root cause → fix → document | [playbook §3](docs/standards/playbooks.md#3-إصلاح-bug-) |
| 📝 Blog post ("اكتب مقالاً") | Content workflow | [playbook §4](docs/standards/playbooks.md#4-مقال-مدونة-) |
| 🔧 Cross-tool refactor | Sample → approve → propagate | [playbook §5](docs/standards/playbooks.md#5-refactoring-عابر-للأدوات-) |
| 📚 Docs update | No build needed | [playbook §6](docs/standards/playbooks.md#6-تحديث-توثيق-) |
| 🔍 Compatibility check | Read-only report | [playbook §7](docs/standards/playbooks.md#7-فحص-توافق-) |
| 🤔 Ambiguous request | Ask before acting | [playbook fallback](docs/standards/playbooks.md#fallback--طلب-غامض-) |

The playbooks file orchestrates the existing standards (`tool-template.md`, `testing-checklist.md`, etc.) — it doesn't duplicate them.

## For Agents

### When working on a specific tool:
1. Read `docs/tools/{tool}.spec.md` (the canonical "what is")
2. Read `docs/development/{tool}/memory.md` (decisions, references, lessons)
3. Read `docs/development/{tool}/instructions.md` (tool-specific how-tos)
4. Check `docs/development/{tool}/todo.md` for current tasks
5. Update `docs/development/{tool}/progress.md` and `todo.md` as you work

### General rules:
- ✅ Use `{{tool.xxx}}` placeholders, never hardcode strings
- ✅ Read [`docs/standards/`](docs/standards/) before adding tools/posts
- ✅ Run `npm run build` before claiming completion
- ✅ Update [`docs/04-PROGRESS.md`](docs/04-PROGRESS.md) for major project-level work
- ✅ Update `docs/development/{tool}/` for tool-level work
- ❌ Don't add CDN dependencies
- ❌ Don't commit `dist/` (gitignored)
- ❌ Don't hardcode hex colors — use CSS variables
- ❌ Don't break the build

## CSS Quick Reference

Most-used variables (full list in [`docs/standards/design-system.md`](docs/standards/design-system.md)):

```css
var(--bg-primary)         /* page background */
var(--bg-secondary)       /* cards, inputs */
var(--text-primary)       /* main text */
var(--accent-primary)     /* indigo brand color */
var(--accent-gradient)    /* indigo → violet gradient */
var(--success/warning/error/info)
var(--card-border)        /* card border style */
var(--card-shadow)        /* card shadow */
var(--border-radius)      /* 12px default */
```

Card pattern: `.tool-grid-card`, `.category-card`, `.similar-tool-card`, `.blog-post-card`, `.blog-related-tool-card`, `.blog-subcat-card` use `border + card-shadow + ::before stripe`. `.calc-section` uses border + shadow without stripe.

## Mobile Design (critical)

Reference: `inheritance-calculator`. Key rules ([full list](docs/standards/mobile-design.md)):
1. Every field has a label above it (form-group)
2. Max 2 fields per row on mobile
3. Tabs use `flex-wrap: wrap`, never `overflow-x: auto`
4. No element exceeds screen width (`box-sizing: border-box`)
5. Buttons shrink to 0.75rem font + 8px padding on mobile
