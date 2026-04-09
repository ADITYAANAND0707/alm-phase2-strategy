/* ═══════════════════════════════════════════════════════════════════════════
   app.js  —  ALM Phase 2 Strategy Document
   Handles: section loading, scroll behaviours, TOC, reveal, toggles, meta-log
   ═══════════════════════════════════════════════════════════════════════════ */

/* ── Mermaid init ─────────────────────────────────────────────────────────── */
if (typeof mermaid !== 'undefined') {
  mermaid.initialize({
    startOnLoad: false,
    theme: 'base',
    themeVariables: {
      primaryColor:       '#e8f4f2',
      primaryTextColor:   '#12314a',
      primaryBorderColor: '#0f766e',
      lineColor:          '#0f766e',
      secondaryColor:     '#f4f8fb',
      tertiaryColor:      '#ffffff',
      fontSize:           '12.5px'
    },
    flowchart: { curve: 'basis', padding: 20 }
  });
}

/* ── Dynamic section loader ───────────────────────────────────────────────── */
const SECTIONS = [
  'sections/part1.html',
  'sections/part2.html',
  'sections/part3.html',
  'sections/part4.html',
  'sections/part5.html'
];

async function loadSections() {
  const container = document.getElementById('sections-container');
  if (!container) return;

  for (const src of SECTIONS) {
    try {
      const res  = await fetch(src);
      if (!res.ok) throw new Error(`HTTP ${res.status} for ${src}`);
      const html = await res.text();
      const div  = document.createElement('div');
      div.innerHTML = html;
      container.appendChild(div);
    } catch (err) {
      console.warn(`[sections] Failed to load ${src}:`, err.message);
    }
  }

  /* After all sections are in the DOM, run post-load tasks */
  postLoad();
}

function postLoad() {
  /* Re-run mermaid on newly inserted diagrams */
  if (typeof mermaid !== 'undefined') {
    mermaid.init(undefined, '.mermaid');
  }

  initReveal();
  initTocObserver();
  initToggles();
}

/* ── Reading progress bar ─────────────────────────────────────────────────── */
const prog    = document.getElementById('read-progress');
const backTop = document.getElementById('back-top');

window.addEventListener('scroll', () => {
  const scrolled  = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  if (prog)    prog.style.width = (docHeight > 0 ? (scrolled / docHeight) * 100 : 0) + '%';
  if (backTop) backTop.classList.toggle('visible', scrolled > 500);
}, { passive: true });

if (backTop) {
  backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ── Active TOC link on scroll ────────────────────────────────────────────── */
function initTocObserver() {
  const sections = document.querySelectorAll('h2[id]');
  const tocLinks = document.querySelectorAll('.toc-pill[href^="#"]');

  const tocObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        tocLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.toc-pill[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-15% 0px -75% 0px' });

  sections.forEach(s => tocObserver.observe(s));
}

/* ── Section fade-in on scroll ────────────────────────────────────────────── */
function initReveal() {
  const revealTargets = [
    'h2', '.grid-2', '.grid-3', '.grid-4',
    '.diagram-box', '.phase-strip', '.timeline-strip',
    '.example-pair', '.rec', '.roadmap', '.oi'
  ].join(',');

  document.querySelectorAll(revealTargets).forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.07 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}

/* ── Click-to-expand/collapse toggles ────────────────────────────────────── */
function initToggles() {
  /* metric-card: starts collapsed, click to expand description */
  document.querySelectorAll('.metric-card').forEach(card => {
    if (card.dataset.toggleBound) return;
    card.dataset.toggleBound = '1';
    card.addEventListener('click', () => card.classList.toggle('expanded'));
  });

  /* .card: starts open, click to collapse.
     Inject a visible toggle badge into each card automatically. */
  document.querySelectorAll('.card').forEach(card => {
    if (card.dataset.toggleBound) return;
    card.dataset.toggleBound = '1';

    /* Insert a toggle badge after the first .ctag if not already present */
    const ctag = card.querySelector('.ctag');
    if (ctag && !card.querySelector('.card-toggle')) {
      const badge = document.createElement('span');
      badge.className = 'card-toggle';
      ctag.insertAdjacentElement('afterend', badge);
    }

    card.addEventListener('click', () => card.classList.toggle('collapsed'));
  });
}

/* ── Meta-log utility ─────────────────────────────────────────────────────────
   appendMetaLog({ task, type, status, impact, notes })
   Types:    "feature" | "bug" | "improvement" | "research"
   Statuses: "started" | "in-progress" | "completed"
   Impacts:  "low" | "medium" | "high"
   ─────────────────────────────────────────────────────────────────────────── */
function appendMetaLog(entry) {
  const store = document.getElementById('meta-log-data');
  if (!store) { console.warn('appendMetaLog: #meta-log-data not found'); return; }
  let entries;
  try { entries = JSON.parse(store.textContent || '[]'); } catch (e) { entries = []; }
  const now     = new Date();
  const dateStr = now.toISOString().slice(0, 10);
  const idDate  = dateStr.replace(/-/g, '_');
  const seq     = String(entries.filter(e => e.date === dateStr).length + 1).padStart(2, '0');
  entry.id      = 'log_' + idDate + '_' + seq;
  entry.date    = dateStr;
  entry.logged_at = now.toISOString();
  entries.unshift(entry);
  store.textContent = JSON.stringify(entries, null, 2);
  console.info('[meta-log] Entry added:', entry.id, '—', entry.task);
}

/* ── Daily summary helper ─────────────────────────────────────────────────────
   createDailySummary({ date, tasks, blockers, learnings })
   ─────────────────────────────────────────────────────────────────────────── */
function createDailySummary({ date, tasks = '', blockers = '', learnings = '' } = {}) {
  const tmpl = document.getElementById('daily-summary-template');
  if (!tmpl) { console.warn('createDailySummary: template not found'); return null; }
  const node = tmpl.content.cloneNode(true);
  const wrap = node.querySelector('.daily-summary-entry');
  wrap.dataset.date = date || new Date().toISOString().slice(0, 10);
  node.querySelector('.ds-tasks').textContent    = tasks;
  node.querySelector('.ds-blockers').textContent = blockers;
  node.querySelector('.ds-learnings').textContent = learnings;
  return node;
}

/* ── Kick off ─────────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  loadSections();
});
