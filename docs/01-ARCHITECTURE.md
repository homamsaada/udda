# 🏗️ المعمارية التقنية | Architecture

## 1. نظرة عامة

عُدّة موقع **ساكن (static site)** يُولَّد عبر سكريبت Node.js واحد ويُنشر على GitHub Pages.

- لا backend
- لا قواعد بيانات
- لا runtime dependencies في المتصفح
- التبعية الوحيدة: `markdown-it` (build-time فقط، لتحويل المدونة)

## 2. الفلسفة المعمارية

| المبدأ | التطبيق |
|---|---|
| Static-first | كل صفحة تُولَّد وقت البناء، لا تُحسب وقت التشغيل |
| Build-time bilingual | نسختان لكل صفحة (`ar` + `en`) من قالب واحد |
| Single source of truth | `i18n.json` للنصوص، `tools.json` للسجل |
| Zero runtime deps | لا React/Vue/Svelte، لا CDN في صفحات الإنتاج |

## 3. المخطط الكلي

```
┌──────────────┐     ┌────────────┐     ┌──────────┐     ┌─────────────┐
│   src/       │ --> │  build.js  │ --> │  dist/   │ --> │ GitHub      │
│  (المصادر)   │     │  (المولّد) │     │ (الإنتاج) │     │ Pages       │
└──────────────┘     └────────────┘     └──────────┘     └─────────────┘
```

- **التشغيل المحلي:** `npm run build` → ينشئ كل شيء في `dist/`
- **النشر:** push إلى أي branch → GitHub Actions → بناء → نشر على GitHub Pages

## 4. مكونات النظام

### 4.1 `build.js` — المولّد المركزي (1,407 سطر)

ملف واحد يحتوي:

| الدالة | الدور |
|---|---|
| `buildPageHTML()` | قالب HTML الكامل inline (السطور 163-336) — هذا القالب الفعلي |
| `buildHomepage()` | الصفحة الرئيسية + فئات + أحدث المقالات |
| `buildToolPage()` | صفحة أداة (مع related tools المحقونة) |
| `buildCategoryPage()` | صفحة تصنيف (تجمع أدوات تصنيف معين) |
| `buildStaticPage()` | about, contact, privacy, terms, disclaimer |
| `buildBlogIndexPage()` | فهرس المدونة + dropdowns للفلترة |
| `buildBlogPostPage()` | مقال مدونة (مع breadcrumb + related tool card) |
| `buildBlogCategoryPage()` | صفحة تصنيف مدونة (مثل `/blog/calculators/`) |
| `buildBlogSubcategoryPage()` | صفحة موضوع (مثل `/blog/calculators/zakat-calculator/`) |
| `buildSitemap()` | توليد `sitemap.xml` |
| `loadBlogPosts()` + `parseFrontmatter()` | قراءة Markdown + frontmatter |
| `copyDirRecursive()` | نسخ `assets/` كما هي |

### 4.2 `src/data/i18n.json` — مصدر الحقيقة للنصوص (1,882 سطر)

```json
{
  "meta": { "ar": {...}, "en": {...} },        // siteName, siteSlogan, locale
  "ui": { "ar": {...}, "en": {...} },          // ~70 مفتاح للنصوص المشتركة
  "categories": { "ar": {...}, "en": {...} },  // 8 تصنيفات: name, icon, description
  "tools": {
    "{tool-id}": {
      "ar": {
        "name", "title", "metaDescription", "keywords",
        "description", "searchTerms", "howToUseText",
        ...customKeys  // أي مفتاح إضافي يصبح {{tool.customKey}}
      },
      "en": { ...نفس البنية }
    }
  }
}
```

### 4.3 `src/data/tools.json` — السجل

```json
{
  "tools": [
    {
      "id": "zakat-calculator",
      "category": "calculators",
      "icon": "🕌",
      "popular": true,
      "new": true,
      "related": ["percentage", "interest-calculator"]
    }
  ],
  "categoryOrder": [
    "calculators", "converters", "text", "datetime",
    "generators", "image", "developers", "everyday"
  ]
}
```

### 4.4 `src/tools/*.html` — قوالب الأدوات (11 ملف)

كل أداة ملف HTML مستقل يحتوي:

- **HTML للـ UI** مع placeholders (`{{tool.name}}`, `{{tool.description}}`, ...)
- **`<style>` scoped** بـ wrapper class (مثل `.zakat-calculator .calc-tab { ... }`)
- **`<script>` IIFE-wrapped** — الدوال العامة فقط على `window`
- **بنية موحدة:**
  1. `tool-card` (header + UI)
  2. `how-to-use`
  3. `tool-disclaimer` (إن لزم)
  4. (related tools يُحقن تلقائياً من build.js)

### 4.5 `src/blog/{ar,en}/*.md` — مقالات المدونة

Markdown مع frontmatter YAML:

```yaml
---
title: "كيف تحسب زكاة المال؟"
description: "..."  # 150-160 حرف لـ meta description
date: "2025-10-05"
topic: "zakat-calculator"   # tool ID من tools.json أو "news"
keywords: "حساب الزكاة، نصاب، نسبة الزكاة، ..."
relatedTool: "zakat-calculator"  # اختياري
---

محتوى المقال بـ Markdown...
```

تُحوَّل إلى HTML وقت البناء عبر `markdown-it`. الروابط المطلقة (`/ar/...`, `/en/...`) تُحوَّل إلى نسبية تلقائياً.

### 4.6 `src/pages/{ar,en}/*.html` — الصفحات الثابتة

5 صفحات: `about`, `contact`, `privacy`, `terms`, `disclaimer` (× 2 لغة = 10 ملفات)

### 4.7 `src/assets/`

| المسار | الحجم | الدور |
|---|---|---|
| `css/main.css` | 2,215 سطر | كل التنسيقات + متغيرات + ثيمات |
| `js/app.js` | 419 سطر | `App` object: state, theme, search, favorites, recent |
| `images/ads/` | 3 صور | placeholders للإعلانات (sidebar, banner, mobile) |
| `data/ai-readiness/` | 44 ملف JSON (~9.2 MB) | بنك أسئلة الجاهزية للذكاء الاصطناعي |

## 5. تدفق البناء

```
1. مسح dist/
2. نسخ src/assets/ → dist/assets/
3. لكل لغة (ar, en):
   a. homepage              → dist/{lang}/index.html
   b. 8 صفحات تصنيف         → dist/{lang}/category/*.html
   c. 11 صفحة أداة          → dist/{lang}/tools/*.html
   d. 5 صفحات ثابتة         → dist/{lang}/pages/*.html
   e. blog index + posts    → dist/{lang}/blog/*.html
   f. blog category pages   → dist/{lang}/blog/{cat}/index.html
   g. blog topic pages      → dist/{lang}/blog/{cat}/{tool}/index.html
4. توليد sitemap.xml
5. توليد robots.txt
6. توليد redirect dist/index.html (يحدد لغة المتصفح ويوجّه)
```

## 6. نظام Placeholders

استبدال بسيط عبر **regex**، يحدث وقت البناء:

| Placeholder | المصدر | مثال |
|---|---|---|
| `{{tool.name}}` | `i18n.tools.{id}.{lang}.name` | "حاسبة النسبة" |
| `{{tool.{customKey}}}` | `i18n.tools.{id}.{lang}.{customKey}` | أي مفتاح مخصص |
| `{{ui.calculate}}` | `i18n.ui.{lang}.calculate` | "احسب" |
| `{{validationMsg}}` | hardcoded في `build.js` | "أدخل أرقاماً صحيحة" |

**المفاتيح المحجوزة** (لا تُستخدم كـ `{{tool.xxx}}` لأن build.js يعالجها بشكل خاص):
`name`, `title`, `metaDescription`, `keywords`, `description`, `searchTerms`, `howToUseText`

## 7. النشر

| الملف | الدور |
|---|---|
| `.github/workflows/auto-pr.yml` | عند push إلى `claude/**`: يدمج تلقائياً إلى `main` |
| `.github/workflows/deploy.yml` | عند push إلى أي branch: build → upload `dist/` كـ Pages artifact → publish |

## 8. نقاط القوة الحالية

- **بساطة:** ملف بناء واحد، ملف ترجمات واحد، ملف سجل واحد
- **سرعة:** صفحات HTML ثابتة، لا JS framework loading، لا API calls runtime
- **استقلالية:** لا حاجة لخادم أو قاعدة بيانات
- **ثنائية لغة من البداية:** ليست ترقيعاً لاحقاً
- **SEO جاهز:** `hreflang`, `canonical`, Schema.org, sitemap, robots.txt

## 9. الديون التقنية الحالية

| الدين | التأثير | الحل المقترح |
|---|---|---|
| ~~`src/layouts/base.html` ميت~~ | ~~ارباك للقارئ~~ | ✅ **حُذف** |
| ~~`docs/` قديم (إخراج بناء سابق)~~ | ~~يضخّم المستودع~~ | ✅ **حُذف** |
| `build.js` ضخم (1,407 سطر) | صعوبة الصيانة | تقسيم لاحقاً (modules) — ليس عاجلاً |
| `i18n.json` ضخم (1,882 سطر) | تعديل مفتاح يفتح كل الملف | تقسيم لكل أداة لاحقاً |
| لا اختبارات (لا lint، لا tests) | اعتماد على البناء + الفحص اليدوي | إضافة عند الحاجة، ليس استباقاً |
| Placeholder system بدائي (regex) | لا escaping، لا conditionals | حالياً يكفي |
| `toolsData` يُكرَّر في كل صفحة | حجم الصفحات أكبر | حقن مرة واحدة لاحقاً |
| `CLAUDE.md` يخلط معمارية + قواعد + كاتالوج | صعوبة القراءة | سيُقلَّص بعد اكتمال docs/ |

## 10. اعتبارات للمستقبل

قبل تعقيد البنية، نسأل دائماً: **هل التعقيد يخدم مستخدم الموقع، أم فقط يُسعد المطور؟**

- لا نضيف framework لمجرد "تجربة"
- لا نضيف اختبارات لمجرد "ممارسة جيدة" — نضيفها حين تمنع bugs حقيقية
- لا نقسّم ملفات لمجرد "نظافة" — نقسّمها حين الملف يصبح فعلاً عقبة

## 11. مرجع سريع

- المبادئ → [`02-PRINCIPLES.md`](02-PRINCIPLES.md)
- خطة الأدوات → [`03-ROADMAP.md`](03-ROADMAP.md)
- الحالة → [`04-PROGRESS.md`](04-PROGRESS.md)
