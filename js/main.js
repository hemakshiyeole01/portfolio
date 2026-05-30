/* ============================================================
   js/main.js
   All interactive behaviours. initAll() called on every page.
   ============================================================ */

/* ─── THEME TOGGLE ──────────────────────────────────────────── */
function initTheme() {
  const html = document.documentElement;
  const btn  = document.getElementById('theme-toggle');
  if (!btn) return;

  // Restore saved preference, default = light
  const saved = localStorage.getItem('hy-theme') || 'light';
  html.setAttribute('data-theme', saved);

  btn.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('hy-theme', next);
    // Spin-in animation reset
    btn.style.animation = 'none';
    requestAnimationFrame(() => { btn.style.animation = ''; });
  });
}

/* ─── PROGRESS BAR ──────────────────────────────────────────── */
function initProgressBar() {
  const bar = document.getElementById('progress-bar');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    bar.style.width = Math.min(pct, 100) + '%';
  }, { passive: true });
}

/* ─── CURSOR GLOW ───────────────────────────────────────────── */
function initCursorGlow() {
  const glow = document.getElementById('cursor-glow');
  if (!glow || window.matchMedia('(pointer:coarse)').matches) {
    if (glow) glow.style.display = 'none';
    return;
  }
  let mx = 0, my = 0, cx = 0, cy = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  (function tick() {
    cx += (mx - cx) * 0.08;
    cy += (my - cy) * 0.08;
    glow.style.transform = `translate(${cx - 160}px, ${cy - 160}px)`;
    requestAnimationFrame(tick);
  })();
}

/* ─── NAVBAR ────────────────────────────────────────────────── */
function initNavbar() {
  const nav = document.querySelector('.navbar');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 80);
  }, { passive: true });
  // Mark active link by filename
  const page = location.pathname.split('/').pop() || 'index.html';
  nav.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    // Skip anchor-only links (like #contact)
    if (href.startsWith('#')) return;
    const filename = href.split('/').pop().split('#')[0] || 'index.html';
    if (filename === page) a.classList.add('active');
  });
}

/* ─── SCROLL REVEAL ─────────────────────────────────────────── */
function initReveal() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const delay = parseInt(e.target.dataset.delay || 0);
      delay
        ? setTimeout(() => e.target.classList.add('visible'), delay)
        : e.target.classList.add('visible');
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -36px 0px' });
  document.querySelectorAll('.reveal, .tl-item, .cert-card, .skill-row, .ach-item').forEach(el => io.observe(el));
  return io;
}

/* ─── SKILL BAR ANIMATION ───────────────────────────────────── */
function initSkillBars() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const pct = e.target.dataset.pct;
      if (!pct) return;
      const bar = e.target.querySelector('.skill-bar');
      if (bar) setTimeout(() => { bar.style.width = pct + '%'; }, 150);
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.skill-row').forEach(el => io.observe(el));
}

/* ─── TYPEWRITER ─────────────────────────────────────────────── */
function initTypewriter(wrapId, cursorId, phrases) {
  const wrap   = document.getElementById(wrapId);
  if (!wrap) return;
  let ri = 0, ci = 0, deleting = false;
  function tick() {
    const current = phrases[ri];
    if (!deleting) {
      wrap.textContent = current.slice(0, ci + 1);
      ci++;
      if (ci === current.length) { deleting = true; setTimeout(tick, 2000); return; }
    } else {
      wrap.textContent = current.slice(0, ci - 1);
      ci--;
      if (ci === 0) { deleting = false; ri = (ri + 1) % phrases.length; }
    }
    setTimeout(tick, deleting ? 48 : 82);
  }
  tick();
}

/* ─── PROJECT FILTER ─────────────────────────────────────────── */
function initProjectFilter(gridId) {
  const grid = document.getElementById(gridId || 'projects-grid');
  if (!grid) return;
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.cat;
      grid.querySelectorAll('.project-card').forEach((card, i) => {
        const show = cat === 'all' || card.dataset.cat === cat;
        card.style.display = show ? 'flex' : 'none';
        if (show) {
          card.classList.remove('visible');
          setTimeout(() => card.classList.add('visible'), i * 60);
        }
      });
    });
  });
}

/* ─── MODAL ──────────────────────────────────────────────────── */
function initModal() {
  const overlay = document.getElementById('modal-overlay');
  if (!overlay) return;
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
}

function openModal(data) {
  const overlay = document.getElementById('modal-overlay');
  if (!overlay) return;
  document.getElementById('modal-thumb').style.background  = data.color || 'var(--fog)';
  document.getElementById('modal-icon').textContent        = data.icon  || '';
  document.getElementById('modal-cat').textContent         = data.cat   || '';
  document.getElementById('modal-title').textContent       = data.title || '';
  document.getElementById('modal-desc').textContent        = data.desc  || '';
  document.getElementById('modal-highlights').innerHTML    = (data.highlights || []).map(h => `<li>${h}</li>`).join('');
  document.getElementById('modal-stack').innerHTML         = (data.stack || []).map(s => `<span class="stack-badge">${s}</span>`).join('');
  let links = data.github ? `<a href="${data.github}" target="_blank" rel="noopener" class="btn-primary">View on GitHub ↗</a>` : '';
  if (data.live) links += ` <a href="${data.live}" target="_blank" rel="noopener" class="btn-secondary">Live demo ↗</a>`;
  document.getElementById('modal-links').innerHTML = links;
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const overlay = document.getElementById('modal-overlay');
  if (!overlay) return;
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

/* ─── TABS ───────────────────────────────────────────────────── */
function initTabs(onSwitch) {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      const panel = document.getElementById('tab-' + btn.dataset.tab);
      if (panel) panel.classList.add('active');
      if (onSwitch) onSwitch(btn.dataset.tab);
    });
  });
}

/* ─── FAQ ACCORDION ──────────────────────────────────────────── */
function initFaq() {
  document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', () => {
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });
}

/* ─── CONTACT FORM ───────────────────────────────────────────── */
function initContactForm(btnId) {
  const btn = document.getElementById(btnId || 'submit-btn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const fields = document.querySelectorAll('.form-input, .form-textarea');
    let valid = true;
    fields.forEach(f => {
      if (!f.value.trim()) {
        valid = false;
        f.style.borderColor = 'var(--dusty-rose)';
        f.style.animation = 'shake 0.4s ease';
        setTimeout(() => { f.style.animation = ''; f.style.borderColor = ''; }, 500);
      }
    });
    if (!valid) return;
    const txt   = btn.querySelector('.btn-text') || btn;
    const arrow = btn.querySelector('.btn-arrow');
    btn.disabled = true;
    btn.style.background = 'var(--periwinkle)';
    if (arrow) arrow.textContent = '⟳';
    if (txt !== btn) txt.textContent = 'Sending…'; else btn.textContent = 'Sending…';
    setTimeout(() => {
      btn.style.background = 'var(--sage)';
      btn.style.color = 'var(--deep)';
      if (arrow) arrow.textContent = '✓';
      if (txt !== btn) txt.textContent = 'Sent!'; else btn.textContent = '✓ Sent!';
      setTimeout(() => {
        btn.disabled = false;
        btn.style.background = '';
        btn.style.color = '';
        if (arrow) arrow.textContent = '→';
        if (txt !== btn) txt.textContent = 'Send message'; else btn.textContent = 'Send message →';
        document.querySelectorAll('.form-input, .form-textarea, .form-select').forEach(i => { i.value = ''; });
        const cc = document.getElementById('char-count');
        if (cc) cc.textContent = '0 / 1200';
      }, 3500);
    }, 1800);
  });
}

/* ─── CHAR COUNTER ───────────────────────────────────────────── */
function initCharCount(taId, countId, max) {
  const ta = document.getElementById(taId);
  const cc = document.getElementById(countId);
  if (!ta || !cc) return;
  ta.addEventListener('input', () => { cc.textContent = `${ta.value.length} / ${max || 1200}`; });
}

/* ─── BOOTSTRAP ──────────────────────────────────────────────── */
function initAll(opts) {
  opts = opts || {};
  initTheme();                          // ← always first
  initProgressBar();
  initCursorGlow();
  initNavbar();
  initReveal();
  initSkillBars();
  if (opts.typewriter)
    initTypewriter(
      opts.typewriter.wrapId   || 'typewriter-wrap',
      opts.typewriter.cursorId || 'typewriter-cursor',
      opts.typewriter.phrases  || ['Developer']
    );
  if (opts.projectFilter !== false) initProjectFilter(opts.projectFilterGrid);
  if (opts.modal  !== false) initModal();
  if (opts.tabs)   initTabs(opts.onTabSwitch);
  if (opts.faq  !== false)   initFaq();
  if (opts.contactForm !== false) initContactForm(opts.contactFormBtn);
  if (opts.charCount)
    initCharCount(opts.charCount.taId, opts.charCount.countId, opts.charCount.max);
}