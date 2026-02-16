const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navAnchors = document.querySelectorAll(".nav-links a");
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const root = document.documentElement;
const revealElements = document.querySelectorAll(".reveal");
const scrollProgress = document.getElementById("scrollProgress");
const sections = document.querySelectorAll("main section[id]");
const projectCards = document.querySelectorAll(".project-card");
const filterButtons = document.querySelectorAll(".filter-btn");
const detailButtons = document.querySelectorAll(".project-details-btn");
const modal = document.getElementById("projectModal");
const modalClose = document.getElementById("modalClose");
const modalTag = document.getElementById("modalTag");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalTech = document.getElementById("modalTech");
const heroVisual = document.querySelector(".hero-visual");
const buttons = document.querySelectorAll(".btn");

const projectDetails = {
  casatrigo: {
    tag: "Projeto Institucional",
    title: "Casa Trigo Zero",
    description:
      "Landing page com foco em comunicação clara da marca, vitrine de produtos e navegação fluida em qualquer dispositivo.",
    tech: ["HTML", "CSS", "JavaScript", "Design Responsivo"],
  },
  portfolio: {
    tag: "Projeto Pessoal",
    title: "Portfólio Pessoal",
    description:
      "Site autoral para apresentar perfil, habilidades e projetos com visual moderno, animações suaves e foco em identidade.",
    tech: ["HTML", "CSS", "JavaScript", "UX Básico"],
  },
  conteudo: {
    tag: "Projeto Criativo",
    title: "Conteúdo Digital",
    description:
      "Planejamento e edição de vídeos curtos para redes sociais com foco em retenção, ritmo visual e mensagem objetiva.",
    tech: ["Edição de Vídeo", "Design", "Narrativa", "Social Media"],
  },
};

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

window.addEventListener("scroll", () => {
  updateScrollProgress();
  updateActiveNav();
});

updateScrollProgress();
updateActiveNav();

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    projectCards.forEach((card) => {
      const categories = card.dataset.category || "";
      const shouldShow = filter === "all" || categories.includes(filter);
      card.classList.toggle("hidden", !shouldShow);
      card.style.display = shouldShow ? "flex" : "none";
    });
  });
});

function openModal(projectKey) {
  const project = projectDetails[projectKey];
  if (!project) return;

  modalTag.textContent = project.tag;
  modalTitle.textContent = project.title;
  modalDescription.textContent = project.description;
  modalTech.innerHTML = "";
  project.tech.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    modalTech.appendChild(li);
  });

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

detailButtons.forEach((btn) => {
  btn.addEventListener("click", () => openModal(btn.dataset.project));
});

modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", (event) => {
  if (event.target.hasAttribute("data-close-modal")) closeModal();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("open")) closeModal();
});

if (heroVisual) {
  window.addEventListener("mousemove", (event) => {
    const amountX = (event.clientX / window.innerWidth - 0.5) * 8;
    const amountY = (event.clientY / window.innerHeight - 0.5) * 8;
    heroVisual.style.transform = `translate3d(${amountX}px, ${amountY}px, 0)`;
  });
}

buttons.forEach((btn) => {
  btn.addEventListener("mousemove", (event) => {
    const rect = btn.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    btn.style.setProperty("--mx", `${x}px`);
    btn.style.setProperty("--my", `${y}px`);
  });
});
