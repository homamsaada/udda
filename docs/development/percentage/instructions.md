# 📘 percentage — Instructions

---

## كيف تضيف حاسبة فرعية جديدة

### 1. أضف HTML block
```html
<div class="calc-row-inline">
  <div class="calc-title">{{tool.calc14Title}}:</div>
  <span class="calc-label">{{tool.label1}}</span>
  <input type="number" class="calc-input-sm" id="calc14-input1" oninput="calculate(14)">
  <!-- ... -->
  <span class="calc-result" id="result14">—</span>
  <div class="result-controls">
    <button onclick="adjustPrecision(14, -1)">−</button>
    <button onclick="adjustPrecision(14, 1)">+</button>
    <button onclick="copyResult(14)">📋</button>
  </div>
</div>
```

### 2. أضف i18n
في `tools.percentage.{lang}`:
```json
"calc14Title": "اسم الحاسبة",
"label1": "تسمية الحقل"
```

### 3. حدّث JS
- زِد الحلقة: `for (let i = 1; i <= 14; i++)`
- لو النتيجة `%`: أضف `14` لـ `isPercent`
- لو قد تكون سالبة: أضف `14` لـ `signed`
- أضف `case 14` في switch داخل `calculate()`

### 4. اختبر
- مدخلات صحيحة → نتيجة صحيحة
- مدخل فارغ → `—`
- موبايل (320px)

---

## 📎 [`../../tools/percentage.spec.md §4`](../../tools/percentage.spec.md) للتفاصيل · [`memory.md`](memory.md)
