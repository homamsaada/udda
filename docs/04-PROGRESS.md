# ✅ التقدم الحالي | Progress

> 📅 **آخر نشاط على المشروع:** 2026-05-09 — المرحلة 4.9 (AEM)
> 🔍 **آخر فحص توافق شامل:** 2026-05-09
> ⏰ **ملاحظة للوكيل:** قبل أي تطوير، اقرأ [Session Resume Protocol في CLAUDE.md](../CLAUDE.md). يجب التحقق من training cutoff الخاص بك مقابل تاريخ اليوم عند الفجوات > 30 يوماً.
>
> هذا الملف **سجل حي** يُحدَّث باستمرار. يعكس الحالة الفعلية، ليس الخطة. للخطة المستقبلية انظر [`03-ROADMAP.md`](03-ROADMAP.md).

---

## ✅ مكتمل

### الأدوات (11)

| # | الأداة | التصنيف | الحالة | ملاحظات |
|---|---|---|---|---|
| 1 | percentage | calculators | ✅ مستقر | 13 حاسبة فرعية |
| 2 | interest-calculator | calculators | ✅ مستقر | يحتوي تحذير الربا |
| 3 | loan-calculator | calculators | ✅ مستقر | جدول أقساط |
| 4 | zakat-calculator | calculators | ✅ مستقر | إسلامي + إخلاء مسؤولية |
| 5 | inheritance-calculator | calculators | ✅ مستقر | الأعقد فقهياً، 4 مذاهب — **مرجع تصميم الموبايل** |
| 6 | kaffara-calculator | calculators | ✅ مستقر | 8 أنواع كفارات |
| 7 | gpa-calculator | calculators (other) | ✅ مستقر | 20 نظام تقدير، 5 تبويبات |
| 8 | body-calculator | calculators (other) | ✅ مستقر | BMI/BMR/BF/IBW |
| 9 | age-calculator | calculators (other) | ✅ مستقر | حسابات تواريخ |
| 10 | family-tree | everyday | ✅ مستقر | شجرة عائلة SVG |
| 11 | ai-readiness | generators | ✅ مستقر | 41 تخصص، ~200K سطر JSON |

### المحتوى

| النوع | العدد | اللغات | ملاحظات |
|---|---|---|---|
| مقالات مدونة | 40 (20 + 20) | ar + en | 11 زكاة، 9 ميراث |
| صفحات ثابتة | 10 (5 + 5) | ar + en | about, contact, privacy, terms, disclaimer |
| تخصصات AI | 41 | ar + en | كل تخصص ~100 سؤال |

### البنية التحتية

- [x] نظام البناء (`build.js`)
- [x] دعم ثنائي اللغة كامل (RTL/LTR، hreflang، canonical)
- [x] ثيمات Dark/Light/Auto
- [x] نظام البحث الشامل في كل صفحة
- [x] Settings panel (لغة، ثيم، مفضلة، حذف بيانات)
- [x] GitHub Actions auto-deploy (auto-pr.yml + deploy.yml)
- [x] sitemap.xml + robots.txt
- [x] Schema.org structured data (WebApplication, Article, FAQPage, Quiz)
- [x] إعلانات placeholder جاهزة لـ AdSense

## 🚧 قيد العمل

### المرحلة 1: التوثيق التأسيسي ✅ (مايو 2026)

- [x] قراءة وفهم المشروع كاملاً
- [x] حذف الملفات الميتة (`src/layouts/base.html` + `docs/` القديم)
- [x] بناء `docs/README.md` (فهرس)
- [x] بناء `docs/00-VISION.md`
- [x] بناء `docs/01-ARCHITECTURE.md`
- [x] بناء `docs/02-PRINCIPLES.md`
- [x] بناء `docs/03-ROADMAP.md`
- [x] بناء `docs/04-PROGRESS.md` (هذا الملف)
- [x] إصلاح `dist/` — إضافة لـ `.gitignore` وإلغاء التتبع

### المرحلة 2: ملفات المعايير ✅ (مايو 2026)

9 ملفات في `docs/standards/`: design-system, mobile-design, i18n-conventions, seo-strategy, content-strategy, tool-template, blog-template, testing-checklist, README.

### المرحلة 3: مواصفات الأدوات ✅ (مايو 2026)

12 ملف في `docs/tools/`:
- 🟢 عميقة (3): zakat, inheritance, ai-readiness
- 🟡 متوسطة (3): kaffara, body, gpa
- ⚪ موجزة (5): interest, loan, percentage, age, family-tree
- README.md (فهرس)

**ملاحظة:** الملفات القديمة في الجذر (`udda-ai-readiness-spec.md` و `specialties-comprehensive-list.md`) **لم تُحذف بعد** — ستُحذف في المرحلة 4 لأن محتواها متضمَّن في `docs/tools/ai-readiness.spec.md`.

## 📋 لاحق (priority queue للنقاش)

### المرحلة 2: ملفات المعايير (`docs/standards/*`) — 9 ملفات ✅

- [x] `standards/README.md` — فهرس
- [x] `standards/design-system.md` — متغيرات CSS، البطاقات، التوهج، الثيمات
- [x] `standards/mobile-design.md` — قواعد الموبايل الموسّعة
- [x] `standards/i18n-conventions.md` — قواعد الترجمة، شروط `searchTerms`، البنية ثنائية اللغة
- [x] `standards/seo-strategy.md` — استراتيجية SEO، structured data، hreflang، تخطيط الكلمات المفتاحية
- [x] `standards/content-strategy.md` — خطة المدونة، pillars/subs، CTAs، topics map
- [x] `standards/tool-template.md` — قالب لإنشاء أداة جديدة بالخطوات
- [x] `standards/blog-template.md` — قالب لمقال مدونة جديد
- [x] `standards/testing-checklist.md` — معايير الجودة قبل دمج أداة

### المرحلة 3: مواصفات الأدوات ✅ (12 ملف)

- [x] `tools/README.md` — فهرس الأدوات
- [x] `tools/zakat-calculator.spec.md` 🟢 (عميق)
- [x] `tools/inheritance-calculator.spec.md` 🟢 (عميق)
- [x] `tools/ai-readiness.spec.md` 🟢 (دمج الموجود)
- [x] `tools/kaffara-calculator.spec.md` 🟡 (متوسط)
- [x] `tools/body-calculator.spec.md` 🟡 (متوسط، طبي)
- [x] `tools/gpa-calculator.spec.md` 🟡 (متوسط)
- [x] `tools/interest-calculator.spec.md` ⚪ (موجز)
- [x] `tools/loan-calculator.spec.md` ⚪ (موجز)
- [x] `tools/percentage.spec.md` ⚪ (موجز)
- [x] `tools/age-calculator.spec.md` ⚪ (موجز)
- [x] `tools/family-tree.spec.md` ⚪ (موجز)

### المرحلة 4: التنظيف النهائي ✅ (مايو 2026)

- [x] إضافة `.claude/worktrees/` و `.idea/` إلى `.gitignore`
- [x] حذف `udda-ai-readiness-spec.md` (محتواه في [`tools/ai-readiness.spec.md`](tools/ai-readiness.spec.md))
- [x] حذف `specialties-comprehensive-list.md` (محتواه في نفس الملف)
- [x] حذف `.claude/rules/mobile-design.md` (محتواه موسَّع في [`standards/mobile-design.md`](standards/mobile-design.md))
- [x] إعادة كتابة `README.md` ليصبح بوابة دخول حديثة (تشمل كل الأدوات الـ11 + روابط لـ `docs/`)
- [x] تقليص `CLAUDE.md` من 36KB إلى ~140 سطر (فهرس يربط بـ `docs/`)

### المرحلة 4.5: بنية التطوير Fractal ✅ (مايو 2026)

- [x] إنشاء [`05-MEMORY.md`](05-MEMORY.md) (مستوى الموقع — قرارات + دروس + مراجع)
- [x] إنشاء [`06-TODO.md`](06-TODO.md) (مستوى الموقع — مهام عابرة للأدوات)
- [x] إنشاء [`development/`](development/) (مساحات عمل الأدوات)
- [x] لكل من الـ11 أداة: 4 ملفات (progress + memory + instructions + todo) = 44 ملف
- [x] إضافة مؤشّرات في كل spec → development/{tool}/

**المبدأ:** بنية تكرارية (fractal). نفس النمط على مستوى الموقع وعلى مستوى الأداة. تفاصيل في [`README.md`](README.md).

### المرحلة 4.6: تليين القرارات الجامدة ✅ (مايو 2026)

تصحيح صياغة بعض القرارات لتعكس الواقع: بعضها **فلسفي ثابت** (لن يتغيّر)، بعضها **خيارات حالية** قابلة للتطوّر، بعضها **حالة حالية** قد تتغيّر لأدوات محددة.

- [x] إعادة هيكلة [`05-MEMORY.md`](05-MEMORY.md) لـ4 فئات (🌟 فلسفة عامة، 🔒 ثوابت، ⚙️ خيارات حالية، 📅 حالة حالية، 🚫 لن نفعله أبداً)
- [x] تحديث [`02-PRINCIPLES.md`](02-PRINCIPLES.md) §1 و§7 (أعمدة الفئات + تمييز "لن أبداً" عن "ليس الآن")
- [x] تحديث [`00-VISION.md`](00-VISION.md) §5 "ما لسنا" (تمييز ثوابت قِيَمية عن حالة حالية)
- [x] تحديث [`03-ROADMAP.md`](03-ROADMAP.md) §6 "غير مخطط الآن" (نفس التمييز)
- [x] تحديث [`CLAUDE.md`](../CLAUDE.md) — رموز 🔒/⚙️ على القواعد + توضيح "Static-first"

**الفلسفة الجديدة:** عُدّة "static-first" وليست "static-only". أداة محددة قد تكتسب backend جزئية لو احتاجت فعلاً.

### المرحلة 4.7: Temporal Awareness (الوعي الزمني) ✅ (2026-05-09)

نظام fractal لتتبّع الفجوات الزمنية على مستويين، يحفّز فحص التوافق قبل التطوير بعد فجوات كبيرة.

- [x] إضافة temporal markers في header [`04-PROGRESS.md`](04-PROGRESS.md) — مستوى الموقع
- [x] إضافة temporal markers في كل [`development/{tool}/progress.md`](development/) — مستوى الأداة (11 ملف)
- [x] إنشاء [`_sessions.md`](_sessions.md) — سرد موجز للجلسات الكبرى على مستوى الموقع
- [x] إضافة "Session Resume Protocol" في [`CLAUDE.md`](../CLAUDE.md) — إرشاد الوكيل عند بدء أي جلسة
- [x] تسجيل قرار "Temporal awareness fractal" في [`05-MEMORY.md`](05-MEMORY.md)

**الفائدة:** كل جلسة جديدة بعد فجوة، الوكيل يفحص:
- الفجوة العامة على المستوى الموقع → npm، GitHub Actions، Browser APIs
- فجوة الأداة المُستهدفة → مراجع خاصة بها (AI tools، فقهية، طبية، إلخ)
- training cutoff الخاص به مقابل تاريخ اليوم

### المرحلة 4.8: Playbooks (أنماط سير العمل) ✅ (2026-05-09)

نظام لتفسير طلبات المستخدم الطبيعية → playbooks محددة (workflows) — مرن متّسق.

- [x] إنشاء [`standards/playbooks.md`](standards/playbooks.md) — 8 playbooks:
  - 🆕 أداة جديدة (full cycle, 4-6 commits)
  - ✏️ توسيع أداة (partial, 1-2 commits)
  - 🐛 إصلاح bug (1 commit)
  - 📝 مقال مدونة (1 commit)
  - 🔧 refactoring عابر (2-3 commits)
  - 📚 تحديث توثيق (docs only)
  - 🔍 فحص توافق (تقرير بدون تطبيق)
  - 🤔 Fallback للطلبات الغامضة
- [x] ربط الـ playbooks بـ [`CLAUDE.md`](../CLAUDE.md) — جدول سريع للمطابقة
- [x] تحديث [`standards/README.md`](standards/README.md) — `playbooks.md` كنقطة الدخول

**الفائدة:**
- المستخدم يتكلم بحرية بأي صياغة طبيعية
- الوكيل يستنتج النوع → playbook ثابت → تنفيذ متّسق
- توقّع واضح: المستخدم يعرف ما سيحدث قبل أن يحدث
- اتساق عبر الجلسات والوكلاء المختلفين

### المرحلة 4.9: Autonomous Execution Mode (AEM) ✅ (2026-05-09)

إضافة Playbook 9 (AEM) — نمط تنفيذ مستقل يُفعَّل ضمن playbooks 1-6 بعد تخطيط ناضج.

- [x] إضافة Playbook 9 إلى [`standards/playbooks.md`](standards/playbooks.md)
- [x] **Phase 0 الجوهرية:** استجواب + بحث + تركيب
  - الوكيل لا يُسلّم بالمدخل المُقدَّم — يُحقّق فيه
  - بحث في الكود (تعارضات، patterns، integration)
  - استجواب استراتيجي (3-7 أسئلة، ليس للتأكيد بل للاستزادة)
  - تركيب خطة جديدة (ليست تكرار خطة المستخدم)
- [x] **Phase 1:** Execution Loop المستقلة
- [x] **Phase 2:** تقرير ختامي
- [x] **Safety Boundaries** صريحة (ما لا يحدث في AEM)
- [x] **شروط الخروج** الـ7 (متى يتوقّف الوكيل)
- [x] **مثال كامل** (سيناريو محوّل وحدات)
- [x] تحديث [`CLAUDE.md`](../CLAUDE.md) — إضافة AEM للـ playbook table + ملاحظة جوهرية

**الفلسفة:**
- المستخدم يأتي بمدخل ناضج (spec/خطة) — ليس جملة بسيطة
- الوكيل ليس منفّذاً سلبياً — هو شريك ناقد يُثري ويُحقّق
- بعد الموافقة على خطة الوكيل المُركَّبة، التنفيذ مستقل بالكامل (إلا عند نقاط قرار حقيقية)

### المرحلة 5: تخطيط البناء العلمي

- [ ] اختيار أول أداة من ROADMAP بالنقاش
- [ ] تصميم الأداة على الورق (UI mockup + حالات الاستخدام)
- [ ] كتابة spec لها قبل أي كود

### المرحلة 6: البرمجة

- [ ] تنفيذ الأداة المختارة وفق المعايير الموثّقة
- [ ] إضافة 2-3 مقالات مدونة لها
- [ ] مراجعة وتعديل + اختبار يدوي ثنائي اللغة

## 📝 ملاحظات تطوير

### آخر التغييرات الكبرى (من git log)

```
4b9cab9  Merge — origin/claude/ai-readiness-tool-AjtNI
7c83c1d  Expand remaining 15 specialties to 100q + re-fix entrepreneurship
a10462d  Merge — origin/claude/ai-readiness-tool-AjtNI
af59011  Add files via upload
39f6d22  Merge — origin/claude/ai-readiness-tool-AjtNI
```

### قرارات حالية معلّقة (للنقاش)

1. أي أداة من ROADMAP نبدأ بها؟ (المقترحات في [`03-ROADMAP.md`](03-ROADMAP.md))
2. هل نضيف مقالات مدونة لكل أداة موجودة قبل بناء أدوات جديدة؟
3. هل نكتب اختبارات؟ (الموقف الحالي: لا، لكن قابل للنقاش)
4. هل نقسّم `i18n.json` لاحقاً؟ (الموقف الحالي: ليس الآن)
5. هل ندمج `dist/` و GitHub Pages config مع تحسينات (PWA, service worker)؟

## 🔄 كيفية تحديث هذا الملف

- ✅ **مكتمل:** عند الانتهاء فعلاً (ليس "تقريباً")
- 🚧 **قيد العمل:** عند البدء، مع تاريخ البدء حين يكون مهماً
- 📋 **لاحق:** عند تأجيل قرار، مع سبب التأجيل
- حدّث **آخر تحديث** في الأعلى عند كل تعديل

## 📎 مرجع سريع

- الرؤية → [`00-VISION.md`](00-VISION.md)
- المعمارية → [`01-ARCHITECTURE.md`](01-ARCHITECTURE.md)
- المبادئ → [`02-PRINCIPLES.md`](02-PRINCIPLES.md)
- الخطة → [`03-ROADMAP.md`](03-ROADMAP.md)
