# 🧠 family-tree — Memory

> [`../../tools/family-tree.spec.md`](../../tools/family-tree.spec.md)

---

## 🏛️ قرارات

### SVG لا Canvas
- **القرار:** نستخدم `<svg>` مباشرة
- **السبب:** تفاعل أسهل (clicks per element)، scale لطيف، DOM accessible
- **البديل المرفوض:** Canvas — يحتاج hit detection يدوياً

### Layout: Top-Down
- **القرار:** الأجداد فوق، الأحفاد تحت
- **السبب:** القراءة المعتادة في معظم الثقافات
- **البديل:** يمكن إضافة Right-to-Left تخطيط لاحقاً

### `calcTreeWidth(personId, visited)` بـ DFS
- **القرار:** depth-first مع `visited Set`
- **السبب:** تجنّب الحلقات اللانهائية في حالة الزواج بين الأقارب

### localStorage تلقائي + JSON export
- **القرار:** أي تعديل يُحفظ تلقائياً + خيار يدوي للتصدير
- **السبب:** المستخدم يبني شجرة طويلة الأمد، لا يجب أن يفقدها

---

## ⚠️ حالات حافّة

- **زواج بين الأقارب** → دورة محتملة (`visited Set` يعالج)
- **أبوّة بدون زواج موثَّق** → علاقة `parent` مستقلة عن `spouse`
- **شخص بأبوين منفصلين (طلاق)** → علاقتان مستقلتان

---

## ❌ ما تجنّبناه

- **Drag-and-drop للأشخاص** — في ROADMAP
- **Zoom للأشجار الكبيرة** — في ROADMAP
- **Sync سحابية** — يخالف static-first
