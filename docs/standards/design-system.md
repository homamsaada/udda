# 🎨 نظام التصميم | Design System

> المرجع الكامل لنظام التصميم في عُدّة. أي تطوير جديد يجب أن يلتزم بهذه المتغيرات والأنماط.

---

## 1. فلسفة النظام

- **متغيرات CSS هي الحقيقة الوحيدة للألوان** — لا hex hardcoded في كود الأدوات
- **logical properties بدلاً من physical** — لدعم RTL/LTR كامل
- **Dark/Light/Auto** عبر `[data-theme]` — كل المتغيرات تتبدل تلقائياً
- **توهج محيطي (ambient glow)** بدلاً من خلفيات صلبة

## 2. متغيرات CSS (المرجع الكامل)

### 2.1 ألوان الخلفية والنص

| متغير | فاتح | داكن | الاستخدام |
|---|---|---|---|
| `--bg-primary` | `#f8fafc` | `#0f172a` | خلفية الصفحة |
| `--bg-secondary` | `#ffffff` | `#1e293b` | البطاقات، الحقول |
| `--bg-tertiary` | `#f1f5f9` | `#334155` | الأقسام البديلة |
| `--text-primary` | `#0f172a` | `#f1f5f9` | النص الرئيسي |
| `--text-secondary` | `#475569` | `#94a3b8` | النص الثانوي |
| `--text-muted` | `#64748b` | `#64748b` | placeholders، التلميحات |
| `--border-color` | `#94a3b8` | `#334155` | الحدود |

### 2.2 ألوان الـ accent (لا تتغير بين الثيمات)

| متغير | القيمة | الاستخدام |
|---|---|---|
| `--accent-primary` | `#6366f1` (indigo) | اللون الأساسي للعلامة |
| `--accent-secondary` | `#8b5cf6` (violet) | لون ثانوي |
| `--accent-gradient` | indigo → violet | للأزرار، النتائج |
| `--accent-line` | indigo → violet → cyan | شريط البطاقات `::before` |

### 2.3 ألوان الحالة (Status colors)

| متغير | القيمة | المعنى |
|---|---|---|
| `--success` | `#22c55e` | إيجابي، طبيعي، ربح |
| `--success-dark` | `#16a34a` | تأكيد أقوى |
| `--warning` | `#f59e0b` | حذر، متوسط |
| `--warning-dark` | `#d97706` | حذر أعلى |
| `--warning-deeper` | `#b45309` | حذر أعمق |
| `--error` | `#ef4444` | سلبي، خطر، خسارة |
| `--error-dark` | `#dc2626` | تأكيد |
| `--error-deeper` | `#991b1b` | شديد (مثل سمنة شديدة) |
| `--info` | `#3b82f6` (light) / `#60a5fa` (dark) | معلومة |

### 2.4 ألوان مساعدة (تتغير بين الثيمات)

| متغير | فاتح | داكن |
|---|---|---|
| `--accent-dark` | `#7c3aed` | `#7c3aed` |
| `--pink` | `#ec4899` | `#f472b6` |
| `--pink-dark` | `#831843` | `#831843` |
| `--pink-light` | `#fce7f3` | `rgba(236,72,153,0.15)` |
| `--teal` | `#059669` | `#34d399` |
| `--teal-dark` | `#047857` | `#059669` |

### 2.5 ألوان الرسوم البيانية

| متغير | فاتح | داكن |
|---|---|---|
| `--chart-text` | `#374151` | `#E5E7EB` |
| `--chart-grid` | `#E5E7EB` | `#374151` |
| `--chart-bg` | `#FFFFFF` | `#1F2937` |
| `--chart-text-secondary` | `#4b5563` | `#94a3b8` |
| `--chart-muted` | `#6b7280` | `#6b7280` |

### 2.6 الظلال والتوهج

```css
var(--shadow-sm)              /* ظل خفيف */
var(--shadow-md)              /* ظل متوسط */
var(--shadow-lg)              /* ظل أقوى */
var(--shadow-xl)              /* ظل كبير */

var(--card-border)            /* حد البطاقات */
var(--card-shadow)            /* ظل البطاقات الافتراضي */
var(--card-shadow-hover)      /* ظل البطاقات عند hover */
var(--btn-glow)               /* توهج الأزرار */
var(--btn-glow-hover)         /* توهج الأزرار عند hover */
```

### 2.7 الأبعاد والانتقالات

```css
var(--header-height)          /* 64px */
var(--border-radius)          /* 12px (افتراضي) */
var(--border-radius-lg)       /* 16px */
var(--border-radius-xl)       /* 24px */

var(--transition-fast)        /* 0.15s ease */
var(--transition-normal)      /* 0.3s ease */
var(--transition-slow)        /* 0.5s ease */
```

## 3. نمط البطاقات (Card Pattern)

### 3.1 البطاقة الكاملة (مع شريط علوي)

تُطبَّق على: `.tool-grid-card`, `.category-card`, `.similar-tool-card`, `.blog-post-card`, `.blog-related-tool-card`, `.blog-subcat-card`

```css
.my-card {
  position: relative;
  overflow: hidden;
  border: var(--card-border);
  box-shadow: var(--card-shadow);
  border-radius: var(--border-radius-lg);
  transition: all var(--transition-normal);
}

.my-card::before {
  content: "";
  position: absolute;
  top: 0;
  inset-inline-start: 0;
  inset-inline-end: 0;
  height: 3px;
  background: var(--accent-line);
}

.my-card:hover {
  box-shadow: var(--card-shadow-hover);
  border-color: rgba(99, 102, 241, 0.35);
}
```

### 3.2 البطاقة بدون شريط

تُستخدم لـ `.calc-section` (أقسام داخل أداة، ليست بطاقات رئيسية).
نفس النمط أعلاه **بدون** `::before`.

## 4. التوهج المحيطي (Ambient Glow)

خلفية الصفحة تستخدم 5 radial gradients من عائلة الأزرق/السماوي:

| متغير | الموقع | المقاس |
|---|---|---|
| `--glow-1` | top right | 900px |
| `--glow-2` | center left | 700px |
| `--glow-3` | bottom left | 800px |
| `--glow-4` | far bottom left | 400px |
| `--glow-5` | top left | 500px |

**شدة التوهج:**
- Desktop light: 0.50–0.65
- Desktop dark: 0.45–0.60
- Mobile (≤768px): 0.15–0.25 (مُخفّض لتجنب الإلهاء)

## 5. الطباعة (Typography)

```css
font-family: 'Tajawal', 'Segoe UI', system-ui, sans-serif;
```

- **العربي:** Tajawal أولاً
- **الإنجليزي:** Segoe UI أولاً ثم Tajawal

**الأوزان المستخدمة:** 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

## 6. RTL/LTR Support

استخدم **logical properties** دائماً:

```css
/* ✅ صحيح */
margin-inline-start: 8px;
padding-inline-end: 12px;
border-inline-start: 1px solid;

/* ❌ خطأ — لا يحترم RTL */
margin-left: 8px;
padding-right: 12px;
border-left: 1px solid;
```

عند الحاجة للتخصيص:

```css
[dir="rtl"] .my-element { /* خاص بـ RTL */ }
[dir="ltr"] .my-element { /* خاص بـ LTR */ }
```

## 7. Scoping CSS

كل أداة لها wrapper class. كل قواعد CSS الخاصة بالأداة تُكتب تحت هذا الـ class:

```css
/* ✅ صحيح — مَحجوز بـ wrapper */
.zakat-calculator .calc-tab { ... }
.zakat-calculator .price-bar { ... }

/* ❌ خطأ — يؤثر على أدوات أخرى */
.calc-tab { ... }
.price-bar { ... }
```

أمثلة wrapper classes حالية:
- `.zakat-calculator`
- `.inheritance-calculator`
- `.kaffara-calculator`
- `.gpa-calculator`
- `.ai-readiness`

## 8. Breakpoints الاستجابة

| Breakpoint | التغييرات |
|---|---|
| ≤1024px | إخفاء `.ad-sidebar`، إظهار `.ad-bottom-sticky` |
| ≤768px | تقليل padding، hero أصغر، تخطيطات مدمجة |
| ≤480px | search bar مدمج، header أصغر، 2-col categories |

## 9. Migrations

### تحويل hex hardcoded إلى متغيرات

| Hardcoded | استبدله بـ |
|---|---|
| `#3b82f6` | `var(--info)` |
| `#22c55e` | `var(--success)` |
| `#f59e0b` | `var(--warning)` |
| `#ef4444` | `var(--error)` |
| `#dc2626` | `var(--error-dark)` |
| `#991b1b` | `var(--error-deeper)` |
| `#16a34a` | `var(--success-dark)` |
| `#d97706` | `var(--warning-dark)` |
| `#ec4899` | `var(--pink)` |
| `#059669` | `var(--teal)` |

### تحويل inline styles إلى classes

```html
<!-- ❌ خطأ -->
<div style="color: #ef4444;">خطأ</div>

<!-- ✅ صحيح -->
<div class="text-error">خطأ</div>
<style>
.my-tool .text-error { color: var(--error); }
</style>
```

## 10. ملاحظة عن الثيم الداكن

الثيم الداكن **لا** يعيد تعريف:
- `--accent-primary`
- `--accent-secondary`
- `--accent-gradient`

يعيد تعريف فقط: الخلفيات، النصوص، الحدود، الظلال، بعض الألوان المساعدة.

السبب: لون العلامة (indigo + violet) يبقى ثابتاً في كل الثيمات.

## 11. مرجع سريع

- المعمارية → [`../01-ARCHITECTURE.md`](../01-ARCHITECTURE.md)
- المبادئ → [`../02-PRINCIPLES.md`](../02-PRINCIPLES.md)
- تصميم الموبايل → [`mobile-design.md`](mobile-design.md)
- قالب أداة جديدة → [`tool-template.md`](tool-template.md)
