# 🛠️ مواصفات الأدوات | Tool Specs

> ملف لكل أداة. العمق يختلف حسب الحاجة (انظر [`../03-ROADMAP.md`](../03-ROADMAP.md) للأدوات القادمة).

---

## بنية الـ spec الموحّدة

كل ملف `.spec.md` يتبع نفس البنية (مع تفاصيل تختلف حسب العمق):

```markdown
1. نظرة عامة            ماذا تفعل + الجمهور
2. المنطق/المعادلات      الحسابات الأساسية
3. المراجع/المصادر       (للأدوات الإسلامية/الطبية/المالية)
4. حالات حافّة          ما يحتاج انتباهاً
5. ملاحظات معمارية      بنية الكود (للمعقدة)
6. التطوير المستقبلي    ما هو في ROADMAP لها
```

## الأدوات الـ11

### 🟢 الأدوات الإسلامية (specs عميقة)

| الأداة | spec | الموضوع |
|---|---|---|
| حاسبة الزكاة | [`zakat-calculator.spec.md`](zakat-calculator.spec.md) | فقه + 7 أنواع أموال + النصاب |
| حاسبة المواريث | [`inheritance-calculator.spec.md`](inheritance-calculator.spec.md) | 4 مذاهب + حَجب + عَول + رَدّ |
| حاسبة الكفارات | [`kaffara-calculator.spec.md`](kaffara-calculator.spec.md) | 8 أنواع كفارات + الترتيب الشرعي |

### 🟡 الأدوات المعقدة (specs متوسطة)

| الأداة | spec | الموضوع |
|---|---|---|
| الجاهزية للذكاء الاصطناعي | [`ai-readiness.spec.md`](ai-readiness.spec.md) | بنك أسئلة + 41 تخصص + تقرير |
| حاسبة الجسم | [`body-calculator.spec.md`](body-calculator.spec.md) | BMI/BMR/IBW/BF/WHR + مصادر |
| حاسبة GPA | [`gpa-calculator.spec.md`](gpa-calculator.spec.md) | 20 نظام تقدير + سياسات الإعادة |

### ⚪ الأدوات البسيطة (specs موجزة)

| الأداة | spec | الموضوع |
|---|---|---|
| حاسبة الفوائد | [`interest-calculator.spec.md`](interest-calculator.spec.md) | بسيطة + مركبة + سياق ربا |
| حاسبة القرض | [`loan-calculator.spec.md`](loan-calculator.spec.md) | 3 أنواع جداول أقساط |
| حاسبة النسبة المئوية | [`percentage.spec.md`](percentage.spec.md) | 13 حاسبة فرعية |
| حاسبة العمر | [`age-calculator.spec.md`](age-calculator.spec.md) | حسابات تواريخ |
| شجرة العائلة | [`family-tree.spec.md`](family-tree.spec.md) | أداة UI تفاعلية SVG |

## الإحصائيات (مايو 2026)

- **11 أداة مكتملة** في 3 تصنيفات نشطة
- **5 تصنيفات فارغة** (انظر ROADMAP للمقترحات)
- **العمق:** 3 عميقة، 3 متوسطة، 5 موجزة

## مرجع سريع

- التأسيس → [`../README.md`](../README.md)
- المعمارية → [`../01-ARCHITECTURE.md`](../01-ARCHITECTURE.md)
- المبادئ → [`../02-PRINCIPLES.md`](../02-PRINCIPLES.md)
- المعايير → [`../standards/README.md`](../standards/README.md)
