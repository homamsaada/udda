# 🌍 قواعد الترجمة | i18n Conventions

> الموقع ثنائي اللغة من البداية. كل نص يصل المستخدم يُكتب بالعربي والإنجليزي.

---

## 1. مصدر الحقيقة

ملف واحد لكل النصوص: **`src/data/i18n.json`** (1,882 سطر).

البنية الجوهرية:

```json
{
  "meta":       { "ar": {}, "en": {} },
  "ui":         { "ar": {}, "en": {} },
  "categories": { "ar": {}, "en": {} },
  "tools": {
    "{tool-id}": {
      "ar": { ...},
      "en": { ...}
    }
  }
}
```

## 2. القاعدة الذهبية: ar و en في كل مكان

كل مفتاح يصل المستخدم يجب أن يحتوي `ar` و `en`. **لا استثناءات.**

```json
// ✅ صحيح
"meta": {
  "ar": { "siteName": "عُدّة" },
  "en": { "siteName": "Udda" }
}

// ❌ خطأ
"siteName": "عُدّة"  // عربي فقط
```

## 3. المفاتيح المحجوزة (لا تستخدمها كـ `{{tool.xxx}}`)

`build.js` يعالج هذه المفاتيح بطريقة خاصة لتوليد meta tags و title:

| المفتاح | الاستخدام |
|---|---|
| `name` | اسم الأداة (يستخدم في `<title>`، breadcrumb، related tools) |
| `title` | محتوى `<title>` tag |
| `metaDescription` | meta description |
| `keywords` | meta keywords |
| `description` | الوصف القصير تحت اسم الأداة |
| `searchTerms` | كلمات البحث الداخلي (لا تظهر للمستخدم) |
| `howToUseText` | نص "كيف تستخدم" |

**استثناءات:** `name`, `description`, `howToUseText` تُستخدم في القوالب كـ `{{tool.name}}`، `{{tool.description}}`، `{{tool.howToUseText}}` لأن build.js يوفّرها صراحةً. الباقي **لا** يُستخدم كـ placeholders.

## 4. المفاتيح المخصصة (Custom Keys)

أي مفتاح آخر تضيفه يصبح متاحاً كـ `{{tool.{customKey}}}` في HTML.

```json
// i18n.json
"tools": {
  "my-tool": {
    "ar": {
      "calc1Title": "حاسبة النسبة",
      "buttonGo": "احسب الآن",
      "errorEmpty": "أدخل قيمة"
    },
    "en": {
      "calc1Title": "Percentage Calculator",
      "buttonGo": "Calculate Now",
      "errorEmpty": "Enter a value"
    }
  }
}
```

```html
<!-- src/tools/my-tool.html -->
<h2>{{tool.calc1Title}}</h2>
<button>{{tool.buttonGo}}</button>
<p class="error">{{tool.errorEmpty}}</p>
```

## 5. `searchTerms` — استراتيجية الكلمات

`searchTerms` لا يظهر للمستخدم، بل يساعد البحث الداخلي للموقع. اجعله **غنياً** بـ:

- **العامي:** "بالميه" + "بالمئة"
- **الفصحى:** "النسبة المئوية"
- **الإنجليزي:** "percentage"
- **الأخطاء الإملائية الشائعة:** "مئوية" + "مئويه"
- **مرادفات:** "خصم" + "تخفيض" + "حسم"
- **مصطلحات بديلة:** "اوف" + "عرض"
- **بدون "ال":** "النسبة" + "نسبة"

**مثال للنسبة المئوية:**

```json
"searchTerms": "نسبة النسبة مئوية المئوية مئويه بالمية بالميه بالمئة المئويه خصم تخفيض حسم اوف عرض زيادة نقصان فرق ربع نص ثلث percent percentage % حساب رياضيات ربح خسارة ضريبة هامش كسر..."
```

## 6. الترجمة ليست حرفية

النص الإنجليزي **ليس ترجمة جامدة** للعربي. كلاهما يُكتب أصيلاً:

```json
// عربي يستخدم "حاسبة" + "النسبة المئوية"
"name_ar": "حاسبة النسبة المئوية"

// إنجليزي يستخدم "Calculator" + "Percentage"
"name_en": "Percentage Calculator"

// ❌ ليس "Percentage Ratio Calculator" (ترجمة حرفية)
// ❌ ليس "Calculator of the Percentage" (ترجمة آلية)
```

### مصطلحات إسلامية وفقهية

```json
// ✅ صحيح: transliteration + شرح
"name_en": "Kaffarat al-Yamin Calculator"
"description_en": "Calculate the expiation for breaking an oath"

// ❌ خطأ: ترجمة حرفية تفقد الدقة
"name_en": "Oath Penalty Calculator"
```

## 7. مفاتيح الـ disclaimer

للأدوات التي تحتوي إخلاء مسؤولية (إسلامية، مالية، طبية):

```json
"ar": {
  "disclaimerTitle": "إخلاء مسؤولية",
  "disclaimer1": "هذه الأداة حاسبة فقط، ليست فتوى",
  "disclaimer2": "...",
  "disclaimer3": "..."
}
```

```html
<div class="tool-disclaimer">
  <h4>⚠️ {{tool.disclaimerTitle}}</h4>
  <div class="tool-disclaimer-item"><span>📌</span> {{tool.disclaimer1}}</div>
  <div class="tool-disclaimer-item"><span>📋</span> {{tool.disclaimer2}}</div>
</div>
```

## 8. مفتاح `shortName` للأدوات في المدونة

أدوات لها مقالات مدونة يجب أن يكون فيها `shortName`:

```json
"zakat-calculator": {
  "ar": {
    "name": "حاسبة الزكاة",
    "shortName": "الزكاة"  // ← يستخدم في dropdowns المدونة وbadges
  },
  "en": {
    "name": "Zakat Calculator",
    "shortName": "Zakat"
  }
}
```

build.js يعمل fallback إلى `name` لو `shortName` غير موجود.

## 9. UI strings مشتركة (لا تكررها)

نصوص تُستخدم عبر الأدوات (مثل "احسب"، "مسح"، "نسخ") موجودة في `ui` ولا تكررها في `tools`:

```json
"ui": {
  "ar": {
    "calculate": "احسب",
    "clear": "مسح",
    "copy": "نسخ",
    "result": "النتيجة"
  }
}
```

في القوالب: `{{ui.calculate}}` (لا `{{tool.calculate}}`).

## 10. مفاتيح الفئات (Categories)

```json
"categories": {
  "ar": {
    "calculators": {
      "name": "حاسبات",
      "icon": "🧮",
      "description": "حاسبات رياضية ومالية وصحية"
    }
  },
  "en": {
    "calculators": {
      "name": "Calculators",
      "icon": "🧮",
      "description": "Math, financial, and health calculators"
    }
  }
}
```

## 11. القائمة المرجعية لإضافة ترجمات أداة جديدة

عند إضافة أداة `my-tool`:

- [ ] إضافة `tools.my-tool.ar` بكل المفاتيح المطلوبة
- [ ] إضافة `tools.my-tool.en` بنفس المفاتيح
- [ ] التحقق من المفاتيح المحجوزة (لا تستخدمها كـ `{{tool.xxx}}` عدا `name/description/howToUseText`)
- [ ] `searchTerms` غني بالعامي والمصطلحات
- [ ] `metaDescription` بين 150-160 حرفاً
- [ ] `title` بين 50-60 حرفاً (يشمل ` | عُدّة` أو ` | Udda`)
- [ ] `shortName` لو الأداة ستحظى بمقالات مدونة
- [ ] لو إسلامي/مالي/طبي: مفاتيح disclaimer (`disclaimerTitle`, `disclaimer1`, ...)

## 12. مرجع سريع

- المعمارية → [`../01-ARCHITECTURE.md`](../01-ARCHITECTURE.md)
- قالب الأداة → [`tool-template.md`](tool-template.md)
- استراتيجية SEO → [`seo-strategy.md`](seo-strategy.md)
