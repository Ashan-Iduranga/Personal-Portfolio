/*
  js/projects.js
  Builds the project cards and the "On the workbench" strip from js/data/projects.js.
  To change WHICH projects show, edit js/data/projects.js, not this file.

  Cards don't link to code one by one: a single "See all my code on GitHub"
  button sits under the grid (in index.html). A card only gets a footer when it
  has a live site or a note (e.g. "Closed source").
*/

// Shown until a screenshot file exists in assets/images/
const SCREENSHOT_PLACEHOLDER = "assets/images/placeholder-screenshot.svg";

// Live site link and/or note. Empty string when the project has neither.
function createProjectFooter(project) {
  let footer = "";
  if (project.live) {
    footer += `
      <a class="project-card__link" href="${project.live}" target="_blank" rel="noopener">
        <i class="ph ph-arrow-up-right" aria-hidden="true"></i> Live site
      </a>`;
  }
  if (project.note) {
    footer += `<p class="project-card__note"><i class="ph ph-lock-simple" aria-hidden="true"></i> ${project.note}</p>`;
  }
  return footer ? `<div class="project-card__links">${footer}</div>` : "";
}

function createProjectCard(project) {
  const categoryLabel = PROJECT_CATEGORIES[project.category] || "";
  const statusTag = project.status ? `<span class="project-card__status">${project.status}</span>` : "";
  const fitClass = project.fit === "whole" ? " project-card--whole" : "";
  const roleLine = project.role ? `<p class="project-card__role">${project.role}</p>` : "";

  return `
    <article class="project-card${fitClass} reveal">
      <div class="project-card__media reveal-media parallax">
        <img src="${project.image}" data-fallback="${SCREENSHOT_PLACEHOLDER}"
             alt="Screenshot of ${project.title}" loading="lazy" width="1600" height="1000">
      </div>
      <div class="project-card__body">
        <p class="project-card__meta">${project.year} / ${categoryLabel}${statusTag}</p>
        <h3 class="project-card__title">${project.title}</h3>
        <p class="project-card__desc">${project.description}</p>
        ${roleLine}
        <ul class="project-card__tags">
          ${project.tags.map((tag) => `<li class="tag">${tag}</li>`).join("")}
        </ul>
        ${createProjectFooter(project)}
      </div>
    </article>`;
}

// Shown only if the PROJECTS list is empty
function createEmptyState() {
  return `
    <div class="projects__empty">
      <i class="ph ph-folder-dashed" aria-hidden="true"></i>
      New projects are on the way. Until then, my code is on
      <a class="text-link" href="${GITHUB_PROFILE}" target="_blank" rel="noopener">GitHub</a>.
    </div>`;
}

function renderProjects() {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;
  grid.innerHTML = PROJECTS.length ? PROJECTS.map(createProjectCard).join("") : createEmptyState();
}

// "On the workbench": ideas still being planned or built (BREWING in js/data/projects.js)
function renderBrewing() {
  const strip = document.getElementById("projects-brewing");
  if (!strip || !BREWING.length) return;

  // data-stagger: js/motion.js numbers the items so they arrive one after another
  strip.innerHTML = `
    <h3 class="projects__brewing-title reveal">On the workbench</h3>
    <ul class="projects__brewing-list" data-stagger>
      ${BREWING.map((idea) => `
        <li class="brewing-item reveal">
          <p class="brewing-item__title">${idea.title}</p>
          <p class="brewing-item__desc">${idea.description}</p>
        </li>`).join("")}
    </ul>`;
}
