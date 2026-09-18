const $ = (s, p = document) => p.querySelector(s),
  $$ = (s, p = document) => [...p.querySelectorAll(s)],
  scenes = $$(".scene"),
  navButtons = $$(".scene-link"),
  viewButtons = $$("[data-view]"),
  tabs = $$(".project-tab"),
  panels = $$(".project-panel"),
  status = $("#sceneStatus"),
  soundButton = $("#soundButton"),
  audio = $("#audio"),
  labels = {
    inicio: "01 / início",
    perfil: "02 / perfil",
    projetos: "03 / projetos",
    contato: "04 / contato",
  };
audio.volume = 0.25;
$("#year").textContent = new Date().getFullYear();
function goTo(view, focus = false) {
  const scene = $(`[data-scene="${view}"]`);
  if (!scene) return;
  scenes.forEach((i) => {
    const a = i === scene;
    i.hidden = !a;
    i.classList.toggle("is-active", a);
  });
  navButtons.forEach((b) => {
    const a = b.dataset.view === view;
    b.classList.toggle("is-active", a);
    a
      ? b.setAttribute("aria-current", "page")
      : b.removeAttribute("aria-current");
  });
  status.textContent = labels[view];
  history.replaceState(null, "", `#${view}`);
  if (focus) scene.querySelector("h1,h2")?.focus({ preventScroll: true });
}
viewButtons.forEach((b) =>
  b.addEventListener("click", () =>
    goTo(b.dataset.view, b.classList.contains("scene-link")),
  ),
);
window.addEventListener("hashchange", () =>
  goTo(location.hash.slice(1) || "inicio"),
);
if (labels[location.hash.slice(1)]) goTo(location.hash.slice(1));
function activateProject(tab) {
  const project = tab.dataset.project;
  tabs.forEach((i) => {
    const a = i === tab;
    i.classList.toggle("is-active", a);
    i.setAttribute("aria-selected", String(a));
    i.tabIndex = a ? 0 : -1;
  });
  panels.forEach((p) => {
    const a = p.id === `project-${project}`;
    p.hidden = !a;
    p.classList.toggle("is-active", a);
  });
}
tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => activateProject(tab));
  tab.addEventListener("keydown", (e) => {
    if (
      ![
        "ArrowDown",
        "ArrowRight",
        "ArrowUp",
        "ArrowLeft",
        "Home",
        "End",
      ].includes(e.key)
    )
      return;
    e.preventDefault();
    let n = index;
    if (e.key === "Home") n = 0;
    else if (e.key === "End") n = tabs.length - 1;
    else
      n =
        (index +
          (["ArrowDown", "ArrowRight"].includes(e.key) ? 1 : -1) +
          tabs.length) %
        tabs.length;
    tabs[n].focus();
    activateProject(tabs[n]);
  });
});
document.addEventListener("keydown", (e) => {
  if (
    e.altKey ||
    e.ctrlKey ||
    e.metaKey ||
    ["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)
  )
    return;
  if (["1", "2", "3", "4"].includes(e.key))
    goTo(["inicio", "perfil", "projetos", "contato"][Number(e.key) - 1], true);
  if (
    ["ArrowLeft", "ArrowRight"].includes(e.key) &&
    !document.activeElement.closest(".project-tabs")
  ) {
    const i = navButtons.findIndex((x) => x.classList.contains("is-active"));
    goTo(
      ["inicio", "perfil", "projetos", "contato"][
        (i + (e.key === "ArrowRight" ? 1 : 3)) % 4
      ],
      true,
    );
  }
});
soundButton.addEventListener("click", async () => {
  if (audio.paused) {
    try {
      await audio.play();
      soundButton.setAttribute("aria-pressed", "true");
      soundButton.innerHTML = "som <span>on</span>";
    } catch {
      soundButton.textContent = "som indisponível";
    }
  } else {
    audio.pause();
    soundButton.setAttribute("aria-pressed", "false");
    soundButton.innerHTML = "som <span>off</span>";
  }
});
