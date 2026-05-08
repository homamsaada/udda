# 📘 body-calculator — Instructions

> تعليمات خاصة بحاسبة الجسم.

---

## كيف تضيف معادلة جديدة (مثلاً Hamwi للـ IBW)

### 1. وثّق المرجع الطبي
في [`memory.md`](memory.md):
- اسم المعادلة + المرجع (مجلة، سنة)
- مقارنة بالمعادلة الحالية (Devine)
- في أي حالات تكون أدقّ

### 2. أضف خياراً في UI
```html
<select id="ibw-formula" onchange="calculateIBW()">
  <option value="devine">Devine (الافتراضي)</option>
  <option value="hamwi">Hamwi</option>
</select>
```

### 3. أضف منطق الحساب
```js
function calculateIBW() {
  var formula = $('#ibw-formula').value;
  var ibw;
  if (formula === 'devine') {
    ibw = /* Devine formula */;
  } else if (formula === 'hamwi') {
    ibw = /* Hamwi formula */;
  }
  $('#ibw-result').textContent = ibw.toFixed(1);
}
```

### 4. حدّث i18n
- `tools.body-calculator.{lang}.ibwHamwi`
- `tools.body-calculator.{lang}.ibwFormula`

---

## القواعد الإلزامية

1. **disclaimer الطبي إلزامي** ودائم الظهور
2. **عرض المعادلة + المرجع** بصرياً (شفافية)
3. **تنبيه الفئات الخاصة** — حوامل، أطفال، رياضيون
4. **قيم خارج المعقول → رسالة** (مثلاً BMI > 80)
5. **استخدم متغيرات CSS** (لا hex hardcoded حتى للألوان الطبية)

---

## أخطاء شائعة

| الخطأ | الإصلاح |
|---|---|
| استخدام Harris-Benedict القديمة | Mifflin-St Jeor الأحدث |
| نسيان تنبيه الحوامل | اعرض دائماً |
| تطبيق BMI على الأطفال | أضف تنبيه + منحنيات نمو منفصلة |

---

## 📎 مراجع

- المواصفة → [`../../tools/body-calculator.spec.md`](../../tools/body-calculator.spec.md)
- المراجع الطبية → [`memory.md`](memory.md)
