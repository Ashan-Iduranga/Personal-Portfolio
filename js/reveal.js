/*
  js/reveal.js
  Scroll reveal. Adds .is-visible to every .reveal element when it scrolls into view,
  which plays its animation (styles in css/layout.css and css/motion.css).
  When the element has completely left the screen, .is-visible is removed again,
  so the animation replays every time you scroll back to it (up or down).

  Tricky part: we use TWO observers.
  - enterObserver waits until the element is a little way onto the screen, so the
    animation starts where you can see it.
  - exitObserver only resets it once it is fully off screen, so nothing ever
    vanishes while you are still looking at it.
  IntersectionObserver is much lighter than listening to every scroll event.
*/

let enterObserver = null;
let exitObserver = null;

function initReveal(scope = document) {
  const items = scope.querySelectorAll(".reveal");

  // Old browser without IntersectionObserver: just show everything
  if (!("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  if (!enterObserver) {
    enterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
    );

    exitObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) entry.target.classList.remove("is-visible");
      });
    });
  }

  items.forEach((item) => {
    enterObserver.observe(item);
    exitObserver.observe(item);
  });
}
