(() => {
  "use strict";

  const PAGE_ORDER = [
    "home",
    "about",
    "projects",
    "journey",
    "skills",
    "contact"
  ];

  const TRANSITION_DURATION = 620;

  document.addEventListener("DOMContentLoaded", () => {
    const pages = new Map(
      [...document.querySelectorAll(".portfolio-page[data-page]")]
        .map((page) => [page.dataset.page, page])
    );

    if (!pages.size) {
      return;
    }

    const sidebarLinks = [
      ...document.querySelectorAll(
        ".sidebar-navigation [data-page-link]"
      )
    ];

    let activePageName = resolvePage(
      window.location.hash
    );

    let transitionInProgress = false;
    let queuedPageName = null;

    document.documentElement.classList.add(
      "portfolio-router-ready"
    );

    function resolvePage(value) {
      const pageName = String(value || "")
        .replace(/^#/, "")
        .trim()
        .toLowerCase();

      return pages.has(pageName)
        ? pageName
        : "home";
    }

    function pageDirection(fromName, toName) {
      const fromIndex = PAGE_ORDER.indexOf(
        fromName
      );

      const toIndex = PAGE_ORDER.indexOf(
        toName
      );

      return toIndex >= fromIndex
        ? "forward"
        : "backward";
    }

    function updateNavigation(pageName) {
      sidebarLinks.forEach((link) => {
        const active =
          link.dataset.pageLink === pageName;

        link.classList.toggle(
          "active",
          active
        );

        if (active) {
          link.setAttribute(
            "aria-current",
            "page"
          );
        } else {
          link.removeAttribute(
            "aria-current"
          );
        }
      });
    }

    function closeMobileSidebar() {
      const sidebar =
        document.getElementById(
          "portfolio-sidebar"
        );

      const backdrop =
        document.getElementById(
          "sidebar-backdrop"
        );

      const toggle =
        document.getElementById(
          "sidebar-mobile-toggle"
        );

      sidebar?.classList.remove("open");
      backdrop?.classList.remove("active");

      document.body.classList.remove(
        "sidebar-open"
      );

      toggle?.setAttribute(
        "aria-expanded",
        "false"
      );
    }

    function resetTransitionClasses(page) {
      page.classList.remove(
        "is-entering",
        "is-exiting",
        "is-active",
        "enter-from-right",
        "enter-from-left",
        "exit-to-left",
        "exit-to-right",
        "page-just-opened"
      );
    }


    function showInitialPage(pageName) {
      pages.forEach((page, name) => {
        resetTransitionClasses(page);

        const active =
          name === pageName;

        page.hidden = !active;

        page.classList.toggle(
          "active",
          active
        );
      });

      activePageName = pageName;

      updateNavigation(pageName);

      history.replaceState(
        { page: pageName },
        "",
        `#${pageName}`
      );

      window.scrollTo(0, 0);
    }

    function completeTransition(
      currentPage,
      nextPage,
      nextPageName
    ) {
      resetTransitionClasses(
        currentPage
      );

      currentPage.classList.remove(
        "active"
      );

      currentPage.hidden = true;

      resetTransitionClasses(
        nextPage
      );

      nextPage.classList.add(
        "active"
      );

      activePageName =
        nextPageName;

      transitionInProgress =
        false;

      document.body.classList.remove(
        "portfolio-is-transitioning"
      );

     window.scrollTo(0, 0);

if (window.lucide) {
  window.lucide.createIcons();
}

      if (
        queuedPageName &&
        queuedPageName !== activePageName
      ) {
        const requestedPage =
          queuedPageName;

        queuedPageName = null;

        navigate(
          requestedPage,
          {
            updateHistory: true
          }
        );
      } else {
        queuedPageName = null;
      }
    }

    function navigate(
      requestedPageName,
      {
        updateHistory = true,
        replaceHistory = false
      } = {}
    ) {
      const nextPageName =
        resolvePage(
          requestedPageName
        );

      if (
        nextPageName === activePageName
      ) {
        closeMobileSidebar();

        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });

        return;
      }

      if (transitionInProgress) {
        queuedPageName =
          nextPageName;

        return;
      }

      const currentPage =
        pages.get(activePageName);

      const nextPage =
        pages.get(nextPageName);

      if (!currentPage || !nextPage) {
        return;
      }

      const direction =
        pageDirection(
          activePageName,
          nextPageName
        );

      transitionInProgress = true;

      closeMobileSidebar();

      document.body.classList.add(
        "portfolio-is-transitioning"
      );

      resetTransitionClasses(
        currentPage
      );

      resetTransitionClasses(
        nextPage
      );

      nextPage.hidden = false;

      nextPage.classList.add(
        "is-entering",
        direction === "forward"
          ? "enter-from-right"
          : "enter-from-left"
      );

      currentPage.classList.add(
        "is-exiting",
        direction === "forward"
          ? "exit-to-left"
          : "exit-to-right"
      );

      updateNavigation(
        nextPageName
      );

      if (updateHistory) {
        const method =
          replaceHistory
            ? "replaceState"
            : "pushState";

        history[method](
          { page: nextPageName },
          "",
          `#${nextPageName}`
        );
      }

      /*
       * Force the browser to apply the
       * initial transform before animating.
       */
      void nextPage.offsetWidth;

      requestAnimationFrame(() => {
        nextPage.classList.add(
          "is-active"
        );
      });

      window.setTimeout(
        () => {
          completeTransition(
            currentPage,
            nextPage,
            nextPageName
          );
        },
        TRANSITION_DURATION
      );
    }

    /*
     * Capture managed hash links before
     * any existing smooth-scroll script.
     */
    document.addEventListener(
      "click",
      (event) => {
        if (
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        ) {
          return;
        }

        const anchor =
          event.target.closest(
            'a[href^="#"]'
          );

        if (!anchor) {
          return;
        }

        const rawHash =
          anchor
            .getAttribute("href")
            .replace(/^#/, "");

        if (!pages.has(rawHash)) {
          return;
        }

        event.preventDefault();
        event.stopImmediatePropagation();

        navigate(rawHash);
      },
      true
    );

    window.addEventListener(
      "popstate",
      () => {
        navigate(
          resolvePage(
            window.location.hash
          ),
          {
            updateHistory: false
          }
        );
      }
    );

    document.addEventListener(
      "keydown",
      (event) => {
        if (
          event.key === "Escape" &&
          activePageName !== "home"
        ) {
          navigate("home");
        }
      }
    );

    showInitialPage(
      activePageName
    );
  });
})();