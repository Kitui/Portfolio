document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById(
    "portfolio-sidebar"
  );

  const toggle = document.getElementById(
    "sidebar-mobile-toggle"
  );

  if (!sidebar || !toggle) {
    return;
  }

  function setSidebarOpen(isOpen) {
    sidebar.classList.toggle("open", isOpen);

    toggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    toggle.setAttribute(
      "aria-label",
      isOpen
        ? "Close portfolio navigation"
        : "Open portfolio navigation"
    );

    toggle.innerHTML = `
      <i data-lucide="${isOpen ? "x" : "menu"}"></i>
    `;

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  toggle.addEventListener("click", () => {
    setSidebarOpen(
      !sidebar.classList.contains("open")
    );
  });

  sidebar
    .querySelectorAll("a")
    .forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 820) {
          setSidebarOpen(false);
        }
      });
    });

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      sidebar.classList.contains("open")
    ) {
      setSidebarOpen(false);
    }
  });
});