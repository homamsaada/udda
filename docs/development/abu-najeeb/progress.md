# 📊 abu-najeeb — Progress

> 📅 **آخر نشاط على هذه الأداة:** 2026-05-12 (v2.1 — Excel export + File I/O + treasurer-inline + bulk-row polish)
> 🔍 **آخر فحص توافق:** 2026-05-12
> 📜 **التاريخ التفصيلي:** `git log -- src/tools/abu-najeeb.html`
> 🔍 **فحوصات خاصة بهذه الأداة عند فجوة > 90 يوماً:**
> - Clipboard API: لا يزال مدعوماً بنفس الشكل؟
> - html2canvas: نسخة جديدة في vendor؟ baseline browsers تغيّرت؟
> - sessionStorage / localStorage: لم تتغيّر، لكن انتبه لو السعة قُلِّصت في WebKit حديثاً

> الحالة والخطة لحاسبة تسوية مصاريف الرحلات "أبو نجيب".
> [`memory.md`](memory.md) · [`../../tools/abu-najeeb.spec.md`](../../tools/abu-najeeb.spec.md)

---

## ✅ منجَز (Done — 2026-05-12، v2.1)

### Excel export + File I/O + UX polish (2026-05-12، نفس اليوم بعد v2)

بعد نشر v2، استعرض المستخدم النتيجة وطلب تعديلات وظيفية وشكلية:

- ✅ **تصدير Excel (.xlsx) بتنسيق غني:**
  - sheet واحد متعدد الأقسام (Title → Summary → Anonymous → Buyers → Expenses → View A → View B)
  - RTL للعربية، indigo header `#6366F1`، alternating gray، numFmt `#,##0` و `+#,##0;-#,##0;0` للصافي مع ألوان
  - lazy loading لـ `exceljs.min.js` (~750KB) عبر `ensureExcelJS()` Promise
- ✅ **استبدال "المجموعات المحفوظة" بـ ملفات JSON:**
  - `💾 تصدير الرحلة` / `📂 استيراد رحلة` (schema `v2`، الحالة الكاملة)
  - `👥 تصدير المجموعة` / `📥 استيراد مجموعة` (schema `v2-group`، buyers فقط)
  - استخدام `Blob + URL.createObjectURL + anchor.click()` للتصدير، `FileReader + try/catch` للاستيراد
  - استبدال نظام localStorage بالكامل، مع تنظيف legacy data تلقائياً في init
- ✅ **نقل اختيار أمين الصندوق إلى داخل لوحة تعديل الـ buyer:**
  - حذف القسم المنفصل `.an-settlement-settings` و `<select>`
  - toggle button داخل `.an-edit-panel`، حالات active/inactive
  - hint ديناميكي حسب الحالة (auto / current / replacing)
  - الـ auto-suggest (أكبر دائن) يبقى فعّالاً عند `state.treasurer === null`
- ✅ **تخطيط bulk row جديد:**
  - من `grid: repeat(3, 1fr) gap:12px` (1/3 لكل input، عريض) إلى `flex: 90px inputs + 12px gap` (متجاور طبيعي)
- ✅ **حذف "(كامل)/(نصف)/(ربع)" بجانب الاسم في View A:**
  - debtor rows + copy text — الاسم وحده، الشارة `½`/`¼` تبقى على chip فقط للتمييز البصري
- ✅ **حذف زر "جرّب مثالاً" (seedDemo) من الـ toolbar:**
  - والدالة `anSeedDemo` بالكامل (المستخدم لم يعد بحاجة للديمو بعد فهم النموذج)
- ✅ **i18n:** أُضيفت 15+ مفتاحاً (file ops + Excel + treasurer toggle)، حُذفت 9 مفاتيح (saved groups + tryExample)

### التحقّق (verification — 2026-05-12 v2.1)

- 🧪 `npm run build` نظيف
- 🧪 الـ DOM لا يحوي `.an-saved-groups-panel` ولا `.an-settlement-settings` ولا زر seedDemo
- 🧪 Toolbar: 8 أزرار (نسخ، صورة، Excel، تصدير رحلة، استيراد رحلة، تصدير مجموعة، استيراد مجموعة، إعادة تعيين)
- 🧪 hidden file inputs `an-import-trip-input` و `an-import-group-input` موجودان
- 🧪 legacy localStorage يُحذف تلقائياً في init (`localStorage.getItem` يعود null)
- 🧪 Treasurer toggle: تفعيل/إلغاء يعمل ⭐ ينتقل على chip فوراً
- 🧪 JSON export: ينتج schema صحيح مع `paidByName` (لا IDs)
- 🧪 JSON import (full trip): يرجع total + bulk + currency + buyers + expenses + treasurer بشكل صحيح
- 🧪 JSON import (group only): يستبدل buyers ويصفّر trip config
- 🧪 invalid file: alert + state لا يتغيّر
- 🧪 Excel export: blob URL مُولَّد، download name `abu-najeeb-trip-YYYY-MM-DD.xlsx`
- 🧪 bulk row: flex 90px inputs (متجاور)، لا grid عريض
- 🧪 View A: لا يحوي "(كامل)/(نصف)/(ربع)" بعد الأسماء

### Refactor v2 إلى نموذج Bulk + Buyers (2026-05-12 — refactor كبير ثاني)

بعد v1 (Trip-only + Treasurer)، تبيّن أن النموذج الذي يفترض إدخال كل شخص بالاسم غير عملي لرحلات 20-30 شخص. الواقع: "نحن 25، منهم 4 اشتروا أغراضاً". الحلّ: تقسيم المشاركين إلى **4 buckets** (3 anonymous + buyers مسمَّون)، وحذف مفهوم المرافقين كلياً، وحذف Greedy.

- ✅ **حذف Greedy mode بالكامل** — يفقد معناه مع anonymous bulk
- ✅ **حذف مفهوم "المرافقين" كلياً** — كل شخص في bucket واحد فقط
- ✅ **State shape جديد:** `{currency, total, bulk:{full,half,quarter}, buyers, expenses, treasurer, editingBuyerId, editBuffer}`
- ✅ **Invariant مفروض:** `bulk.full + bulk.half + bulk.quarter + buyers.length === total`
- ✅ **Trip config UI جديد:** total input + 3 bulk inputs مع cascade (تعديل half/quarter → نقص في full)
- ✅ **إضافة/حذف buyer يضبط bulk.full** تلقائياً
- ✅ **clamp**: لا يمكن تخفيض `total` تحت `buyers.length`
- ✅ **Two-View output:**
  - View A (inbound): bulk lines مجمَّعة + buyer debtor lines
  - View B (outbound): buyer creditor lines
- ✅ **stats grid مُحدَّث:** Total + Cost-per-full-share + Participants + **بطاقة per-factor breakdown** جديدة (full/half/quarter)
- ✅ **seedDemo مختبَر للحالة المختلطة:** 12 مشارك، 4 buyers، عمر كـ debtor، الباقي creditors، خالد كأمين
- ✅ **copyResult محدَّث** بصياغة الوجهين الجديدة
- ✅ **i18n مُعاد هيكلته:**
  - أُضيفت: `tripConfigTitle`, `totalHeadCount*`, `bulkSection*`, `bulkFull/Half/QuarterLabel`, `buyersBarTitle/Hint`, `addBuyer`, `noBuyers`, `buyerShareFactorLabel`, `shareFull/Half/Quarter`, `viewInboundTitle`, `viewOutboundTitle`, `costPerFullShareLabel`, `perFactorBreakdownLabel`, `errNoTotal`, `errNoBuyers`, `groupOnlySavesBuyers`
  - حُذفت: كل `tab*`, `*Intro` (للتبويبات القديمة)، `items*`, `sharedWith*`, `percent*`, `tax/tip*`, `settlementModeLabel`, `mode*`, `companions*`, `transfers*`, `savedTransfers`, `errMinPeople`, `minPeopleNote`, `errPercentSum`, `errNoItems`
  - تحديث: `title`, `metaDescription`, `keywords`, `searchTerms`, `description`, `howToUseText`, `tripIntro` لتعكس scope الجديد
- ✅ **Migration:** sessionStorage القديم (يحوي `people` أو `settlementMode`) يُكتشَف ويُتجاهَل. saved groups القديمة تُحمَّل بإسقاط `companions/companionShare`.
- ✅ **Saved groups يحفظ buyers فقط** (لا trip config)

### التحقّق (verification — 2026-05-12)

- 🧪 `npm run build` نظيف، لا warnings
- 🧪 الحالة الأولية تظهر "أدخل العدد الكلي" warning بشكل صحيح
- 🧪 إدخال total → bulk.full يتطابق تلقائياً
- 🧪 إضافة buyer → bulk.full -= 1
- 🧪 cascade على half: bulk.half=2 → bulk.full=6 (في رحلة total=12 ببداية bulk.full=8)
- 🧪 clamp: محاولة total=0 مع 1 buyer → total clamps إلى 1
- 🧪 seedDemo ينتج النتيجة المتوقّعة (View A: 8 شخص × 224 + عمر 166، View B: أحمد 256 + سارة 126)
- 🧪 EN version يعمل ("Paid to the treasurer" + "Treasurer pays back")
- 🧪 mobile (375px): `.an-bulk-row` ينتقل إلى 1 col، لا horizontal scroll
- 🧪 copyResult ينتج نصاً منسَّقاً لكلا الوجهَين

---

## ✅ منجَز سابقاً (Done — 2026-05-11)

### Refactor إلى Trip mode موحَّد (2026-05-11 — بعد نقاش معماري)

بعد إكمال MVP بـ 4 تبويبات، رأى المستخدم أن المعمارية تخلط مستويَين (طريقة التقسيم vs المخرج النهائي). الواقع: الأداة للرحلات، و"من دفع لمن" هو الناتج النهائي دائماً. عند 10+ أشخاص، Greedy يُنتج فوضى تحويلات. الحلّ: **نموذج أمين الصندوق**.

- ✅ **حذف Quick Mode بالكامل** — لا تبويبات، Trip-only
- ✅ **إعادة كتابة `abu-najeeb.html`** (~1,100 سطر) بهيكلة موحَّدة
- ✅ **نموذج أمين الصندوق** كافتراضي (`computeTreasurerModel`)
  - auto-suggest = أكبر دائن
  - dropdown اختيار يدوي
  - أيقونة ⭐ على chip الأمين
- ✅ **Greedy view** كـ toggle بديل (لمن يفضّله)
- ✅ **State مبسَّط:** `{currency, people, expenses, treasurer, settlementMode}`
- ✅ **Site-wide:** `App.formatNumber` يستخدم `en-US` دائماً (الأرقام الإنكليزية في AR + EN)
- ✅ **seedDemo** يُولّد رحلة كاملة (5 أشخاص، 4 مصاريف) مباشرة
- ✅ **copyResult** يدعم الوضعَين بصياغة مناسبة لكل واحد

### الـ MVP الكامل في جلسة واحدة (8 commits) — الإصدار الأول

- ✅ **Spec كاملة** في `docs/tools/abu-najeeb.spec.md` (🟢 عميق)
- ✅ **Workspace fractal** (4 ملفات `development/abu-najeeb/`)
- ✅ **Scaffold:** HTML shell + 4 tabs + كل i18n (50+ مفتاح × ar/en)
- ✅ **tools.json registry** (فئة `everyday`، icon 🧮، related: percentage/loan)
- ✅ **People bar مشترك:** add/edit/delete + companions panel inline + cascade
- ✅ **3 presets للمرافقين** (كامل/نصف/ربع) — custom في v2
- ✅ **Tab 1 (متساوٍ):** مبلغ + ضريبة + إكرامية + breakdown لكل شخص
- ✅ **Tab 2 (استهلاك):** طلبات ديناميكية + share pills + tax/tip نسبياً
- ✅ **Tab 3 (تسوية):** مصاريف + **خوارزمية Greedy Settlement** + savings banner
- ✅ **Tab 4 (نسب):** % أو units + تحقق المجموع
- ✅ **computeShares() الموحَّدة** + rounding-fix لإغلاق التوازن
- ✅ **العملة الاختيارية** نصّية تُلصق بالنتيجة
- ✅ **seedDemo per-tab** بأمثلة spec (4×1400=3 تحويلات بالضبط، ...)
- ✅ **copyResult** بصياغة نص لكل tab
- ✅ **sessionStorage auto-save** عند كل renderAll
- ✅ **localStorage saved groups** (حفظ/استرجاع/حذف الأشخاص بالاسم)
- ✅ **resetAll** مع تأكيد
- ✅ **html2canvas vendor محلي** (~195KB) + lazy loading
- ✅ **Standard Calc Kit مستهلَك** + prefix `an-*`

### التحقق

- 🧪 مثال spec للتسوية: 4 أشخاص × 3 مصاريف (1400 مجموع) → **3 تحويلات** ✓
- 🧪 npm run build نظيف، لا warnings
- 🧪 الأداة تظهر بـ AR + EN كاملاً
- 🧪 Mobile-friendly (Standard Kit + custom 768px breakpoint)

## 🚧 قيد العمل (Active)

_(لا شيء — v2 اكتمل في جلسة 2026-05-12)_

## 📋 مخطّط (Planned — v2.1)

- نسب مخصّصة بدل 3 buckets ثابتة (custom %)
- حفظ trip config كامل في saved groups (total + bulk + buyers + currency)
- بطاقة per-factor breakdown قابلة للتفصيل عند الضغط
- 3 مقالات مدونة:
  - "تقسيم مصاريف الرحلة الجماعية بنموذج أمين الصندوق"
  - "كم يدفع كل شخص في رحلة 25 مشاركاً؟"
  - "نموذج Bulk + Buyers — متى تستخدمه؟"
- استيراد قائمة أشخاص من نص (paste)
- Web Share API على الموبايل
- تصدير CSV للتسوية

## 💡 أفكار (Ideas — تحتاج نقاشاً)

- **تكامل مع تطبيق بنكي:** فتح رابط تحويل في تطبيق محلي (سعودي/خليجي) عبر deep link — يحتاج بحث
- **رمز QR لكل مجموعة** يفتح الأداة بحالة محفوظة عبر URL hash
- **عدّة عملات** (USD + SAR في نفس الرحلة)

## ❄️ مرفوض / مؤجَّل

- **مفهوم المرافقين** — حُذف نهائياً في v2. لو احتاج المستخدم تتبّع "أب يدفع عن عائلته" بشكل أعمق، الأداة ليست المكان (يضيف buyer بـ shareFactor مُجمَّع، أو يستخدم Splitwise)
- **Greedy mode** — حُذف نهائياً في v2 (يفقد معناه مع anonymous bulk)
- **حساب فوائد على تأخير التحويل** — مخالف لفلسفة الأداة (اجتماعية، ليست رِبا)
- **تصنيف المصاريف (طعام/مواصلات/إقامة)** — تعقيد بلا قيمة واضحة
