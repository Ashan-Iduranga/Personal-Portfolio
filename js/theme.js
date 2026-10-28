/*
  js/theme.js
  Light / dark theme. Loaded in <head> WITHOUT defer so the saved theme is applied
  before the page is drawn (otherwise you'd see a flash of the wrong colours).

  - First visit: follows the device setting (prefers-color-scheme).
  - After clicking the toggle: remembers the choice in localStorage.
  - Sets two attributes on <html>:
      data-theme          only when the visitor picked a theme (css/variables.css reads it)
      data-theme-current  always "light" or "dark" (used to swap the sun/moon icon)
*/

const THEME_STORAGE_KEY = "theme";
const themeRoot = document.documentElement;

// Tells the CSS that JavaScript is running (used by the scroll-reveal styles)
themeRoot.classList.add("js");

// localStorage can throw in private mode or when storage is blocked, so wrap it
function readSavedTheme() {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY);
  } catch (error) {
    return null;
  }
}

function saveTheme(theme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (error) {
    // Not saved, but the theme still switches for this visit
  }
}

function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function applyTheme(theme, isChosen) {
  if (isChosen) {
    themeRoot.setAttribute("data-theme", theme);
  }
  themeRoot.setAttribute("data-theme-current", theme);

  // Match the mobile browser bar colour to the page
  const metaTheme = document.querySelector('meta[name="theme-color"]');
  if (metaTheme) {
    metaTheme.setAttribute("content", theme === "light" ? "#eeeff1" : "#121418");
  }
}

// Runs immediately while <head> is loading
const savedTheme = readSavedTheme();
applyTheme(savedTheme || getSystemTheme(), Boolean(savedTheme));

// Called from main.js once the page has loaded
function initThemeToggle() {
  const toggle = document.getElementById("theme-toggle");
  if (!toggle) return;

  const updateLabel = () => {
    const next = themeRoot.getAttribute("data-theme-current") === "light" ? "dark" : "light";
    toggle.setAttribute("aria-label", `Switch to ${next} theme`);
  };

  toggle.addEventListener("click", () => {
    const next = themeRoot.getAttribute("data-theme-current") === "light" ? "dark" : "light";
    applyTheme(next, true);
    saveTheme(next);
    updateLabel();
  });

  // If the visitor never chose a theme, follow device changes live
  window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", () => {
    if (!readSavedTheme()) {
      applyTheme(getSystemTheme(), false);
      updateLabel();
    }
  });

  updateLabel();
}
