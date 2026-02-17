const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navAnchors = document.querySelectorAll(".nav-links a");
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const root = document.documentElement;
const revealElements = document.querySelectorAll(".reveal");
const scrollProgress = document.getElementById("scrollProgress");
const sections = document.querySelectorAll("main section[id]");
const heroVisual = document.querySelector(".hero-visual");
const buttons = document.querySelectorAll(".btn");
const canUsePointerEffects = window.matchMedia(
  "(hover: hover) and (pointer: fine)"
).matches;

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

navAnchors.forEach((anchor) => {
  anchor.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

function setTheme(theme) {
  root.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  themeIcon.textContent = theme === "dark" ? "☀️" : "🌙";
}

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark" || savedTheme === "light") {
  setTheme(savedTheme);
}

themeToggle.addEventListener("click", () => {
  const currentTheme = root.getAttribute("data-theme");
  setTheme(currentTheme === "dark" ? "light" : "dark");
});

revealElements.forEach((element, index) => {
  element.style.setProperty("--delay", `${index * 70}ms`);
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.14 }
);

revealElements.forEach((element) => revealObserver.observe(element));

function updateScrollProgress() {
  const total = document.documentElement.scrollHeight - window.innerHeight;
  const progress = total > 0 ? (window.scrollY / total) * 100 : 0;
  scrollProgress.style.width = `${progress}%`;
}

function updateActiveNav() {
  const marker = window.scrollY + 120;
  let activeId = "";

  sections.forEach((section) => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    if (marker >= top && marker < bottom) {
      activeId = section.id;
    }
  });

  navAnchors.forEach((link) => {
    const target = link.getAttribute("href").replace("#", "");
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
      updateScrollProgress();
      updateActiveNav();
      scrollTicking = false;
    });
  },
  { passive: true }
);

updateScrollProgress();
updateActiveNav();

if (heroVisual && canUsePointerEffects) {
  window.addEventListener("mousemove", (event) => {
    const amountX = (event.clientX / window.innerWidth - 0.5) * 8;
    const amountY = (event.clientY / window.innerHeight - 0.5) * 8;
    heroVisual.style.transform = `translate3d(${amountX}px, ${amountY}px, 0)`;
  });
}

if (canUsePointerEffects) {
  buttons.forEach((btn) => {
    btn.addEventListener("mousemove", (event) => {
      const rect = btn.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      btn.style.setProperty("--mx", `${x}px`);
      btn.style.setProperty("--my", `${y}px`);
    });
  });
}
