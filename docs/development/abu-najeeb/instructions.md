# 📘 abu-najeeb — Instructions

> تعليمات خاصة بتطوير حاسبة "أبو نجيب".
> [`../../standards/`](../../standards/) للتعليمات العامة.

---

## كيف تُضيف ميزة جديدة لتبويب موجود

### 1. حدِّد التبويب والـ state
في `src/tools/abu-najeeb.html` ابحث عن `let state = {`:
```js
state.equal      = { amount, tax, tip }
state.consumption = { items: [], tax, tip }
state.settlement  = { expenses: [] }
state.percent     = { amount, mode, rows: [] }
```

### 2. أضف الحقول في HTML تحت `.calc-pane` المناسب
- استخدم `.calc-form-row` لصفّ مكوّن من حقلين
- استخدم `.calc-form-group` لـ label + input

### 3. اربط الحقل بالـ state
في الـ JS، أضف معالج onchange/oninput:
```js
document.getElementById('an-equal-amount').addEventListener('input', (e) => {
  state.equal.amount = parseInt(e.target.value) || 0;
  scheduleSave();
  renderResult();
});
```

### 4. حدِّث render
استدعِ `renderResult()` بعد كل تغيير، أو `renderActiveTab()` لو الـ UI تغيّر.

### 5. اختبر
- Mobile 375px
- Light/Dark theme
- العربية والإنجليزية
- Console نظيف

---

## كيف تُضيف خوارزمية حساب جديدة

كل التبويبات تستخدم `computeShares(amount, includedIds)` المشتركة:

```js
function computeShares(amount, includedIds) {
  const weights = includedIds.map(id => ({
    id, w: getWeight(state.people.find(p => p.id === id))
  }));
  const total = weights.reduce((s, x) => s + x.w, 0);
  if (total === 0) return [];

  let shares = weights.map(({id, w}) => ({
    personId: id,
    share: Math.round(amount * w / total)
  }));

  // Rounding fix: distribute leftover to last share
  const diff = amount - shares.reduce((s, x) => s + x.share, 0);
  if (diff !== 0 && shares.length > 0) {
    shares[shares.length - 1].share += diff;
  }
  return shares;
}
```

**استخدمها لكل توزيع مالي.** لا تكرّر هذا المنطق.

---

## كيف تُضيف صورة تصدير جديدة

العنصر الذي يُلتقَط يجب أن يكون `.calc-result.show` داخل التبويب النشط:

```js
async function exportImage() {
  await ensureHtml2Canvas();  // lazy load
  const target = document.querySelector('.abu-najeeb .calc-pane.active .calc-result');
  const canvas = await html2canvas(target, {
    backgroundColor: getComputedStyle(document.body).getPropertyValue('--bg-primary'),
    scale: 2  // retina
  });
  const link = document.createElement('a');
  link.download = `abu-najeeb-${state.activeTab}-${Date.now()}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
}
```

---

## القواعد الإلزامية

1. **استخدم `computeShares()` لأي توزيع** — لا تكرّر منطق الوزن
2. **`Math.round` بعد كل قسمة** — أرقام صحيحة فقط
3. **`scheduleSave()` بعد كل تغيير state** — sessionStorage يلتقط
4. **Standard Calc Kit أوّلاً** — قبل أي CSS مخصّص، تحقّق هل الـ Kit يكفي
5. **prefix `an-*`** لأي class مخصّص (مثلاً `an-people-bar`)
6. **لا تخزّن في الـ DOM** — كل البيانات في `state`، الـ DOM يُبنى منه

---

## معالجة حذف شخص

```js
function removePerson(id) {
  const p = state.people.find(x => x.id === id);
  if (!p) return;

  // منع لو هو paidBy لمصروف
  const isPayer = state.settlement.expenses.some(e => e.paidBy === id);
  if (isPayer) {
    alert(`${p.name} دفع لمصاريف. غيِّر الدافع أولاً.`);
    return;
  }

  // cascade من sharedWith arrays
  state.consumption.items.forEach(it => {
    if (Array.isArray(it.sharedWith)) {
      it.sharedWith = it.sharedWith.filter(pid => pid !== id);
    }
  });
  state.settlement.expenses.forEach(ex => {
    if (Array.isArray(ex.sharedWith)) {
      ex.sharedWith = ex.sharedWith.filter(pid => pid !== id);
    }
  });
  state.percent.rows = state.percent.rows.filter(r => r.personId !== id);

  state.people = state.people.filter(x => x.id !== id);
  renderAll();
  scheduleSave();
}
```

---

## 📎 مراجع

- المواصفة → [`../../tools/abu-najeeb.spec.md`](../../tools/abu-najeeb.spec.md)
- الذاكرة → [`memory.md`](memory.md)
- Standard Calc Kit → `src/assets/css/main.css:767-949`
- نمط tabs → `src/tools/kaffara-calculator.html`
- نمط state ديناميكي → `src/tools/family-tree.html`
