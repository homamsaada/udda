# ✔️ قائمة فحص الجودة | Testing Checklist

> هذا المعيار **إلزامي** قبل دمج أي أداة أو مقال إلى `main`. لا اختصارات.

---

## 1. فحص البناء (Build Check)

```bash
npm run build
```

- [ ] لا errors في output
- [ ] لا warnings عن ملفات مفقودة
- [ ] الأداة الجديدة تظهر في output: `✓ Tool: my-tool`
- [ ] `dist/ar/tools/my-tool.html` موجود
- [ ] `dist/en/tools/my-tool.html` موجود
- [ ] `dist/sitemap.xml` يحوي الصفحة الجديدة (ar + en)

---

## 2. فحص ثنائية اللغة (Bilingual Check)

افتح بالمتصفح:

### العربية (`/ar/tools/{id}.html`)
- [ ] كل النصوص بالعربية (لا إنجليزية مسرّبة)
- [ ] اتجاه النص RTL
- [ ] الأرقام تعرض بشكل صحيح
- [ ] التاريخ بالتقويم الميلادي/الهجري حسب السياق
- [ ] الأزرار باتجاه RTL (pagination, sliders)

### الإنجليزية (`/en/tools/{id}.html`)
- [ ] كل النصوص بالإنجليزية
- [ ] اتجاه النص LTR
- [ ] الأرقام تعرض بشكل صحيح
- [ ] الأزرار باتجاه LTR

### قواعد الترجمة
- [ ] العربية أصيلة (ليست ترجمة آلية)
- [ ] الإنجليزية أصيلة
- [ ] المصطلحات الفقهية بـ transliteration (Kaffarat al-Yamin)
- [ ] لا تناقض في المعلومة بين اللغتين

---

## 3. فحص الموبايل (Mobile Check)

اختبر على عرض كل من:

- [ ] **320px** (iPhone SE 1st gen)
  - لا overflow أفقي
  - كل الأزرار يمكن لمسها
  - النصوص قابلة للقراءة
- [ ] **375px** (iPhone 12/13/14)
- [ ] **390px** (iPhone 15/16)
- [ ] **480px** (Android متوسط)
- [ ] **768px** (Tablet portrait)
- [ ] **1024px** (Tablet landscape / Small laptop)

### الفحوصات على كل عرض
- [ ] لا zoom out تلقائي
- [ ] التبويبات تلتف، لا scroll أفقي
- [ ] الـ dropdowns تعمل (لا تخفي خيارات)
- [ ] الأزرار 44×44 px على الأقل (touch target)
- [ ] form-row → 1 عمود على الموبايل
- [ ] الإعلانات لا تتداخل مع المحتوى

---

## 4. فحص الثيم (Theme Check)

- [ ] **Light theme:** كل الألوان واضحة، التباين كافٍ
- [ ] **Dark theme:** كل الألوان واضحة، لا نص أبيض على أبيض
- [ ] **Auto:** يتبدل حسب نظام التشغيل
- [ ] التبديل بين الثيمات لا يكسر شيئاً
- [ ] الرسوم البيانية (لو وجدت) تستخدم `--chart-*` متغيرات
- [ ] لا hex hardcoded (افحص الـ inspector)

---

## 5. فحص الـ Console

افتح DevTools → Console:

- [ ] لا errors بالأحمر
- [ ] لا warnings عن:
  - missing translations
  - undefined variables
  - failed network requests
  - deprecated APIs
- [ ] تشغيل الأداة (إدخال أرقام، نقر) لا يولّد errors

---

## 6. فحص الـ SEO

افتح DevTools → Elements، تحقق من `<head>`:

- [ ] `<title>` موجود وبين 50-60 حرفاً
- [ ] `<meta name="description">` موجود وبين 150-160 حرفاً
- [ ] `<meta name="keywords">` موجود
- [ ] `<link rel="canonical">` صحيح
- [ ] `<link rel="alternate" hreflang="ar">` و `hreflang="en">` و `hreflang="x-default">` موجودة
- [ ] Open Graph tags كاملة (og:title, og:description, og:url)
- [ ] Twitter Card tags كاملة
- [ ] `<script type="application/ld+json">` موجود (Schema.org)

### تحقق من sitemap.xml
```bash
grep "my-tool" dist/sitemap.xml
```

يجب أن يظهر سطران (ar + en).

---

## 7. فحص الـ Accessibility

- [ ] **Tab navigation** يعمل (انتقل بين كل الحقول والأزرار)
- [ ] **Enter** يفعّل الأزرار المركّزة
- [ ] **Escape** يغلق modals (settings, search)
- [ ] **Ctrl+K** يفتح البحث
- [ ] كل `<input>` له `<label>` مرتبط (`for=` matches `id=`)
- [ ] الأزرار البصرية لها `aria-label`
- [ ] التباين كافٍ (text vs background): WCAG AA (4.5:1 للنص العادي)
- [ ] الصور لها `alt` attribute

---

## 8. فحص البحث (Search Check)

افتح الصفحة الرئيسية، استخدم البحث:

- [ ] اكتب اسم الأداة الجديدة → تظهر في النتائج
- [ ] اكتب كلمة من `searchTerms` → تظهر
- [ ] اكتب كلمة عامي → تظهر (مثلاً "الزكاه" بدل "الزكاة")
- [ ] الأيقونة تظهر صحيحة
- [ ] النقر على النتيجة ينقل للأداة
- [ ] لا errors في console

---

## 9. فحص الوظائف (Functional Check)

### إدخال طبيعي
- [ ] إدخال أرقام صحيحة → نتيجة صحيحة
- [ ] حساب يدوي يطابق نتيجة الأداة (عيّن 3-5 سيناريوهات)

### إدخال حافّ (edge cases)
- [ ] حقل فارغ → لا crash، نتيجة `—` أو رسالة واضحة
- [ ] صفر → لا قسمة على صفر
- [ ] أرقام سالبة (لو غير منطقية) → معالجة مناسبة
- [ ] أرقام كبيرة جداً → لا overflow
- [ ] إدخال نص في حقل رقم → لا crash

### Copy/Share
- [ ] زر النسخ يعمل
- [ ] toast يظهر "تم النسخ!" / "Copied!"
- [ ] زر المشاركة (في settings) يعمل

### Favorites
- [ ] إضافة الأداة للمفضلة يعمل
- [ ] الإزالة من المفضلة يعمل
- [ ] استمرار البيانات بعد reload (localStorage)

---

## 10. فحص المتصفحات (Browser Check)

- [ ] **Chrome** (latest) — desktop + mobile
- [ ] **Firefox** (latest)
- [ ] **Safari** (إن أمكن — خصوصاً للـ iOS)
- [ ] **Edge** (latest)

ركّز على:
- عرض الخطوط (Tajawal محمّل من Google Fonts)
- عرض الـ emojis (icons)
- localStorage يعمل
- `navigator.share` (لو متاح) أو fallback للنسخ

---

## 11. فحص الإسلامي/المالي/الطبي (إن وُجد disclaimer)

### للأدوات الإسلامية
- [ ] إخلاء مسؤولية موجود ("ليست فتوى")
- [ ] المصطلحات الفقهية صحيحة (نصاب، حول، عَول، رَدّ، حَجب)
- [ ] لو متعدد المذاهب: كل المذاهب معروضة بدون تحيّز

### للأدوات المالية
- [ ] تحذير الربا موجود (لو كانت أداة فائدة)
- [ ] الأداة معروضة كأداة تعليمية أو لمقارنة بدائل

### للأدوات الطبية
- [ ] "استشر طبيباً" موجود
- [ ] المعادلات والمراجع مذكورة (BMI من WHO، إلخ)
- [ ] تحذير الفئات الخاصة (حوامل، أطفال)

---

## 12. فحص الأداء (Performance)

افتح DevTools → Lighthouse:

- [ ] **Performance:** > 90
- [ ] **Accessibility:** > 95
- [ ] **Best Practices:** > 90
- [ ] **SEO:** 100

أو افحص يدوياً:
- [ ] First Contentful Paint < 1.5s
- [ ] لا layout shifts كبيرة
- [ ] لا scripts blocking

---

## 13. الـ Final Checks

- [ ] لو الأداة جديدة، أُضيفت لـ `04-PROGRESS.md`
- [ ] لو الأداة معقدة، spec موجود في `docs/tools/{id}.spec.md`
- [ ] لو `inheritance-calculator` تأثرت، تأكد من عدم كسر باقي الأدوات
- [ ] git diff نظيف (لا ملفات `dist/` في الـ staging)
- [ ] commit message واضح ويصف "ماذا" و "لماذا"

---

## ⚠️ متى ترفض الدمج؟

ارفض الدمج لو:
- ❌ أي عنصر في "فحص البناء" فاشل
- ❌ الـ console يحوي errors
- ❌ الموبايل (320px أو 480px) مكسور
- ❌ ترجمة ناقصة (نص hardcoded)
- ❌ خصوصية مكسورة (تتبع، CDN، API call غير مبرّر)
- ❌ disclaimer مفقود لأداة إسلامية/مالية/طبية

---

## مرجع سريع

- المبادئ → [`../02-PRINCIPLES.md`](../02-PRINCIPLES.md)
- نظام التصميم → [`design-system.md`](design-system.md)
- تصميم الموبايل → [`mobile-design.md`](mobile-design.md)
- قالب الأداة → [`tool-template.md`](tool-template.md)
