# 📘 ai-readiness — Instructions

> تعليمات خاصة بأكبر أداة (4,584 سطر HTML + 200K سطر JSON).
> [`../../standards/`](../../standards/) للتعليمات العامة.

---

## كيف تضيف تخصصاً جديداً

### 1. أنشئ ملف JSON
```bash
src/assets/data/ai-readiness/{new-id}.json
```
بنفس بنية `general.json`:
```json
{
  "section_id": "{new-id}",
  "section_name": { "ar": "...", "en": "..." },
  "version": "1.0",
  "last_updated": "YYYY-MM-DD",
  "questions": [...]
}
```

### 2. أضف entry في `questions-index.json`
```json
{
  "id": "{new-id}",
  "name": { "ar": "...", "en": "..." },
  "description": { "ar": "...", "en": "..." },
  "category": { "ar": "...", "en": "..." },
  "file": "{new-id}.json",
  "code": "abc"
}
```

### 3. التخصص يظهر تلقائياً في شاشة الاختيار

---

## كيف تضيف أسئلة لقسم موجود

أضف objects في `questions[]` بنفس Schema. كل سؤال يحتاج:
- `id` — فريد، صيغة: `{code}-{type}-{number}` (مثل `med-mcq-014`)
- `type` — mcq / true_false / fill_blank / matching / sorting / self_assessment
- `purpose` — core / cultural / self_assessment
- `axis` — knowledge / practice / flexibility / specialty
- `time_seconds` — حسب النوع
- `points` — 3-4 جوهرية، 1 ثقافية، 0 ذاتي
- `text` — `{ ar, en }`
- `hint_after` — `{ ar, en }` (يظهر في التقرير)

### Schemas الخاصة بكل نوع → [`../../tools/ai-readiness.spec.md §8`](../../tools/ai-readiness.spec.md)

---

## مبادئ صياغة الأسئلة (قاعدة ذهبية — لا تخالفها)

### للأسئلة الجوهرية والثقافية:
- ✅ مواقف حياتية، لا أسئلة مدرسية
- ✅ يسمح بإجابات صحيحة جزئياً
- ✅ "لا أعرف" تأخذ 0.5 (الصدق أفضل من الخطأ)

### للتقييم الذاتي:
- ❌ لا نسأل "هل أنت مرن؟" — مباشر، يستحيل الصدق فيه
- ✅ نضعه في **موقف يكشف مرونته** بدون أن يُدرك
- ✅ كل الخيارات تبدو عقلانية — لا خيار "يفضح نفسه"

### مبدأ التشويق (إلزامي):
كل سؤال يجب أن يحقق واحداً على الأقل:
- 🤯 **يُفاجئ** (إحصائية، معلومة جديدة)
- 🤔 **يُثير تفكيراً** (سيناريو تخيّلي)
- ⚡ **يُشعر بتحدٍ ممتع** (توصيل، ترتيب)

**سؤال لا يحقق أياً منها → يُحذف.**

---

## كيف تضيف توصية جديدة

في `recommendations.json`:
```json
"{level}_{axis}": {
  "icon": "📚",
  "color": "blue",
  "title": { "ar": "...", "en": "..." },
  "items": {
    "ar": ["نصيحة 1", "نصيحة 2", ...],
    "en": ["Tip 1", "Tip 2", ...]
  }
}
```

المستويات: `at-risk`, `beginner`, `aware`, `advanced`, `pioneer`
المحاور: `knowledge`, `practice`, `flexibility`, `specialty`

---

## القواعد الإلزامية

1. **لا تكسر الـ Schema** — الكود يعتمد على الحقول بدقّة
2. **كل نص للمستخدم بـ `{ar, en}`** — لا استثناءات
3. **`id` فريد** — تكرار يكسر الإحصائيات
4. **اختبر السؤال يدوياً قبل الـ commit** — افتح الأداة وجرّب
5. **حدّث `last_updated`** عند التعديل

---

## أخطاء شائعة

| الخطأ | الإصلاح |
|---|---|
| سؤال "لماذا تظن أن AI مهم؟" | غير مباشر — اكتب موقفاً |
| كل الخيارات سيئة عدا واحد | اجعل عدّة خيارات معقولة |
| `points: 5` | محظور — 3 أو 4 جوهرية، 1 ثقافية |
| نسيان `hint_after` | إلزامي — يظهر في التقرير |

---

## 📎 مراجع

- المواصفة الكاملة → [`../../tools/ai-readiness.spec.md`](../../tools/ai-readiness.spec.md)
- الذاكرة → [`memory.md`](memory.md)
