# 🔢 حاسبة النسبة المئوية | Percentage Calculator Spec

> 13 حاسبة فرعية للنسبة المئوية بصيغة "math sentence" — كلها فورية بدون submit.
>
> **ID:** `percentage` · **التصنيف:** `calculators` · **الأيقونة:** 🔢

---

## 1. نظرة عامة

### الجمهور
- المستخدم العام (الطلاب، الموظفون، التجار)
- من يحتاج حساب نسبة مئوية سريعاً (خصم، ضريبة، تغيّر، ربح)

### النمط
كل حاسبة عبارة عن **جملة رياضية** أفقية:
```
ما هي نسبة [10] % من [200] = [20]
```

## 2. الـ13 حاسبة الفرعية

| # | المعادلة | المُدخلات | الـ ID |
|---|---|---|---|
| 1 | X% من Y | percent, number | `calc1` |
| 2 | X من Y = ?% | part, whole | `calc2` |
| 3 | تغيّر النسبة | from, to | `calc3` (signed) |
| 4 | السعر بعد الخصم | price, discount% | `calc4` |
| 5 | الرقم بعد إضافة نسبة | number, percent% | `calc5` |
| 6 | السعر قبل الخصم | discount%, final | `calc6` |
| 7 | الربح/الخسارة | buy, sell | `calc7` (signed) |
| 8 | الكسر إلى نسبة | numerator, denominator | `calc8` (isPercent) |
| 9 | السعر مع الضريبة | price, tax% | `calc9` |
| 10 | السعر قبل الضريبة | priceWithTax, tax% | `calc10` |
| 11 | هامش الربح | cost, soldFor | `calc11` (isPercent + signed) |
| 12 | جزء من المجموع | part, total | `calc12` (isPercent) |
| 13 | الخصم المتتالي | first%, second% | `calc13` (isPercent) |

### قاعدة "isPercent" و "signed"

في `calculate(id)`:
- `isPercent = [2, 8, 11, 12, 13]` → النتيجة تظهر بـ `%`
- `signed = [3, 7, 11]` → النتيجة قد تكون سالبة، تُلوَّن أحمر/أخضر

## 3. الـ UI Pattern

كل حاسبة سطر أفقي:
```html
<div class="calc-row-inline">
  <div class="calc-title">حاسبة النسبة:</div>
  <span class="calc-label">ما هي نسبة</span>
  <input class="calc-input-sm" oninput="calculate(1)">
  <span class="calc-label">% من</span>
  <input class="calc-input-sm" oninput="calculate(1)">
  <span class="calc-label">=</span>
  <span class="calc-result">—</span>
  <div class="result-controls">
    <button onclick="adjustPrecision(1, -1)">−</button>
    <button onclick="adjustPrecision(1, 1)">+</button>
    <button onclick="copyResult(1)">📋</button>
  </div>
</div>
```

## 4. إضافة حاسبة جديدة (sub-calculator)

(نقلاً من `../standards/tool-template.md`)

1. أضف HTML block بنمط `calc-row-inline` مع `id="calcN-*"` و `id="resultN"`
2. أضف ترجمات في `i18n.json` تحت `percentage.{lang}.calcNTitle`
3. حدّث الـ JS:
   - زِد `for (let i = 1; i <= N; i++)`
   - أضف `N` لـ `isPercent` لو النتيجة `%`
   - أضف `N` لـ `signed` لو يمكن أن تكون سالبة
   - أضف `case N` في switch داخل `calculate()`
4. `npm run build`

## 5. الملاحظات المعمارية

### الملف
```
src/tools/percentage.html (~560 سطر)
```

### Wrapper class
`.percentage` (لكنّ الأداة تستخدم classes عامة مثل `calc-row-inline` لأنها بسيطة)

### Reactivity
كل input له `oninput="calculate(N)"` → نتيجة فورية.

## 6. التطوير المستقبلي

> 📊 **القائمة الحيّة + المهام الفعلية** → [`../development/percentage/`](../development/percentage/)

- 📋 إضافة "ضريبة قيمة مضافة (VAT)" مخصصة لكل بلد
- 📋 حاسبة الفوائد المركبة كنسبة (تكرار n مرة)
- 📋 مقالات مدونة (دليل النسب المئوية، حاسبات الخصم المتتالي)

## 7. روابط

- قالب الأداة → [`../standards/tool-template.md`](../standards/tool-template.md)
- معايير الترجمة → [`../standards/i18n-conventions.md`](../standards/i18n-conventions.md)
