// Mobile nav toggle, scroll reveal, and animated stat counters. No dependencies.
(function () {
  var reduceMotion = window.matchMedia
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --- Mobile nav ---
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.primary-nav');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') links.classList.remove('open');
    });
  }

  // --- Stat counters ---
  // For [data-since="YYYY-MM-DD"], derive completed whole years (auto-updates over time).
  function completedYears(iso) {
    var start = new Date(iso);
    var now = new Date();
    var y = now.getFullYear() - start.getFullYear();
    var m = now.getMonth() - start.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < start.getDate())) y -= 1;
    return Math.max(0, y);
  }
  function render(el, value) {
    el.textContent = (el.dataset.prefix || '') + value + (el.dataset.suffix || '');
  }
  // Resolve targets up front so the years value is correct even without animation.
  var counters = [].slice.call(document.querySelectorAll('[data-count], [data-since]'));
  counters.forEach(function (el) {
    el.dataset.count = el.dataset.since
      ? String(completedYears(el.dataset.since))
      : el.dataset.count;
    if (reduceMotion) render(el, +el.dataset.count);
  });
  // Inline prose years (no animation, set immediately).
  [].forEach.call(document.querySelectorAll('[data-years]'), function (el) {
    el.textContent = String(completedYears(el.dataset.years));
  });
  function countUp(el) {
    if (reduceMotion || el.dataset.done) { return; }
    el.dataset.done = '1';
    var target = +el.dataset.count;
    var duration = 1100;
    var startTime = null;
    function step(ts) {
      if (startTime === null) startTime = ts;
      var p = Math.min((ts - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
      render(el, Math.round(eased * target));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // --- Scroll reveal (+ trigger counters when their tile appears) ---
  function activate(el) {
    el.classList.add('in');
    [].forEach.call(el.querySelectorAll('[data-count]'), countUp);
  }
  var reveals = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || !reveals.length) {
    reveals.forEach(activate);
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        activate(entry.target);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(function (el) { io.observe(el); });
})();
