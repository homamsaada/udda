# 🛠️ قالب أداة جديدة | New Tool Template

> دليل خطوة-بخطوة لإنشاء أداة جديدة بالكامل. اتبعه كقائمة تحقق.

---

## نظرة عامة على الخطوات

1. تخطيط (قبل أي كود)
2. إضافة ترجمات (`i18n.json`)
3. تسجيل الأداة (`tools.json`)
4. كتابة قالب HTML (`src/tools/{id}.html`)
5. (اختياري) إخلاء مسؤولية لو إسلامي/مالي/طبي
6. بناء + اختبار محلي
7. اختبار ثنائي اللغة + الموبايل
8. تحديث `04-PROGRESS.md`

---

## الخطوة 1: التخطيط

قبل كتابة أي كود، أجب عن:

- [ ] **ما الذي تحسبه/تحوّله/تولّده الأداة؟**
- [ ] **من جمهورها؟** (طلاب، موظفون، مسلمون، مهتمون بـ AI...)
- [ ] **ما الكلمات المفتاحية المستهدفة؟** عربي + إنجليزي + عامي
- [ ] **ما الحقول المطلوبة؟ (inputs)**
- [ ] **ما المخرجات؟** (outputs/results)
- [ ] **هل تحتاج إخلاء مسؤولية؟** (إسلامي/مالي/طبي)
- [ ] **في أي تصنيف؟** calculators / converters / text / datetime / generators / image / developers / everyday
- [ ] **ما الأدوات ذات الصلة؟** (للـ `related` array)

---

## الخطوة 2: إضافة الترجمات في `src/data/i18n.json`

أضف تحت `"tools"`:

```json
"my-tool": {
  "ar": {
    "name": "اسم الأداة",
    "title": "اسم الأداة - وصف قصير | عُدّة",
    "metaDescription": "وصف SEO بالعربي بين 150-160 حرفاً.",
    "keywords": "كلمة1، كلمة2، كلمة3",
    "description": "وصف قصير يظهر تحت اسم الأداة",
    "searchTerms": "كلمات بحث متنوعة بالعامي والفصحى والإنجليزي",
    "howToUseText": "شرح مختصر لكيفية الاستخدام",
    "shortName": "الاسم المختصر للمدونة (اختياري)",

    "customKey1": "نص مخصص 1",
    "customKey2": "نص مخصص 2"
  },
  "en": {
    "name": "Tool Name",
    "title": "Tool Name - Short Description | Udda",
    "metaDescription": "English SEO description (150-160 chars).",
    "keywords": "keyword1, keyword2, keyword3",
    "description": "Short description shown under tool name",
    "searchTerms": "various search terms synonyms misspellings",
    "howToUseText": "Brief usage instructions",
    "shortName": "Short Name (optional)",

    "customKey1": "Custom text 1",
    "customKey2": "Custom text 2"
  }
}
```

**القواعد:**
- المفاتيح المحجوزة (`name`, `title`, `metaDescription`, `keywords`, `description`, `searchTerms`, `howToUseText`) لا تستخدمها كـ `{{tool.xxx}}` (عدا `name`, `description`, `howToUseText`)
- المفاتيح المخصصة (أي مفتاح آخر) تصبح متاحة كـ `{{tool.customKey1}}`
- التفاصيل الكاملة → [`i18n-conventions.md`](i18n-conventions.md)

---

## الخطوة 3: تسجيل الأداة في `src/data/tools.json`

```json
{
  "id": "my-tool",
  "category": "calculators",
  "icon": "🔢",
  "popular": true,
  "new": true,
  "related": ["percentage", "other-tool"]
}
```

| الحقل | إلزامي؟ | الملاحظات |
|---|---|---|
| `id` | ✅ | يجب أن يطابق المفتاح في `i18n.tools` و اسم ملف HTML |
| `category` | ✅ | calculators / converters / text / datetime / generators / image / developers / everyday |
| `icon` | ✅ | emoji واحد |
| `popular` | اختياري | `true` لإظهار الأداة في "أدوات شائعة" (مستقبلاً) |
| `new` | اختياري | `true` لإضافة شارة "جديد" |
| `related` | ✅ | 3-5 IDs لأدوات ذات صلة |
| `subcategory` | اختياري | `"other"` للأدوات الفرعية في صفحة التصنيف |

---

## الخطوة 4: قالب HTML `src/tools/my-tool.html`

```html
<!-- Tool: My Tool -->
<div class="my-tool tool-card">
  <div class="tool-header">
    <div class="tool-icon">🔢</div>
    <div>
      <h1 class="tool-title">{{tool.name}}</h1>
      <p class="tool-description">{{tool.description}}</p>
    </div>
  </div>

  <!-- Tool UI here -->
  <div class="my-tool-content">
    <div class="form-group">
      <label for="input1">{{tool.input1Label}}</label>
      <input id="input1" type="number" oninput="myToolCalc()">
    </div>

    <div class="form-row">
      <div class="form-group">
        <label for="input2">{{tool.input2Label}}</label>
        <input id="input2" type="number" oninput="myToolCalc()">
      </div>
      <div class="form-group">
        <label for="input3">{{tool.input3Label}}</label>
        <input id="input3" type="number" oninput="myToolCalc()">
      </div>
    </div>

    <div class="result-box">
      <span class="result-label">{{ui.result}}</span>
      <span class="result-value" id="result">—</span>
    </div>
  </div>
</div>

<!-- How to Use -->
<div class="how-to-use">
  <h3>📖 {{ui.howToUse}}</h3>
  <p>{{tool.howToUseText}}</p>
</div>

<!-- Disclaimer (لو إسلامي/مالي/طبي) -->
<div class="tool-disclaimer">
  <h4>⚠️ {{tool.disclaimerTitle}}</h4>
  <div class="tool-disclaimer-item"><span>📌</span> {{tool.disclaimer1}}</div>
  <div class="tool-disclaimer-item"><span>📋</span> {{tool.disclaimer2}}</div>
</div>

<!-- Scoped Styles -->
<style>
.my-tool {
  /* استخدم متغيرات CSS، لا hex */
}

.my-tool .my-tool-content {
  display: grid;
  gap: 16px;
}

.my-tool .form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.my-tool .result-box {
  padding: 16px;
  background: var(--bg-secondary);
  border-radius: var(--border-radius);
  border: var(--card-border);
}

.my-tool .result-value {
  font-weight: 700;
  color: var(--accent-primary);
  font-size: 1.5rem;
}

@media (max-width: 480px) {
  .my-tool .form-row {
    grid-template-columns: 1fr;
  }
}
</style>

<!-- Scoped Script -->
<script>
(function() {
  var lang = document.documentElement.lang || 'ar';
  var isArabic = lang === 'ar';

  function $(id) { return document.getElementById(id); }

  function getNum(id) {
    var v = parseFloat($(id).value);
    return isNaN(v) ? 0 : v;
  }

  // Public — referenced in HTML oninput
  window.myToolCalc = function() {
    var input1 = getNum('input1');
    var input2 = getNum('input2');
    var input3 = getNum('input3');

    if (!input1 || !input2 || !input3) {
      $('result').textContent = '—';
      return;
    }

    var result = input1 + input2 + input3;  // المعادلة الحقيقية هنا
    $('result').textContent = App.formatNumber(result);
  };
})();
</script>
```

---

## الخطوة 5: قواعد الكود (إلزامية)

### CSS
- ✅ كل القواعد تحت wrapper class (`.my-tool .x`)
- ✅ متغيرات CSS فقط، لا hex
- ✅ logical properties (`margin-inline-start` لا `margin-left`)
- ✅ استجابة موبايل (`@media (max-width: 480px)`)

### JavaScript
- ✅ IIFE wrapping
- ✅ `window.x` فقط للدوال المستخدمة في HTML
- ✅ helpers خاصة داخل IIFE
- ✅ استخدم `App.formatNumber()`, `App.copyToClipboard()`, `App.showToast()` من `app.js`

### HTML
- ✅ كل النصوص عبر `{{tool.xxx}}` أو `{{ui.xxx}}`
- ✅ بنية ثابتة: `tool-card` → `how-to-use` → `tool-disclaimer` (إن لزم)
- ✅ form-group لكل حقل (label فوقه)
- ✅ form-row لحقلين متجاورين

---

## الخطوة 6: البناء والاختبار المحلي

```bash
npm run build
npm run serve
```

افتح:
- `http://localhost:3000/ar/tools/my-tool.html`
- `http://localhost:3000/en/tools/my-tool.html`

---

## الخطوة 7: اختبار شامل

استخدم [`testing-checklist.md`](testing-checklist.md) كقائمة تحقق كاملة. النقاط الجوهرية:

- [ ] الأداة تعمل بالعربي والإنجليزي
- [ ] RTL يعمل تماماً
- [ ] اختبار على 320px / 480px / 768px / 1024px
- [ ] الثيم الفاتح والداكن والتلقائي
- [ ] لوحة المفاتيح (Tab navigation)
- [ ] copy/share يعمل
- [ ] لا errors في console
- [ ] meta tags موجودة (View Source)
- [ ] Schema.org JSON-LD صالح
- [ ] الصفحة في sitemap.xml بعد البناء

---

## الخطوة 8: التحديثات النهائية

- [ ] أضف الأداة لـ [`../04-PROGRESS.md`](../04-PROGRESS.md) تحت "مكتمل"
- [ ] لو الأداة معقدة، اكتب spec في `docs/tools/{tool-id}.spec.md`
- [ ] فكّر في 1-3 مقالات مدونة لها (راجع [`content-strategy.md`](content-strategy.md))
- [ ] راجع [`../03-ROADMAP.md`](../03-ROADMAP.md) — هل توسّع الأداة معروف؟

---

## مكونات جاهزة للاستخدام

### Result Box (نتيجة بارزة)
```html
<div class="result-box">
  <span class="result-label">{{ui.result}}</span>
  <span class="result-value">—</span>
</div>
```

### Tabs (تبويبات)
```html
<div class="calc-tabs">
  <button class="calc-tab active" onclick="switchTab('tab1')">{{tool.tab1}}</button>
  <button class="calc-tab" onclick="switchTab('tab2')">{{tool.tab2}}</button>
</div>
<div class="calc-section active" id="tab1-section">...</div>
<div class="calc-section" id="tab2-section">...</div>
```

### Stats Grid (شبكة إحصائيات)
```html
<div class="stats-grid">
  <div class="stat-card">
    <div class="stat-value">85</div>
    <div class="stat-label">{{tool.stat1Label}}</div>
  </div>
</div>
```

### Copy Button + Toast
```js
window.copyResult = function() {
  navigator.clipboard.writeText(result).then(function() {
    App.showToast(isArabic ? 'تم النسخ!' : 'Copied!');
  });
};
```

### CSV Export (بدون CDN)
```js
function exportCsv(rows, filename) {
  var bom = '﻿';
  var csv = rows.map(function(r) {
    return r.map(function(c) { return '"' + String(c).replace(/"/g, '""') + '"'; }).join(',');
  }).join('\n');
  var blob = new Blob([bom + csv], { type: 'text/csv;charset=utf-8' });
  var a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
}
```

---

## مرجع سريع

- نظام التصميم → [`design-system.md`](design-system.md)
- تصميم الموبايل → [`mobile-design.md`](mobile-design.md)
- قواعد الترجمة → [`i18n-conventions.md`](i18n-conventions.md)
- استراتيجية SEO → [`seo-strategy.md`](seo-strategy.md)
- اختبار قبل الدمج → [`testing-checklist.md`](testing-checklist.md)
