(function () {
  'use strict';

  // Nav scroll
  var nav = document.getElementById('nav');
  window.addEventListener('scroll', function () {
    nav.classList.toggle('nav--scrolled', window.scrollY > 50);
  }, { passive: true });

  // Mobile menu
  var burger = document.getElementById('navBurger');
  var links = document.getElementById('navLinks');
  burger.addEventListener('click', function () {
    links.classList.toggle('active');
    var s = burger.querySelectorAll('span');
    if (links.classList.contains('active')) {
      s[0].style.transform = 'rotate(45deg) translate(5px,5px)';
      s[1].style.opacity = '0';
      s[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
    } else {
      s[0].style.transform = '';
      s[1].style.opacity = '';
      s[2].style.transform = '';
    }
  });
  links.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      links.classList.remove('active');
      burger.querySelectorAll('span').forEach(function (s) { s.style.transform = ''; s.style.opacity = ''; });
    });
  });

  // Scroll reveal
  var els = document.querySelectorAll('.card,.models__card,.ecard,.pcard,.step,.rtk__feat');
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        var parent = e.target.parentElement;
        var cls = e.target.className.split(' ')[0];
        var siblings = parent.querySelectorAll(':scope > .' + cls);
        var idx = Array.from(siblings).indexOf(e.target);
        setTimeout(function () { e.target.classList.add('visible'); }, idx * 80);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  els.forEach(function (el) { obs.observe(el); });

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var h = this.getAttribute('href');
      if (h === '#') return;
      var t = document.querySelector(h);
      if (!t) return;
      e.preventDefault();
      window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - nav.offsetHeight - 16, behavior: 'smooth' });
    });
  });

  // Contact form
  var form = document.getElementById('contactForm');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var btn = form.querySelector('button[type="submit"]');
    var orig = btn.textContent;
    btn.textContent = 'Message Sent!';
    btn.style.background = '#4caf50';
    btn.style.color = '#fff';
    btn.disabled = true;
    setTimeout(function () {
      btn.textContent = orig;
      btn.style.background = '';
      btn.style.color = '';
      btn.disabled = false;
      form.reset();
    }, 3000);
  });

  // Active nav highlight
  var sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', function () {
    var y = window.scrollY + nav.offsetHeight + 80;
    sections.forEach(function (sec) {
      var link = links.querySelector('a[href="#' + sec.id + '"]');
      if (link) {
        link.style.color = (y >= sec.offsetTop && y < sec.offsetTop + sec.offsetHeight) ? 'var(--brand-navy)' : '';
      }
    });
  }, { passive: true });
})();
