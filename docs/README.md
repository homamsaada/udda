# 📚 مستندات عُدّة | Udda Documentation

هذا المجلد يحتوي على كل توثيق المشروع — الرؤية والمعمارية والمعايير ومواصفات الأدوات.

> ✍️ **اللغة:** عربية للمحتوى، إنجليزية للمصطلحات التقنية (`build.js`, CSS variables, JSON keys, function names).

---

## 🏛️ ملفات التأسيس (Foundation)

| الملف | الوصف |
|---|---|
| [`00-VISION.md`](00-VISION.md) | الرؤية، الجمهور، المشكلة التي يحلها المشروع، نقاط التميّز |
| [`01-ARCHITECTURE.md`](01-ARCHITECTURE.md) | المعمارية التقنية، تدفق البناء، مكونات النظام |
| [`02-PRINCIPLES.md`](02-PRINCIPLES.md) | المبادئ الثابتة (تقنية، تصميم، محتوى، UX) |
| [`03-ROADMAP.md`](03-ROADMAP.md) | الأدوات المقترحة، التوسعات، خطة المنصة |
| [`04-PROGRESS.md`](04-PROGRESS.md) | الحالة الحالية: ما اكتمل، قيد العمل، لاحق |

## 📐 المعايير (Standards)

ملفات إلزامية على أي تطوير جديد. الفهرس الكامل في [`standards/README.md`](standards/README.md).

| الملف | الموضوع |
|---|---|
| [`standards/design-system.md`](standards/design-system.md) | متغيرات CSS، الألوان، البطاقات، الثيمات |
| [`standards/mobile-design.md`](standards/mobile-design.md) | قواعد الموبايل (مرجع: inheritance-calculator) |
| [`standards/i18n-conventions.md`](standards/i18n-conventions.md) | قواعد الترجمة، المفاتيح المحجوزة |
| [`standards/seo-strategy.md`](standards/seo-strategy.md) | SEO، hreflang، Schema.org |
| [`standards/content-strategy.md`](standards/content-strategy.md) | استراتيجية المدونة، Pillar/Sub |
| [`standards/tool-template.md`](standards/tool-template.md) | قالب أداة جديدة |
| [`standards/blog-template.md`](standards/blog-template.md) | قالب مقال جديد |
| [`standards/testing-checklist.md`](standards/testing-checklist.md) | فحص الجودة قبل الدمج |

## 🛠️ مواصفات الأدوات (Tool Specs)

ملف لكل أداة من الأدوات الـ11. الفهرس الكامل في [`tools/README.md`](tools/README.md).

| المستوى | الأدوات |
|---|---|
| 🟢 عميق | [zakat](tools/zakat-calculator.spec.md), [inheritance](tools/inheritance-calculator.spec.md), [ai-readiness](tools/ai-readiness.spec.md) |
| 🟡 متوسط | [kaffara](tools/kaffara-calculator.spec.md), [body](tools/body-calculator.spec.md), [gpa](tools/gpa-calculator.spec.md) |
| ⚪ موجز | [interest](tools/interest-calculator.spec.md), [loan](tools/loan-calculator.spec.md), [percentage](tools/percentage.spec.md), [age](tools/age-calculator.spec.md), [family-tree](tools/family-tree.spec.md) |

## 📋 المراحل القادمة (لم تُبنَ بعد)

- **`docs/decisions/`** — سجل القرارات المعمارية (ADRs) — مستقبلاً

## 🔄 كيف تستخدم هذه المستندات

- **مطوّر جديد على المشروع:** ابدأ بـ [`00-VISION`](00-VISION.md) ثم [`01-ARCHITECTURE`](01-ARCHITECTURE.md)
- **قبل إضافة أداة جديدة:** راجع [`02-PRINCIPLES`](02-PRINCIPLES.md) و [`03-ROADMAP`](03-ROADMAP.md)
- **أثناء العمل على مهمة:** حدّث [`04-PROGRESS`](04-PROGRESS.md) حين تبدأ أو تُكمل
- **عند تغيير قرار معماري:** سجّل السبب في `decisions/` (مستقبلاً) مع التاريخ

## 🤖 ملاحظة للوكلاء (Claude / AI agents)

- `CLAUDE.md` في جذر المشروع هو نقطة الدخول السريعة (سيُقلَّص لاحقاً ليصبح فهرساً يربط بهذه المستندات)
- هذه المستندات هي **المرجع الكامل والمتعمّق**
- لا تكرّر معلومات بين CLAUDE.md و docs/ — اربط فقط

## 🌳 خريطة المجلد (مستقبلاً، عند اكتمال كل المراحل)

```
docs/
├── README.md                      ← أنت هنا
├── 00-VISION.md
├── 01-ARCHITECTURE.md
├── 02-PRINCIPLES.md
├── 03-ROADMAP.md
├── 04-PROGRESS.md
├── standards/                     ✅ مكتمل
│   ├── README.md
│   ├── design-system.md
│   ├── mobile-design.md
│   ├── i18n-conventions.md
│   ├── seo-strategy.md
│   ├── content-strategy.md
│   ├── tool-template.md
│   ├── blog-template.md
│   └── testing-checklist.md
├── tools/                         ✅ مكتمل
│   ├── README.md
│   ├── zakat-calculator.spec.md
│   ├── inheritance-calculator.spec.md
│   ├── kaffara-calculator.spec.md
│   ├── body-calculator.spec.md
│   ├── gpa-calculator.spec.md
│   ├── ai-readiness.spec.md
│   ├── interest-calculator.spec.md
│   ├── loan-calculator.spec.md
│   ├── percentage.spec.md
│   ├── age-calculator.spec.md
│   └── family-tree.spec.md
└── decisions/
    └── (ADRs مستقبلاً)
```
