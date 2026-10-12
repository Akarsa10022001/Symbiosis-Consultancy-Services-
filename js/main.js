import { CONTACT, FIELDS, COURSES, PROMISES, UPDATES, PATHS, FIELD_PEOPLE } from './data.js';

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const fieldName = id => FIELDS.find(f => f.id === id)?.name || '';
const inr = n => '₹' + n.toLocaleString('en-IN');

/* ------------------------------------------------------------------ icons */
// Hand-built layered SVG illustrations for each field (gradients + offset "shadow" layers give them depth).
const ART = {
  stetho: `<path d="M60 30v50a40 40 0 0 0 80 0V30" fill="none" stroke="url(#ag)" stroke-width="12" stroke-linecap="round"/><path d="M100 120v20a30 30 0 0 0 60 0v-24" fill="none" stroke="url(#ag)" stroke-width="10" stroke-linecap="round"/><circle cx="160" cy="104" r="20" fill="url(#aw)"/><circle cx="160" cy="104" r="9" fill="#0b2a5b"/><circle cx="60" cy="26" r="9" fill="url(#aw)"/><circle cx="140" cy="26" r="9" fill="url(#aw)"/>`,
  capsule: `<g transform="rotate(-38 100 100)"><rect x="30" y="70" width="140" height="60" rx="30" fill="url(#aw)"/><path d="M100 70h40a30 30 0 0 1 0 60h-40Z" fill="url(#ag)"/><rect x="44" y="78" width="40" height="8" rx="4" fill="#fff" opacity=".7"/></g><circle cx="52" cy="150" r="14" fill="url(#aw)" opacity=".9"/><circle cx="156" cy="44" r="9" fill="url(#ag)"/>`,
  cross: `<rect x="70" y="24" width="60" height="152" rx="16" fill="url(#aw)"/><rect x="24" y="70" width="152" height="60" rx="16" fill="url(#aw)"/><rect x="82" y="36" width="36" height="128" rx="10" fill="url(#ag)"/><rect x="36" y="82" width="128" height="36" rx="10" fill="url(#ag)"/><path d="M48 100h28l10-18 14 36 10-18h42" fill="none" stroke="#0b2a5b" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"/>`,
  gear: `<g fill="url(#ag)"><path d="M100 30l12 2 4 18 14 6 15-10 16 16-10 15 6 14 18 4 2 12-2 12-18 4-6 14 10 15-16 16-15-10-14 6-4 18-12 2-12-2-4-18-14-6-15 10-16-16 10-15-6-14-18-4-2-12 2-12 18-4 6-14-10-15 16-16 15 10 14-6 4-18Z"/></g><circle cx="100" cy="100" r="30" fill="#0b2a5b"/><circle cx="100" cy="100" r="18" fill="url(#aw)"/>`,
  chart: `<rect x="28" y="110" width="30" height="62" rx="6" fill="url(#aw)" opacity=".75"/><rect x="72" y="80" width="30" height="92" rx="6" fill="url(#aw)" opacity=".85"/><rect x="116" y="50" width="30" height="122" rx="6" fill="url(#aw)"/><path d="M30 96 80 62l32 18 52-52" fill="none" stroke="url(#ag)" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M148 26h20v20" fill="none" stroke="url(#ag)" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>`,
  book: `<path d="M20 60c30-10 56-6 80 14 24-20 50-24 80-14v100c-30-10-56-6-80 14-24-20-50-24-80-14Z" fill="url(#aw)"/><path d="M100 74v100" stroke="#0b2a5b" stroke-width="4"/><path d="M36 80c20-4 40 0 54 10M36 100c20-4 40 0 54 10M110 90c14-10 34-14 54-10M110 110c14-10 34-14 54-10" stroke="#0b2a5b" stroke-width="4" opacity=".35" stroke-linecap="round"/><path d="M60 24 100 8l40 16-40 16Z" fill="url(#ag)"/><path d="M134 28v22" stroke="url(#ag)" stroke-width="4"/>`,
  pen: `<g transform="rotate(35 100 100)"><rect x="82" y="20" width="36" height="120" rx="8" fill="url(#ag)"/><path d="M82 140h36l-18 40Z" fill="url(#aw)"/><path d="M96 168h8l-4 12Z" fill="#0b2a5b"/><rect x="82" y="40" width="36" height="10" fill="#0b2a5b" opacity=".4"/></g><path d="M24 168c30-20 50 10 80-6" fill="none" stroke="url(#aw)" stroke-width="6" stroke-linecap="round"/>`,
  scales: `<path d="M100 24v140M60 172h80" stroke="url(#ag)" stroke-width="10" stroke-linecap="round"/><path d="M36 52h128" stroke="url(#aw)" stroke-width="8" stroke-linecap="round"/><path d="M48 56 24 110h48Z M152 56l-24 54h48Z" fill="none" stroke="url(#aw)" stroke-width="4"/><path d="M20 110a28 18 0 0 0 56 0Z M124 110a28 18 0 0 0 56 0Z" fill="url(#ag)"/><circle cx="100" cy="24" r="10" fill="url(#ag)"/>`,
  globe: `<circle cx="100" cy="100" r="72" fill="url(#aw)"/><path d="M28 100h144M100 28c-26 30-26 114 0 144M100 28c26 30 26 114 0 144M40 64h120M40 136h120" fill="none" stroke="#0b2a5b" stroke-width="3" opacity=".35"/><path d="M118 66c10 4 22 14 18 26-6 4-14-2-20 4-4 8 6 16-2 22-10-2-14-14-12-24 2-12 6-20 16-28Z" fill="url(#ag)"/><path d="M26 150c40 30 110 30 150-6" fill="none" stroke="url(#ag)" stroke-width="5" stroke-dasharray="2 10" stroke-linecap="round"/><path d="M168 138l12 4-4 12" fill="none" stroke="url(#ag)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`,
  case: `<rect x="24" y="64" width="152" height="104" rx="16" fill="url(#aw)"/><path d="M72 64V48a10 10 0 0 1 10-10h36a10 10 0 0 1 10 10v16" fill="none" stroke="url(#ag)" stroke-width="10"/><rect x="24" y="100" width="152" height="12" fill="url(#ag)"/><rect x="88" y="94" width="24" height="26" rx="5" fill="#0b2a5b"/>`,
};
const artSvg = key => `<svg class="t-art" viewBox="0 0 200 200" aria-hidden="true"><defs>
  <linearGradient id="ag" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f6d77c"/><stop offset=".55" stop-color="#d9a62e"/><stop offset="1" stop-color="#a87412"/></linearGradient>
  <linearGradient id="aw" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#c9d8f0"/></linearGradient></defs>
  <g opacity=".22" transform="translate(10 12)" filter="blur(3px)">${ART[key]}</g><g>${ART[key]}</g></svg>`;

const PROMISE_ICONS = [
  '<path d="M3 21h18M5 21V9l7-5 7 5v12M9 21v-6h6v6"/>',
  '<circle cx="12" cy="12" r="9"/><path d="M5.6 5.6l12.8 12.8"/>',
  '<circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/>',
  '<path d="M4 12h16M14 6l6 6-6 6"/>',
  '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6Z"/><path d="m8.5 12 2.5 2.5 4.5-5"/>',
];

const TILE_COLORS = {
  medical: ['#062d3a', '#14908c'], pharmacy: ['#0b2a5b', '#2a73d9'], paramedical: ['#1d1147', '#6a4ad8'],
  engineering: ['#0e1d33', '#3f6a9c'], management: ['#08292a', '#1f8a6b'], education: ['#2a1903', '#b8801c'],
  creative: ['#360b20', '#c2416b'], more: ['#14162b', '#4d5487'], overseas: ['#071a3d', '#1b5bb8'], pro: ['#0b2a5b', '#136bc2'],
};

/* ------------------------------------------------------------------ render: bento */
function renderBento() {
  const order = ['medical', 'pharmacy', 'paramedical', 'engineering', 'management', 'education', 'creative', 'more', 'overseas', 'pro'];
  const big = new Set(['medical', 'pharmacy', 'overseas', 'pro']);
  $('#bento').innerHTML = order.map(id => {
    const f = FIELDS.find(x => x.id === id);
    const list = COURSES.filter(c => c.field === id);
    const froms = list.map(c => c.from).filter(Boolean);
    const from = froms.length ? `From ${inr(Math.min(...froms))} / yr` : 'Fees on counselling';
    const [c1, c2] = TILE_COLORS[id];
    return `<a class="tile ${big.has(id) ? 'big' : ''} reveal-tile" href="#finder" data-field="${id}" style="--c1:${c1};--c2:${c2}">
      <span class="t-bg" aria-hidden="true">${artSvg(f.icon)}</span>
      <img class="t-person" src="assets/cutouts/${FIELD_PEOPLE[id]}.webp" alt="" loading="lazy">
      <span class="t-count">${list.length} programme${list.length > 1 ? 's' : ''}</span>
      <h3>${f.name}</h3><p>${f.blurb}</p>
      <div class="t-foot"><span class="t-from">${from}</span><span class="t-go">→</span></div></a>`;
  }).join('');
}

/* ------------------------------------------------------------------ render: career paths */
function renderPaths() {
  $('#paths').innerHTML = PATHS.map(p => `<button class="path" type="button" data-q="${p.q}">
    <span class="path-disc"><img src="assets/cutouts/${p.img}.webp" alt="" loading="lazy"></span>
    <b>${p.label}</b><small>${p.from}</small></button>`).join('');
  $('#paths').addEventListener('click', e => {
    const b = e.target.closest('.path'); if (!b) return;
    state.field = 'all'; state.q = b.dataset.q; $('#q').value = b.dataset.q;
    renderChips(); renderCourses(); scrollToEl('#finder');
  });
}

/* ------------------------------------------------------------------ render: promises */
function renderPromises() {
  $('#promises').innerHTML = PROMISES.map(([t, d], i) => `<li class="reveal"><span class="p-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${PROMISE_ICONS[i]}</svg></span><div><b>${t}</b><span>${d}</span></div></li>`).join('');
}

/* ------------------------------------------------------------------ fee finder */
const state = { field: 'all', q: '' };
const ICON_PIN = '<svg viewBox="0 0 24 24"><path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11Z"/><circle cx="12" cy="10" r="2.5"/></svg>';
const ICON_CLOCK = '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>';
const ICON_CAP = '<svg viewBox="0 0 24 24"><path d="M2 9l10-5 10 5-10 5Z"/><path d="M6 11v5c3 2 9 2 12 0v-5"/></svg>';

function courseCard(c) {
  const hasMore = c.fees.length || c.points.length;
  return `<article class="course" data-id="${c.id}">
    <div class="c-top"><span class="c-field">${fieldName(c.field)}</span><span class="c-tag">${c.tag}</span></div>
    <h3>${c.name}</h3>
    <p class="c-univ">${c.univ}</p>
    <div class="c-meta"><span>${ICON_PIN}${c.place}</span><span>${ICON_CLOCK}${c.duration}</span>${c.eligibility ? `<span>${ICON_CAP}${c.eligibility}</span>` : ''}</div>
    <div class="c-total"><small>${c.total === 'On counselling' ? 'Fees' : 'Total / key fee'}</small><b>${c.total}</b></div>
    ${hasMore ? `<div class="c-more"><div>
      ${c.fees.length ? `<table class="c-fees">${c.fees.map(([l, v]) => `<tr><td>${l}</td><td>${v}</td></tr>`).join('')}</table>` : ''}
      ${c.points.length ? `<ul class="c-points">${c.points.map(p => `<li>${p}</li>`).join('')}</ul>` : ''}
      <a class="c-src" href="https://www.instagram.com/reel/${c.src}/" target="_blank" rel="noopener">See the original post ↗</a>
    </div></div>` : ''}
    <div class="c-actions">
      ${hasMore ? `<button class="btn c-toggle" type="button" aria-expanded="false">Fee details</button>` : ''}
      <a class="btn btn-blue c-book" href="#book" data-course="${c.id}">Book counselling</a>
    </div>
  </article>`;
}

function renderChips() {
  const all = [{ id: 'all', name: 'All courses' }, ...FIELDS];
  $('#chips').innerHTML = all.map(f => {
    const n = f.id === 'all' ? COURSES.length : COURSES.filter(c => c.field === f.id).length;
    return `<button class="chip ${f.id === state.field ? 'on' : ''}" role="tab" aria-selected="${f.id === state.field}" data-field="${f.id}">${f.name}<small>${n}</small></button>`;
  }).join('');
}

function renderCourses(animate = true) {
  const q = state.q.trim().toLowerCase();
  const list = COURSES.filter(c => (state.field === 'all' || c.field === state.field) &&
    (!q || [c.name, c.univ, c.place, c.tag, c.eligibility, fieldName(c.field), ...c.points, ...c.fees.flat()].join(' ').toLowerCase().includes(q)));
  $('#courses').innerHTML = list.map(courseCard).join('');
  $('#empty').hidden = list.length > 0;
  if (animate && window.gsap && !reduced) gsap.from('#courses .course', { y: 30, opacity: 0, duration: .7, stagger: .04, ease: 'power3.out', clearProps: 'all' });
  window.ScrollTrigger?.refresh();
}

function setField(id, scroll) {
  state.field = id;
  renderChips(); renderCourses();
  if (scroll) scrollToEl('#finder');
}

function wireFinder() {
  $('#chips').addEventListener('click', e => { const b = e.target.closest('.chip'); if (b) setField(b.dataset.field); });
  let t; $('#q').addEventListener('input', e => { clearTimeout(t); t = setTimeout(() => { state.q = e.target.value; renderCourses(false); }, 120); });
  $('#courses').addEventListener('click', e => {
    const tog = e.target.closest('.c-toggle');
    if (tog) { const card = tog.closest('.course'); const open = card.classList.toggle('open'); tog.textContent = open ? 'Hide details' : 'Fee details'; tog.setAttribute('aria-expanded', open); setTimeout(() => ScrollTrigger.refresh(), 650); }
    const bk = e.target.closest('.c-book');
    if (bk) { e.preventDefault(); $('#courseSelect').value = bk.dataset.course; scrollToEl('#book'); }
  });
  document.addEventListener('click', e => {
    const a = e.target.closest('[data-field]:not(.chip)');
    if (a) { e.preventDefault(); setField(a.dataset.field, true); }
  });
}

/* ------------------------------------------------------------------ updates */
function renderUpdates() {
  $('#updatesGrid').innerHTML = UPDATES.map(u => `<a class="upd reveal" href="https://www.instagram.com/reel/${u.code}/" target="_blank" rel="noopener">
    <figure class="u-img"><img src="assets/posts/${u.code}.webp" alt="Instagram post: ${u.title}" loading="lazy"><span class="u-play">▶</span></figure>
    <div class="u-meta"><span class="u-tag">${u.tag}</span><svg class="u-ig" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor"/></svg></div>
    <h3>${u.title}</h3></a>`).join('');
}

/* ------------------------------------------------------------------ booking */
const SLOTS = ['10:00', '11:00', '12:00', '13:00', '15:00', '16:00', '17:00', '18:00'];
const bk = { month: null, date: null, slot: null };
const DAYS_AHEAD = 60;
const pad = n => String(n).padStart(2, '0');
const fmtSlot = s => { const [h, m] = s.split(':').map(Number); return `${((h + 11) % 12) + 1}:${pad(m)} ${h < 12 ? 'AM' : 'PM'}`; };
const fmtDate = d => d.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });
const startOfDay = d => new Date(d.getFullYear(), d.getMonth(), d.getDate());

function renderCal() {
  const today = startOfDay(new Date());
  const last = new Date(today); last.setDate(last.getDate() + DAYS_AHEAD);
  const m = bk.month;
  $('#calTitle').textContent = m.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });
  $('#calPrev').disabled = m <= new Date(today.getFullYear(), today.getMonth(), 1);
  $('#calNext').disabled = new Date(m.getFullYear(), m.getMonth() + 1, 1) > last;
  const first = (new Date(m.getFullYear(), m.getMonth(), 1).getDay() + 6) % 7;
  const days = new Date(m.getFullYear(), m.getMonth() + 1, 0).getDate();
  let html = '<span class="blank" aria-hidden="true"></span>'.repeat(first);
  for (let d = 1; d <= days; d++) {
    const date = new Date(m.getFullYear(), m.getMonth(), d);
    const off = date < today || date > last || date.getDay() === 0 || (+date === +today && !SLOTS.some(s => slotOpen(date, s)));
    const cls = ['day', +date === +today ? 'today' : '', bk.date && +date === +bk.date ? 'sel' : ''].join(' ');
    html += `<button type="button" class="${cls}" data-d="${d}" ${off ? 'disabled' : ''} aria-label="${fmtDate(date)}${off ? ', unavailable' : ''}">${d}</button>`;
  }
  $('#calGrid').innerHTML = html;
}

function slotOpen(date, s) {
  const [h, mi] = s.split(':').map(Number);
  const t = new Date(date); t.setHours(h, mi, 0, 0);
  return t - Date.now() > 60 * 60 * 1000; // at least an hour's notice
}

function renderSlots() {
  if (!bk.date) { $('#slots').innerHTML = ''; return; }
  $('#slotsTitle').textContent = `Available times · ${fmtDate(bk.date)}`;
  $('#slots').innerHTML = SLOTS.map(s => `<button type="button" class="slot ${bk.slot === s ? 'sel' : ''}" data-s="${s}" ${slotOpen(bk.date, s) ? '' : 'disabled'}>${fmtSlot(s)}</button>`).join('');
  if (!reduced && window.gsap) gsap.from('#slots .slot', { y: 10, opacity: 0, duration: .4, stagger: .03, ease: 'power2.out', clearProps: 'all' });
}

function renderSummary() {
  const box = $('#bkSummary');
  box.classList.toggle('ok', !!(bk.date && bk.slot));
  box.querySelector('b').textContent = bk.date && bk.slot ? `${fmtDate(bk.date)} · ${fmtSlot(bk.slot)}` : bk.date ? `${fmtDate(bk.date)} — pick a time` : 'No slot selected yet';
}

function icsStamp(d) { return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`; }

function wireBooking() {
  const now = new Date();
  bk.month = new Date(now.getFullYear(), now.getMonth(), 1);
  const sel = $('#courseSelect');
  FIELDS.forEach(f => {
    const g = document.createElement('optgroup'); g.label = f.name;
    COURSES.filter(c => c.field === f.id).forEach(c => g.append(new Option(`${c.name} — ${c.place}`, c.id)));
    sel.append(g);
  });
  sel.append(new Option('Not sure yet — help me choose', 'unsure'));
  renderCal(); renderSummary();

  $('#calPrev').onclick = () => { bk.month = new Date(bk.month.getFullYear(), bk.month.getMonth() - 1, 1); renderCal(); };
  $('#calNext').onclick = () => { bk.month = new Date(bk.month.getFullYear(), bk.month.getMonth() + 1, 1); renderCal(); };
  $('#calGrid').addEventListener('click', e => {
    const b = e.target.closest('button.day'); if (!b || b.disabled) return;
    bk.date = new Date(bk.month.getFullYear(), bk.month.getMonth(), +b.dataset.d);
    if (bk.slot && !slotOpen(bk.date, bk.slot)) bk.slot = null;
    renderCal(); renderSlots(); renderSummary();
  });
  $('#slots').addEventListener('click', e => {
    const b = e.target.closest('.slot'); if (!b || b.disabled) return;
    bk.slot = b.dataset.s; renderSlots(); renderSummary();
  });

  const form = $('#bkForm');
  form.addEventListener('input', e => e.target.classList.remove('bad'));
  form.addEventListener('submit', e => {
    e.preventDefault();
    const err = $('#formErr'); err.textContent = '';
    const data = Object.fromEntries(new FormData(form));
    const bad = [];
    if (!data.name.trim()) bad.push('name');
    if (!/^[+\d][\d ]{9,13}$/.test(data.phone.trim())) bad.push('phone');
    if (!data.qual) bad.push('qual');
    if (!data.course) bad.push('course');
    bad.forEach(n => form.elements[n].classList.add('bad'));
    if (!bk.date || !bk.slot) { err.textContent = 'Please pick a date and a time on the calendar.'; return; }
    if (bad.length) { err.textContent = 'Please fill in the highlighted fields.'; form.elements[bad[0]].focus(); return; }

    const course = COURSES.find(c => c.id === data.course);
    const courseLabel = course ? `${course.name} (${course.place})` : 'Not sure yet — help me choose';
    const [h, mi] = bk.slot.split(':').map(Number);
    const start = new Date(bk.date); start.setHours(h, mi, 0, 0);
    const end = new Date(start); end.setMinutes(end.getMinutes() + 45);
    const ref = 'SEC-' + `${pad(start.getMonth() + 1)}${pad(start.getDate())}` + '-' + Math.random().toString(36).slice(2, 6).toUpperCase();

    const msg = [
      `🎓 *1:1 Counselling request* — ${ref}`,
      ``,
      `📅 ${fmtDate(bk.date)}, ${fmtSlot(bk.slot)}`,
      `🎯 Course: ${courseLabel}`,
      `👤 Student: ${data.name.trim()}`,
      `📞 Phone: ${data.phone.trim()}`,
      `📚 Qualification: ${data.qual}`,
      data.neet ? `🩺 NEET score: ${data.neet}` : '',
      data.city ? `📍 City: ${data.city}` : '',
      `💬 Mode: ${data.mode}`,
      data.note ? `📝 ${data.note.trim()}` : '',
    ].filter(Boolean).join('\n');
    const wa = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(msg)}`;
    window.open(wa, '_blank', 'noopener');

    const title = `Counselling session — ${CONTACT.name}`;
    const details = `Ref ${ref}\nCourse: ${courseLabel}\nMode: ${data.mode}\nCall/WhatsApp: +91 ${CONTACT.phone}`;
    $('#doneGcal').href = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${icsStamp(start)}/${icsStamp(end)}&ctz=Asia/Kolkata&details=${encodeURIComponent(details)}`;
    $('#doneIcs').onclick = () => {
      const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Symbiosis Education Consultancy//Booking//EN', 'BEGIN:VEVENT',
        `UID:${ref}@symbiosis-consultancy`, `DTSTAMP:${icsStamp(new Date())}`, `DTSTART;TZID=Asia/Kolkata:${icsStamp(start)}`, `DTEND;TZID=Asia/Kolkata:${icsStamp(end)}`,
        `SUMMARY:${title}`, `DESCRIPTION:${details.replace(/\n/g, '\\n')}`, 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
      const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' })); a.download = `${ref}.ics`; a.click();
    };
    $('#doneWa').href = wa;
    $('#doneRef').textContent = ref;
    $('#doneName').textContent = data.name.trim().split(' ')[0];
    $('#doneText').textContent = `${fmtDate(bk.date)} at ${fmtSlot(bk.slot)} · ${data.mode}. WhatsApp has opened with your details — press send and we'll confirm your slot.`;
    $('.bk-cal').hidden = true; form.hidden = true; $('#bkDone').hidden = false;
    scrollToEl('#book');
  });

  $('#doneReset').onclick = () => {
    form.reset(); bk.date = null; bk.slot = null;
    $('.bk-cal').hidden = false; form.hidden = false; $('#bkDone').hidden = true;
    $('#slotsTitle').textContent = 'Choose a date to see times';
    renderCal(); renderSlots(); renderSummary();
  };
}

/* ------------------------------------------------------------------ motion */
let lenis;
function scrollToEl(sel) {
  const el = typeof sel === 'string' ? $(sel) : sel;
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset: -90, duration: 1.4 }); else el.scrollIntoView({ behavior: 'smooth' });
}

function splitWords(el) {
  const walk = node => {
    [...node.childNodes].forEach(n => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach(part => {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.append(document.createTextNode(' ')); return; }
          const w = document.createElement('span'); w.className = 'w';
          const i = document.createElement('span'); i.textContent = part; w.append(i); frag.append(w);
        });
        n.replaceWith(frag);
      } else if (n.nodeType === 1 && n.tagName !== 'BR') walk(n);
    });
  };
  walk(el);
}

function initMotion() {
  gsap.registerPlugin(ScrollTrigger);
  if (!reduced) {
    lenis = new Lenis({ duration: 1.15, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]');
    if (!a || a.dataset.field) return;
    const target = $(a.getAttribute('href'));
    if (target) { e.preventDefault(); closeDrawer(); scrollToEl(target); }
  });

  if (reduced) return;

  $$('.split').forEach(el => {
    splitWords(el);
    const isHero = el.classList.contains('hero-title');
    gsap.from(el.querySelectorAll('.w > span'), {
      yPercent: 110, rotate: 4, duration: 1.1, ease: 'power4.out', stagger: .05, delay: isHero ? .25 : 0,
      scrollTrigger: isHero ? null : { trigger: el, start: 'top 88%' },
    });
  });
  $$('.reveal').forEach(el => gsap.from(el, { y: 36, opacity: 0, duration: 1, ease: 'power3.out', delay: el.closest('.hero') ? .55 : 0, scrollTrigger: el.closest('.hero') ? null : { trigger: el, start: 'top 92%' } }));
  ScrollTrigger.batch('.reveal-tile', { start: 'top 90%', onEnter: els => gsap.from(els, { y: 60, opacity: 0, rotateX: -12, duration: 1.1, stagger: .08, ease: 'power3.out' }) });

  // receipt straightens + stamp lands as you scroll
  gsap.fromTo('#receipt', { rotateX: 28, rotateY: -32, rotateZ: 8, y: 60 }, { rotateX: 6, rotateY: -8, rotateZ: -2, y: -10, ease: 'none', scrollTrigger: { trigger: '.receipt-stage', start: 'top bottom', end: 'bottom top', scrub: 1 } });
  gsap.from('.r-stamp', { scale: 2.6, opacity: 0, rotate: -40, duration: .6, ease: 'back.out(2)', scrollTrigger: { trigger: '#receipt', start: 'top 60%' } });
  gsap.from('.r-row, .r-total', { x: -20, opacity: 0, stagger: .08, duration: .6, ease: 'power2.out', scrollTrigger: { trigger: '#receipt', start: 'top 75%' } });

  gsap.to('.process-line i', { scaleX: 1, ease: 'none', scrollTrigger: { trigger: '#processGrid', start: 'top 80%', end: 'bottom 60%', scrub: 1 } });
  gsap.from('.step', { y: 40, opacity: 0, stagger: .12, duration: .9, ease: 'power3.out', scrollTrigger: { trigger: '#processGrid', start: 'top 82%' } });

  // count-ups
  $$('[data-count]').forEach(el => {
    const end = +el.dataset.count; if (!end) return;
    const o = { v: 0 };
    gsap.to(o, { v: end, duration: 1.8, ease: 'power2.out', delay: el.closest('.hero') ? .9 : 0, onUpdate: () => el.textContent = Math.round(o.v),
      scrollTrigger: el.closest('.hero') ? null : { trigger: el, start: 'top 90%' } });
  });

  // nav states
  const nav = $('#nav'); let lastY = 0;
  ScrollTrigger.create({ start: 0, end: 'max', onUpdate: self => {
    const y = self.scroll();
    nav.classList.toggle('is-light', y > innerHeight * .8);
    nav.classList.toggle('is-hidden', y > lastY && y > innerHeight && !$('#drawer').classList.contains('open'));
    lastY = y;
  } });

  // photo parallax
  gsap.fromTo('.hero-photo img', { scale: 1.12 }, { scale: 1, duration: 2.4, ease: 'power2.out' });
  gsap.to('.hero-photo', { yPercent: 18, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  gsap.fromTo('.pb-img img', { yPercent: -12 }, { yPercent: 12, ease: 'none', scrollTrigger: { trigger: '.photo-band', start: 'top bottom', end: 'bottom top', scrub: true } });
  gsap.fromTo('.final-photo img', { yPercent: -10 }, { yPercent: 10, ease: 'none', scrollTrigger: { trigger: '.final', start: 'top bottom', end: 'bottom top', scrub: true } });
  gsap.from('.approach-photo', { clipPath: 'inset(0 0 100% 0 round 24px)', duration: 1.4, ease: 'expo.inOut', scrollTrigger: { trigger: '.receipt-stage', start: 'top 80%' } });
  gsap.from('.step-img', { clipPath: 'inset(100% 0 0 0 round 16px)', duration: 1.2, stagger: .12, ease: 'expo.out', scrollTrigger: { trigger: '#processGrid', start: 'top 85%' } });
  gsap.from('.hero-card', { y: 40, opacity: 0, duration: 1.2, delay: 1, ease: 'power3.out' });
  ScrollTrigger.batch('.path', { start: 'top 92%', onEnter: els => gsap.from(els, { y: 50, opacity: 0, duration: .9, stagger: .07, ease: 'back.out(1.6)' }) });
  gsap.from('.book-person', { y: 120, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: '.booking-wrap', start: 'top 85%' } });

  // tile tilt
  $$('.tile').forEach(t => {
    t.addEventListener('pointermove', e => {
      const r = t.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width; const y = (e.clientY - r.top) / r.height;
      t.style.setProperty('--mx', x * 100 + '%'); t.style.setProperty('--my', y * 100 + '%');
      t.style.transform = `perspective(900px) rotateX(${(.5 - y) * 8}deg) rotateY(${(x - .5) * 10}deg)`;
      t.style.setProperty('--px', `${(x - .5) * -14}px`); t.style.setProperty('--py', `${(y - .5) * -8}px`);
    });
    t.addEventListener('pointerleave', () => { t.style.transform = ''; t.style.setProperty('--px', '0px'); t.style.setProperty('--py', '0px'); });
  });
}

/* ------------------------------------------------------------------ drawer */
function closeDrawer() { $('#drawer').classList.remove('open'); $('.burger').setAttribute('aria-expanded', 'false'); document.body.style.overflow = ''; }
$('.burger').addEventListener('click', () => {
  const open = !$('#drawer').classList.contains('open');
  $('#drawer').classList.toggle('open', open); $('.burger').setAttribute('aria-expanded', open);
  document.body.style.overflow = open ? 'hidden' : '';
});

/* ------------------------------------------------------------------ loader */
function hideLoader() {
  const l = $('.loader'); if (!l || l.dataset.done) return; l.dataset.done = 1;
  $('.loader-bar i').style.width = '100%';
  if (window.gsap) gsap.to(l, { yPercent: -100, duration: .9, ease: 'power4.inOut', delay: .25, onComplete: () => l.remove() });
  else l.remove();
}
requestAnimationFrame(() => { const b = $('.loader-bar i'); if (b) b.style.width = '70%'; });
window.addEventListener('hero3d:ready', hideLoader);
window.addEventListener('load', () => setTimeout(hideLoader, 1200));
setTimeout(hideLoader, 4000);

/* ------------------------------------------------------------------ boot */
$$('[data-count="programmes"]').forEach(el => { el.dataset.count = COURSES.length; el.textContent = COURSES.length; });
renderBento(); renderPaths(); renderPromises(); renderChips(); renderCourses(false); renderUpdates();
wireFinder(); wireBooking();
if (window.gsap) initMotion();
