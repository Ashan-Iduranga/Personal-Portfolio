/*
  js/contact.js
  Contact form validation.
  - Checks name, email and message, and shows an error under any field that's wrong.
  - After the first submit attempt, fields re-check as the visitor types.
  - When everything is valid, it opens the visitor's email app with the message
    already written, addressed to CONTACT_EMAIL. (There's no server behind this site.)
    The form is NOT cleared afterwards: if no email app opened, the message isn't lost.
  - initCopyButtons(): "Copy" buttons (data-copy="...") copy text, e.g. the email address.
*/

const CONTACT_EMAIL = "idurangaashan2001@gmail.com";

// Each rule returns an error message, or "" if the value is fine
const contactRules = {
  name: (value) => (value.length < 2 ? "Please enter your name." : ""),
  email: (value) => {
    if (!value) return "Please enter your email address.";
    // Simple check: something@something.something
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "" : "That email address doesn't look right.";
  },
  message: (value) => (value.length < 10 ? "Please write at least 10 characters." : ""),
};

function validateField(field) {
  const rule = contactRules[field.name];
  if (!rule) return true;

  const error = rule(field.value.trim());
  const errorElement = document.getElementById(`${field.id}-error`);

  field.setAttribute("aria-invalid", String(Boolean(error)));
  if (errorElement) errorElement.textContent = error;
  return !error;
}

function initContactForm() {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("contact-status");
  if (!form) return;

  const fields = [...form.querySelectorAll(".field__input")];
  let hasTriedSubmit = false;

  const setStatus = (message, type) => {
    status.textContent = message;
    status.classList.toggle("is-success", type === "success");
    status.classList.toggle("is-error", type === "error");
  };

  // Live re-checking, but only after the first submit so we don't nag early
  fields.forEach((field) => {
    field.addEventListener("input", () => {
      if (hasTriedSubmit) validateField(field);
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    hasTriedSubmit = true;

    // Validate every field (map, not every(), so all errors show at once)
    const results = fields.map(validateField);
    if (results.includes(false)) {
      setStatus("Please fix the highlighted fields.", "error");
      fields[results.indexOf(false)].focus();
      return;
    }

    const data = new FormData(form);
    const subject = `Portfolio message from ${data.get("name").trim()}`;
    const body = `${data.get("message").trim()}\n\nFrom: ${data.get("name").trim()} (${data.get("email").trim()})`;

    window.location.href =
      `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Tricky part: the browser can't tell us whether an email app actually opened,
    // so keep the message in the form and offer the copy button as the backup route.
    setStatus(`Your email app should now open with the message ready to send. Nothing opened? Copy my address (${CONTACT_EMAIL}) with the Copy button and email me from anywhere.`, "success");
  });
}

// Copies text to the clipboard, with an older fallback for browsers that block the Clipboard API
async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    const helper = document.createElement("textarea");
    helper.value = text;
    helper.setAttribute("readonly", "");
    helper.style.position = "fixed";
    helper.style.opacity = "0";
    document.body.appendChild(helper);
    helper.select();
    const copied = document.execCommand("copy");
    helper.remove();
    return copied;
  }
}

function initCopyButtons() {
  document.querySelectorAll("[data-copy]").forEach((button) => {
    const label = button.querySelector(".copy-btn__label");
    let resetTimer = null;

    button.addEventListener("click", async () => {
      const copied = await copyText(button.dataset.copy);
      label.textContent = copied ? "Copied" : "Copy failed";
      button.classList.toggle("is-copied", copied);

      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => {
        label.textContent = "Copy";
        button.classList.remove("is-copied");
      }, 2000);
    });
  });
}
