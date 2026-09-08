const $ = (sel, ctx) => (ctx || document).querySelector(sel);
const $$ = (sel, ctx) => [...(ctx || document).querySelectorAll(sel)];

const bootScreen   = $('#bootScreen');
const bootPct      = $('#bootPct');
const scrollBar    = $('#scrollProgress');
const menuToggle   = $('#menuToggle');
const navLinks     = $('#navLinks');
const navAnchors   = $$('.nav-links a');
const navCursor    = $('#navCursor');
const revealEls    = $$('.reveal');
const sections     = $$('main section[id]');
const rotator      = $('#rotatingHeadline');
const vpPlayBtn    = $('#vpPlayBtn');
const vpIcon       = $('#vpIcon');
const bgAudio      = $('#bgAudio');
const vinylDisc    = $('#vinylDisc');
const vinylNeedle  = $('#vinylNeedle');
const vpToggleBtn  = $('#vpToggleBtn');
const vpBody       = $('#vpBody');
const statFills    = $$('.pc-stat-fill');

const projItems    = $$('.proj-item');
const projCursor   = $('#projCursor');
const projPanelImg = $('#projPanelImg');
const projBadge    = $('#projBadge');
const projRank     = $('#projRank');
const projDesc     = $('#projDesc');
const projLink     = $('#projLink');

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const bubbleField = $('#bubbles');
if (bubbleField && !reducedMotion) {
  const count = window.innerWidth < 640 ? 10 : 18;
  for (let i = 0; i < count; i++) {
    const bubble = document.createElement('span');
    const size = 6 + Math.random() * 22;
    const left = Math.random() * 100;
    const duration = 10 + Math.random() * 12;
    const delay = Math.random() * -duration;
    const drift = (Math.random() * 60 - 30).toFixed(0) + 'px';
    bubble.className = 'bubble';
    bubble.style.width = size + 'px';
    bubble.style.height = size + 'px';
    bubble.style.left = left + '%';
    bubble.style.setProperty('--drift', drift);
    bubble.style.animationDuration = duration + 's';
    bubble.style.animationDelay = delay + 's';
    bubbleField.appendChild(bubble);
  }
}

if (bootScreen) {
  if (reducedMotion) {
    bootScreen.style.display = 'none';
  } else {
    let pct = 0;
    const pctInterval = setInterval(() => {
      pct = Math.min(pct + Math.random() * 10 + 3, 100);
      if (bootPct) bootPct.textContent = Math.floor(pct) + '%';
      if (pct >= 100) clearInterval(pctInterval);
    }, 70);
    setTimeout(() => bootScreen.classList.add('done'), 1900);
  }
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
  });
  document.addEventListener('click', (e) => {
    if (navLinks.contains(e.target) || menuToggle.contains(e.target)) return;
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
}

navAnchors.forEach((a) => {
  a.addEventListener('click', () => {
    navLinks && navLinks.classList.remove('open');
    menuToggle && menuToggle.setAttribute('aria-expanded', 'false');
  });
});

function moveNavCursor(target) {
  if (!navCursor || !target) return;
  navCursor.style.opacity = '1';
  navCursor.style.left = target.offsetLeft + 'px';
  navCursor.style.width = target.offsetWidth + 'px';
}

let sectionBounds = [];

function refreshSectionBounds() {
  sectionBounds = sections.map((s) => ({
    id: s.id,
    top: s.offsetTop - 140,
    bottom: s.offsetTop + s.offsetHeight - 140,
  }));
}

function updateActiveNav() {
  if (!sectionBounds.length) return;
  const y = window.scrollY;
  let activeId = '';
  sectionBounds.forEach((b) => {
    if (y >= b.top && y < b.bottom) activeId = b.id;
  });
  let activeAnchor = null;
  navAnchors.forEach((a) => {
    const target = a.getAttribute('href')?.replace('#', '');
    const isActive = target === activeId;
    a.classList.toggle('active', isActive);
    if (isActive) activeAnchor = a;
  });
  if (activeAnchor) moveNavCursor(activeAnchor);
}

function updateScrollProgress() {
  if (!scrollBar) return;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  scrollBar.style.width = max > 0 ? `${Math.min((window.scrollY / max) * 100, 100)}%` : '0%';
}

let rafPending = false;
window.addEventListener('scroll', () => {
  if (rafPending) return;
  rafPending = true;
  requestAnimationFrame(() => {
    updateActiveNav();
    updateScrollProgress();
    rafPending = false;
  });
}, { passive: true });

window.addEventListener('resize', () => {
  refreshSectionBounds();
  updateActiveNav();
  updateScrollProgress();
}, { passive: true });

if (reducedMotion) {
  revealEls.forEach((el) => el.classList.add('visible'));
} else {
  const revealObs = new IntersectionObserver((entries, obs) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('visible');
      obs.unobserve(e.target);
    });
  }, { threshold: 0.1 });
  revealEls.forEach((el) => revealObs.observe(el));
}

if (statFills.length) {
  const statObs = new IntersectionObserver((entries, obs) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const fill = e.target;
      fill.style.width = fill.style.getPropertyValue('--w');
      obs.unobserve(fill);
    });
  }, { threshold: 0.3 });
  statFills.forEach((f) => {
    f.style.width = '0';
    statObs.observe(f);
  });
}

if (rotator) {
  const phrases = ['boa experiência.', 'interface bonita.', 'presença digital.'];

  if (reducedMotion) {
    rotator.textContent = phrases[0];
  } else {
    let idx = 0;
    let running = false;

    function typeText(el, text, speed, cb) {
      let i = 0;
      el.textContent = '';
      const tick = () => {
        if (i >= text.length) { if (cb) cb(); return; }
        el.textContent += text[i++];
        setTimeout(tick, speed);
      };
      tick();
    }

    function eraseText(el, speed, cb) {
      let txt = el.textContent;
      let i = txt.length;
      const tick = () => {
        if (i <= 0) { if (cb) cb(); return; }
        el.textContent = txt.slice(0, --i);
        setTimeout(tick, speed);
      };
      tick();
    }

    function rotate() {
      if (running) return;
      running = true;
      const next = (idx + 1) % phrases.length;
      eraseText(rotator, 40, () => {
        idx = next;
        typeText(rotator, phrases[idx], 50, () => {
          running = false;
          setTimeout(rotate, 3500);
        });
      });
    }

    const delay = bootScreen && !reducedMotion ? 2200 : 400;
    setTimeout(() => {
      typeText(rotator, phrases[0], 55, () => setTimeout(rotate, 3500));
    }, delay);
  }
}

function moveProjCursor(item) {
  if (!projCursor || !item) return;
  projCursor.style.top = item.offsetTop + 'px';
  projCursor.style.height = item.offsetHeight + 'px';
}

function setActiveProject(item) {
  projItems.forEach((p) => {
    p.classList.remove('active');
    p.setAttribute('aria-selected', 'false');
  });
  item.classList.add('active');
  item.setAttribute('aria-selected', 'true');
  moveProjCursor(item);

  if (projPanelImg) {
    projPanelImg.classList.remove('active');
    setTimeout(() => {
      projPanelImg.src = item.dataset.img;
      projPanelImg.classList.add('active');
    }, reducedMotion ? 0 : 120);
  }
  if (projBadge) projBadge.textContent = item.dataset.badge;
  if (projRank) projRank.textContent = item.dataset.rank;
  if (projDesc) projDesc.textContent = item.dataset.desc;
  if (projLink) projLink.href = item.dataset.url;
}

projItems.forEach((item) => {
  item.addEventListener('click', () => setActiveProject(item));
  item.addEventListener('mouseenter', () => setActiveProject(item));
  item.addEventListener('focus', () => setActiveProject(item));
});

if (projItems.length) moveProjCursor(projItems[0]);

let isPlaying = false;

function setPlayState(playing) {
  isPlaying = playing;
  if (vpIcon) vpIcon.textContent = playing ? '⏸' : '▶';
  if (vinylDisc) vinylDisc.classList.toggle('playing', playing);
  if (vinylNeedle) vinylNeedle.classList.toggle('playing', playing);
}

if (bgAudio) {
  bgAudio.volume = 0.4;
  const tryAutoplay = () => {
    bgAudio.play().then(() => setPlayState(true)).catch(() => setPlayState(false));
  };
  document.addEventListener('click', () => {
    if (!isPlaying && bgAudio.paused) tryAutoplay();
  }, { once: true });
  tryAutoplay();
}

if (vpPlayBtn && bgAudio) {
  vpPlayBtn.addEventListener('click', () => {
    if (bgAudio.paused) {
      bgAudio.play().then(() => setPlayState(true));
    } else {
      bgAudio.pause();
      setPlayState(false);
    }
  });
}

if (bgAudio) {
  let wasPlayingBeforeHide = false;
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      wasPlayingBeforeHide = isPlaying;
      if (isPlaying) { bgAudio.pause(); setPlayState(false); }
    } else if (wasPlayingBeforeHide) {
      bgAudio.play().then(() => setPlayState(true)).catch(() => setPlayState(false));
      wasPlayingBeforeHide = false;
    }
  });
}

if (vpToggleBtn && vpBody) {
  vpToggleBtn.addEventListener('click', () => {
    const collapsed = vpBody.classList.toggle('collapsed');
    vpToggleBtn.textContent = collapsed ? '+' : '−';
  });
}

window.addEventListener('load', () => {
  refreshSectionBounds();
  updateActiveNav();
  updateScrollProgress();
}, { once: true });

refreshSectionBounds();
updateActiveNav();
updateScrollProgress();