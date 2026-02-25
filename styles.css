const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navAnchors = document.querySelectorAll(".nav-links a");
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const root = document.documentElement;
const revealElements = document.querySelectorAll(".reveal");
const sections = document.querySelectorAll("main section[id]");
const heroVisual = document.querySelector(".hero-visual");
const terminalLines = document.querySelectorAll(".monitor-screen .code-line");
const rotatingHeadline = document.getElementById("rotatingHeadline");
const counters = document.querySelectorAll(".counter");
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;
const canUsePointerEffects = window.matchMedia(
  "(hover: hover) and (pointer: fine)"
).matches;
const isMobileViewport = window.matchMedia("(max-width: 980px)").matches;

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

navAnchors.forEach((anchor) => {
  anchor.addEventListener("click", () => {
    if (!navLinks || !menuToggle) return;
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

function setTheme(theme) {
  root.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  if (themeIcon) {
    themeIcon.textContent = theme === "dark" ? "☀️" : "🌙";
  }
}

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark" || savedTheme === "light") {
  setTheme(savedTheme);
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const currentTheme = root.getAttribute("data-theme");
    setTheme(currentTheme === "dark" ? "light" : "dark");
  });
}

revealElements.forEach((element, index) => {
  element.style.setProperty("--delay", `${index * 60}ms`);
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.12 }
);

revealElements.forEach((element) => revealObserver.observe(element));

let sectionBounds = [];

function refreshSectionBounds() {
  sectionBounds = Array.from(sections).map((section) => ({
    id: section.id,
    top: section.offsetTop,
    bottom: section.offsetTop + section.offsetHeight,
  }));
}

function updateActiveNav() {
  if (sectionBounds.length === 0) return;

  const marker = window.scrollY + 130;
  let activeId = "";

  sectionBounds.forEach((section) => {
    if (marker >= section.top && marker < section.bottom) {
      activeId = section.id;
    }
  });

  navAnchors.forEach((link) => {
    const target = link.getAttribute("href")?.replace("#", "");
    link.classList.toggle("active", target === activeId);
  });
}

let scrollTicking = false;
window.addEventListener(
  "scroll",
  () => {
    if (scrollTicking) return;
    scrollTicking = true;
    window.requestAnimationFrame(() => {
      updateActiveNav();
      scrollTicking = false;
    });
  },
  { passive: true }
);

window.addEventListener(
  "resize",
  () => {
    refreshSectionBounds();
    updateActiveNav();
  },
  { passive: true }
);

window.addEventListener("load", refreshSectionBounds, { once: true });
refreshSectionBounds();
updateActiveNav();

if (heroVisual && canUsePointerEffects && !isMobileViewport) {
  let pointerFrame = 0;
  let pointerX = 0;
  let pointerY = 0;

  const applyPointerMotion = () => {
    pointerFrame = 0;
    heroVisual.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`;
  };

  window.addEventListener("mousemove", (event) => {
    pointerX = (event.clientX / window.innerWidth - 0.5) * 7;
    pointerY = (event.clientY / window.innerHeight - 0.5) * 7;

    if (pointerFrame) return;
    pointerFrame = window.requestAnimationFrame(applyPointerMotion);
  });
}

if (rotatingHeadline && !prefersReducedMotion) {
  const phrases = [
    "experiências rápidas.",
    "interfaces memoráveis.",
    "sites de alta clareza.",
  ];
  let phraseIndex = 0;

  window.setInterval(() => {
    rotatingHeadline.classList.add("is-changing");

    window.setTimeout(() => {
      phraseIndex = (phraseIndex + 1) % phrases.length;
      rotatingHeadline.textContent = phrases[phraseIndex];
      rotatingHeadline.classList.remove("is-changing");
    }, 230);
  }, isMobileViewport ? 2600 : 2200);
}

if (counters.length > 0) {
  if (prefersReducedMotion) {
    counters.forEach((counter) => {
      const target = Number(counter.dataset.target || "0");
      const suffix = counter.dataset.suffix || "";
      counter.textContent = `${target}${suffix}`;
    });
  }

  const animateCounter = (counter) => {
    const target = Number(counter.dataset.target || "0");
    const suffix = counter.dataset.suffix || "";
    const duration = 900;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(target * eased);
      counter.textContent = `${value}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  };

  const counterObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.5 }
  );

  if (!prefersReducedMotion) {
    counters.forEach((counter) => counterObserver.observe(counter));
  }
}

if (terminalLines.length > 0) {
  if (prefersReducedMotion) {
    terminalLines.forEach((line) => {
      line.textContent = line.dataset.text || "";
    });
  } else {
    const typeSpeed = isMobileViewport ? 42 : 31;
    const deleteSpeed = isMobileViewport ? 28 : 20;
    const linePause = 250;
    const cyclePause = 420;

    let lineIndex = 0;
    let charIndex = 0;
    let deleting = false;

    terminalLines.forEach((line) => {
      line.textContent = "";
      line.classList.remove("is-active");
    });

    const withJitter = (base, spread) => {
      const random = Math.random() * spread;
      return Math.round(base + random);
    };

    const runTerminal = () => {
      const currentLine = terminalLines[lineIndex];
      const fullText = currentLine.dataset.text || "";

      terminalLines.forEach((line, index) => {
        line.classList.toggle("is-active", index === lineIndex);
      });

      if (!deleting) {
        charIndex += 1;
        currentLine.textContent = fullText.slice(0, charIndex);

        if (charIndex >= fullText.length) {
          deleting = true;
          setTimeout(runTerminal, linePause);
          return;
        }
      } else {
        charIndex -= 1;
        currentLine.textContent = fullText.slice(0, charIndex);

        if (charIndex <= 0) {
          deleting = false;
          lineIndex = (lineIndex + 1) % terminalLines.length;
          setTimeout(runTerminal, lineIndex === 0 ? cyclePause : 120);
          return;
        }
      }

      const currentText = currentLine.textContent;
      const lastChar = currentText.charAt(currentText.length - 1);
      const punctuationPause = /[,.;:]/.test(lastChar) ? 40 : 0;
      const baseDelay = deleting
        ? withJitter(deleteSpeed, 18)
        : withJitter(typeSpeed, 22);

      setTimeout(runTerminal, baseDelay + punctuationPause);
    };

    runTerminal();
  }
}
