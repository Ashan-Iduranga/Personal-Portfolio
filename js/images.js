/*
  js/images.js
  Placeholder images. Any <img> with a data-fallback attribute will switch to that
  fallback URL if its real file (in assets/images/) is missing.
  Once you add your own photos, the fallbacks are simply never used.
*/

function useFallback(img) {
  const fallback = img.dataset.fallback;
  // Only swap once, so a broken fallback can't cause an endless loop
  if (!fallback || img.dataset.fallbackUsed) return;
  img.dataset.fallbackUsed = "true";
  img.src = fallback;
  // The stand-in is a stock photo, so don't describe it as your portrait or screenshot
  img.alt = "Placeholder photo";
}

function initImageFallbacks(scope = document) {
  scope.querySelectorAll("img[data-fallback]").forEach((img) => {
    // Tricky part: the image may have ALREADY failed before this script ran.
    // "complete" with zero width means it finished loading and got nothing.
    if (img.complete && img.naturalWidth === 0) {
      useFallback(img);
    } else {
      img.addEventListener("error", () => useFallback(img), { once: true });
    }
  });
}
