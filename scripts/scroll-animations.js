/**
 * Scroll & data animations — the "dynamic, innovative" layer for the Semrush brand.
 *
 * Three motions, each with a named reason (motion-craft budget):
 *   1. reveal  — sibling-stagger entrance for genuine card grids/lists (NOT fade-on-every-section).
 *   2. count   — number count-up on the big stat figures (the data-driven punchy moment).
 *   3. bar     — proportional bar-fill on the AI Visibility chart.
 *
 * Hard rules (motion-craft + craft-floor):
 *   - Content is ALWAYS visible by default. Motion only enhances; we add `.reveal-ready`
 *     (the hidden-then-animate state) ONLY when JS runs AND motion is allowed, so a no-JS or
 *     reduced-motion user sees the final state immediately — never a blank section.
 *   - prefers-reduced-motion → do nothing (skip straight to final values).
 *   - IntersectionObserver, unobserve after firing once. No scroll listeners.
 */

const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Animate a number from 0 → its text value, preserving prefix/suffix (28B, 43T, 239M+, 7.9). */
function countUp(el) {
  const raw = el.textContent.trim();
  const m = raw.match(/^([^\d.]*)([\d.,]+)(.*)$/);
  if (!m) return;
  const [, prefix, numStr, suffix] = m;
  const target = parseFloat(numStr.replace(/,/g, ''));
  if (!Number.isFinite(target)) return;
  const decimals = (numStr.split('.')[1] || '').length;
  const duration = 1100;
  const start = performance.now();
  el.style.fontVariantNumeric = 'tabular-nums';

  function frame(now) {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - (1 - t) ** 4; // ease-out-quart
    const val = (target * eased).toFixed(decimals);
    el.textContent = `${prefix}${val}${suffix}`;
    if (t < 1) requestAnimationFrame(frame);
    else el.textContent = raw; // land exactly on the authored value
  }
  requestAnimationFrame(frame);
}

/** Fire `fn` once when `el` first enters the viewport. */
function onFirstView(el, fn, rootMargin = '0px 0px -10% 0px') {
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      fn(entry.target);
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.15, rootMargin });
  io.observe(el);
}

/** Stagger-reveal the direct children (or matched items) of a container on first view.
 * The stagger index is CAPPED at MAX_STAGGER_STEPS so long lists (7–9 cards) read as one
 * cohesive entrance rather than an erratic ripple — beyond the cap, items share the last
 * delay and arrive together. Total spread stays ~MAX_STAGGER_STEPS × --reveal-stagger. */
const MAX_STAGGER_STEPS = 4;
function setupReveal(container, items) {
  if (!items.length) return;
  items.forEach((item, i) => {
    item.classList.add('reveal-ready');
    item.style.setProperty('--reveal-i', Math.min(i, MAX_STAGGER_STEPS));
  });
  onFirstView(container, () => {
    items.forEach((item) => item.classList.add('reveal-in'));
  });
}

export default function initScrollAnimations(main) {
  if (REDUCED) return; // reduced-motion: leave everything at its final, visible state

  // 1. REVEAL — only on genuine multi-item grids/lists (a real list, not a whole section).
  //    Expansible carousel (Solutions) → .carousel-track > .carousel-card
  //    Default carousel (Resources)    → .carousel > div (cards)
  //    Icon-card and awards grids when present.
  main.querySelectorAll('.carousel.carousel-expansible .carousel-track').forEach((track) => {
    setupReveal(track, [...track.children]);
  });
  main.querySelectorAll('.carousel:not(.carousel-expansible)').forEach((car) => {
    setupReveal(car, [...car.children].filter((c) => c.tagName === 'DIV'));
  });
  main.querySelectorAll('.cards-icon, .cards-awards').forEach((grid) => {
    setupReveal(grid, [...grid.children]);
  });
  // Enterprise case-study proof-point stats — a genuine 3-up list.
  main.querySelectorAll('.case-study-stats-grid').forEach((grid) => {
    setupReveal(grid, [...grid.children]);
  });

  // 2. COUNT-UP — the big stat figures only. stats-facts numbers, /one/ columns-stats headings,
  //    and Enterprise case-study proof points (124% / 20% / 4hrs).
  //    Narrow to figures that START with a digit so we never count-up a worded heading.
  main.querySelectorAll('.stats-facts .stat-count, .columns-stats h3, .case-study-stat-number').forEach((el) => {
    if (!/^[\d]/.test(el.textContent.trim())) return;
    onFirstView(el, countUp);
  });

  // 3. BAR-FILL — AI Visibility chart: animate each bar from 0 to its set width.
  main.querySelectorAll('.stats-visibility').forEach((block) => {
    const fills = [...block.querySelectorAll('.bar-fill')];
    fills.forEach((fill) => {
      const target = fill.style.width || '0%'; // width was set inline by the block's decorate()
      fill.dataset.barTarget = target;
      fill.classList.add('bar-ready'); // CSS adds the width transition
      fill.style.width = '0%'; // collapse (inline beats CSS, so zero it here)
    });
    onFirstView(block, () => {
      fills.forEach((fill, i) => {
        fill.style.transitionDelay = `${i * 60}ms`;
        fill.style.width = fill.dataset.barTarget;
      });
    });
  });
}
