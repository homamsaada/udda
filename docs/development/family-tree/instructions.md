# 📘 family-tree — Instructions

---

## القواعد

1. **`visited Set` في DFS** — منع الحلقات
2. **localStorage مع versioning** — `{ version, data }` للترقية المستقبلية
3. **JSON export متوافق** — البنية ثابتة (`people[]` + `relationships[]`)
4. **علاقات بـ id** لا بـ object reference — يسهّل serialization

## أخطاء شائعة

| الخطأ | الإصلاح |
|---|---|
| إغفال `visited` في DFS | حلقات لانهائية |
| تخزين object references | يكسر JSON.stringify |
| عدم اختبار شجرة كبيرة | الأداء |

---

## 📎 [`../../tools/family-tree.spec.md`](../../tools/family-tree.spec.md) · [`memory.md`](memory.md)
