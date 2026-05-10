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

## ✅ منجَز (Done)

_(بعد إكمال البناء يُملأ هنا — حالياً البناء قيد التنفيذ)_

## 🚧 قيد العمل (Active — 2026-05-11)

- **Commit 1:** docs (spec + workspace) — جارٍ
- **Commit 2:** scaffold + i18n + tools.json — قادم
- **Commit 3:** people bar + equal + percentage tabs
- **Commit 4:** consumption tab
- **Commit 5:** settlement tab + greedy
- **Commit 6:** seedDemo + copy + sessionStorage + saved groups
- **Commit 7:** export as image
- **Commit 8:** update progress + markers

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
