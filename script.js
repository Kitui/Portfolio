const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const themeToggle = document.querySelector("[data-theme-toggle]");
const themeLabel = document.querySelector("[data-theme-label]");
const scrollProgress = document.querySelector("[data-scroll-progress]");
const contactModal = document.querySelector("[data-contact-modal]");
const contactDialog = contactModal.querySelector(".contact-modal");
const contactForm = document.querySelector("[data-contact-form]");
const openContactButtons = document.querySelectorAll("[data-open-contact]");
const closeContactButton = document.querySelector("[data-close-contact]");
const projectModal = document.querySelector("[data-project-modal]");
const projectDialog = projectModal.querySelector(".project-modal");
const projectButtons = document.querySelectorAll("[data-project]");
const closeProjectButton = document.querySelector("[data-close-project]");
const projectContactButton = document.querySelector("[data-project-contact]");
let activeBeforeModal = null;
let activeProject = null;

const capabilityContent = {
  ai: {
    kicker: "AI Strategy",
    title: "From business challenge to deployable AI decision support.",
    body:
      "I connect product goals, data readiness, model design, explainability, delivery risk, and stakeholder adoption so AI initiatives move beyond prototypes.",
    metrics: ["ML + XAI", "Decision support", "Product roadmap"],
  },
  programs: {
    kicker: "Program Delivery",
    title: "Cross-functional execution with governance and measurable outcomes.",
    body:
      "I align stakeholders, scope, budgets, milestones, risks, reporting, and delivery teams so complex technology programs stay visible and executable.",
    metrics: ["Governance", "Risk control", "Executive reporting"],
  },
  analytics: {
    kicker: "Analytics Systems",
    title: "Dashboards, KPIs, and models that sharpen decisions.",
    body:
      "I turn operational and customer data into reporting frameworks, predictive insights, and executive dashboards that support performance management.",
    metrics: ["Power BI", "KPI design", "Predictive analytics"],
  },
  cloud: {
    kicker: "Cloud Products",
    title: "Cloud-ready product thinking from architecture to deployment.",
    body:
      "I design practical cloud-enabled solutions using APIs, containers, and deployment patterns that keep products scalable and maintainable.",
    metrics: ["Docker", "FastAPI", "Google Cloud"],
  },
};

const projectContent = {
  bursary: {
    category: "AI / Decision Support",
    title: "AI-Powered Bursary Allocation Decision Support Platform",
    challenge:
      "Public-sector bursary allocation needs fairness, transparency, explainability, and efficient resource allocation across many applicants and constraints.",
    solution:
      "Designed a production-ready decision support platform combining supervised learning, reinforcement learning, explainable AI, and cloud deployment patterns.",
    impact:
      "Improves allocation consistency, supports accountable decision-making, and gives administrators a more transparent basis for funding recommendations.",
    stack: ["Python", "Scikit-learn", "XGBoost", "LightGBM", "SHAP", "Flask", "Docker", "GCP"],
  },
  ciq: {
    category: "Customer Intelligence",
    title: "Customer IQ (CiQ)",
    challenge:
      "Organizations often have customer data but lack a unified intelligence layer for segmentation, churn risk, lifetime value, and campaign decisions.",
    solution:
      "Designed an AI-powered platform architecture for segmentation, CLV prediction, churn prediction, campaign analytics, behavioral insights, and dashboards.",
    impact:
      "Helps teams make smarter customer engagement decisions, prioritize retention, and translate customer data into executive-ready actions.",
    stack: ["Python", "SQL", "FastAPI", "PostgreSQL", "Scikit-learn", "Pandas", "Power BI", "Docker"],
  },
  traffic: {
    category: "Smart Cities / Operations",
    title: "Mixed Use Development Traffic Management System",
    challenge:
      "Mixed-use developments need coordinated access, visitor flow, parking, passes, security monitoring, and operational visibility.",
    solution:
      "Designed a platform for vehicle access, visitor management, parking allocation, human traffic monitoring, digital passes, analytics, and security workflows.",
    impact:
      "Creates a smarter operating model for estates and mixed-use environments through automation, analytics, and integrated movement management.",
    stack: ["Python", "FastAPI", "PostgreSQL", "REST APIs", "Google Maps API", "QR Codes", "Power BI"],
  },
};

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

const updateScrollProgress = () => {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
  scrollProgress.style.transform = `scaleX(${Math.min(Math.max(progress, 0), 1)})`;
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

const openContactModal = (trigger) => {
  activeBeforeModal = document.activeElement;
  contactModal.hidden = false;
  document.body.style.overflow = "hidden";

  if (trigger?.dataset?.requestType) {
    contactForm.elements.requestType.value = trigger.dataset.requestType;
  }

  if (trigger?.dataset?.requestMessage) {
    contactForm.elements.message.value = trigger.dataset.requestMessage;
  }

  contactDialog.focus();
};

const closeContactModal = () => {
  contactModal.hidden = true;
  document.body.style.overflow = "";

  if (activeBeforeModal && typeof activeBeforeModal.focus === "function") {
    activeBeforeModal.focus();
  }
};

const openProjectModal = (projectKey) => {
  const project = projectContent[projectKey];
  if (!project) return;

  activeProject = projectKey;
  activeBeforeModal = document.activeElement;
  projectModal.querySelector("[data-project-category]").textContent = project.category;
  projectModal.querySelector("[data-project-title]").textContent = project.title;
  projectModal.querySelector("[data-project-challenge]").textContent = project.challenge;
  projectModal.querySelector("[data-project-solution]").textContent = project.solution;
  projectModal.querySelector("[data-project-impact]").textContent = project.impact;

  const stack = projectModal.querySelector("[data-project-stack]");
  stack.innerHTML = project.stack.map((item) => `<span>${item}</span>`).join("");

  projectModal.hidden = false;
  document.body.style.overflow = "hidden";
  projectDialog.focus();
};

const closeProjectModal = () => {
  projectModal.hidden = true;
  document.body.style.overflow = "";

  if (activeBeforeModal && typeof activeBeforeModal.focus === "function") {
    activeBeforeModal.focus();
  }
};

openContactButtons.forEach((button) => {
  button.addEventListener("click", () => openContactModal(button));
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

  if (event.key === "Escape" && !projectModal.hidden) {
    closeProjectModal();
  }
});

closeProjectButton.addEventListener("click", closeProjectModal);

projectModal.addEventListener("click", (event) => {
  if (event.target === projectModal) {
    closeProjectModal();
  }
});

projectButtons.forEach((button) => {
  button.addEventListener("click", () => openProjectModal(button.dataset.project));
});

projectContactButton.addEventListener("click", () => {
  const project = projectContent[activeProject];
  closeProjectModal();
  openContactModal();

  if (project) {
    contactForm.elements.requestType.value = "Project demo request";
    contactForm.elements.message.value = `I would like to request more details about ${project.title}.`;
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

document.querySelectorAll("[data-capability]").forEach((button) => {
  button.addEventListener("click", () => {
    const content = capabilityContent[button.dataset.capability];
    if (!content) return;

    document.querySelectorAll("[data-capability]").forEach((item) => {
      item.classList.toggle("is-active", item === button);
      item.setAttribute("aria-selected", String(item === button));
    });

    const detail = document.querySelector("[data-capability-detail]");
    detail.querySelector(".eyebrow").textContent = content.kicker;
    detail.querySelector("h3").textContent = content.title;
    detail.querySelector("p:not(.eyebrow)").textContent = content.body;
    detail.querySelector(".mini-metrics").innerHTML = content.metrics.map((metric) => `<span>${metric}</span>`).join("");
  });
});

document.querySelectorAll("[data-skill-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.skillFilter;
    document.querySelectorAll("[data-skill-filter]").forEach((item) => {
      item.classList.toggle("is-active", item === button);
    });

    document.querySelectorAll("[data-skill-group]").forEach((group) => {
      group.classList.toggle("is-hidden", filter !== "all" && group.dataset.skillGroup !== filter);
    });
  });
});

document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * -8;
    card.style.setProperty("--tilt-x", `${x}deg`);
    card.style.setProperty("--tilt-y", `${y}deg`);
  });

  card.addEventListener("pointerleave", () => {
    card.style.setProperty("--tilt-x", "0deg");
    card.style.setProperty("--tilt-y", "0deg");
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".section-heading, .project-card, .timeline article, .skill-grid article, .evidence-grid article, .capability-shell, .contact-panel").forEach((element) => {
  element.classList.add("reveal");
  revealObserver.observe(element);
});

const navLinks = [...document.querySelectorAll(".site-nav a[href^='#']")];
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-35% 0px -55% 0px", threshold: 0.01 }
);

navLinks.forEach((link) => {
  const section = document.querySelector(link.getAttribute("href"));
  if (section) sectionObserver.observe(section);
});

window.addEventListener("scroll", () => {
  updateHeader();
  updateScrollProgress();
}, { passive: true });
updateHeader();
updateScrollProgress();
