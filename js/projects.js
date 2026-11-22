/*
  js/projects.js
  Builds the project cards and the "On the workbench" strip from js/data/projects.js.
  To change WHICH projects show, edit js/data/projects.js, not this file.

  Cards don't link to code one by one: a single "See all my code on GitHub"
  button sits under the grid (in index.html). A card only gets a footer when it
  has links, a live site or a note (e.g. "Closed source").
  Projects with a video get a hover clip (initProjectVideos, at the bottom).
*/

// Shown until a screenshot file exists in assets/images/
const SCREENSHOT_PLACEHOLDER = "assets/images/placeholder-screenshot.svg";

// One link in the card footer. File downloads (download: true) stay in the same tab.
function createProjectLink({ label, href, icon = "arrow-up-right", download = false }) {
  const target = download ? "" : ' target="_blank" rel="noopener"';
  return `
      <a class="project-card__link" href="${href}"${target}>
        <i class="ph ph-${icon}" aria-hidden="true"></i> ${label}
      </a>`;
}

// Extra links, the live site and/or a note. Empty string when the project has none of them.
function createProjectFooter(project) {
  let footer = (project.links || []).map(createProjectLink).join("");
  if (project.live) {
    footer += createProjectLink({ label: "Live site", href: project.live });
  }
  if (project.note) {
    footer += `<p class="project-card__note"><i class="ph ph-lock-simple" aria-hidden="true"></i> ${project.note}</p>`;
  }
  return footer ? `<div class="project-card__links">${footer}</div>` : "";
}

// Cards alternate wide, narrow, narrow, wide (see css/projects.css).
// Narrow photos are 4:3, wide ones 19:10.
function isNarrowCard(index) {
  return index % 4 === 1 || index % 4 === 2;
}

function createProjectCard(project, index) {
  const [imgWidth, imgHeight] = isNarrowCard(index) ? [1600, 1200] : [1900, 1000];
  const categoryLabel = PROJECT_CATEGORIES[project.category] || "";
  const statusTag = project.status ? `<span class="project-card__status">${project.status}</span>` : "";
  const fitClass = project.fit === "whole" ? " project-card--whole" : "";
  const roleLine = project.role ? `<p class="project-card__role">${project.role}</p>` : "";
  const altText = project.alt || `Screenshot of ${project.title}`;
  // The clip itself is added later by initProjectVideos(), only where it should play
  const videoAttr = project.video ? ` data-video="${project.video}"` : "";

  return `
    <article class="project-card${fitClass} reveal">
      <div class="project-card__media reveal-media parallax"${videoAttr}>
        <img src="${project.image}" data-fallback="${SCREENSHOT_PLACEHOLDER}"
             alt="${altText}" loading="lazy" width="${imgWidth}" height="${imgHeight}">
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

// Hover clips (video in js/data/projects.js): a muted loop plays over the picture while
// the card is hovered or a link inside it has keyboard focus.
// Only on devices with a mouse and when the visitor hasn't asked for less motion, so
// phones never download the clip. preload="none" means nothing loads until the first hover.
function initProjectVideos() {
  const canPlay = window.matchMedia("(hover: hover) and (prefers-reduced-motion: no-preference)");
  if (!canPlay.matches) return;

  document.querySelectorAll(".project-card__media[data-video]").forEach((media) => {
    const card = media.closest(".project-card");
    const video = document.createElement("video");
    video.className = "project-card__video";
    video.src = media.dataset.video;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = "none";
    video.setAttribute("aria-hidden", "true"); // decorative: the picture's alt text describes the project
    media.appendChild(video);

    // Fade the clip in only once frames are actually showing, so there's never a blank flash
    video.addEventListener("playing", () => card.classList.add("is-playing"));

    const start = () => video.play().catch(() => {}); // play() can be refused (e.g. data saver); the picture stays
    const stop = () => {
      card.classList.remove("is-playing");
      video.pause();
    };

    card.addEventListener("pointerenter", start);
    card.addEventListener("pointerleave", stop);
    card.addEventListener("focusin", start);
    card.addEventListener("focusout", (event) => {
      if (!card.contains(event.relatedTarget)) stop();
    });
  });
}
