# 🛠️ مساحات العمل لكل أداة | Tool Development Workspaces

> هنا تعيش **رحلة تطوير** كل أداة. مكان "ما نفعله" مقابل [`tools/`](../tools/) التي تحوي "ما هي الأداة".

---

## 📐 البنية لكل أداة

كل أداة لها مجلد فرعي يحوي 4 ملفات بالضبط:

```
{tool}/
├── progress.md       📊 الحالة + الخطة (Done / Active / Planned / Ideas)
├── memory.md         🧠 القرارات + المراجع + الدروس المستفادة (خاصة بالأداة)
├── instructions.md   📘 تعليمات تطوير خاصة بهذه الأداة
└── todo.md           ✏️ مهام آنية فعلية (يُمسح عند الإنجاز)
```

## 🗂️ الأدوات الـ11

| الأداة | workspace |
|---|---|
| 🕌 zakat-calculator | [`zakat-calculator/`](zakat-calculator/) |
| ⚖️ inheritance-calculator | [`inheritance-calculator/`](inheritance-calculator/) |
| ⚖️ kaffara-calculator | [`kaffara-calculator/`](kaffara-calculator/) |
| 🔢 percentage | [`percentage/`](percentage/) |
| 💰 interest-calculator | [`interest-calculator/`](interest-calculator/) |
| 🏦 loan-calculator | [`loan-calculator/`](loan-calculator/) |
| 🎓 gpa-calculator | [`gpa-calculator/`](gpa-calculator/) |
| ⚖️ body-calculator | [`body-calculator/`](body-calculator/) |
| 🎂 age-calculator | [`age-calculator/`](age-calculator/) |
| 🤖 ai-readiness | [`ai-readiness/`](ai-readiness/) |
| 🌳 family-tree | [`family-tree/`](family-tree/) |

## 🧭 spec/ vs development/ — الفرق

| `tools/{tool}.spec.md` | `development/{tool}/` |
|---|---|
| **ما هي الأداة** (الواقع الحالي) | **ما نفعله بها** (الرحلة) |
| نسبياً ثابت | متحرّك، يُحدَّث باستمرار |
| مرجع أساسي للقارئ الجديد | سجل عمل حي |
| يُحدَّث عند تغيير جوهري على الكود | يُحدَّث مع كل قرار/فكرة/مهمة |
| الحقائق + المعادلات + المراجع الموثَّقة | القرارات + الأسئلة المفتوحة + الدروس |

## 🔁 دورة حياة المعلومة

```
💡 فكرة جديدة
    ↓
[ progress.md → "Ideas" ]
    ↓
🤔 نقاش → قرار: نبني / نرفض
    ↓
[ progress.md → "Planned" أو "Won't Do" ]
    ↓
🚧 بدء التطوير
    ↓
[ progress.md → "Active" ]
[ memory.md  ← قرارات + اكتشافات أثناء العمل ]
[ todo.md    ← مهام يومية متغيّرة ]
    ↓
✅ إنجاز
    ↓
[ tools/{tool}.spec.md ← يتحدّث ليعكس الواقع الجديد ]
[ progress.md → "Done" + التاريخ + رقم commit ]
[ todo.md     ← يُمسح من المهمة المنجزة ]
[ memory.md   ← الدروس تبقى للأبد ]
```

## 📎 مرجع سريع

- التأسيس → [`../README.md`](../README.md)
- المعايير العامة → [`../standards/README.md`](../standards/README.md)
- مواصفات الأدوات → [`../tools/README.md`](../tools/README.md)
- ذاكرة الموقع (قرارات عابرة للأدوات) → [`../05-MEMORY.md`](../05-MEMORY.md)
- مهام الموقع (عابرة للأدوات) → [`../06-TODO.md`](../06-TODO.md)
