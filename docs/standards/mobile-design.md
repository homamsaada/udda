# 📱 تصميم الموبايل | Mobile Design

> ⚠️ **حرج:** هذه القواعد ليست اقتراحات. مرجع التصميم الإلزامي على الموبايل هو **`inheritance-calculator`**. أي أداة جديدة يجب أن تقلّد أنماطها.

---

## 1. لماذا inheritance-calculator هي المرجع؟

- أعقد أداة في الموقع (4 مذاهب، حالات متعددة، ~2,861 سطر)
- اختُبرت تكراراً على الموبايل
- تتعامل مع كل التحديات: dropdowns، tabs، forms، results
- أنماطها مرنة وقابلة للتطبيق على أي أداة جديدة

## 2. القواعد الإلزامية (لا تخالفها)

### القاعدة 1 — لا تخترع أنماط تصميم جديدة

افتح `src/tools/inheritance-calculator.html` وقلّد أنماطها قبل إنشاء جديد.

### القاعدة 2 — كل حقل له label فوقه

```html
<!-- ✅ صحيح -->
<div class="form-group">
  <label for="amount">المبلغ</label>
  <input id="amount" type="number">
</div>

<!-- ❌ خطأ على الموبايل (حقل + label في نفس السطر) -->
<div class="row">
  <label>المبلغ:</label>
  <input type="number">
</div>
```

### القاعدة 3 — حقلان كحد أقصى في صف واحد

3 حقول أو أكثر في سطر واحد **ممنوع** على الموبايل.

```css
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

@media (max-width: 480px) {
  .form-row {
    grid-template-columns: 1fr; /* عمود واحد على الموبايل */
  }
}
```

### القاعدة 4 — التبويبات `flex-wrap: wrap` دائماً

**لا** `overflow-x: auto`. **لا** `flex-wrap: nowrap`. التبويبات تلتف وتنضغط.

```css
.calc-tabs {
  display: flex;
  flex-wrap: wrap;     /* ← إلزامي */
  gap: 8px;
}

.calc-tab {
  font-size: 0.95rem;
  padding: 10px 14px;
}

@media (max-width: 480px) {
  .calc-tab {
    font-size: 0.75rem;  /* ← إلزامي على الموبايل */
    padding: 8px 6px;
  }
}
```

**مرجع:** أزرار المذاهب في حاسبة المواريث.

### القاعدة 5 — لا عنصر يتجاوز عرض الشاشة

يسبب zoom out ويكسر الصفحة كلها.

```css
*, *::before, *::after {
  max-width: 100%;
  box-sizing: border-box;
}
```

### القاعدة 6 — الأزرار تصغّر خطها على الموبايل

```css
.btn {
  font-size: 0.95rem;
  padding: 10px 14px;
}

@media (max-width: 480px) {
  .btn {
    font-size: 0.75rem;
    padding: 8px 6px;
  }
}
```

### القاعدة 7 — `form-row` للحقلين، عمود واحد على الموبايل

(نفس القاعدة 3، تفاصيل أكثر في `tool-template.md`)

### القاعدة 8 — `<select>` يعرض كل الخيارات دائماً

**لا تخفِ خيارات** بـ `option.hidden = true` لتجنب اختيار نفس القيمة في dropdowns مختلفة.

```js
// ✅ صحيح: لو نفس الاختيار، أرجع المدخل كما هو
var converted = (fromSys === toSys) ? inputVal : convert(inputVal, fromSys, toSys);

// ❌ خطأ: إخفاء الخيار في القائمة الثانية يسبب مشاكل ظاهرة على الموبايل
```

### القاعدة 9 — عند الشك، افتح `inheritance-calculator` وقارن

## 3. Breakpoints الموقع

| Breakpoint | الفئة | تغييرات أساسية |
|---|---|---|
| Desktop > 1024px | Wide | sidebar ads، layout كامل |
| Tablet ≤ 1024px | Medium | إخفاء sidebar، إظهار mobile bottom ad |
| Mobile ≤ 768px | Small | تقليل padding، hero أصغر |
| Small Mobile ≤ 480px | XSmall | كل القواعد أعلاه |

## 4. Mobile Testing Checklist

قبل دمج أي أداة، اختبر على:

- [ ] **320px** (iPhone SE 1st gen) — لا overflow، كل شيء ظاهر
- [ ] **375px** (iPhone 12/13/14) — عادي
- [ ] **390px** (iPhone 15/16) — عادي
- [ ] **480px** (Android متوسط) — عادي
- [ ] **768px** (Tablet portrait)
- [ ] **1024px** (Tablet landscape / Small laptop)
- [ ] التبويبات تلتف ولا scroll أفقي
- [ ] الـ dropdowns تعمل ولا تُخفي خيارات
- [ ] الأزرار يمكن لمسها بسهولة (44×44 px على الأقل)
- [ ] لا zoom out تلقائي عند تحميل الصفحة
- [ ] RTL يعمل تماماً مثل LTR
- [ ] الأرقام والنصوص لا تتعدى عرض الشاشة

## 5. أخطاء شائعة وإصلاحها

| الخطأ | الإصلاح |
|---|---|
| `width: 500px` ثابت | `width: 100%; max-width: 500px` |
| `overflow-x: auto` للتبويبات | `flex-wrap: wrap` |
| 3 حقول في صف واحد | 2 كحد أقصى، أو 1 على الموبايل |
| `margin-left: 16px` | `margin-inline-start: 16px` |
| `font-size: 16px` ثابت | استخدم `rem` للقياس النسبي |
| Tooltip يخرج من الشاشة | استخدم `right: auto; left: 0;` على الموبايل |
| Modal بـ `width: 800px` | `width: 100%; max-width: 800px` |

## 6. أنماط من `inheritance-calculator` يجب نسخها

### 6.1 نمط أزرار المذاهب (tabs قابلة للالتفاف)

```css
.inheritance-calculator .madhab-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.inheritance-calculator .madhab-btn {
  flex: 1 1 auto;
  padding: 10px 14px;
  font-size: 0.9rem;
}

@media (max-width: 480px) {
  .inheritance-calculator .madhab-btn {
    font-size: 0.75rem;
    padding: 8px 6px;
    flex: 1 1 calc(50% - 4px);
  }
}
```

### 6.2 نمط form-row (حقلان متجاوران)

```css
.gpa-form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

@media (max-width: 480px) {
  .gpa-form-row {
    grid-template-columns: 1fr;
  }
}
```

## 7. مرجع سريع

- نظام التصميم → [`design-system.md`](design-system.md)
- المبادئ → [`../02-PRINCIPLES.md`](../02-PRINCIPLES.md)
- قالب أداة جديدة → [`tool-template.md`](tool-template.md)
