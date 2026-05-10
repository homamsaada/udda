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
├── assets/vendor/            Local copies of external JS libraries (chart.js, exceljs)
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
| 🤖 **AEM (autonomous loop)** | **Modifier on playbooks 1-6** — investigate prepared spec → synthesize plan → user approves → execute autonomously | [playbook §9](docs/standards/playbooks.md#9-autonomous-execution-mode-aem-) |
| 🤔 Ambiguous request | Ask before acting | [playbook fallback](docs/standards/playbooks.md#fallback--طلب-غامض-) |

The playbooks file orchestrates the existing standards (`tool-template.md`, `testing-checklist.md`, etc.) — it doesn't duplicate them.

**Important about AEM:** When the user provides a prepared spec/plan and asks for autonomous execution, **do not just implement it**. AEM Phase 0 requires you to: (a) investigate the codebase for integration concerns, (b) ask 3-7 strategic questions to enrich/decide/integrate (not to verify), (c) synthesize your own plan that combines the user's input + your findings, and (d) get explicit approval before entering the execution loop. The investigation phase is what differentiates AEM from passive execution.

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
- ❌ Don't load JS/CSS libraries from CDN — download them to `src/assets/vendor/` instead (see [`docs/05-MEMORY.md`](docs/05-MEMORY.md) "Vendor محلي"). Live services (APIs, OAuth, payment, embeds) are decided case-by-case, not by default.
- ✅ For new calculator-style tools, consume the **Standard Calc Kit** from `main.css` instead of redefining. Tool-specific styles use a wrapper + prefix (`.tool-name` + `.tn-*`). See the kit reference below.
- ❌ Don't commit `dist/` (gitignored)
- ❌ Don't hardcode hex colors — use CSS variables
- ❌ Don't break the build

## سياسة session-todos.md

ملف `session-todos.md` (على جذر المشروع، **مُتَتبَّع في git كـ template أوّلي، لكن لا تُعمل commit لتغييراته**) هو **مرآة حيّة (live mirror)** لقائمة TodoWrite الخاصة بك، يراها المستخدم كلوحة تقدّم بصرية أثناء عملك.

### آلية وجود الملف

الملف يصل إلى كل worktree جديد بطريقتين متكاملتين:

1. **مُتَتبَّع في git** (المضمون) — محتوى template أوّلي مُلتقَط، فأي `git checkout` أو `git worktree add` يُحضره معه. لا اعتماد على timing الـ auto-merge.
2. **SessionStart hook في `.claude/settings.json`** (التحديث التجميلي) — عند بداية كل جلسة، يكتب timestamp جديد في الملف ليصبح "جلسة جديدة بدأت: <date>".

### ⚠️ قاعدة حاسمة: لا تُضِف session-todos.md في أي commit

الملف يتغيّر باستمرار خلال الجلسة (مرآة حيّة). تغييراته **محلّية per-worktree per-session**، لا تنتمي إلى تاريخ المشروع.

- ✅ `git add <specific-files>` (الـ pattern المُتّبع أصلاً في المشروع)
- ❌ `git add .` أو `git add -A` (يلتقط `session-todos.md` بطريق الخطأ)
- ❌ `git add session-todos.md` يدوياً (لا يوجد سيناريو شرعي لذلك)

عند الـ commit، تأكّد دائماً أن `git status` لا يعرض `session-todos.md` في "Changes to be committed". لو ظهر، أزله بـ `git restore --staged session-todos.md`.

### القاعدة الحاسمة (ميكانيكية، لا اجتهادية)

**عند كل استدعاء لـ `TodoWrite`، يتبعه فوراً `Edit` على `session-todos.md`.**

لا استثناءات. لا تجميع لعدة تغييرات. لا تأجيل. الربط آلي: TodoWrite ← Edit مباشرةً.

### بداية كل جلسة

قبل تنفيذ أي خطوة، أنشئ TodoWrite بكامل خطة الجلسة المتوقّعة (5–10 مهام)، حتى لو كان بعضها مبدئياً. هذا يضمن أن "قيد الانتظار" تكون مأهولة من البداية، فيكون للوحة معنى بصري للمستخدم منذ اللحظة الأولى.

### إعادة الضبط عند بداية الجلسة

الملف يصل إلى كل worktree موجوداً بالفعل (مُتَتبَّع في git). دورك: **إعادة ضبطه إلى حالة الجلسة الحالية** عند أوّل TodoWrite متعدد الخطوات. استخدم **`Write`** للاستبدال الكامل (محتواه قد يكون template أوّلياً، أو متبقّياً من جلسة سابقة على نفس الـ worktree، أو timestamp من SessionStart hook — لا يهم، تستبدله كاملاً). كل التحديثات بعد ذلك بالـ `Edit` كالمعتاد.

**استثناء وحيد لقاعدة "لا تُعد كتابة الملف من الصفر".** `session-todos.md` عابر per-session؛ محتواه السابق لا علاقة له بالحالية. كل جلسة تبدأ بلوحة نظيفة.

### متى تُحدَّث (بشكل مفصّل)

تحدّث الملف عند:

1. **تغيّر حالة مهمة** — pending ← in_progress، أو in_progress ← completed، أو in_progress ← paused
2. **تعديل الخطة** — إضافة، حذف، أو إعادة ترتيب
3. **إنجاز مهمة فرعية** — إن كانت المهمة مقسّمة، حدّث عند إنجاز كل فرعية (لا عند كل خطوة صغيرة داخلها)

لا تُحدّث الملف عند:

- قراءة ملفات، grep، أو أوامر استكشاف
- تعديلات وسيطة داخل نفس المهمة الجارية
- محاولات فاشلة أو إعادة محاولة داخل مهمة نشطة

### الصيغة المعتمدة

```markdown
# مهام الجلسة • Live
**التقدّم:** ▰▰▰▰▱▱▱▱▱▱ <عدد المنجز>/<الإجمالي> (<النسبة>%)
_آخر تحديث: YYYY-MM-DD HH:MM_

| # | المهمة | الحالة |
|---|--------|--------|
| 1 | <اسم المهمة> | ✅ |
| 2 | <اسم المهمة> | 🔧 جارٍ... |
| 3 | <اسم المهمة> | ⏸ <سبب التعليق> |
| 4 | <اسم المهمة> | ☐ |
```

الجدول هو **المصدر الوحيد للحقيقة**. لا تُكرّر المعلومات في قوائم سفلية.

### حساب شريط التقدّم

كل `▰` يمثّل 10%. الشريط دائماً 10 خانات.

أمثلة:

- 0/10 = `▱▱▱▱▱▱▱▱▱▱` (0%)
- 3/10 = `▰▰▰▱▱▱▱▱▱▱` (30%)
- 6/10 = `▰▰▰▰▰▰▱▱▱▱` (60%)
- 10/10 = `▰▰▰▰▰▰▰▰▰▰` (100%)

للأعداد غير العشرية: قرّب لأقرب 10%. مثال: 4/7 ≈ 57% ≈ `▰▰▰▰▰▰▱▱▱▱`.

### الرموز المعتمدة

- ✅ **منجز** — اكتملت المهمة
- 🔧 **جارٍ** — قيد التنفيذ الآن
- ⏸ **معلّق** — بدأت ثم أُوقفت بانتظار قرار، اعتماد خارجي، أو عائق (يُذكر السبب باختصار)
- ☐ **قيد الانتظار** — لم تبدأ بعد، في الطابور
- ❌ **فشل** — حاولت ولم تنجح
- ⏭ **متخطّى** — قُرّر تجاوزها

> **تمييز مهم:** `☐` للمهام التي لم تُلمس أصلاً. `⏸` للمهام التي بدأت ثم تعطّلت لسبب خارجي. لا تخلط بينهما.

### قاعدة نظافة خانة الحالة

خانة "الحالة" في الجدول تحوي **الرمز فقط**، باستثناء واحد:

- ✅ → الرمز فقط (لا commit hashes، لا أسماء ملفات، لا مدد زمنية، لا أي إضافات)
- 🔧 → `🔧 جارٍ...` فقط (لا تفاصيل عمّا يحدث الآن)
- ⏸ → `⏸ <سبب التعليق المختصر>` (هذا الاستثناء الوحيد الذي يحتاج نصاً)
- ☐ → الرمز فقط
- ❌ → الرمز فقط
- ⏭ → الرمز فقط

**ممنوع في خانة الحالة:** commit hashes، روابط، أسماء branches، أرقام أسطر، مدد زمنية، أو أي ميتاداتا. هذه المعلومات إن لزمت، تُذكر في رسالة المحادثة لا في اللوحة.

### ترتيب الصفوف داخل الجدول

حافظ على الترتيب الزمني لتنفيذ المهام (الترتيب الذي اقترحته الخطة). لا تُعد ترتيب الجدول حسب الحالة — هذا يربك القراءة. المهمة المنجزة تبقى في موقعها الأصلي مع تغيير رمزها فقط.

### قواعد الأداء والنظافة

- **Edit واحد فقط** لكل تحديث، لا عدة استدعاءات متتالية
- **لا تُعد كتابة الملف من الصفر** — استخدم Edit موضعي على الأسطر المتغيّرة فقط
- **سطر واحد للحالة** — بلا لوغات، بلا مخرجات أوامر، بلا مسارات ملفات إلا للضرورة
- **التوقيت بصيغة 24 ساعة** بتوقيت المستخدم المحلي

### ملاحظة على النطاق

`session-todos.md` يعكس **مهام الجلسة الحالية فقط** (نطاق TodoWrite). ليس roadmap للمشروع كله. إن طلب المستخدم تتبّع مهام طويلة الأمد عبر جلسات متعددة، استخدم ملفاً منفصلاً (مثل `roadmap.md` أو `backlog.md`)، ولا تخلطها داخل `session-todos.md`.

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

## Standard Calc Kit (in main.css)

Calculator-style tools share a unified set of classes — single source of truth, theme-aware, mobile-friendly out of the box:

- `.calc-tabs` + `.calc-tab` + `.calc-pane` — tabs container/buttons + content panel (display none/block with `.active`)
- `.calc-form` + `.calc-form-row` + `.calc-form-group` — form container, 2-col grid (1-col on mobile), label-above-input
- `.calc-stats-grid` + `.calc-stat-card` (+ `.highlight`) — auto-fit result stats (`.value` + `.label`)
- `.calc-result.show` — collapsible result wrapper with fade-in
- `.calc-disclaimer` + `.calc-disclaimer-item` — amber-warning style for fiqh/financial/medical tools (use `.tool-disclaimer` from main.css for neutral disclaimers)
- Mobile breakpoint at 768px is built-in (button shrink, form 1-col, stats 2-col)

**Currently consumed by 7 of 11 tools:** zakat, kaffara, body, age, percentage, loan, interest. `inheritance`, `gpa`, `ai-readiness` use prefix-only scoping (clean already, no migration needed). `family-tree` is pending a broader rework.

⚠️ **Disambiguation:** the kit deliberately uses `.calc-pane` (not `.calc-section`, which is a section-card pattern in main.css) and `.calc-result` (not `.result-box`, which is a styled result panel in main.css). Other names use the `.calc-*` prefix to avoid colliding with `.form-group`/`.form-row` from the contact form.

## Mobile Design (critical)

Reference: `inheritance-calculator`. Key rules ([full list](docs/standards/mobile-design.md)):
1. Every field has a label above it (form-group)
2. Max 2 fields per row on mobile
3. Tabs use `flex-wrap: wrap`, never `overflow-x: auto`
4. No element exceeds screen width (`box-sizing: border-box`)
5. Buttons shrink to 0.75rem font + 8px padding on mobile
