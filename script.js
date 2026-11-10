document.documentElement.classList.add('js');

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Mobile menu */
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

/* Theme toggle (remembers the choice on this device) */
const themeToggle = document.querySelector('.theme-toggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const root = document.documentElement;
    const current = root.getAttribute('data-theme')
      || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) { /* storage unavailable */ }
  });
}

/* Reveal on scroll */
const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !reducedMotion) {
  const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  }), { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  revealItems.forEach((element, index) => {
    element.style.transitionDelay = `${(index % 3) * 70}ms`;
    revealObserver.observe(element);
  });
} else {
  revealItems.forEach(element => element.classList.add('visible'));
}

/* Scroll progress bar */
const progress = document.querySelector('.scroll-progress');
if (progress) {
  const updateProgress = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.setProperty('--progress', max > 0 ? Math.min(window.scrollY / max, 1) : 0);
  };
  updateProgress();
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);
}

/* Highlight the nav link of the section in view */
const sectionLinks = [...document.querySelectorAll('.nav-links a[href^="#"]')];
if (sectionLinks.length && 'IntersectionObserver' in window) {
  const byId = new Map(sectionLinks.map(link => [link.getAttribute('href').slice(1), link]));
  const navObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    sectionLinks.forEach(link => link.classList.remove('is-current'));
    byId.get(entry.target.id)?.classList.add('is-current');
  }), { rootMargin: '-45% 0px -50% 0px' });
  byId.forEach((link, id) => {
    const section = document.getElementById(id);
    if (section) navObserver.observe(section);
  });
}

/* Footer year */
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

/* Pointer-following glow in the hero */
const hero = document.querySelector('.hero');
if (hero && window.matchMedia('(pointer: fine)').matches && !reducedMotion) {
  hero.addEventListener('pointermove', event => {
    const bounds = hero.getBoundingClientRect();
    hero.style.setProperty('--mouse-x', `${((event.clientX - bounds.left) / bounds.width) * 100}%`);
    hero.style.setProperty('--mouse-y', `${((event.clientY - bounds.top) / bounds.height) * 100}%`);
  });
}

/* Rotating phrase in the hero */
const rotatorWord = document.querySelector('.rotator-word');
if (rotatorWord && !reducedMotion) {
  const phrases = ['wearable robots', 'soft actuators', 'medical devices', 'health sensors'];
  let index = 0;
  window.setInterval(() => {
    rotatorWord.classList.add('is-out');
    window.setTimeout(() => {
      index = (index + 1) % phrases.length;
      rotatorWord.textContent = phrases[index];
      rotatorWord.classList.remove('is-out');
    }, 360);
  }, 2600);
}

/* Count-up statistics */
const counters = document.querySelectorAll('[data-count]');
if (counters.length && 'IntersectionObserver' in window && !reducedMotion) {
  const countObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const element = entry.target;
    const target = Number(element.dataset.count);
    const start = performance.now();
    const tick = now => {
      const t = Math.min((now - start) / 900, 1);
      element.textContent = Math.round(target * (1 - Math.pow(1 - t, 3)));
      if (t < 1) window.requestAnimationFrame(tick);
    };
    element.textContent = '0';
    window.requestAnimationFrame(tick);
    countObserver.unobserve(element);
  }), { threshold: 0.6 });
  counters.forEach(counter => countObserver.observe(counter));
}

/* Project filter */
const chips = document.querySelectorAll('.chip[data-filter]');
const projects = document.querySelectorAll('.project');
const emptyNote = document.querySelector('.filter-empty');
chips.forEach(chip => chip.addEventListener('click', () => {
  const filter = chip.dataset.filter;
  chips.forEach(other => {
    other.classList.toggle('is-active', other === chip);
    other.setAttribute('aria-pressed', String(other === chip));
  });
  let shown = 0;
  projects.forEach(project => {
    const match = filter === 'all' || project.dataset.cat.split(' ').includes(filter);
    project.classList.toggle('is-hidden', !match);
    if (match) { project.classList.add('visible'); shown += 1; }
  });
  if (emptyNote) emptyNote.hidden = shown > 0;
}));

/* Project details dialog */
const dialog = document.querySelector('.project-dialog');
if (dialog && typeof dialog.showModal === 'function') {
  const title = dialog.querySelector('#dialog-title');
  const meta = dialog.querySelector('#dialog-meta');
  const tags = dialog.querySelector('#dialog-tags');
  const body = dialog.querySelector('#dialog-body');

  document.querySelectorAll('.project-open').forEach(button => button.addEventListener('click', () => {
    const card = button.closest('.project');
    title.textContent = card.querySelector('h3').textContent;
    meta.textContent = card.querySelector('.meta').textContent;
    tags.innerHTML = card.querySelector('.tags').innerHTML;
    body.innerHTML = card.querySelector('.project-detail').innerHTML;
    dialog.showModal();
    dialog.scrollTop = 0;
  }));

  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
} else {
  // Without <dialog> support, show the details inline on the cards.
  document.querySelectorAll('.project-detail').forEach(detail => { detail.hidden = false; });
}
