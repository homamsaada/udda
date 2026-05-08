# 📚 مستندات عُدّة | Udda Documentation

> ✍️ **اللغة:** عربية للمحتوى، إنجليزية للمصطلحات التقنية (`build.js`, CSS variables, JSON keys, function names).

البنية تكرارية (fractal): نفس النمط على مستوى الموقع وعلى مستوى الأداة. كل "مشروع" (الموقع كله، أو أداة منفردة) له **identity** + **workspace**.

---

## 🏛️ مستوى الموقع

### Identity (ما هو الموقع)
| الملف | الموضوع |
|---|---|
| [`00-VISION.md`](00-VISION.md) | الرؤية، الجمهور، نقاط التميّز |
| [`01-ARCHITECTURE.md`](01-ARCHITECTURE.md) | المعمارية التقنية + تدفق البناء |
| [`02-PRINCIPLES.md`](02-PRINCIPLES.md) | المبادئ الثابتة (تقنية + محتوى) |

### Workspace (ما نفعله بالموقع)
| الملف | الموضوع |
|---|---|
| [`03-ROADMAP.md`](03-ROADMAP.md) | الأدوات والميزات المقترحة |
| [`04-PROGRESS.md`](04-PROGRESS.md) | الحالة الحالية للمشروع |
| [`05-MEMORY.md`](05-MEMORY.md) | القرارات الكبرى + الدروس + المراجع |
| [`06-TODO.md`](06-TODO.md) | مهام آنية عابرة للأدوات |

### Instructions (كيف نعمل على الموقع)
| المجلد | الموضوع |
|---|---|
| [`standards/`](standards/) | معايير إلزامية لكل تطوير (design, mobile, i18n, SEO, content, templates, testing) |

## 🛠️ مستوى الأداة (لكل واحدة من الـ11)

### Identity (ما هي الأداة)
| المجلد | الموضوع |
|---|---|
| [`tools/`](tools/) | spec واحد لكل أداة — المرجع الثابت |

### Workspace (ما نفعله بالأداة)
| المجلد | الموضوع |
|---|---|
| [`development/`](development/) | لكل أداة 4 ملفات: `progress`, `memory`, `instructions`, `todo` |

---

## 🪞 التماثل (Fractal Pattern)

| السؤال | على مستوى الموقع | على مستوى الأداة |
|---|---|---|
| ما هي الفكرة؟ | `00-VISION.md` | `tools/{X}.spec.md §1` |
| كيف بُنيت؟ | `01-ARCHITECTURE.md` | `tools/{X}.spec.md §5` |
| ما القواعد؟ | `02-PRINCIPLES.md` + `standards/` | `development/{X}/instructions.md` |
| ما المخطّط/الأفكار؟ | `03-ROADMAP.md` | `development/{X}/progress.md` (📋💡) |
| ما الحالة الآن؟ | `04-PROGRESS.md` | `development/{X}/progress.md` (✅🚧) |
| القرارات والدروس؟ | `05-MEMORY.md` | `development/{X}/memory.md` |
| المهام الفورية؟ | `06-TODO.md` | `development/{X}/todo.md` |

## 🔄 كيف تستخدم هذه المستندات

- **مطوّر جديد على المشروع:** ابدأ بـ [`00-VISION`](00-VISION.md) → [`01-ARCHITECTURE`](01-ARCHITECTURE.md) → [`02-PRINCIPLES`](02-PRINCIPLES.md)
- **قبل العمل على أداة محددة:** افتح `development/{tool}/` بكامله
- **قبل إضافة أداة جديدة:** [`standards/tool-template.md`](standards/tool-template.md) + [`03-ROADMAP.md`](03-ROADMAP.md)
- **قبل دمج أي شيء:** [`standards/testing-checklist.md`](standards/testing-checklist.md)
- **عند قرار معماري:** سجّله في `05-MEMORY.md` (موقع) أو `development/{tool}/memory.md` (أداة)

## 🌳 خريطة المجلد الكاملة

```
docs/
├── README.md                        ← أنت هنا (الفهرس)
│
├── 00-VISION.md                     ┐
├── 01-ARCHITECTURE.md               │ Identity للموقع
├── 02-PRINCIPLES.md                 ┘
│
├── 03-ROADMAP.md                    ┐
├── 04-PROGRESS.md                   │ Workspace للموقع
├── 05-MEMORY.md                     │
├── 06-TODO.md                       ┘
│
├── standards/                       Instructions للموقع (لكل الأدوات)
│   ├── README.md
│   ├── design-system.md
│   ├── mobile-design.md
│   ├── i18n-conventions.md
│   ├── seo-strategy.md
│   ├── content-strategy.md
│   ├── tool-template.md
│   ├── blog-template.md
│   └── testing-checklist.md
│
├── tools/                           Identity للأدوات (spec لكل واحدة)
│   ├── README.md
│   ├── zakat-calculator.spec.md
│   ├── inheritance-calculator.spec.md
│   ├── kaffara-calculator.spec.md
│   ├── ai-readiness.spec.md
│   ├── body-calculator.spec.md
│   ├── gpa-calculator.spec.md
│   ├── interest-calculator.spec.md
│   ├── loan-calculator.spec.md
│   ├── percentage.spec.md
│   ├── age-calculator.spec.md
│   └── family-tree.spec.md
│
└── development/                     Workspace للأدوات (لكل أداة 4 ملفات)
    ├── README.md
    ├── zakat-calculator/
    │   ├── progress.md
    │   ├── memory.md
    │   ├── instructions.md
    │   └── todo.md
    ├── inheritance-calculator/
    │   └── (نفس البنية)
    └── ... (لكل الـ11 أداة)
```

## 🤖 ملاحظة للوكلاء (Claude / AI agents)

- `CLAUDE.md` في جذر المشروع هو نقطة الدخول السريعة (موجز ~150 سطر)
- هذه المستندات هي **المرجع الكامل والمتعمّق**
- **عند العمل على أداة:** اقرأ `tools/{X}.spec.md` (المرجع) + `development/{X}/` (السياق الحي)
- **عند العمل على ميزة عابرة:** `06-TODO.md` + `05-MEMORY.md` + `standards/`
- **لا تكرّر معلومات** بين CLAUDE.md و docs/ — اربط فقط
