// Progressive enhancement for the Ad Manager system. No dependencies.
// Everything degrades gracefully and respects prefers-reduced-motion.
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---- navbar: transparent -> solid on scroll ---- */
const nav = document.querySelector('.mi-navbar');
if (nav) {
  const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 12);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ---- mobile menu ---- */
const sheet = document.getElementById('mobile-menu');
if (sheet) {
  document.querySelectorAll('[data-menu-open]').forEach((b) => b.addEventListener('click', () => sheet.setAttribute('open', '')));
  const close = () => sheet.removeAttribute('open');
  sheet.querySelectorAll('[data-menu-close], a').forEach((b) => b.addEventListener('click', close));
}

/* ---- scroll progress bar ---- */
const bar = document.querySelector('.mi-progress');
if (bar) {
  const upd = () => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
  };
  upd();
  window.addEventListener('scroll', upd, { passive: true });
}

/* ---- reveal on scroll (with stagger inside [data-stagger]) ---- */
const reveals = [...document.querySelectorAll('.mi-reveal')];
if (reveals.length) {
  const reveal = (el) => {
    const parent = el.closest('[data-stagger]');
    if (parent) {
      const i = [...parent.querySelectorAll('.mi-reveal')].indexOf(el);
      el.style.transitionDelay = Math.max(0, i) * 70 + 'ms';
    }
    el.classList.add('is-in');
  };
  if (reduce || !('IntersectionObserver' in window)) {
    reveals.forEach(reveal);
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { reveal(e.target); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    reveals.forEach((el) => io.observe(el));
    // safety net: some embedded browsers don't fire IO for already-visible
    // elements — reveal anything in the viewport once, after load.
    const sweep = () => reveals.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.98 && r.bottom > 0) reveal(el);
    });
    window.addEventListener('load', () => setTimeout(sweep, 60));
    window.addEventListener('scroll', sweep, { passive: true });
  }
}

/* ---- number count-up ---- */
function parseNum(text) {
  const m = text.match(/^(\D*?)([\d.,]+)(.*)$/s);
  if (!m) return null;
  const [, prefix, core, suffix] = m;
  const grouped = /\d{1,3}(\.\d{3})+/.test(core);
  const decMatch = core.match(/,(\d+)$/);
  const decimals = decMatch ? decMatch[1].length : 0;
  const value = parseFloat(core.replace(/\./g, '').replace(',', '.'));
  return { prefix, suffix, grouped, decimals, value };
}
function fmt(v, p) {
  let s = p.decimals > 0 ? v.toFixed(p.decimals).replace('.', ',') : String(Math.round(v));
  if (p.grouped) {
    const [int, dec] = s.split(',');
    s = int.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + (dec ? ',' + dec : '');
  }
  return p.prefix + s + p.suffix;
}
const counters = document.querySelectorAll('[data-count]');
if (counters.length) {
  const run = (el) => {
    const p = parseNum(el.textContent.trim());
    if (!p || isNaN(p.value)) return;
    if (reduce) { el.textContent = fmt(p.value, p); return; }
    const dur = 1100, t0 = performance.now();
    const tick = (t) => {
      const k = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - k, 3);
      el.textContent = fmt(p.value * eased, p);
      if (k < 1) requestAnimationFrame(tick);
      else el.textContent = fmt(p.value, p);
    };
    requestAnimationFrame(tick);
  };
  if (!('IntersectionObserver' in window)) {
    counters.forEach(run);
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } });
    }, { threshold: 0.4 });
    counters.forEach((el) => io.observe(el));
  }
}

/* ---- magnetic button (single, end-page CTA) ---- */
if (!reduce) {
  document.querySelectorAll('.mi-magnetic').forEach((el) => {
    const strength = 0.35;
    el.addEventListener('mousemove', (ev) => {
      const r = el.getBoundingClientRect();
      const x = ev.clientX - r.left - r.width / 2;
      const y = ev.clientY - r.top - r.height / 2;
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    });
    el.addEventListener('mouseleave', () => { el.style.transform = ''; });
  });
}
