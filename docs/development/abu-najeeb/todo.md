# ✏️ abu-najeeb — TODO

---

## 🚧 الآن (جلسة 2026-05-11)

- [ ] Commit 1: docs (spec + workspace) — 🔧 جارٍ
- [ ] Commit 2: scaffold + i18n + tools.json
- [ ] Commit 3: people bar + equal + percentage tabs
- [ ] Commit 4: consumption tab
- [ ] Commit 5: settlement tab + greedy
- [ ] Commit 6: seedDemo + copy + sessionStorage + saved groups
- [ ] Commit 7: export as image (html2canvas)
- [ ] Commit 8: update progress + temporal markers

## 📋 قريباً (v2)

- [ ] **مرافقون بنسب مخصّصة (custom %)** — استبدال preset selector بـ slider/input
- [ ] **3 مقالات مدونة:**
  - "كيف تقسّم فاتورة المطعم بدقّة"
  - "حاسبة مصاريف الرحلة الجماعية"
  - "تقسيم الإيجار بين الشركاء حسب الغرف"
- [ ] **اختصارات كيبورد** (Enter يُضيف شخص/طلب)
- [ ] **استيراد قائمة أشخاص من نص** (paste — سطر لكل اسم)
- [ ] **Web Share API** على الموبايل (مشاركة مباشرة بدل التنزيل)
- [ ] **تصدير CSV** للتسوية (لرحلات كبيرة 10+ مصاريف)

## 🔍 ملاحظات

- **اختبار الخوارزمية الصارم:** المثال في spec (4 أشخاص، 1400، 3 تحويلات) يجب أن يطابق بالضبط
- **Performance:** مع 50 شخص × 100 مصروف، renderResult يجب أن يكتمل < 50ms
- **iOS Safari:** Clipboard API قد يحتاج permission prompt — تحقّق
- **html2canvas:** RTL أحياناً تنعكس في الصورة — اختبر بالعربية والإنجليزية

## ❄️ مرفوض / مؤجَّل

- **تكامل مع تطبيقات بنكية** (deep links للسعودي/خليجي) — يحتاج بحث، v3+
- **تصنيف فئات المصاريف** — تعقيد بلا قيمة واضحة
- **حساب فوائد على تأخير التسوية** — مخالف لفلسفة الأداة
