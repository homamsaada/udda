# 🔍 استراتيجية SEO | SEO Strategy

> تحسين محركات البحث ليس ترفاً — هو الفرق بين موقع يُكتشف وموقع يبقى مجهولاً.

---

## 1. المبادئ الأساسية

- **كل صفحة لها title و meta description مخصصة** — لا قيم افتراضية
- **`hreflang` لكل صفحة** — Google يفهم أن الموقع ثنائي اللغة
- **Schema.org structured data** لكل نوع صفحة
- **canonical URL** يمنع duplicate content
- **sitemap.xml يُولَّد تلقائياً** ويشمل كل الصفحات

## 2. Title Tag

### الطول المثالي
- **50-60 حرفاً** (Google يقطع بعد ~600 px ≈ 60 حرفاً للإنجليزي، أقل للعربي)

### القالب
```
{toolName} - {valueProposition} | عُدّة
```

```
{toolName} - {valueProposition} | Udda
```

### أمثلة

| ✅ جيد | ❌ سيء |
|---|---|
| `حاسبة الزكاة - احسب زكاتك بدقة | عُدّة` | `حاسبة` (قصير جداً) |
| `Zakat Calculator - Accurate Calculation | Udda` | `حاسبة الزكاة لكل أنواع الأموال والذهب والفضة والعقارات | عُدّة` (طويل) |

## 3. Meta Description

### الطول المثالي
- **150-160 حرفاً** (يقطع Google بعد ~155-160)

### الهدف
- يصف الأداة بدقة
- يحوي كلمات مفتاحية طبيعية
- يحفّز المستخدم على النقر (CTA ضمنية)

### أمثلة

```
حاسبة الزكاة المجانية - احسب زكاة المال والذهب والفضة والأسهم والعقارات. تدعم 4 مذاهب فقهية مع شرح المعادلات والمراجع.
```
(151 حرفاً ✓)

```
Free Zakat Calculator - Calculate zakat on cash, gold, silver, stocks, and real estate. Supports 4 schools of jurisprudence with explanations.
```
(154 حرفاً ✓)

## 4. Keywords

ضع كلمات مفتاحية متنوعة. ليست عاملاً قوياً مباشراً عند Google لكن تساعد البحث الداخلي.

```json
"keywords": "حاسبة الزكاة، حساب الزكاة، نصاب الزكاة، نسبة الزكاة، zakat calculator"
```

## 5. hreflang

`build.js` يولّد تلقائياً لكل صفحة:

```html
<link rel="alternate" hreflang="ar" href="https://udda.tools/ar/{path}">
<link rel="alternate" hreflang="en" href="https://udda.tools/en/{path}">
<link rel="alternate" hreflang="x-default" href="https://udda.tools/ar/{path}">
```

**ملاحظة:** `x-default` يشير للعربية كلغة افتراضية (الجمهور الأساسي).

## 6. Canonical URL

كل صفحة تحوي:

```html
<link rel="canonical" href="https://udda.tools/{lang}/{path}">
```

تُولَّد تلقائياً من `canonicalPath` الممرر إلى `buildPageHTML()`.

## 7. Schema.org Structured Data

### 7.1 الصفحة الرئيسية وصفحات الأدوات: `WebApplication`

```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "{toolName}",
  "description": "{metaDescription}",
  "url": "{canonicalUrl}",
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "Any",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "inLanguage": ["ar", "en"],
  "isAccessibleForFree": true
}
```

### 7.2 مقالات المدونة: `Article`

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "{title}",
  "description": "{description}",
  "datePublished": "{date}",
  "author": { "@type": "Organization", "name": "عُدّة" },
  "publisher": { "@type": "Organization", "name": "عُدّة" },
  "mainEntityOfPage": "{canonicalUrl}"
}
```

### 7.3 صفحات FAQ (مثل `ai-readiness`): `FAQPage`

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "{question}",
      "acceptedAnswer": { "@type": "Answer", "text": "{answer}" }
    }
  ]
}
```

### 7.4 الاختبارات: `Quiz`

استخدمه لأداة `ai-readiness`:

```json
{
  "@context": "https://schema.org",
  "@type": "Quiz",
  "name": "{toolName}",
  "description": "{seoDescription}",
  "educationalLevel": "All Levels",
  "inLanguage": ["ar", "en"],
  "isAccessibleForFree": true,
  "timeRequired": "PT15M"
}
```

## 8. Open Graph & Twitter Cards

`build.js` يولّد تلقائياً:

```html
<meta property="og:type" content="website">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{metaDescription}">
<meta property="og:url" content="{canonicalUrl}">
<meta property="og:site_name" content="عُدّة">
<meta property="og:locale" content="{locale}">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{title}">
<meta name="twitter:description" content="{metaDescription}">
```

## 9. URL Structure

| النوع | البنية | مثال |
|---|---|---|
| Homepage | `/{lang}/` | `/ar/` |
| Tool | `/{lang}/tools/{tool-id}.html` | `/ar/tools/zakat-calculator.html` |
| Category | `/{lang}/category/{category-id}.html` | `/ar/category/calculators.html` |
| Static page | `/{lang}/pages/{page-id}.html` | `/ar/pages/about.html` |
| Blog index | `/{lang}/blog/` | `/ar/blog/` |
| Blog post | `/{lang}/blog/{slug}.html` | `/ar/blog/how-to-calculate-zakat.html` |
| Blog category | `/{lang}/blog/{category}/` | `/ar/blog/calculators/` |
| Blog topic | `/{lang}/blog/{category}/{tool-id}/` | `/ar/blog/calculators/zakat-calculator/` |

## 10. sitemap.xml & robots.txt

`build.js` يولّدهما تلقائياً:

```xml
<!-- sitemap.xml -->
<urlset>
  <url><loc>https://udda.tools/ar/</loc></url>
  <url><loc>https://udda.tools/ar/tools/zakat-calculator.html</loc></url>
  ...
</urlset>
```

```
# robots.txt
User-agent: *
Allow: /
Sitemap: https://udda.tools/sitemap.xml
```

## 11. استراتيجية الكلمات المفتاحية

### للصفحة الرئيسية
- "أدوات مجانية"
- "حاسبات أونلاين"
- "free online tools"
- "calculators"

### للأدوات (مثال زكاة)
- **رئيسية:** "حاسبة الزكاة"، "zakat calculator"
- **بحث طويل (long-tail):** "كيف أحسب زكاة المال", "نصاب الزكاة الذهب", "how to calculate zakat on gold"
- **سؤالية:** "كم زكاة الـ100 ألف؟", "هل الذهب عليه زكاة؟"
- **عامية:** "احسب زكاتي", "حساب الزكاه"

### للمدونة
- ركّز على **أسئلة فعلية** يبحث عنها الناس
- استخدم Google Suggest و People Also Ask كمصادر

## 12. Internal Linking

- **كل أداة** تحوي `related` tools (تُحقن تلقائياً في صفحة الأداة)
- **كل مقال** يحوي `relatedTool` card في النهاية (يُحقن تلقائياً)
- **داخل المقالات:** اربط لمقالات أخرى بنفس الموضوع (pillar/sub model)

## 13. Performance Signals (تساعد SEO)

- صفحات HTML ثابتة → سرعة تحميل ممتازة
- لا CDN scripts → core Web Vitals أفضل
- mobile-first → Google يرتّب الموبايل أولاً
- لا layout shifts → CLS منخفض

## 14. SEO Checklist لأداة جديدة

- [ ] `title` بين 50-60 حرفاً
- [ ] `metaDescription` بين 150-160 حرفاً
- [ ] `keywords` متنوعة بين عربي وإنجليزي وعامي
- [ ] `searchTerms` غنية للبحث الداخلي
- [ ] محتوى الصفحة يحوي اسم الأداة في h1 وفي بداية الفقرات
- [ ] الصفحة في `tools.json` مع `related` (3-5 أدوات)
- [ ] لو الأداة معقدة، أضف 1-3 مقالات مدونة لها
- [ ] تحقق من sitemap.xml بعد البناء (الصفحة موجودة)

## 15. مرجع سريع

- المعمارية → [`../01-ARCHITECTURE.md`](../01-ARCHITECTURE.md)
- قواعد الترجمة → [`i18n-conventions.md`](i18n-conventions.md)
- استراتيجية المحتوى → [`content-strategy.md`](content-strategy.md)
