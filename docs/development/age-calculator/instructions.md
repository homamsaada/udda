# 📘 age-calculator — Instructions

---

## القواعد

1. **استخدم Date objects** — لا تحسب يدوياً (يكسر الحالات الحافّة)
2. **`new Date()` مرة واحدة في كل تحديث** — لا تستدعها متعدداً
3. **Live mode عبر `setInterval`** — تذكّر `clearInterval` عند التنقّل

## أخطاء شائعة

| الخطأ | الإصلاح |
|---|---|
| `days = months × 30` | استخدم Date arithmetic |
| `years = days / 365` | احسب بـ `getFullYear()` ثم تعديل بحسب الأشهر |
| تاريخ المستقبل | تحقّق من `birth > now` → رسالة "لم تولد بعد" |

---

## 📎 [`../../tools/age-calculator.spec.md`](../../tools/age-calculator.spec.md) · [`memory.md`](memory.md)
