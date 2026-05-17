/* ============================================================
   main.js — shared across all pages
   ============================================================ */

// SCROLL PROGRESS
const bar = document.getElementById('progress-bar');
if (bar) {
  window.addEventListener('scroll', () => {
    const p = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    bar.style.width = p + '%';
  });
}

// SCROLL REVEAL
const revealEls = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => obs.observe(el));

// ACTIVE NAV LINK (homepage only)
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a[href^="#"]');
if (sections.length && navLinks.length) {
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 200) current = s.id; });
    navLinks.forEach(a => {
      a.classList.remove('active');
      if (a.getAttribute('href') === '#' + current) a.classList.add('active');
    });
  });
}

// GLASS TILT
document.querySelectorAll('.glass').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `translateY(-4px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});

// CONTACT FORM
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = document.getElementById('submit-btn');
    btn.textContent = 'Sent ✓';
    btn.style.background = 'linear-gradient(135deg,#059669,#10b981)';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Send Message →';
      btn.style.background = '';
      btn.disabled = false;
      form.reset();
    }, 3000);
  });
}

// TYPING EFFECT (homepage hero only)
const typedEl = document.getElementById('typed');
if (typedEl) {
  const roles = [
    'Data Science Undergraduate',
    'Real-Time Pipeline Engineer',
    'NLP & ML Enthusiast',
    'Open to Internships'
  ];
  let rIdx = 0, cIdx = 0, deleting = false;
  function type() {
    const role = roles[rIdx];
    if (!deleting) {
      typedEl.textContent = role.slice(0, ++cIdx);
      if (cIdx === role.length) { deleting = true; setTimeout(type, 2000); return; }
    } else {
      typedEl.textContent = role.slice(0, --cIdx);
      if (cIdx === 0) { deleting = false; rIdx = (rIdx + 1) % roles.length; }
    }
    setTimeout(type, deleting ? 40 : 80);
  }
  setTimeout(type, 800);
}
