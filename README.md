# عُدّة | Udda

<div align="center">

🔧 **أدوات مجانية للجميع | Free Tools for Everyone**

[![License](https://img.shields.io/badge/license-MIT-green)]() [![Languages](https://img.shields.io/badge/languages-AR%20%7C%20EN-orange)]() [![Live](https://img.shields.io/badge/live-udda.tools-purple)](https://udda.tools)

</div>

---

## 📖 ما هي عُدّة؟ | What is Udda?

**عُدّة** موقع أدوات مجانية متعدد اللغات (عربي/إنجليزي) — حاسبات، محوّلات، أدوات نصية، ومولّدات للاستخدام اليومي. مبني كموقع ساكن (static) يعمل في المتصفح مباشرة، بدون تسجيل أو تتبّع.

**Udda** is a free, multilingual (Arabic/English) tools website — calculators, converters, text tools, and generators for everyday use. Built as a static site that runs entirely in the browser, with no signup or tracking.

🌐 **Live:** [https://udda.tools](https://udda.tools)

---

## 🛠️ الأدوات الحالية | Current Tools

### 🧮 حاسبات | Calculators
- 🕌 **Zakat Calculator** — حاسبة الزكاة (نقد، ذهب، فضة، أسهم، عقار، زكاة الفطر)
- ⚖️ **Inheritance Calculator** — حاسبة المواريث (4 مذاهب فقهية)
- ⚖️ **Kaffara Calculator** — حاسبة الكفارات والفدية (8 أنواع)
- 🔢 **Percentage** — حاسبة النسب المئوية (13 حاسبة فرعية)
- 💰 **Interest Calculator** — الفائدة البسيطة والمركبة
- 🏦 **Loan Calculator** — حاسبة القروض (3 طرق احتساب)
- 🎓 **GPA Calculator** — حاسبة المعدل (20 نظام تقدير عالمي)
- ⚖️ **Body Calculator** — BMI, BMR, IBW, Body Fat, WHR
- 🎂 **Age Calculator** — حاسبة العمر والفرق بين التواريخ

### ⚡ مولّدات | Generators
- 🤖 **AI Readiness Assessment** — تقييم الجاهزية للذكاء الاصطناعي (41 تخصص)

### 🏠 أدوات يومية | Everyday
- 🌳 **Family Tree** — بناء شجرة العائلة التفاعلية

---

## 🚀 البدء السريع | Quick Start

```bash
git clone https://github.com/{owner}/udda.git
cd udda
npm install
npm run build      # → dist/
npm run serve      # → http://localhost:3000
```

---

## 📁 هيكل المشروع | Project Structure

```
udda/
├── src/                  المصادر | Source files
│   ├── assets/           CSS, JS, AI readiness data, ad placeholders
│   ├── data/             i18n.json + tools.json (مصدر الحقيقة)
│   ├── tools/            11 tool HTML templates
│   ├── blog/{ar,en}/     Markdown blog posts (40 articles)
│   └── pages/{ar,en}/    Static pages (about, contact, privacy, terms, disclaimer)
├── docs/                 التوثيق الكامل | Full documentation
├── build.js              سكريبت البناء | Build script (~1,400 lines)
├── dist/                 الإخراج | Build output (gitignored)
└── package.json          markdown-it (only dependency)
```

---

## 📚 التوثيق | Documentation

التوثيق الكامل للمشروع منظم في مجلد [`docs/`](docs/):

### ملفات التأسيس | Foundation
| الملف | الموضوع |
|---|---|
| [`docs/00-VISION.md`](docs/00-VISION.md) | الرؤية، الجمهور، نقاط التميّز |
| [`docs/01-ARCHITECTURE.md`](docs/01-ARCHITECTURE.md) | البنية التقنية + تدفق البناء |
| [`docs/02-PRINCIPLES.md`](docs/02-PRINCIPLES.md) | المبادئ الثابتة (تقنية + محتوى) |
| [`docs/03-ROADMAP.md`](docs/03-ROADMAP.md) | الأدوات المقترحة للتصنيفات الفارغة |
| [`docs/04-PROGRESS.md`](docs/04-PROGRESS.md) | الحالة الحالية للمشروع |

### المعايير | Standards
[`docs/standards/`](docs/standards/) — معايير إلزامية على أي تطوير جديد:
- نظام التصميم (Design System)
- تصميم الموبايل
- قواعد الترجمة
- استراتيجية SEO
- استراتيجية المحتوى
- قوالب الأدوات والمدونة
- قائمة فحص الجودة

### مواصفات الأدوات | Tool Specs
[`docs/tools/`](docs/tools/) — ملف لكل أداة من الأدوات الـ11 (عمق متفاوت حسب الحاجة).

---

## ✨ المميزات | Features

- ✅ **ثنائي اللغة** — RTL/LTR كامل + hreflang
- ✅ **SEO محسَّن** — Open Graph، Twitter Cards، Schema.org
- ✅ **3 ثيمات** — فاتح / داكن / تلقائي
- ✅ **متجاوب** — Mobile-first design
- ✅ **خصوصية تامة** — لا تتبّع، كل الحسابات client-side
- ✅ **سريع** — صفحات HTML ثابتة، بلا frameworks
- ✅ **مجاني** — رخصة MIT، مدعوم بإعلانات AdSense

---

## ➕ إضافة أداة جديدة | Adding a New Tool

اتبع الدليل التفصيلي خطوة بخطوة:
**[`docs/standards/tool-template.md`](docs/standards/tool-template.md)**

ملخّص:
1. أضف الترجمات في `src/data/i18n.json`
2. سجّل الأداة في `src/data/tools.json`
3. أنشئ `src/tools/{id}.html`
4. `npm run build` للاختبار

---

## ➕ إضافة مقال مدونة | Adding a Blog Post

اتبع: **[`docs/standards/blog-template.md`](docs/standards/blog-template.md)**

---

## 🌐 النشر | Deployment

GitHub Actions ينشر تلقائياً إلى GitHub Pages:

```yaml
# .github/workflows/deploy.yml
- run: npm ci
- run: npm run build
- uses: actions/upload-pages-artifact@v3
  with: { path: dist }
```

أي push للـ `main` يُشغّل البناء والنشر تلقائياً.

---

## 🤝 المساهمة | Contributing

قبل المساهمة، اقرأ:
1. [`docs/02-PRINCIPLES.md`](docs/02-PRINCIPLES.md) — المبادئ الثابتة
2. [`docs/standards/`](docs/standards/) — المعايير الإلزامية
3. [`docs/standards/testing-checklist.md`](docs/standards/testing-checklist.md) — قائمة الفحص

---

## 📝 الرخصة | License

[MIT License](LICENSE) — استخدم المشروع كما تشاء.

---

<div align="center">

**صُنع بـ ❤️ | Made with ❤️**

</div>
