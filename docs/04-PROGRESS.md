# ✅ التقدم الحالي | Progress

> آخر تحديث: **2026-05-08** (المراحل 1-4.5 مكتملة — التوثيق الكامل + بنية تطوير fractal)

هذا الملف **سجل حي** يُحدَّث باستمرار. يعكس الحالة الفعلية، ليس الخطة. للخطة المستقبلية انظر [`03-ROADMAP.md`](03-ROADMAP.md).

---

## ✅ مكتمل

### الأدوات (11)

| # | الأداة | التصنيف | الحالة | ملاحظات |
|---|---|---|---|---|
| 1 | percentage | calculators | ✅ مستقر | 13 حاسبة فرعية |
| 2 | interest-calculator | calculators | ✅ مستقر | يحتوي تحذير الربا |
| 3 | loan-calculator | calculators | ✅ مستقر | جدول أقساط |
| 4 | zakat-calculator | calculators | ✅ مستقر | إسلامي + إخلاء مسؤولية |
| 5 | inheritance-calculator | calculators | ✅ مستقر | الأعقد فقهياً، 4 مذاهب — **مرجع تصميم الموبايل** |
| 6 | kaffara-calculator | calculators | ✅ مستقر | 8 أنواع كفارات |
| 7 | gpa-calculator | calculators (other) | ✅ مستقر | 20 نظام تقدير، 5 تبويبات |
| 8 | body-calculator | calculators (other) | ✅ مستقر | BMI/BMR/BF/IBW |
| 9 | age-calculator | calculators (other) | ✅ مستقر | حسابات تواريخ |
| 10 | family-tree | everyday | ✅ مستقر | شجرة عائلة SVG |
| 11 | ai-readiness | generators | ✅ مستقر | 41 تخصص، ~200K سطر JSON |

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

### المرحلة 5: تخطيط البناء العلمي

- [ ] اختيار أول أداة من ROADMAP بالنقاش
- [ ] تصميم الأداة على الورق (UI mockup + حالات الاستخدام)
- [ ] كتابة spec لها قبل أي كود

### المرحلة 6: البرمجة

- [ ] تنفيذ الأداة المختارة وفق المعايير الموثّقة
- [ ] إضافة 2-3 مقالات مدونة لها
- [ ] مراجعة وتعديل + اختبار يدوي ثنائي اللغة

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
