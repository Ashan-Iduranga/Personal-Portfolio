/*
  js/motion.js
  Prepares the page for the scroll animations in css/motion.css.
  It only adds wrapper <span>s and CSS variables; the actual movement is all CSS.

  1. splitWords()  -> wraps every word of [data-split] headings in spans, so words
                      can rise one by one (data-split="rise") or light up while you
                      scroll (data-split="read").
  2. setStagger()  -> gives children of [data-stagger] an index (--reveal-index),
                      so they appear one after another instead of all at once.
  3. Skill chips   -> each chip inside a skill card gets --i for its own cascade.
*/

function splitWords(element) {
  const words = [];
  let current = null;

  // Start a new word span and add it to the element
  const startWord = () => {
    current = document.createElement("span");
    current.className = "split-word";
    const inner = document.createElement("span");
    inner.className = "split-word__inner";
    current.appendChild(inner);
    element.appendChild(current);
    words.push(current);
  };

  const nodes = [...element.childNodes];
  element.textContent = "";

  nodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      // Split into words and spaces, keeping the spaces as plain text between spans
      node.textContent.split(/(\s+)/).forEach((part) => {
        if (!part) return;
        if (/^\s+$/.test(part)) {
          element.appendChild(document.createTextNode(" "));
          current = null;
        } else {
          if (!current) startWord();
          current.firstChild.appendChild(document.createTextNode(part));
        }
      });
    } else {
      // Tricky part: an element like <span class="accent-text">.</span> or <em> is kept
      // whole and glued to the word before it, so a line can never break inside "build."
      if (!current) startWord();
      current.firstChild.appendChild(node);
    }
  });

  // --w = word number (for delays), --p = position from 0 to 1 (for scroll-linked ranges)
  const last = Math.max(words.length - 1, 1);
  words.forEach((word, index) => {
    word.style.setProperty("--w", index);
    word.style.setProperty("--p", (index / last).toFixed(3));
  });
}

function setStagger(container) {
  [...container.children].forEach((child, index) => child.style.setProperty("--reveal-index", index));
}

function initMotion() {
  document.querySelectorAll("[data-split]").forEach(splitWords);
  document.querySelectorAll("[data-stagger]").forEach(setStagger);

  document.querySelectorAll(".skill-card__list").forEach((list) => {
    [...list.children].forEach((chip, index) => chip.style.setProperty("--i", index));
  });
}
