const menuToggle    = document.getElementById("menuToggle");
const navLinks      = document.getElementById("navLinks");
const navAnchors    = document.querySelectorAll(".nav-links a");
const themeToggle   = document.getElementById("themeToggle");
const themeIcon     = document.getElementById("themeIcon");
const root          = document.documentElement;
const revealEls     = document.querySelectorAll(".reveal");
const sections      = document.querySelectorAll("main section[id]");
const rotator       = document.getElementById("rotatingHeadline");
const counters      = document.querySelectorAll(".counter");
const scrollBar     = document.getElementById("scrollProgress");
const glowCards     = document.querySelectorAll(".card-glow");

const reducedMotion  = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const canHover       = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const isMobile       = window.matchMedia("(max-width: 980px)").matches;


if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });
  document.addEventListener("click", (e) => {
    if (navLinks.contains(e.target) || menuToggle.contains(e.target)) return;
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
}

navAnchors.forEach((a) => {
  a.addEventListener("click", () => {
    navLinks && navLinks.classList.remove("open");
    menuToggle && menuToggle.setAttribute("aria-expanded", "false");
  });
});


function setTheme(theme) {
  root.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  if (themeIcon) themeIcon.textContent = theme === "dark" ? "☀" : "☾";
}

const saved = localStorage.getItem("theme");
if (saved === "dark" || saved === "light") {
  setTheme(saved);
} else {
  setTheme("dark"); 
}

themeToggle && themeToggle.addEventListener("click", () => {
  setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
});


revealEls.forEach((el, i) => el.style.setProperty("--delay", `${i * 70}ms`));

if (reducedMotion) {
  revealEls.forEach((el) => el.classList.add("visible"));
} else {
  const obs = new IntersectionObserver((entries, o) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("visible");
      o.unobserve(e.target);
    });
  }, { threshold: 0.1 });
  revealEls.forEach((el) => obs.observe(el));
}


let bounds = [];

function refreshBounds() {
  bounds = Array.from(sections).map((s) => ({
    id: s.id,
    top: s.offsetTop,
    bottom: s.offsetTop + s.offsetHeight,
  }));
}

function updateNav() {
  if (!bounds.length) return;
  const mark = window.scrollY + 130;
  let activeId = "";
  bounds.forEach((b) => { if (mark >= b.top && mark < b.bottom) activeId = b.id; });
  navAnchors.forEach((a) => {
    const t = a.getAttribute("href")?.replace("#", "");
    a.classList.toggle("active", t === activeId);
  });
}


function updateProgress() {
  if (!scrollBar) return;
  const total = document.documentElement.scrollHeight - window.innerHeight;
  scrollBar.style.width = total > 0 ? `${Math.min((window.scrollY / total) * 100, 100)}%` : "0%";
}

let ticking = false;
window.addEventListener("scroll", () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    updateNav();
    updateProgress();
    ticking = false;
  });
}, { passive: true });

window.addEventListener("resize", () => {
  refreshBounds();
  updateNav();
  updateProgress();
}, { passive: true });


if (rotator) {
  const phrases = [
    "boa experiência. :P",
    "interfaces memoráveis. :D",
    "presença forte. :O",
  ];

  if (reducedMotion) {
    rotator.textContent = phrases[0];
  } else {
    let idx = 0;
    setInterval(() => {
      rotator.classList.add("is-changing");
      setTimeout(() => {
        idx = (idx + 1) % phrases.length;
        rotator.textContent = phrases[idx];
        rotator.classList.remove("is-changing");
      }, 210);
    }, isMobile ? 2800 : 2400);
  }
}


const animateCounter = (el) => {
  const target = Number(el.dataset.target || 0);
  const suffix = el.dataset.suffix || "";
  const dur = 900;
  const t0 = performance.now();

  const tick = (now) => {
    const p = Math.min((now - t0) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = `${Math.round(target * eased)}${suffix}`;
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};

if (counters.length) {
  if (reducedMotion) {
    counters.forEach((el) => {
      el.textContent = `${el.dataset.target}${el.dataset.suffix || ""}`;
    });
  } else {
    const cObs = new IntersectionObserver((entries, o) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        animateCounter(e.target);
        o.unobserve(e.target);
      });
    }, { threshold: 0.45 });
    counters.forEach((el) => cObs.observe(el));
  }
}


if (canHover && !reducedMotion && glowCards.length) {
  glowCards.forEach((card) => {
    let tx = 50, ty = 50, cx = 50, cy = 50, frame = 0;

    const animate = () => {
      cx += (tx - cx) * 0.16;
      cy += (ty - cy) * 0.16;
      card.style.setProperty("--glow-x", `${cx.toFixed(2)}%`);
      card.style.setProperty("--glow-y", `${cy.toFixed(2)}%`);
      const settled = Math.abs(tx - cx) < 0.08 && Math.abs(ty - cy) < 0.08;
      frame = settled ? 0 : requestAnimationFrame(animate);
    };

    const start = () => { if (!frame) frame = requestAnimationFrame(animate); };

    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      tx = Math.min(Math.max(((e.clientX - r.left) / r.width) * 100, 0), 100);
      ty = Math.min(Math.max(((e.clientY - r.top) / r.height) * 100, 0), 100);
      start();
    });

    card.addEventListener("mouseenter", start);
    card.addEventListener("mouseleave", () => { tx = 50; ty = 50; start(); });
  });
}


window.addEventListener("load", () => { refreshBounds(); updateNav(); updateProgress(); }, { once: true });
refreshBounds();
updateNav();
updateProgress();