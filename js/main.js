/*
  js/main.js
  The starting point. Runs once the page has loaded and calls each feature in order.
  Every function called here lives in its own file (see the comments).
*/

document.addEventListener("DOMContentLoaded", () => {
  // 1. Build the parts of the page that come from data files
  renderProjects();     // js/projects.js
  renderBrewing();      // js/projects.js
  renderSkills();       // js/skills.js

  // 2. Interactions
  initThemeToggle();    // js/theme.js
  initNavbar();         // js/navbar.js
  initContactForm();    // js/contact.js
  initCopyButtons();    // js/contact.js

  // 3. Finishing touches (run last so they include the rendered content)
  initMotion();         // js/motion.js (word splitting + stagger indexes)
  initImageFallbacks(); // js/images.js
  initReveal();         // js/reveal.js

  // Keep the footer year current
  const year = document.getElementById("footer-year");
  if (year) year.textContent = new Date().getFullYear();
});
