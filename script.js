const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const themeToggle = document.querySelector("[data-theme-toggle]");
const themeLabel = document.querySelector("[data-theme-label]");
const contactModal = document.querySelector("[data-contact-modal]");
const contactDialog = contactModal.querySelector(".contact-modal");
const contactForm = document.querySelector("[data-contact-form]");
const openContactButtons = document.querySelectorAll("[data-open-contact]");
const closeContactButton = document.querySelector("[data-close-contact]");
let activeBeforeModal = null;

const setTheme = (theme) => {
  document.documentElement.dataset.theme = theme;
  themeLabel.textContent = theme === "light" ? "Dark" : "Light";
  localStorage.setItem("portfolio-theme", theme);
};

const storedTheme = localStorage.getItem("portfolio-theme");
const preferredTheme = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
setTheme(storedTheme || preferredTheme);

const updateHeader = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 12);
};

navToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

nav.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

themeToggle.addEventListener("click", () => {
  const current = document.documentElement.dataset.theme;
  setTheme(current === "light" ? "dark" : "light");
});

const openContactModal = () => {
  activeBeforeModal = document.activeElement;
  contactModal.hidden = false;
  document.body.style.overflow = "hidden";
  contactDialog.focus();
};

const closeContactModal = () => {
  contactModal.hidden = true;
  document.body.style.overflow = "";

  if (activeBeforeModal && typeof activeBeforeModal.focus === "function") {
    activeBeforeModal.focus();
  }
};

openContactButtons.forEach((button) => {
  button.addEventListener("click", openContactModal);
});

closeContactButton.addEventListener("click", closeContactModal);

contactModal.addEventListener("click", (event) => {
  if (event.target === contactModal) {
    closeContactModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !contactModal.hidden) {
    closeContactModal();
  }
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const name = formData.get("name").trim();
  const email = formData.get("email").trim();
  const organization = formData.get("organization").trim() || "Not provided";
  const requestType = formData.get("requestType");
  const message = formData.get("message").trim();
  const subject = `Portfolio request: ${requestType}`;
  const body = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Organization: ${organization}`,
    `Request type: ${requestType}`,
    "",
    "Message:",
    message,
  ].join("\n");

  window.location.href = `mailto:paulkitui@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();
