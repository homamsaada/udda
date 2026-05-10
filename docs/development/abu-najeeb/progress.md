# 📊 abu-najeeb — Progress

> 📅 **آخر نشاط على هذه الأداة:** 2026-05-11 (بداية البناء — Playbook 1)
> 🔍 **آخر فحص توافق:** 2026-05-11 (بداية)
> 📜 **التاريخ التفصيلي:** `git log -- src/tools/abu-najeeb.html`
> 🔍 **فحوصات خاصة بهذه الأداة عند فجوة > 90 يوماً:**
> - Clipboard API: لا يزال مدعوماً بنفس الشكل؟
> - html2canvas: نسخة جديدة في vendor؟ baseline browsers تغيّرت؟
> - sessionStorage / localStorage: لم تتغيّر، لكن انتبه لو السعة قُلِّصت في WebKit حديثاً

> الحالة والخطة لحاسبة تقسيم الفواتير "أبو نجيب".
> [`memory.md`](memory.md) · [`../../tools/abu-najeeb.spec.md`](../../tools/abu-najeeb.spec.md)

---

## ✅ منجَز (Done — 2026-05-11)

### الـ MVP الكامل في جلسة واحدة (8 commits)

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

_(لا شيء — MVP اكتمل في جلسة 2026-05-11)_

## 📋 مخطّط (Planned — v2)

- مرافقون بنسب مخصّصة (custom %)
- 3 مقالات مدونة:
  - "تقسيم فاتورة المطعم بدقّة"
  - "حساب مصاريف الرحلة الجماعية"
  - "تقسيم الإيجار بين الشركاء"
- اختصارات كيبورد (Enter يُضيف)
- استيراد قائمة أشخاص من نص (paste)
- Web Share API على الموبايل

## 💡 أفكار (Ideas — تحتاج نقاشاً)

- **تكامل مع تطبيق بنكي:** فتح رابط تحويل في تطبيق محلي (سعودي/خليجي) عبر deep link — يحتاج بحث
- **تصدير CSV** للتسوية (لأمناء الصندوق في رحلات أكبر)
- **رمز QR لكل مجموعة** يفتح الأداة بحالة محفوظة عبر URL hash

## ❄️ مرفوض / مؤجَّل

- **حساب فوائد على تأخير التحويل** — مخالف لفلسفة الأداة (اجتماعية، ليست رِبا)
- **تصنيف المصاريف (طعام/مواصلات/إقامة)** — تعقيد بلا قيمة واضحة في MVP
