/* AgentMux site interactions */
(function () {
  'use strict';

  /* sticky nav state */
  var nav = document.querySelector('.nav');
  function onScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* mobile menu */
  var burger = document.querySelector('.nav-burger');
  if (burger) {
    burger.addEventListener('click', function () {
      nav.classList.toggle('menu-open');
    });
    document.querySelectorAll('.nav-links a').forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('menu-open'); });
    });
  }

  /* reveal on scroll */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* hero activity log: staggered entrance, then loop subtle restarts */
  var logBody = document.querySelector('[data-log]');
  if (logBody) {
    var lines = Array.prototype.slice.call(logBody.children);
    function play() {
      lines.forEach(function (el, i) {
        el.style.animation = 'none';
        void el.offsetWidth; /* reflow to restart animation */
        el.style.animation = '';
        el.style.animationDelay = (0.35 + i * 0.38) + 's';
      });
    }
    play();
    setInterval(play, 14000);
  }

  /* language dropdown */
  var langMenu = document.querySelector('.lang-menu');
  if (langMenu) {
    var langBtn = langMenu.querySelector('.lang-switch');
    langBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      langMenu.classList.toggle('open');
    });
    document.addEventListener('click', function () {
      langMenu.classList.remove('open');
    });
  }

  /* docs sidebar scrollspy */
  var toc = document.querySelector('[data-toc]');
  if (toc && 'IntersectionObserver' in window) {
    var tocLinks = Array.prototype.slice.call(toc.querySelectorAll('a[href^="#"]'));
    var byId = {};
    tocLinks.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
    var current = null;
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          if (current) current.classList.remove('active');
          current = byId[e.target.id];
          if (current) current.classList.add('active');
        }
      });
    }, { rootMargin: '-15% 0px -70% 0px' });
    Object.keys(byId).forEach(function (id) {
      var sec = document.getElementById(id);
      if (sec) spy.observe(sec);
    });
  }

  /* GitHub stars badge */
  var starEls = document.querySelectorAll('[data-gh-stars]');
  if (starEls.length) {
    fetch('https://api.github.com/repos/tan-zhuo/AgentMux')
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) {
        if (!d || typeof d.stargazers_count !== 'number' || d.stargazers_count < 1) return;
        var n = d.stargazers_count;
        var txt = n >= 1000 ? (n / 1000).toFixed(1) + 'k' : String(n);
        starEls.forEach(function (el) {
          el.textContent = txt;
          el.parentElement.style.display = '';
        });
      })
      .catch(function () {});
  }
})();
