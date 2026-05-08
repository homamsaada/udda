# 📘 gpa-calculator — Instructions

> تعليمات خاصة بحاسبة المعدل (3,580 سطر — معقّدة).

---

## كيف تضيف نظام تقدير جديد

### 1. أضف template في الكود
في `<script>` داخل `gpa-calculator.html`:
```js
templates.{newId} = {
  nameAr: "اسم النظام",
  nameEn: "System Name",
  descAr: "وصف عربي",
  descEn: "English description",
  max: 4.0,
  inverted: false,  // true لو 1.0 = أفضل
  grades: [
    { label: "A+", value: 4.0 },
    { label: "A", value: 3.85 },
    // ...
  ],
  classifications: [
    { min: 3.5, ar: "ممتاز", en: "Excellent" },
    // ...
  ]
};
```

### 2. أضفه إلى `templateGroups` (للـ dropdown)
```js
templateGroups.arabian.push('newId');  // أو templateGroups.international
```

### 3. اختبر التحويل
- التحويل من نظامك إلى آخر
- التحويل من آخر إلى نظامك
- اختبر بـ 5 قيم مختلفة (max, min, midpoint, near-edges)

### 4. حدّث الجدول المرجعي
في تبويب "مرجع" — يجب أن يظهر النظام الجديد.

---

## كيف تضيف سياسة إعادة جديدة

### 1. أضف للقائمة
```html
<option value="newPolicy">{{tool.retakeNewPolicy}}</option>
```

### 2. عدّل `gpaUseFromSemester()` لتدعم السياسة الجديدة
احسب `retakeAdj` (تعديل الكريديتس والنقاط) حسب القاعدة الجديدة.

### 3. اختبر مع `getEffectiveEarned()`

---

## القواعد الإلزامية

1. **استخدم `getActiveTemplate()` دائماً** (لا تقرأ `templates[id]` مباشرة في الحسابات)
2. **`isInverted()` يجب فحصه** قبل أي مقارنة "أعلى/أقل"
3. **what-if دائم** — لا توقفه ولا تضع toggle
4. **Save/Load يجب أن يحفظ كل شيء** — لو أضفت حقلاً جديداً، أضفه للـ export

---

## أخطاء شائعة

| الخطأ | الإصلاح |
|---|---|
| نسيان `inverted` في النظام الألماني | اضبط `inverted: true` |
| استخدام `templates[id]` مباشرة | استخدم `getActiveTemplate(id)` |
| إهمال نظام نسبي (100, 20) | يحتاج input نسبي، لا dropdown |
| نسيان classifications | يكسر التصنيف (ممتاز/جيد جداً/...) |

---

## 📎 مراجع

- المواصفة → [`../../tools/gpa-calculator.spec.md`](../../tools/gpa-calculator.spec.md)
- الذاكرة → [`memory.md`](memory.md)
