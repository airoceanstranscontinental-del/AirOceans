// script.js — AirOceans Transcontinental
// Shared utilities loaded on pages that include this file

// Year
document.addEventListener('DOMContentLoaded', () => {
  const yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();
});

// Header scroll shadow
(function () {
  const header = document.getElementById('main-header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
})();

// Hamburger
(function () {
  const btn = document.getElementById('hamburger');
  const nav = document.getElementById('main-nav');
  if (!btn || !nav) return;
  btn.addEventListener('click', () => {
    nav.classList.toggle('open');
    btn.classList.toggle('active');
  });
})();

// Intersection observer fade-up
(function () {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));
})();

// Slider (index page)
(function () {
  const slidesEl = document.getElementById('slides');
  if (!slidesEl) return;

  const slideEls = document.querySelectorAll('.slide');
  const dotsContainer = document.getElementById('slider-dots');
  const total = slideEls.length;
  let idx = 0;

  for (let i = 0; i < total; i++) {
    const d = document.createElement('span');
    if (i === 0) d.classList.add('active');
    d.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(d);
  }

  function goTo(n) {
    slideEls[idx].classList.remove('active');
    dotsContainer.children[idx].classList.remove('active');
    idx = (n + total) % total;
    slideEls[idx].classList.add('active');
    dotsContainer.children[idx].classList.add('active');
    slidesEl.style.transform = `translateX(-${idx * 100}%)`;
  }

  document.querySelector('.next')?.addEventListener('click', () => goTo(idx + 1));
  document.querySelector('.prev')?.addEventListener('click', () => goTo(idx - 1));

  let timer = setInterval(() => goTo(idx + 1), 5000);
  slidesEl.parentElement.addEventListener('mouseenter', () => clearInterval(timer));
  slidesEl.parentElement.addEventListener('mouseleave', () => { timer = setInterval(() => goTo(idx + 1), 5000); });
})();
