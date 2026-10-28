/*
  js/skills.js
  Builds the skills section from SKILLS (js/data/skills.js).
  To change WHAT skills show, edit js/data/skills.js, not this file.

  Each category becomes one card with a list of chips (logo + name).
  No levels, years or percentages: just what I've built with.
*/

function createSkillChip(item) {
  // The logo is decoration: the name next to it is what screen readers announce
  return `
    <li class="skill-chip">
      <i class="skill-chip__icon ${item.icon}" aria-hidden="true"></i>
      <span class="skill-chip__name">${item.name}</span>
    </li>`;
}

function createSkillCard(group) {
  return `
    <li class="skill-card reveal">
      <h3 class="skill-card__title">${group.category}</h3>
      <ul class="skill-card__list">
        ${group.items.map(createSkillChip).join("")}
      </ul>
    </li>`;
}

function renderSkills() {
  const body = document.getElementById("skills-body");
  if (!body) return;

  // data-stagger: js/motion.js numbers the cards so they arrive one after another
  body.innerHTML = `
    <ul class="skills__grid" data-stagger>
      ${SKILLS.map(createSkillCard).join("")}
    </ul>`;
}
