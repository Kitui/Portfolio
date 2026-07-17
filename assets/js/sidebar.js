document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  const sidebar = document.getElementById(
    "portfolio-sidebar"
  );

  const toggle = document.getElementById(
    "sidebar-mobile-toggle"
  );

  const backdrop = document.getElementById(
    "sidebar-backdrop"
  );

  const sidebarLinks = [
    ...document.querySelectorAll(
      ".sidebar-nav-link"
    )
  ];

  function setSidebarState(open) {
    body.classList.toggle(
      "sidebar-open",
      open
    );

    toggle?.setAttribute(
      "aria-expanded",
      String(open)
    );

    toggle?.setAttribute(
      "aria-label",
      open
        ? "Close navigation"
        : "Open navigation"
    );

    if (toggle) {
      toggle.innerHTML =
        `<i data-lucide="${open ? "x" : "menu"}"></i>`;
    }

    window.lucide?.createIcons();
  }

  toggle?.addEventListener("click", () => {
    setSidebarState(
      !body.classList.contains("sidebar-open")
    );
  });

  backdrop?.addEventListener("click", () => {
    setSidebarState(false);
  });

  sidebarLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 900) {
        setSidebarState(false);
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      body.classList.contains("sidebar-open")
    ) {
      setSidebarState(false);
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      setSidebarState(false);
    }
  });

  /*
    Scroll-spy runs only on the main index page.
    Case-study pages keep Projects active manually.
  */

  const observableLinks = sidebarLinks.filter(
    (link) => {
      const href = link.getAttribute("href");

      return href?.startsWith("#");
    }
  );

  const sections = observableLinks
    .map((link) => {
      return document.querySelector(
        link.getAttribute("href")
      );
    })
    .filter(Boolean);

  if (sections.length > 0) {
    const sectionObserver =
      new IntersectionObserver(
        (entries) => {
          const visibleEntries = entries
            .filter((entry) => entry.isIntersecting)
            .sort(
              (a, b) =>
                b.intersectionRatio -
                a.intersectionRatio
            );

          if (!visibleEntries.length) {
            return;
          }

          const activeId =
            visibleEntries[0].target.id;

          observableLinks.forEach((link) => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") ===
                `#${activeId}`
            );
          });
        },
        {
          rootMargin: "-28% 0px -58% 0px",
          threshold: [0.05, 0.2, 0.45]
        }
      );

    sections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }

  if (window.lucide) {
    window.lucide.createIcons();
  }
});