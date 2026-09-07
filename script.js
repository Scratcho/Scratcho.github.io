const menuButton = document.querySelector('.menu-button');
const navLinks = document.querySelector('.nav-links');

if (menuButton && navLinks) {
  menuButton.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
  });

  navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  }));
}

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) {
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  }
}), { threshold: .08 });

document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const finePointer = window.matchMedia('(pointer: fine)');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

// Subtle pointer-responsive hero background. The browser's normal cursor is
// intentionally preserved.
if (finePointer.matches && !reducedMotion.matches) {
  document.querySelectorAll('.profile, .life-hero').forEach(hero => {
    hero.addEventListener('pointermove', event => {
      const bounds = hero.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / bounds.width) * 100;
      const y = ((event.clientY - bounds.top) / bounds.height) * 100;
      hero.style.setProperty('--mouse-x', `${x}%`);
      hero.style.setProperty('--mouse-y', `${y}%`);
      hero.style.setProperty('--drift-x', `${(x - 50) * -.08}px`);
      hero.style.setProperty('--drift-y', `${(y - 50) * -.08}px`);
      hero.style.setProperty('--spark-rotate', `${(x - 50) * .35}deg`);
    });
  });
}

// Auto-moving fact ticker. Native horizontal scrolling remains available; any
// user interaction pauses the motion, then it resumes after a short idle time.
const factScroller = document.querySelector('.fact-scroller');
if (factScroller && !reducedMotion.matches) {
  let tickerPaused = false;
  let resumeTimer;
  let previousTime = performance.now();
  let draggingTicker = false;
  let dragStartX = 0;
  let dragStartScroll = 0;
  let hoveringTicker = false;

  const pauseTicker = () => {
    tickerPaused = true;
    window.clearTimeout(resumeTimer);
    resumeTimer = window.setTimeout(() => {
      if (!draggingTicker) tickerPaused = false;
    }, 1800);
  };

  ['wheel', 'touchstart', 'touchmove', 'pointerdown', 'keydown'].forEach(eventName => {
    factScroller.addEventListener(eventName, pauseTicker, { passive: true });
  });
  factScroller.addEventListener('mouseenter', () => {
    hoveringTicker = true;
  });
  factScroller.addEventListener('mouseleave', () => {
    hoveringTicker = false;
    window.clearTimeout(resumeTimer);
    if (!draggingTicker) tickerPaused = false;
  });
  factScroller.addEventListener('focusin', () => { tickerPaused = true; });
  factScroller.addEventListener('focusout', pauseTicker);

  factScroller.addEventListener('pointerdown', event => {
    draggingTicker = true;
    dragStartX = event.clientX;
    dragStartScroll = factScroller.scrollLeft;
    factScroller.setPointerCapture(event.pointerId);
  });
  factScroller.addEventListener('pointermove', event => {
    if (draggingTicker) factScroller.scrollLeft = dragStartScroll - (event.clientX - dragStartX);
  });
  const stopDragging = event => {
    if (!draggingTicker) return;
    draggingTicker = false;
    if (factScroller.hasPointerCapture(event.pointerId)) factScroller.releasePointerCapture(event.pointerId);
    if (hoveringTicker) pauseTicker();
    else tickerPaused = false;
  };
  factScroller.addEventListener('pointerup', stopDragging);
  factScroller.addEventListener('pointercancel', stopDragging);

  const moveTicker = currentTime => {
    const elapsed = Math.min(currentTime - previousTime, 40);
    previousTime = currentTime;
    if (!tickerPaused) factScroller.scrollLeft += elapsed * .035;
    const loopPoint = factScroller.scrollWidth / 2;
    if (factScroller.scrollLeft >= loopPoint) factScroller.scrollLeft -= loopPoint;
    if (factScroller.scrollLeft < 0) factScroller.scrollLeft += loopPoint;
    window.requestAnimationFrame(moveTicker);
  };
  window.requestAnimationFrame(moveTicker);
}
