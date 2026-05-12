# ✅ التقدم الحالي | Progress

> 📅 **آخر نشاط على المشروع:** 2026-05-12 — المرحلة 5.3 (refactor v2 لأبو نجيب → Bulk + Buyers، حذف المرافقين والـ Greedy، عرض ذو وجهَين)
> 🔍 **آخر فحص توافق شامل:** 2026-05-12
> ⏰ **ملاحظة للوكيل:** قبل أي تطوير، اقرأ [Session Resume Protocol في CLAUDE.md](../CLAUDE.md). يجب التحقق من training cutoff الخاص بك مقابل تاريخ اليوم عند الفجوات > 30 يوماً.
>
> هذا الملف **سجل حي** يُحدَّث باستمرار. يعكس الحالة الفعلية، ليس الخطة. للخطة المستقبلية انظر [`03-ROADMAP.md`](03-ROADMAP.md).

---

## ✅ مكتمل

### الأدوات (12)

| # | الأداة | التصنيف | الحالة | ملاحظات |
|---|---|---|---|---|
| 1 | percentage | calculators | ✅ مستقر | 13 حاسبة فرعية — **Standard Kit (2026-05-10)** |
| 2 | interest-calculator | calculators | ✅ مستقر | يحتوي تحذير الربا — **Standard Kit + vendor محلي (2026-05-10)** |
| 3 | loan-calculator | calculators | ✅ مستقر | جدول أقساط — **Standard Kit + vendor محلي (2026-05-10)** |
| 4 | zakat-calculator | calculators | ✅ مستقر | إسلامي + إخلاء مسؤولية — **النموذج الأول لـ Standard Calc Kit (2026-05-10)** |
| 5 | inheritance-calculator | calculators | ✅ مستقر | الأعقد فقهياً، 4 مذاهب — **مرجع تصميم الموبايل** |
| 6 | kaffara-calculator | calculators | ✅ مستقر | 8 أنواع كفارات — **Standard Kit (2026-05-10)** |
| 7 | gpa-calculator | calculators (other) | ✅ مستقر | 20 نظام تقدير، 5 تبويبات |
| 8 | body-calculator | calculators (other) | ✅ مستقر | BMI/BMR/BF/IBW — **Standard Kit (2026-05-10)** |
| 9 | age-calculator | calculators (other) | ✅ مستقر | حسابات تواريخ — **Standard Kit + bug fixes (2026-05-10)** |
| 10 | family-tree | everyday | ✅ مستقر | شجرة عائلة SVG |
| 11 | ai-readiness | generators | ✅ مستقر | 41 تخصص، ~200K سطر JSON |
| 12 | abu-najeeb | everyday | ✅ مستقر | 🆕 حاسبة تسوية رحلات v2: **Bulk + Buyers** (4 buckets: full/half/quarter anonymous + named buyers)، نموذج أمين الصندوق فقط، عرض ذو وجهَين (inbound/outbound) — refactor v2 (2026-05-12) |

### المحتوى

| النوع | العدد | اللغات | ملاحظات |
|---|---|---|---|
| مقالات مدونة | 40 (20 + 20) | ar + en | 11 زكاة، 9 ميراث |
| صفحات ثابتة | 10 (5 + 5) | ar + en | about, contact, privacy, terms, disclaimer |
| تخصصات AI | 41 | ar + en | كل تخصص ~100 سؤال |

### البنية التحتية

- [x] نظام البناء (`build.js`)
- [x] دعم ثنائي اللغة كامل (RTL/LTR، hreflang، canonical)
- [x] ثيمات Dark/Light/Auto
- [x] نظام البحث الشامل في كل صفحة
- [x] Settings panel (لغة، ثيم، مفضلة، حذف بيانات)
- [x] GitHub Actions auto-deploy (auto-pr.yml + deploy.yml)
- [x] sitemap.xml + robots.txt
- [x] Schema.org structured data (WebApplication, Article, FAQPage, Quiz)
- [x] إعلانات placeholder جاهزة لـ AdSense

## 🚧 قيد العمل

### المرحلة 1: التوثيق التأسيسي ✅ (مايو 2026)

- [x] قراءة وفهم المشروع كاملاً
- [x] حذف الملفات الميتة (`src/layouts/base.html` + `docs/` القديم)
- [x] بناء `docs/README.md` (فهرس)
- [x] بناء `docs/00-VISION.md`
- [x] بناء `docs/01-ARCHITECTURE.md`
- [x] بناء `docs/02-PRINCIPLES.md`
- [x] بناء `docs/03-ROADMAP.md`
- [x] بناء `docs/04-PROGRESS.md` (هذا الملف)
- [x] إصلاح `dist/` — إضافة لـ `.gitignore` وإلغاء التتبع

### المرحلة 2: ملفات المعايير ✅ (مايو 2026)

9 ملفات في `docs/standards/`: design-system, mobile-design, i18n-conventions, seo-strategy, content-strategy, tool-template, blog-template, testing-checklist, README.

### المرحلة 3: مواصفات الأدوات ✅ (مايو 2026)

12 ملف في `docs/tools/`:
- 🟢 عميقة (3): zakat, inheritance, ai-readiness
- 🟡 متوسطة (3): kaffara, body, gpa
- ⚪ موجزة (5): interest, loan, percentage, age, family-tree
- README.md (فهرس)

**ملاحظة:** الملفات القديمة في الجذر (`udda-ai-readiness-spec.md` و `specialties-comprehensive-list.md`) **لم تُحذف بعد** — ستُحذف في المرحلة 4 لأن محتواها متضمَّن في `docs/tools/ai-readiness.spec.md`.

## 📋 لاحق (priority queue للنقاش)

### المرحلة 2: ملفات المعايير (`docs/standards/*`) — 9 ملفات ✅

- [x] `standards/README.md` — فهرس
- [x] `standards/design-system.md` — متغيرات CSS، البطاقات، التوهج، الثيمات
- [x] `standards/mobile-design.md` — قواعد الموبايل الموسّعة
- [x] `standards/i18n-conventions.md` — قواعد الترجمة، شروط `searchTerms`، البنية ثنائية اللغة
- [x] `standards/seo-strategy.md` — استراتيجية SEO، structured data، hreflang، تخطيط الكلمات المفتاحية
- [x] `standards/content-strategy.md` — خطة المدونة، pillars/subs، CTAs، topics map
- [x] `standards/tool-template.md` — قالب لإنشاء أداة جديدة بالخطوات
- [x] `standards/blog-template.md` — قالب لمقال مدونة جديد
- [x] `standards/testing-checklist.md` — معايير الجودة قبل دمج أداة

### المرحلة 3: مواصفات الأدوات ✅ (12 ملف)

- [x] `tools/README.md` — فهرس الأدوات
- [x] `tools/zakat-calculator.spec.md` 🟢 (عميق)
- [x] `tools/inheritance-calculator.spec.md` 🟢 (عميق)
- [x] `tools/ai-readiness.spec.md` 🟢 (دمج الموجود)
- [x] `tools/kaffara-calculator.spec.md` 🟡 (متوسط)
- [x] `tools/body-calculator.spec.md` 🟡 (متوسط، طبي)
- [x] `tools/gpa-calculator.spec.md` 🟡 (متوسط)
- [x] `tools/interest-calculator.spec.md` ⚪ (موجز)
- [x] `tools/loan-calculator.spec.md` ⚪ (موجز)
- [x] `tools/percentage.spec.md` ⚪ (موجز)
- [x] `tools/age-calculator.spec.md` ⚪ (موجز)
- [x] `tools/family-tree.spec.md` ⚪ (موجز)

### المرحلة 4: التنظيف النهائي ✅ (مايو 2026)

- [x] إضافة `.claude/worktrees/` و `.idea/` إلى `.gitignore`
- [x] حذف `udda-ai-readiness-spec.md` (محتواه في [`tools/ai-readiness.spec.md`](tools/ai-readiness.spec.md))
- [x] حذف `specialties-comprehensive-list.md` (محتواه في نفس الملف)
- [x] حذف `.claude/rules/mobile-design.md` (محتواه موسَّع في [`standards/mobile-design.md`](standards/mobile-design.md))
- [x] إعادة كتابة `README.md` ليصبح بوابة دخول حديثة (تشمل كل الأدوات الـ11 + روابط لـ `docs/`)
- [x] تقليص `CLAUDE.md` من 36KB إلى ~140 سطر (فهرس يربط بـ `docs/`)

### المرحلة 4.5: بنية التطوير Fractal ✅ (مايو 2026)

- [x] إنشاء [`05-MEMORY.md`](05-MEMORY.md) (مستوى الموقع — قرارات + دروس + مراجع)
- [x] إنشاء [`06-TODO.md`](06-TODO.md) (مستوى الموقع — مهام عابرة للأدوات)
- [x] إنشاء [`development/`](development/) (مساحات عمل الأدوات)
- [x] لكل من الـ11 أداة: 4 ملفات (progress + memory + instructions + todo) = 44 ملف
- [x] إضافة مؤشّرات في كل spec → development/{tool}/

**المبدأ:** بنية تكرارية (fractal). نفس النمط على مستوى الموقع وعلى مستوى الأداة. تفاصيل في [`README.md`](README.md).

### المرحلة 4.6: تليين القرارات الجامدة ✅ (مايو 2026)

تصحيح صياغة بعض القرارات لتعكس الواقع: بعضها **فلسفي ثابت** (لن يتغيّر)، بعضها **خيارات حالية** قابلة للتطوّر، بعضها **حالة حالية** قد تتغيّر لأدوات محددة.

- [x] إعادة هيكلة [`05-MEMORY.md`](05-MEMORY.md) لـ4 فئات (🌟 فلسفة عامة، 🔒 ثوابت، ⚙️ خيارات حالية، 📅 حالة حالية، 🚫 لن نفعله أبداً)
- [x] تحديث [`02-PRINCIPLES.md`](02-PRINCIPLES.md) §1 و§7 (أعمدة الفئات + تمييز "لن أبداً" عن "ليس الآن")
- [x] تحديث [`00-VISION.md`](00-VISION.md) §5 "ما لسنا" (تمييز ثوابت قِيَمية عن حالة حالية)
- [x] تحديث [`03-ROADMAP.md`](03-ROADMAP.md) §6 "غير مخطط الآن" (نفس التمييز)
- [x] تحديث [`CLAUDE.md`](../CLAUDE.md) — رموز 🔒/⚙️ على القواعد + توضيح "Static-first"

**الفلسفة الجديدة:** عُدّة "static-first" وليست "static-only". أداة محددة قد تكتسب backend جزئية لو احتاجت فعلاً.

### المرحلة 4.7: Temporal Awareness (الوعي الزمني) ✅ (2026-05-09)

نظام fractal لتتبّع الفجوات الزمنية على مستويين، يحفّز فحص التوافق قبل التطوير بعد فجوات كبيرة.

- [x] إضافة temporal markers في header [`04-PROGRESS.md`](04-PROGRESS.md) — مستوى الموقع
- [x] إضافة temporal markers في كل [`development/{tool}/progress.md`](development/) — مستوى الأداة (11 ملف)
- [x] إنشاء [`_sessions.md`](_sessions.md) — سرد موجز للجلسات الكبرى على مستوى الموقع
- [x] إضافة "Session Resume Protocol" في [`CLAUDE.md`](../CLAUDE.md) — إرشاد الوكيل عند بدء أي جلسة
- [x] تسجيل قرار "Temporal awareness fractal" في [`05-MEMORY.md`](05-MEMORY.md)

**الفائدة:** كل جلسة جديدة بعد فجوة، الوكيل يفحص:
- الفجوة العامة على المستوى الموقع → npm، GitHub Actions، Browser APIs
- فجوة الأداة المُستهدفة → مراجع خاصة بها (AI tools، فقهية، طبية، إلخ)
- training cutoff الخاص به مقابل تاريخ اليوم

### المرحلة 4.8: Playbooks (أنماط سير العمل) ✅ (2026-05-09)

نظام لتفسير طلبات المستخدم الطبيعية → playbooks محددة (workflows) — مرن متّسق.

- [x] إنشاء [`standards/playbooks.md`](standards/playbooks.md) — 8 playbooks:
  - 🆕 أداة جديدة (full cycle, 4-6 commits)
  - ✏️ توسيع أداة (partial, 1-2 commits)
  - 🐛 إصلاح bug (1 commit)
  - 📝 مقال مدونة (1 commit)
  - 🔧 refactoring عابر (2-3 commits)
  - 📚 تحديث توثيق (docs only)
  - 🔍 فحص توافق (تقرير بدون تطبيق)
  - 🤔 Fallback للطلبات الغامضة
- [x] ربط الـ playbooks بـ [`CLAUDE.md`](../CLAUDE.md) — جدول سريع للمطابقة
- [x] تحديث [`standards/README.md`](standards/README.md) — `playbooks.md` كنقطة الدخول

**الفائدة:**
- المستخدم يتكلم بحرية بأي صياغة طبيعية
- الوكيل يستنتج النوع → playbook ثابت → تنفيذ متّسق
- توقّع واضح: المستخدم يعرف ما سيحدث قبل أن يحدث
- اتساق عبر الجلسات والوكلاء المختلفين

### المرحلة 4.9: Autonomous Execution Mode (AEM) ✅ (2026-05-09)

إضافة Playbook 9 (AEM) — نمط تنفيذ مستقل يُفعَّل ضمن playbooks 1-6 بعد تخطيط ناضج.

- [x] إضافة Playbook 9 إلى [`standards/playbooks.md`](standards/playbooks.md)
- [x] **Phase 0 الجوهرية:** استجواب + بحث + تركيب
  - الوكيل لا يُسلّم بالمدخل المُقدَّم — يُحقّق فيه
  - بحث في الكود (تعارضات، patterns، integration)
  - استجواب استراتيجي (3-7 أسئلة، ليس للتأكيد بل للاستزادة)
  - تركيب خطة جديدة (ليست تكرار خطة المستخدم)
- [x] **Phase 1:** Execution Loop المستقلة
- [x] **Phase 2:** تقرير ختامي
- [x] **Safety Boundaries** صريحة (ما لا يحدث في AEM)
- [x] **شروط الخروج** الـ7 (متى يتوقّف الوكيل)
- [x] **مثال كامل** (سيناريو محوّل وحدات)
- [x] تحديث [`CLAUDE.md`](../CLAUDE.md) — إضافة AEM للـ playbook table + ملاحظة جوهرية

**الفلسفة:**
- المستخدم يأتي بمدخل ناضج (spec/خطة) — ليس جملة بسيطة
- الوكيل ليس منفّذاً سلبياً — هو شريك ناقد يُثري ويُحقّق
- بعد الموافقة على خطة الوكيل المُركَّبة، التنفيذ مستقل بالكامل (إلا عند نقاط قرار حقيقية)

### المرحلة 4.10: Standard Calc Kit + zakat refactor ✅ (2026-05-10)

أول refactor عابر لتوحيد ستايل الأدوات. فحص شامل للأدوات الـ11 كشف أن **8 من 11** أداة لها مخالفات معمارية (scope كارثي، hex hardcoded، classes مكرَّرة عبر الأدوات بقيم مختلفة، CDN في loan/interest، إلخ). الحل: refactor عابر بمرحلتين.

- [x] **Standard Calc Kit في `main.css`** — كتلة موحَّدة من classes (`.calc-tabs`, `.calc-tab`, `.calc-pane`, `.calc-form`, `.calc-form-row`, `.calc-form-group`, `.calc-stats-grid`, `.calc-stat-card`, `.calc-result`, `.calc-disclaimer`, `.calc-disclaimer-item`) — single source of truth لأنماط الحاسبات.
- [x] **أسماء disambiguated** لتجنّب التصادمات: `.calc-pane` بدل `.calc-section` (المعرَّف بدلالة مختلفة)، `.calc-result` بدل `.result-box`، `.calc-form-*` لتجنّب اصطدام `.form-*` المُستخدم في contact form.
- [x] **zakat كنموذج أول** — Wrapper `.zakat-calculator` + prefix `zk-*` للأنماط الخاصة، بقية الأنماط من main.css. النتيجة: -23% من حجم الملف، توافق كامل (12/12 معيار).
- [x] **اختبار بصري + بناء نظيف** — لا regressions على الأدوات الأخرى (تعريفاتها المحلية ما زالت تطغى على main.css لأن inline يأتي بعد main).

**الفائدة:** صار لدينا "العقد المركزي". لو غيّرنا Standard Kit في main.css → zakat (وكل أداة قادمة تستهلكه) تتأثّر فوراً. النموذج جاهز للتعميم على البقية.

**القادم في هذه المرحلة (لم يُنفَّذ بعد):**
- [ ] family-tree i18n migration (مكسور كلياً — bilingual معطّل)
- [ ] تحسينات صغرى: hex وحيد في inheritance، 11 hex في gpa، canvas في ai-readiness

### المرحلة 4.11: اكتمال Step C — تعميم Standard Kit + Vendor محلي ✅ (2026-05-10)

تعميم النمط الذي بنيناه في 4.10 على الـ6 أدوات الباقية ذات المخالفات. كل أداة الآن تستهلك Standard Calc Kit من main.css + لها prefix محلي (`kf-`, `bd-`, `ag-`, `pc-`, `ln-`, `int-`) لما يخصّها. كذلك: قرار معماري كبير — أيّ مكتبة خارجية تُنزَّل محلياً في `src/assets/vendor/`، لا CDN (انظر [`05-MEMORY.md`](05-MEMORY.md) "Vendor محلي بدلاً من CDN").

- [x] **kaffara-calculator** — `kf-` prefix كان موجوداً جزئياً، تابات تحوّلت من `nowrap+overflow-x:auto` إلى `flex-wrap`، 3 hex→vars، استخدام `.calc-pane` و `.calc-disclaimer` من Standard Kit
- [x] **body-calculator** — أسوأ scope (2/103 → 100%)، تطبيق logical props، IIFE wrap، `bd-` prefix على ~50 class داخلية، -16% حجم
- [x] **age-calculator** — أُصلح bug CSS (`}` زائدة سطر 126)، `formatDate` المعرَّفة مرتين، `var(--primary-dark)` غير الموجود، أُضيف media query (كان غائباً تماماً!)، `ag-` prefix، IIFE wrap
- [x] **percentage** — أُضيف wrapper `.percentage` (لم يكن موجوداً)، `pc-` prefix لكل الـ classes الداخلية (بسبب تصادمات مع main.css و Standard Kit)، IIFE wrap. الـ inline-row pattern (13 sub-calc كل في سطر) محفوظ — تصميم مقصود.
- [x] **loan-calculator** — `chart.js` + `exceljs` نُقلتا إلى vendor المحلي، `var(--primary-dark)` غير الموجود → `var(--accent-secondary)`، `padding-right` → `padding-inline-end`، `right` → `inset-inline-end`، 6 hex→vars، إصلاح bug `term-unit` element non-existent، `ln-` prefix، chart colors تقرأ من CSS vars (theme-aware)
- [x] **interest-calculator** — `chart.js` + `exceljs` إلى vendor المحلي، أُضيف wrapper `.interest-calculator` (لم يكن موجوداً)، `int-` prefix على ~30 class، 9 hex→vars، chart colors theme-aware، IIFE wrap
- [x] **Standard Kit في main.css** يخدم الآن **7 أدوات** (zakat + الـ6 الجديدة) — single source of truth فعّالة

**القادم بعد هذه المرحلة:**
- المرحلة 4.12: تحسينات صغرى متبقية — hex في inheritance/gpa/ai-readiness ✅ (نُفِّذت)
- المرحلة 5: قرارات تصميمية كبرى متبقية — family-tree i18n migration

### المرحلة 4.12: إغلاق دورة Polish ✅ (2026-05-10)

أتمّت دورة الـ Polish لمرحلة 4.10-4.11. بعد إنجازها، صار المشروع نظيفاً تماماً من hex hardcoded في الأدوات (باستثناء family-tree والـ SVG timer/تدرّجات الصفحة في ai-readiness — مهام أخرى)، وأداة جديدة تُبنى على Standard Kit بسهولة عبر التوثيق.

- [x] **inheritance-calculator** — `#ef4444` × 2 على `.inh-action-btn.danger:hover` → `var(--error)` (commit `4c65122`)
- [x] **gpa-calculator** — 11 hex literal → CSS vars (9× error + 2× success) (commit `4c65122`)
- [x] **docs/standards/mobile-design.md** — قسم 6.3 جديد يربط القواعد الإلزامية 1-5 بـ Standard Kit، يوضح أن استخدام الـ Kit يغطّيها تلقائياً عند 768px
- [x] **docs/standards/tool-template.md** — خطوة 4a جديدة "اختر الأسلوب" قبل HTML template، مع skeleton جاهز للنسخ يستخدم `.calc-*` classes للأدوات الحاسبية، ومسار بديل (wrapper + prefix) للأدوات غير-الحاسبية. تنبيهات تسمية مضافة (`.calc-pane` لا `.calc-section`، `.calc-result` لا `.result-box`).
- [x] **ai-readiness Canvas** — 28+ hex/rgba literal في `renderRadar()` انتقلت إلى `.ai-readiness --canvas-*` namespace + helper `getCanvasColors()` يقرأها مرة عند بداية الرسم. تصميم متعمَّد: Canvas يبقى داكناً عبر الثيمين (Light/Dark) لتناسق صورة المشاركة بصرياً (commit `80acf80`).
- [x] **خارج النطاق المُتعمَّد:** تدرّجات CSS في `.air-report-summary.level-aware` (سطور 1019, 1026)، SVG timer ring color (`lerpColor` سطور 2441-2443)، family-tree i18n migration (مهمة كبرى منفصلة).

### المرحلة 5.2: Refactor أبو نجيب → Trip-only + Treasurer model ✅ (2026-05-11)

بعد إكمال 5.1 ومراجعة الأداة، رأى المستخدم أن المعمارية الأصلية خلطت مستويَين: طُرق التقسيم (متساوي/استهلاك/نسب) كانت أخوة مع المخرج النهائي (من دفع لمن). الواقع: الأداة للرحلات، وَ"من دفع لمن" هو **الناتج النهائي دائماً**.

كذلك في المجموعات الكبيرة (10+ أشخاص)، Greedy يُنتج فوضى — كل شخص يتعامل مع عدّة أشخاص. الحلّ المتّبع واقعياً هو **أمير الرحلة / أمين الصندوق** (شخص واحد ينسّق كل المعاملات).

- [x] **حذف Quick Mode** بالكامل (4 تبويبات → شاشة موحَّدة)
- [x] **إعادة كتابة `abu-najeeb.html`** (~1,100 سطر، State مُبسَّط)
- [x] **`computeTreasurerModel()`** الجديدة + Greedy view كـ toggle
- [x] **اختيار الأمين:** تلقائي (أكبر دائن) أو يدوي من dropdown
- [x] **chip الأمين** يُمَيَّز بـ ⭐ ولون مختلف
- [x] **Site-wide:** `App.formatNumber` يستخدم `en-US` (أرقام إنكليزية في AR + EN لكل الأدوات الـ12)
- [x] **seedDemo**: رحلة كاملة (5 أشخاص، 4 مصاريف)
- [x] **Docs:** spec/progress/memory/04-PROGRESS/_sessions محدَّثة

**القرارات المعمارية الكبيرة:**
- **Trip-only** هو القرار الفلسفي — الأداة بـvision واضح
- **Treasurer model** أبسط نفسياً من Greedy في المجموعات الكبيرة
- **أرقام إنكليزية موقعياً** — وحدة عرض عبر اللغتَين، رفع لـUX التقني

### المرحلة 5.1: أداة جديدة — أبو نجيب ✅ (2026-05-11)

أول أداة جديدة بعد إكمال البنية التحتية. تطبيق Playbook 1 الكامل + AEM Phase 0 (استكشاف الكود، أسئلة استراتيجية، خطة معتمدة).

- [x] **spec + workspace fractal:** `docs/tools/abu-najeeb.spec.md` 🟢 + 4 ملفات `development/abu-najeeb/`
- [x] **scaffold:** `src/tools/abu-najeeb.html` (shell + 4 tabs + i18n 50+ مفتاح × 2 لغة)
- [x] **People bar مشترك** عبر التبويبات (single source of truth) + Edit panel inline + 3 presets للمرافقين (كامل/نصف/ربع) + cascade delete
- [x] **Tab 1 — متساوٍ:** مبلغ + ضريبة% + إكرامية% → finalAmount + breakdown
- [x] **Tab 2 — استهلاك:** طلبات ديناميكية + share pills (الجميع/شخص/مجموعة) + ضريبة/إكرامية نسبياً
- [x] **Tab 3 — تسوية:** مصاريف ديناميكية + **خوارزمية Greedy Settlement** + savings vs naive
- [x] **Tab 4 — نسب:** نسبة% أو وحدات + تحقق المجموع + rounding-fix
- [x] **Polish:** seedDemo per-tab، copyResult بصياغة لكل tab، sessionStorage auto-save، localStorage saved groups (load/delete)، resetAll
- [x] **html2canvas محلية في vendor + lazy loading** عند الضغط أول مرة فقط
- [x] **Standard Calc Kit** مستهلَك بالكامل + prefix `an-*` للأنماط الخاصة
- [x] **مثال spec التحقق:** 4 أشخاص × 3 مصاريف (1400 مجموع) → **3 تحويلات بالضبط** ✓

**الفلسفة المحقّقة:** أول أداة في فئة `everyday` بعد family-tree. ميزة Greedy نقطة بيع نادرة بالعربية. الـ Standard Kit أثبت قيمته (Mobile/Theme/RTL مجاناً).

**v2 backlog:** مرافقون بنسب مخصّصة، 3 مقالات مدونة، اختصارات كيبورد، paste import، Web Share API.

### المرحلة 5 (السابقة): تخطيط البناء العلمي ✅

اكتمل التخطيط في 2026-05-11. الأداة المختارة: `abu-najeeb`. spec كاملة قبل الكود، خطة معتمدة، تنفيذ بـ 8 commits منطقية.

### المرحلة 6: البرمجة (مستمرة — أدوات لاحقة)

- [ ] أداة قادمة من ROADMAP أو طلب مستخدم
- [ ] مقالات مدونة لـabu-najeeb (3 مقترحة)
- [ ] family-tree i18n migration (مهمة مؤجَّلة كبرى)

## 📝 ملاحظات تطوير

### آخر التغييرات الكبرى (من git log)

```
4b9cab9  Merge — origin/claude/ai-readiness-tool-AjtNI
7c83c1d  Expand remaining 15 specialties to 100q + re-fix entrepreneurship
a10462d  Merge — origin/claude/ai-readiness-tool-AjtNI
af59011  Add files via upload
39f6d22  Merge — origin/claude/ai-readiness-tool-AjtNI
```

### قرارات حالية معلّقة (للنقاش)

1. أي أداة من ROADMAP نبدأ بها؟ (المقترحات في [`03-ROADMAP.md`](03-ROADMAP.md))
2. هل نضيف مقالات مدونة لكل أداة موجودة قبل بناء أدوات جديدة؟
3. هل نكتب اختبارات؟ (الموقف الحالي: لا، لكن قابل للنقاش)
4. هل نقسّم `i18n.json` لاحقاً؟ (الموقف الحالي: ليس الآن)
5. هل ندمج `dist/` و GitHub Pages config مع تحسينات (PWA, service worker)؟

## 🔄 كيفية تحديث هذا الملف

- ✅ **مكتمل:** عند الانتهاء فعلاً (ليس "تقريباً")
- 🚧 **قيد العمل:** عند البدء، مع تاريخ البدء حين يكون مهماً
- 📋 **لاحق:** عند تأجيل قرار، مع سبب التأجيل
- حدّث **آخر تحديث** في الأعلى عند كل تعديل

## 📎 مرجع سريع

- الرؤية → [`00-VISION.md`](00-VISION.md)
- المعمارية → [`01-ARCHITECTURE.md`](01-ARCHITECTURE.md)
- المبادئ → [`02-PRINCIPLES.md`](02-PRINCIPLES.md)
- الخطة → [`03-ROADMAP.md`](03-ROADMAP.md)
