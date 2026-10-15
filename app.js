/* ═══════════════════════════════════════════════════════════════════
   Arrow Mapping — Interaction Layer
   ═══════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ─── Nav scroll effect ──────────────────────────────────────────
  const nav = document.getElementById('nav');
  let lastScroll = 0;

  function handleScroll() {
    const y = window.scrollY;
    nav.classList.toggle('nav--scrolled', y > 60);
    lastScroll = y;
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ─── Mobile menu ────────────────────────────────────────────────
  const burger = document.getElementById('navBurger');
  const navLinks = document.getElementById('navLinks');

  burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const spans = burger.querySelectorAll('span');
    if (navLinks.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });

  // Close mobile menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      const spans = burger.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    });
  });

  // ─── Scroll reveal ──────────────────────────────────────────────
  const reveals = document.querySelectorAll(
    '.service-card, .models__card, .equipment__card, .pricing__card, .step, .rtk__feature'
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger siblings
          const parent = entry.target.parentElement;
          const siblings = parent.querySelectorAll(':scope > ' + entry.target.tagName.toLowerCase() + ', :scope > .' + entry.target.className.split(' ')[0]);
          const index = Array.from(siblings).indexOf(entry.target);
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, index * 100);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  reveals.forEach(el => observer.observe(el));

  // ─── Smooth anchor scrolling with offset ────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const offset = nav.offsetHeight + 20;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // ─── Contact form (demo handler) ───────────────────────────────
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    const originalHTML = btn.innerHTML;

    btn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M20 6L9 17l-5-5"/>
      </svg>
      Message Sent!
    `;
    btn.style.background = 'linear-gradient(135deg, #4caf50, #2e7d32)';
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.style.background = '';
      btn.disabled = false;
      form.reset();
    }, 3000);
  });

  // ─── Active nav link highlight ──────────────────────────────────
  const sections = document.querySelectorAll('section[id]');

  function highlightNav() {
    const scrollY = window.scrollY + nav.offsetHeight + 100;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const link = navLinks.querySelector(`a[href="#${id}"]`);
      if (link) {
        if (scrollY >= top && scrollY < top + height) {
          link.style.color = 'var(--text-bright)';
        } else {
          link.style.color = '';
        }
      }
    });
  }

  window.addEventListener('scroll', highlightNav, { passive: true });

  // ─── Parallax on hero glows ─────────────────────────────────────
  const glow1 = document.querySelector('.hero__glow--1');
  const glow2 = document.querySelector('.hero__glow--2');

  window.addEventListener('mousemove', (e) => {
    if (window.innerWidth < 768) return;
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    if (glow1) glow1.style.transform = `translate(${x}px, ${y}px)`;
    if (glow2) glow2.style.transform = `translate(${-x}px, ${-y}px)`;
  }, { passive: true });

})();
