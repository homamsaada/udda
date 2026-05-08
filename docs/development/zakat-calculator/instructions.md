# 📘 zakat-calculator — Instructions

> تعليمات خاصة بتطوير حاسبة الزكاة. للتعليمات العامة → [`../../standards/`](../../standards/).

---

## كيف تضيف نوع زكاة جديد (مثلاً زكاة المعادن)

### 1. أضف تبويباً في HTML
في `src/tools/zakat-calculator.html`، تحت `.zakat-calculator .calc-tabs`:
```html
<button class="calc-tab" onclick="switchZakatTab('minerals')">{{tool.mineralsTab}}</button>
```

ثم القسم نفسه:
```html
<div class="calc-section" id="minerals-section">
  <!-- UI الأداة -->
</div>
```

### 2. أضف مفاتيح i18n
في `src/data/i18n.json` تحت `tools.zakat-calculator.{lang}`:
```json
"mineralsTab": "زكاة المعادن",
"mineralsType": "نوع المعدن",
"mineralsWeight": "الوزن",
"mineralsValue": "القيمة السوقية"
```

### 3. أضف منطق الحساب
في `<script>` داخل ملف الأداة:
```js
window.calcMinerals = function() {
  // معادلة الحساب
};
```

### 4. حدّث `searchTerms` لتشمل المصطلح الجديد

### 5. اختبر:
- العربي والإنجليزي
- على الموبايل (320px, 480px)
- مع 0 أرقام
- مع أرقام كبيرة

---

## القواعد الإلزامية لهذه الأداة

1. **لا تتبنى رأياً واحداً عند الخلاف الفقهي** — اعرض الرأيين
2. **استخدم `var(--success)` للقيم الإيجابية** و `var(--warning)` للنصاب
3. **disclaimer دائماً ظاهر** — هذه أداة ليست فتوى
4. **النصاب يُحسب بالفضة دائماً** كحد أدنى
5. **الديون المؤجَّلة لا تُخصم بالكامل** — فقط الحالّة

---

## أخطاء شائعة لتجنّبها

| الخطأ | الإصلاح |
|---|---|
| استخدام نصاب الذهب مباشرة بدون مقارنة بالفضة | استخدم `min(goldNisab, silverNisab)` |
| نسيان خصم الديون | تذكّر `assets - currentDebts` |
| تجاهل اختلاف المذاهب في الأسهم | اعرض الرأيين |
| نسبة 0.025 في الكود مباشرة | استخدم ثابتاً `ZAKAT_RATE = 0.025` |

---

## 📎 مراجع

- المواصفة الكاملة → [`../../tools/zakat-calculator.spec.md`](../../tools/zakat-calculator.spec.md)
- الذاكرة (قرارات فقهية) → [`memory.md`](memory.md)
- قالب أداة جديدة → [`../../standards/tool-template.md`](../../standards/tool-template.md)
