/*
  js/navbar.js
  Everything the top bar does:
  1. Adds a background once the page scrolls (.is-scrolled)
  2. Opens / closes the mobile menu (.is-open)
  3. Highlights the link of the section on screen (.is-active) and slides the
     shared underline under it (--indicator-x / --indicator-w on .navbar__links)
  4. Slides the bar away while scrolling down, back while scrolling up (.is-hidden)
  Smooth scrolling itself is done by CSS (scroll-behavior in css/base.css).
*/

function initNavbar() {
  const navbar = document.getElementById("navbar");
  const toggle = document.getElementById("navbar-toggle");
  const links = document.querySelectorAll(".navbar__link");
  const linkList = document.querySelector(".navbar__links");
  const sentinel = document.querySelector(".scroll-sentinel");
  if (!navbar || !toggle) return;

  /* ---------- 1. Background on scroll ----------
     We watch an invisible 1px element at the top of the page.
     When it leaves the screen, the page has been scrolled. */
  if (sentinel && "IntersectionObserver" in window) {
    new IntersectionObserver(([entry]) => {
      navbar.classList.toggle("is-scrolled", !entry.isIntersecting);
    }).observe(sentinel);
  }

  /* ---------- 2. Mobile menu ---------- */
  const setMenuOpen = (isOpen) => {
    navbar.classList.toggle("is-open", isOpen);
    document.body.classList.toggle("is-locked", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  };

  toggle.addEventListener("click", () => {
    setMenuOpen(!navbar.classList.contains("is-open"));
  });

  // Close the menu after picking a link
  links.forEach((link) => link.addEventListener("click", () => setMenuOpen(false)));

  // Close with the Escape key and return focus to the button
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navbar.classList.contains("is-open")) {
      setMenuOpen(false);
      toggle.focus();
    }
  });

  // If the window is resized to desktop while the menu is open, reset it
  const isDesktop = window.matchMedia("(min-width: 900px)");
  isDesktop.addEventListener("change", (event) => {
    if (event.matches) setMenuOpen(false);
  });

  /* ---------- 3. Active link + sliding underline ----------
     A section counts as "current" when it crosses a thin line near the middle of the screen. */
  const moveIndicator = () => {
    // The underline only exists on desktop (css/navbar.css), so skip measuring on phones
    if (!linkList || !isDesktop.matches) return;
    const active = linkList.querySelector(".navbar__link.is-active");
    // No active link, or the active link isn't shown in this layout: fade the underline out
    if (!active || !active.offsetWidth) {
      linkList.classList.remove("has-indicator");
      return;
    }
    linkList.style.setProperty("--indicator-x", `${active.offsetLeft}px`);
    linkList.style.setProperty("--indicator-w", active.offsetWidth);
    // Coming from "no section" (the hero): appear in place instead of sliding in from the left.
    // Reading offsetWidth forces the new position to apply before the slide transition switches on.
    if (!linkList.classList.contains("has-indicator")) {
      void linkList.offsetWidth;
      linkList.classList.add("has-indicator");
    }
  };

  // Re-measure whenever the link row changes size: web fonts arriving, window resizes,
  // switching between the phone and desktop layouts
  if (linkList && "ResizeObserver" in window) {
    new ResizeObserver(moveIndicator).observe(linkList);
  }

  const sections = [...links]
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);
  // Also watch the hero, so no link is highlighted when you scroll back to the top
  const hero = document.getElementById("top");
  if (hero) sections.push(hero);

  if (sections.length && "IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        // Several sections can report at once after a fast scroll; only the last one counts
        const current = entries.filter((entry) => entry.isIntersecting).pop();
        if (!current) return;
        links.forEach((link) => {
          const isMatch = link.getAttribute("href") === `#${current.target.id}`;
          link.classList.toggle("is-active", isMatch);
          if (isMatch) {
            link.setAttribute("aria-current", "location");
          } else {
            link.removeAttribute("aria-current");
          }
        });
        moveIndicator();
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((section) => sectionObserver.observe(section));
  }

  /* ---------- 4. Hide on scroll down, show on scroll up ----------
     Small movements are ignored so the bar doesn't flicker on trackpad jitter.
     The bar always shows at the very top of the page (before .is-scrolled from part 1).
     CSS keeps it showing while the menu is open, and for visitors who prefer less motion. */
  let lastY = window.scrollY;

  window.addEventListener(
    "scroll",
    () => {
      const y = window.scrollY;
      const delta = y - lastY;
      if (!navbar.classList.contains("is-scrolled")) {
        navbar.classList.remove("is-hidden");
      } else if (Math.abs(delta) <= 8) {
        return; // too small to count; keep comparing against the old position
      } else {
        navbar.classList.toggle("is-hidden", delta > 0);
      }
      lastY = y;
    },
    { passive: true }
  );
}
