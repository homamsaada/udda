# 📜 سجل الجلسات الكبرى | Site Session Log

> سرد موجز للجلسات التطويرية الكبيرة على **مستوى الموقع**.
>
> - **للأداة المحددة:** استخدم `git log -- src/tools/{tool}.html` (أو المسار المعني)
> - **للحالة الحالية:** [`04-PROGRESS.md`](04-PROGRESS.md)
> - **للقرارات الكبرى:** [`05-MEMORY.md`](05-MEMORY.md)
>
> يُحدَّث للجلسات الكبيرة فقط (أكثر من 100 سطر تغيير، أو يوم كامل عمل، أو قرار معماري). ليس لكل تعديل صغير.

---

## 2026-05-08 → 2026-05-09 — Documentation Foundation (Stages 1 → 4.7)

- **الفجوة من السابق:** أول جلسة موثَّقة بهذا الشكل (لا يوجد سابق)
- **المدة:** يومان متتاليان
- **حجم التغيير:** ~75 ملف توثيق جديد، ~7,500 سطر

### ما تم
- **المرحلة 1 (تأسيس):** 5 ملفات foundation (VISION, ARCHITECTURE, PRINCIPLES, ROADMAP, PROGRESS) + README
- **المرحلة 2 (معايير):** 9 ملفات في `standards/` (design, mobile, i18n, SEO, content, templates, testing)
- **المرحلة 3 (مواصفات):** 12 ملف spec في `tools/` (3 عميقة + 3 متوسطة + 5 موجزة + README)
- **المرحلة 4 (تنظيف):** حذف legacy + إعادة كتابة README + تقليص CLAUDE.md من 36KB إلى ~5KB
- **المرحلة 4.5 (fractal):** إنشاء `development/` workspace + 47 ملف لـ11 أداة + ملفي `05-MEMORY` و `06-TODO` على مستوى الموقع
- **المرحلة 4.6 (تليين):** إعادة هيكلة القرارات إلى 4 فئات (فلسفي ثابت، خيار حالي، حالة حالية، لن أبداً)
- **المرحلة 4.7 (وعي زمني):** هذا الملف + Session Resume Protocol + temporal markers

### حالة التبعيات (لقطة)
- **markdown-it:** 14.1.1 (current)
- **GitHub Actions:** v4 / v5 (current)
- **Node.js:** v20+
- **Browser support target:** آخر سنتين

### قرارات معمارية كبيرة
- بنية fractal للتوثيق (موقع + أداة بنفس النمط)
- "static-first" بدلاً من "static-only" — أدوات محددة قد تكتسب backend
- 4 فئات للقرارات (🔒 / ⚙️ / 📅 / 🚫)
- Session Resume Protocol على المستويين

### ملاحظات حرجة للجلسات القادمة
- ⚠️ **`ai-readiness` JSON files** تذكر أدوات AI شائعة — راجعها كل فجوة كبيرة (ChatGPT, Sora, Stitch، إلخ)
- ⚠️ **GitHub Actions versions** قد تصبح deprecated — `actions/checkout@v4` ربما يصبح v6 لاحقاً
- ⚠️ **markdown-it** فحص دوري أمني
- ⚠️ **training cutoff للوكيل** — قد لا تطابق تاريخ اليوم — اسأل أو ابحث قبل الجزم بـ"حداثة" معلومة

---

## 2026-05-10 → 2026-05-11 — Polish Cycle + Standard Calc Kit + session-todos.md Policy

- **الفجوة من السابق:** يوم واحد (الجلسة السابقة 2026-05-09)
- **المدة:** يوم كامل (جلسة مكثَّفة)
- **حجم التغيير:** ~16 commit، 11 ملف مُعدَّل، تأسيس Standard Calc Kit + سياسة session-todos.md

### ما تم

**A. Standard Calc Kit (refactor عابر)**
- أُسِّست كتلة `.calc-*` في `main.css` كـ single source of truth (~204 سطر)
- 7 من 11 أداة هاجرت إليها: zakat (نموذج)، kaffara، body، age، percentage، loan، interest
- إصلاح bugs خلال الهجرة: CSS `}` زائدة في age، `formatDate` مُعرَّفة مرتين، `var(--primary-dark)` غير الموجود، عنصر `term-unit` غير موجود في loan
- تنظيف نهائي: hex وحيد في inheritance، 11 hex في gpa، 28+ hex في Canvas ai-readiness — كلّها إلى CSS variables

**B. Vendor محلي (قرار معماري)**
- chart.js + exceljs انتقلتا من CDN (jsdelivr) إلى `src/assets/vendor/` كـ devDependency محلي
- قاعدة جديدة: أي مكتبة JS/CSS خارجية → vendor محلي افتراضياً (Privacy-first). الخدمات الحيّة (APIs/OAuth/payment/embeds) تُقرَّر case-by-case
- موثَّق في `docs/05-MEMORY.md` و `feedback_vendor_default.md` في الذاكرة

**C. ai-readiness Canvas migration**
- 28+ hex/rgba في `renderRadar()` انتقلت إلى `.ai-readiness --canvas-*` namespace
- helper جديد `getCanvasColors()` يقرأ المتغيّرات عبر `getComputedStyle` عند الـ render
- تصميم متعمَّد: Canvas يبقى داكناً عبر الثيمين (Light/Dark) لتناسق صورة المشاركة بصرياً
- التمييز: `--canvas-level-*` يختلف عن `--level-*` بقصد (perceptual hierarchy على Canvas vs semantic colors على الصفحة)

**D. سياسة session-todos.md (نظام عمل جديد)**
- ملف `session-todos.md` نُقل إلى جذر المشروع (gitignored)
- التصميم/السياسة المضافة إلى CLAUDE.md (~85 سطر): مرآة حيّة، table-only، 6 رموز حالة (✅ 🔧 ⏸ ☐ ❌ ⏭)، شريط تقدّم في عشرات (▰/▱)، ترتيب زمني للصفوف
- النموذج: السياسة دائمة (in git، تنتشر عبر الجلسات)، الملف عابر (per-worktree، يبدأ من الصفر كل جلسة)
- حُذفت `feedback_visibility.md` من الذاكرة لأن CLAUDE.md صارت المرجع الوحيد (لا تعارض)

**E. توثيق**
- `docs/standards/mobile-design.md` §6.3 جديد: Standard Kit يغطي القواعد 1-5 على 768px
- `docs/standards/tool-template.md` §4a جديد: skeleton جاهز للنسخ يستخدم `.calc-*` للأدوات الحاسبية
- `CLAUDE.md`: 3 تعديلات جوهرية (Project Structure + For Agents + Standard Kit reference)
- `docs/04-PROGRESS.md`: المرحلتان 4.10 (Standard Kit + zakat)، 4.11 (تعميم على 6 أدوات + vendor)، 4.12 (إغلاق دورة Polish)

### حالة التبعيات (لقطة)
- **markdown-it:** 14.1.1 (مستقرة، آخر فحص 2026-05-09)
- **chart.js:** 4.x محلية (vendor) — ليست في dependencies بعد، تُحمَّل من `/assets/vendor/`
- **exceljs:** 4.x محلية (vendor) — مثلها
- **GitHub Actions:** v4 / v5 (مستقرة)
- **Node.js:** v20+

### قرارات معمارية كبيرة
- **Standard Calc Kit** كنمط مركزي للأدوات الحاسبية (ليس لكل أداة)
- **Vendor محلي** افتراضي (Privacy-first) للمكتبات الثابتة. الخدمات الحيّة استثناء case-by-case.
- **session-todos.md** مرآة عابرة + سياسة دائمة (نموذج "rule in git, output ephemeral")
- **Canvas brand colors في ai-readiness** intentionally not theme-aware لتناسق Share Image

### ملاحظات للجلسات القادمة
- ⚠️ **family-tree** ما زال يكسر مبدأ Bilingual (i18n migration كبيرة، يوم+ عمل، مؤجَّلة بقصد)
- ⚠️ **gpa-calculator** و **inheritance-calculator** يستخدمان prefix-only scoping بدون Standard Kit (سليمَين، لا حاجة هجرة)
- ⚠️ **ai-readiness** فيها بقايا خارج النطاق: تدرّجات CSS في `.air-report-summary.level-aware` (سطور 1019, 1026)، SVG timer ring (`lerpColor` سطور 2441-2443) — مهام صغيرة لجلسة قادمة
- ⚠️ **Canvas المُصدَّر في ai-readiness داكن دائماً بقصد** — لا تحاول جعله theme-aware ظنّاً أنه bug
- ⚠️ السياسة الجديدة تتطلّب TodoWrite بـ 5-10 مهام في بداية كل جلسة + Edit على session-todos.md عند كل انتقال

---

## 2026-05-11 — أداة جديدة: أبو نجيب (الـ12)

- **الفجوة من السابق:** يوم واحد (الجلسة السابقة 2026-05-10)
- **المدة:** جلسة كاملة مكثَّفة (Playbook 1 + AEM Phase 0)
- **حجم التغيير:** 8 commits، 12 ملف، أداة جديدة كاملة (~1,500 سطر HTML/CSS/JS)

### ما تم

**A. تطبيق AEM Phase 0 (Autonomous Execution Mode)**
- استكشاف ثلاثي متوازي (Standard Kit، أدوات مرجعية، build system)
- استجواب استراتيجي للمستخدم (4 أسئلة جوهرية: نطاق MVP، التابة الافتراضية، العملة، disclaimer)
- خطة معتمدة قبل التنفيذ (`structured-toasting-fairy.md`)

**B. الأداة الـ12: `abu-najeeb` — حاسبة تقسيم فواتير**
- 4 تبويبات: تقسيم متساوٍ / استهلاك / من دفع لمن / بالنسب
- **خوارزمية Greedy Settlement** — تُقلِّل التحويلات للحد الأدنى (نقطة بيع نادرة بالعربية)
- شريط أشخاص مشترك (single source of truth) + 3 presets للمرافقين
- ميزات polish: seedDemo، copyResult، sessionStorage auto-save، localStorage saved groups، resetAll، export as image
- **html2canvas** نُزِّلت كـ vendor محلي + lazy loading (~195KB، يُحمَّل عند الطلب فقط)
- اختُبرت بمثال spec (4 أشخاص، 1400 مجموع، 3 تحويلات بالضبط) ✓

**C. هيكلة المرحلة 5.1 في PROGRESS**
- إغلاق المرحلة 5 (التخطيط) واعتمادها للأداة
- إنشاء قسم 5.1 (التنفيذ) مع تفصيل الـ 8 commits

**D. الفئة `everyday` تنمو**
- كانت تحوي family-tree فقط، الآن أصبحت 2 (مع abu-najeeb)
- أول استهلاك لـ Standard Calc Kit في فئة غير-calculators

### حالة التبعيات (لقطة)
- **markdown-it:** 14.1.1 (مستقرة)
- **chart.js:** 4.x (vendor)
- **exceljs:** 4.x (vendor)
- **html2canvas:** 1.4.x (vendor، **جديدة في هذه الجلسة**)
- **GitHub Actions:** v4 / v5 (مستقرة)
- **Node.js:** v20+

### قرارات معمارية كبيرة
- **`computeShares()` موحَّدة** عبر التبويبات (DRY مكتمل) + last-share rounding fix
- **Greedy Settlement** قرار pragmatic (NP-hard لكن بحجم صغير لا يهم)
- **Currency حقل اختياري نصّي** (لا يدخل الحساب) — حلّ وسط بين spec وUX
- **html2canvas vendor + lazy** — بقاء TTI نظيف لأغلب المستخدمين
- **sessionStorage مرآة شفّافة** للحالة، localStorage فقط للأشخاص المسمّاة

### ملاحظات للجلسات القادمة
- ⚠️ **abu-najeeb v2 backlog:** custom مرافقون، مقالات مدونة، اختصارات كيبورد، Web Share API
- ⚠️ **html2canvas حجمها 195KB** — أكبر من vendor الباقي. أي أداة قادمة تستهلكها يجب أن تُعيد استخدامها لا تضاعفها
- ⚠️ الفئة `everyday` صارت أعمق — قد تستحق أدوات يومية أكثر (موعد، قائمة تسوّق، إلخ)
- ⚠️ التحقق من خوارزمية Greedy تم يدوياً بمثال واحد — يستحق unit tests لو دخلت TDD لاحقاً

---

## 2026-05-11 (مساءً) — Refactor أبو نجيب → Trip-only + Treasurer model

- **الفجوة من السابق:** نفس اليوم (الجلسة الصباحية أكملت MVP بـ 4 تبويبات)
- **المدة:** ساعات قليلة (نقاش + تنفيذ)
- **حجم التغيير:** ~3 commits، إعادة كتابة كاملة لـ abu-najeeb.html + تعديل site-wide في app.js

### ما تم

**A. نقاش معماري (مع المستخدم)**
- المستخدم لاحظ أن المعمارية الأصلية تخلط مستويَين: 3 طرق تقسيم (متساوي/استهلاك/نسب) كانت أخوة لـ"من دفع لمن" — لكنها فعلياً **خيارات**، بينما الأخيرة **مخرج نهائي**.
- إدراك: في الرحلات الكبيرة (10+ أشخاص)، Greedy يُنتج كل-شخص-يدفع-لعدّة-أشخاص — مرهق نفسياً.
- نموذج "أمير الرحلة" (أمين الصندوق) المتّبع واقعياً: كل شخص له معاملة واحدة فقط.
- 4 أسئلة استراتيجية + رد المستخدم → خطة معتمدة.

**B. Refactor جذري لـ abu-najeeb**
- حذف Quick Mode (التبويبات الأربعة) بالكامل
- إعادة كتابة `abu-najeeb.html` (~1,100 سطر) بشاشة Trip موحَّدة
- State جديد مُبسَّط: `{currency, people, expenses, treasurer, settlementMode}`
- `computeTreasurerModel()` الجديدة: net → debtors (يدفعون للأمين) + creditors (الأمين يدفع لهم)
- اختيار الأمين: dropdown مع "auto-suggest = أكبر دائن"
- chip الأمين يُمَيَّز بـ ⭐ ولون warning
- Greedy view يبقى كـ toggle بديل
- `seedDemo` يُولّد رحلة كاملة (5 أشخاص، 4 مصاريف)
- `copyResult` يدعم الوضعَين

**C. Site-wide: الأرقام بالإنكليزية**
- `src/assets/js/app.js`: `App.formatNumber` يستخدم `en-US` دائماً بدلاً من `ar-SA` عند العربية
- الأثر: كل الأدوات الـ12 الآن تعرض 1,234 (لا ١٬٢٣٤) في الواجهة العربية
- وحدة عرض: AR + EN يستخدمان نفس الأرقام، UX تقني أوضح

### القرارات المعمارية
- **Trip-only هويّة:** الأداة لها رؤية واضحة الآن — تسوية رحلات. لا "حاسبة كل شيء".
- **Treasurer افتراضي، Greedy toggle:** يحفظ القوة التقنية مع تحسين UX للحالة الشائعة.
- **English numerals site-wide:** قرار فلسفي عابر للأدوات.

### ملاحظات للجلسات القادمة
- ⚠️ المفاتيح القديمة في i18n.json (`tabEqual`, `tabConsumption`, `tabPercent`, إلخ) لم تُحذَف — لا تضرّ لأن build.js يستبدل فقط ما يجد. حذفها مهمة تنظيف v2.
- ⚠️ تصدير صورة لـTreasurer view محتاج اختبار (الخلفية الـwarning gradient قد لا تظهر صحيحاً)
- ⚠️ بعض الأدوات الأخرى قد تكون لها نصوص ثابتة بـUI تحوي أرقاماً عربية-هندية مكتوبة يدوياً (لا تمرّ عبر formatNumber) — يستحق مراجعة لاحقة

---

## ___ — الجلسة التالية (template — احذف عند الاستخدام)

- **الفجوة من السابق:** ___ يوماً
- **المدة:** ___
- **حجم التغيير:** ___

### ما تم
- ___

### حالة التبعيات (إن كانت المتابعة تستوجب فحصاً)
- markdown-it: ___
- GitHub Actions: ___
- ___

### قرارات معمارية (إن وُجدت)
- ___

### ملاحظات للجلسات القادمة
- ___
