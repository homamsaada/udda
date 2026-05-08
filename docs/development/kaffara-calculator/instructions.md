# 📘 kaffara-calculator — Instructions

> تعليمات خاصة بتطوير حاسبة الكفارات.
> [`../../standards/`](../../standards/) للتعليمات العامة.

---

## كيف تضيف نوع كفارة جديد

### 1. التحضير
- ابحث في 2-3 مراجع فقهية (المغني + المجموع + بدائع الصنائع)
- حدّد:
  - السبب الموجب
  - الترتيب الشرعي (تخيير / على الترتيب)
  - الخيارات + المقادير
- وثّق القرار في [`memory.md`](memory.md)

### 2. أضف تبويباً
في `src/tools/kaffara-calculator.html`:
```html
<button class="calc-tab" onclick="switchKfTab('newType')">{{tool.tabNewType}}</button>
```

### 3. أضف القسم
```html
<div class="calc-section" id="newType-section">
  <h3>{{tool.newTypeTitle}}</h3>
  <p>{{tool.newTypeDesc}}</p>
  <!-- ترتيب الخيارات -->
</div>
```

### 4. أضف i18n
في `tools.kaffara-calculator.{lang}`:
```json
"tabNewType": "اسم التبويب",
"newTypeTitle": "العنوان الكامل",
"newTypeDesc": "الوصف الفقهي",
"newTypeOption1": "الخيار الأول",
...
```

### 5. اختبر
- العربي والإنجليزي
- السعر = 0 → لا تكلفة
- السعر صحيح → تكلفة دقيقة
- الموبايل (التبويبات تلتف)

---

## القواعد الإلزامية

1. **اشرح الترتيب الشرعي بوضوح** — تخيير أم على الترتيب؟
2. **اذكر السبب الموجب** — لماذا تجب هذه الكفارة؟
3. **اعرض المرجع القرآني/النبوي** عند الإمكان
4. **disclaimer دائماً** — هذه أداة، ليست فتوى

---

## 📎 مراجع

- المواصفة → [`../../tools/kaffara-calculator.spec.md`](../../tools/kaffara-calculator.spec.md)
- الذاكرة → [`memory.md`](memory.md)
