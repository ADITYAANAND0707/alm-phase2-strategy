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
      primaryColor:       '#1c1c24',   /* surface-2 */
      primaryTextColor:   '#f0f0f5',   /* text */
      primaryBorderColor: '#2a2a36',   /* border */
      lineColor:          '#7c5cff',   /* brand purple */
      secondaryColor:     '#141418',   /* surface */
      tertiaryColor:      '#0d0d10',   /* bg */
      tertiaryTextColor:  '#c4c4d4',
      edgeLabelBackground:'#1c1c24',
      clusterBkg:         '#141418',
      clusterBorder:      '#2a2a36',
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

  /* Render Lucide icons injected by HTML sections */
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  initReveal();
  initTocObserver();
  initToggles();
  highlightCode();
  initH3Toggles();
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

/* ── Syntax highlighting ──────────────────────────────────────────────────────
   Single-pass tokenisers for JSON payloads and MAL programs.
   Runs after sections load; safely HTML-escapes content first.
   ─────────────────────────────────────────────────────────────────────────── */
function escHTML(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function highlightJSON(raw) {
  return escHTML(raw).replace(
    /"([^"]+)"(\s*:)|(\s*:\s*)("(?:[^"\\]|\\.)*")|(\s*:\s*)(null|true|false)|(\s*:\s*)(-?\d+(?:\.\d+)?)/g,
    (m, key, colon, sep1, strVal, sep2, kwVal, sep3, numVal) => {
      if (key  !== undefined) return `<span class="tok-key">"${key}"</span>${colon}`;
      if (strVal !== undefined) return `${sep1}<span class="tok-str">${strVal}</span>`;
      if (kwVal  !== undefined) return `${sep2}<span class="tok-null">${kwVal}</span>`;
      if (numVal !== undefined) return `${sep3}<span class="tok-num">${numVal}</span>`;
      return m;
    }
  );
}

function highlightMAL(raw) {
  const KW   = 'application|entity|workflow|policy|evolution|screen|agent|integration|event|domain|version|attributes|relationships|trigger|steps|rules|audit|route|components|changes|impacts|migration_steps|applies_to';
  const TYPE = 'UUID|STRING|DATETIME|DECIMAL|INTEGER|BIGINT|DATE|BOOLEAN|TEXT';
  const RE   = new RegExp(
    `(ENUM\\([^)]*\\))|\\b(${KW})\\b|\\b(${TYPE})\\b|\\b(required)\\b|\\b(belongs_to|has_one|has_many)\\b`,
    'g'
  );
  return escHTML(raw).replace(RE, (m, enumEx, kw, type, mod, rel) => {
    if (enumEx) return `<span class="tok-enum">${enumEx}</span>`;
    if (kw)     return `<span class="tok-kw">${kw}</span>`;
    if (type)   return `<span class="tok-type">${type}</span>`;
    if (mod)    return `<span class="tok-mod">${mod}</span>`;
    if (rel)    return `<span class="tok-rel">${rel}</span>`;
    return m;
  });
}

function highlightCode() {
  /* .pre-wrap blocks: detect JSON vs MAL from the header text */
  document.querySelectorAll('.pre-wrap').forEach(wrap => {
    const header = wrap.querySelector('.pre-header');
    const pre    = wrap.querySelector('pre');
    if (!pre || !header) return;
    if (pre.dataset.highlighted) return;
    pre.dataset.highlighted = '1';

    const isJSON = /JSON|JSONL/i.test(header.textContent);
    pre.innerHTML = isJSON ? highlightJSON(pre.textContent) : highlightMAL(pre.textContent);
  });

  /* .ep-code blocks (example library): always MAL */
  document.querySelectorAll('.ep-code').forEach(el => {
    if (el.dataset.highlighted) return;
    el.dataset.highlighted = '1';
    el.innerHTML = highlightMAL(el.textContent);
  });
}

/* ── h3 section toggles ───────────────────────────────────────────────────────
   Each h3 gets a "− hide / + show" badge. Clicking collapses/expands all
   sibling elements between that h3 and the next heading.
   ─────────────────────────────────────────────────────────────────────────── */
function initH3Toggles() {
  document.querySelectorAll('h3').forEach(h3 => {
    if (h3.dataset.toggleBound) return;
    h3.dataset.toggleBound = '1';

    /* Badge */
    const badge = document.createElement('span');
    badge.className = 'h3-badge';
    badge.textContent = '− hide';
    h3.appendChild(badge);

    /* Collect DOM siblings until next h2 / h3 / part-div */
    function siblings() {
      const els = [];
      let el = h3.nextElementSibling;
      while (el && !el.matches('h2, h3, .part-div')) {
        els.push(el);
        el = el.nextElementSibling;
      }
      return els;
    }

    let collapsed = false;
    h3.addEventListener('click', () => {
      collapsed = !collapsed;
      h3.classList.toggle('h3-collapsed', collapsed);
      badge.textContent = collapsed ? '+ show' : '− hide';
      siblings().forEach(el => { el.style.display = collapsed ? 'none' : ''; });
    });
  });
}

/* ── Kick off ─────────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  loadSections();
});
