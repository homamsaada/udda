# ⚓ المبادئ الثابتة | Principles

> هذه المبادئ هي **إطار اتخاذ القرار**. حين نختلف على شيء، نعود إليها. تتغير ببطء شديد، وبقرار واعٍ موثَّق.

---

## 1. مبادئ تقنية ثابتة

| # | المبدأ | السبب |
|---|---|---|
| 1 | **Vanilla JS فقط** | لا تعقيد framework، تحميل أسرع، استقلالية |
| 2 | **لا CDN في الإنتاج** | خصوصية المستخدم، لا تتبع طرف ثالث، يعمل offline |
| 3 | **Bilingual by default** | الموقع عربي/إنجليزي من البداية، ليس ترقيعاً |
| 4 | **Static-only** | لا backend، لا DB، لا runtime cost |
| 5 | **Privacy-first** | كل الحسابات client-side، لا جمع بيانات |
| 6 | **Mobile-first** | أكثرية المستخدمين على الموبايل |
| 7 | **Accessibility default** | aria-labels، دعم لوحة المفاتيح، تباين كافٍ |
| 8 | **Free + ads فقط** | لا اشتراكات، لا paywalls، إعلانات AdSense غير مزعجة |
| 9 | **Full RTL/LTR** | logical properties، اتجاهات، خطوط |
| 10 | **Single source of truth** | `i18n.json` + `tools.json` |

**الاستثناء الوحيد:** `markdown-it` (npm) — مرخّص MIT، يستخدم وقت البناء فقط، لا يُحمَّل في المتصفح.

## 2. مبادئ المحتوى

### 2.1 الأدوات الإسلامية (zakat, inheritance, kaffara, ...)

- **إخلاء مسؤولية إلزامي** — "هذه الأداة حاسبة فقط، ليست فتوى"
- **مراجع فقهية واضحة** — أي معادلة أو رأي يستند لمذهب أو إجماع
- **مصطلحات فقهية صحيحة** — "نصاب"، "حول"، "عَول"، "رَدّ"، "حَجب"، "مُقاسمة" بدقة
- **transliteration بالإنجليزي** — "Kaffarat al-Yamin" لا "oath penalty"
- **عند تعدد المذاهب** — اعرض الخيارات (حنفي، مالكي، شافعي، حنبلي) لا مذهب واحد فقط
- **لا فتوى** — الأداة لا تقول "افعل كذا"، بل "إذا أردت احتساب كذا حسب المذهب الفلاني، فالناتج كذا"

### 2.2 الأدوات المالية بفائدة (interest, loan)

- **تحذير الربا إلزامي** — "الفائدة الربوية محرّمة في الشريعة الإسلامية بإجماع العلماء"
- **عرض الأداة كأداة تعليمية / مقارنة بدائل** — لا كتشجيع
- **توجيه للبدائل الإسلامية حين يمكن**

### 2.3 الأدوات الطبية/الصحية (body-calculator)

- **"استشر طبيباً"** — لا تستبدل الاستشارة الطبية
- **عرض المعادلات والمراجع** — BMI من WHO، BMR من Mifflin-St Jeor، إلخ
- **تحذير الفئات الخاصة** — حوامل، رياضيون، أطفال، كبار السن

### 2.4 قاعدة عامة للترجمة

> الترجمة ليست حرفية. كل نص عربي يُكتب بفهم السياق العربي/الإسلامي، لا يُترجم آلياً من الإنجليزي. والعكس: النص الإنجليزي ليس ترجمة جامدة من العربي، بل صياغة مناسبة للسياق الإنجليزي.

## 3. مبادئ الكود

### 3.1 JavaScript

- **IIFE wrapping إلزامي** لكل JS أداة:
  ```js
  (function() {
    var lang = document.documentElement.lang || 'ar';

    // private helpers
    function helper() { /* ... */ }

    // public — referenced in HTML oninput="myCalc()"
    window.myCalc = function() { /* ... */ };
  })();
  ```
- **`window.x` فقط للدوال المستخدمة في HTML** (`onclick`, `oninput`)
- **لا polyfills بلا حاجة** — نستهدف المتصفحات الحديثة (آخر سنتين)
- **لا CDN scripts** — كل JS محلي

### 3.2 CSS

- **Scoped CSS عبر wrapper class:**
  ```css
  /* ✅ صحيح */
  .zakat-calculator .calc-tab { ... }

  /* ❌ خطأ — يؤثر على أدوات أخرى */
  .calc-tab { ... }
  ```
- **CSS variables بدلاً من hex hardcoded:**
  ```css
  /* ✅ صحيح */
  color: var(--success);

  /* ❌ خطأ */
  color: #22c55e;
  ```
- **Logical properties بدلاً من physical:**
  ```css
  /* ✅ صحيح — يعمل في RTL و LTR */
  margin-inline-start: 8px;

  /* ❌ خطأ — لا يحترم RTL */
  margin-left: 8px;
  ```
- **Card pattern موحد:** `card-border` + `card-shadow` + `::before` stripe (للبطاقات الرئيسية فقط)

### 3.3 HTML

- **Placeholders `{{tool.xxx}}` فقط** — لا hardcoded عربي/إنجليزي في القوالب
- **المفاتيح المحجوزة لا تُستخدم كـ placeholders:** `name`, `title`, `metaDescription`, `keywords`, `description`, `searchTerms`, `howToUseText`
- **بنية القسم الموحدة لكل أداة:**
  1. `tool-card` (header + UI)
  2. `how-to-use`
  3. `tool-disclaimer` (إن لزم — إسلامي/مالي/طبي)
  4. (related tools يُحقن تلقائياً من `build.js`)

## 4. مبادئ التصميم

### 4.1 الموبايل (مرجع: `inheritance-calculator`)

- كل حقل له label فوقه (`form-group`)
- حقلان كحد أقصى في الصف الواحد
- التبويبات `flex-wrap: wrap` دائماً (لا scroll أفقي)
- لا عنصر يتجاوز عرض الشاشة (`box-sizing: border-box`، `max-width: 100%`)
- الأزرار 0.75rem و padding مضغوط على الموبايل
- التفاصيل الكاملة → `.claude/rules/mobile-design.md` (سيُنقل لـ `docs/standards/mobile-design.md`)

### 4.2 الثيم

- Dark/Light/Auto عبر `[data-theme]` attribute
- متغيرات CSS تتبدل، لا hex hardcoded
- خلفية toned مع ambient glow (5 radial gradients)
- الـ accent color (indigo + violet + cyan) لا يتغير بين الثيمات

## 5. مبادئ الـ UX

- **نتائج فورية حين يمكن** — `oninput` لا submit button (مثال: حاسبة النسبة)
- **Copy / Share / Favorite** متاحة عبر settings panel
- **مفاتيح اختصار:** `Ctrl/Cmd + K` للبحث، `Esc` للإغلاق
- **Toast notifications** للإجراءات (نسخ، إضافة مفضلة)
- **لا modal popups إلا للضرورة**
- **لا redirect بلا سبب**
- **breadcrumbs واضحة** — المستخدم يعرف موقعه دائماً

## 6. مبادئ SEO

- **Title + meta description لكل صفحة** — title 50-60 حرف، description 150-160 حرف
- **`hreflang` + `canonical`** — لكل صفحة نسختان (ar, en) و x-default للعربي
- **Schema.org structured data** — `WebApplication` للأدوات، `Article` للمدونة، `FAQPage` حين يلزم، `Quiz` لأداة الجاهزية
- **`searchTerms` غنية بالعامي** — مثال للنسبة: "بالميه" + "بالمئة" + "نسبة" + "%" + "percentage" + "خصم" + "تخفيض"
- **Pillar / sub-articles في المدونة** — مقال رئيسي + مقالات فرعية مرتبطة (مثال: زكاة المال = pillar، زكاة الذهب = sub)
- **Internal linking** — كل أداة تحوي related tools، كل مقال يحوي related tool card

## 7. مبادئ ما لا نفعله

| ❌ نتجنب | لماذا |
|---|---|
| جمع بيانات شخصية | خصوصية المستخدم |
| تتبّع تحليلي مفصّل | نكتفي بالحد الأدنى المجهول |
| تسجيل/حسابات | تعقيد بلا داعٍ |
| Backend/DB | يخالف الفلسفة |
| CDN في الإنتاج | تتبع طرف ثالث |
| Frameworks (React/Vue/Svelte/...) | تعقيد، حجم، ليس ضرورياً |
| Dark patterns | لن نخدع المستخدم لأي سبب |
| إعلانات تطفلية | popups, autoplay video, layout shifts |
| "Coming soon" pages | إما الأداة جاهزة، أو لا توجد |
| Hardcoded text بالعربي/الإنجليزي في القوالب | كل النصوص عبر `i18n.json` |
| Hardcoded hex colors | كل الألوان عبر CSS variables |
| Inline styles بدل classes | `style="color:#xxx"` ممنوع |
| Skip hooks (`--no-verify`) | لا نتجاوز الفحوصات |

## 8. تحديث المبادئ

تُعدَّل هذه الوثيقة فقط بعد:

1. اقتراح صريح من Homam
2. نقاش يوضح **لماذا** المبدأ القديم لم يعد يخدم
3. توثيق التغيير في `decisions/` (مستقبلاً) مع التاريخ والسبب

## 9. مرجع سريع

- الرؤية → [`00-VISION.md`](00-VISION.md)
- المعمارية → [`01-ARCHITECTURE.md`](01-ARCHITECTURE.md)
- الخطة → [`03-ROADMAP.md`](03-ROADMAP.md)
- الحالة → [`04-PROGRESS.md`](04-PROGRESS.md)
