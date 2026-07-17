document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("mobile-menu-toggle");
  const navigation = document.getElementById("primary-navigation");
  const links = [...document.querySelectorAll(".nav-link")];

  toggle?.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");
    document.body.classList.toggle("menu-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    toggle.innerHTML = `<i data-lucide="${isOpen ? "x" : "menu"}"></i>`;
    window.lucide?.createIcons();
  });

  links.forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove("open");
      document.body.classList.remove("menu-open");
      toggle?.setAttribute("aria-expanded", "false");
      if (toggle) {
        toggle.innerHTML = `<i data-lucide="menu"></i>`;
        window.lucide?.createIcons();
      }
    });
  });

  const sections = links
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        links.forEach((link) => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${entry.target.id}`
          );
        });
      });
    },
    {
      rootMargin: "-35% 0px -55% 0px",
      threshold: 0,
    }
  );

  sections.forEach((section) => observer.observe(section));
});
