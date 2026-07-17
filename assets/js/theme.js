(() => {
  const storageKey = "portfolio-theme";

  function updateThemeButton(isLight) {
    const toggle = document.getElementById(
      "theme-toggle"
    );

    if (!toggle) {
      return;
    }

    toggle.setAttribute(
      "aria-label",
      isLight
        ? "Switch to dark theme"
        : "Switch to light theme"
    );

    const text = toggle.querySelector(
      ".sidebar-theme-main span"
    );

    const mainIcon = toggle.querySelector(
      ".sidebar-theme-main svg"
    );

    if (text) {
      text.textContent = isLight
        ? "DARK MODE"
        : "LIGHT MODE";
    }

    if (mainIcon) {
      mainIcon.setAttribute(
        "data-lucide",
        isLight ? "moon" : "sun"
      );
    }

    window.lucide?.createIcons();
  }

  function applyTheme(theme) {
    const isLight = theme === "light";

    document.body.classList.toggle(
      "light-theme",
      isLight
    );

    updateThemeButton(isLight);
  }

  document.addEventListener(
    "DOMContentLoaded",
    () => {
      const savedTheme =
        localStorage.getItem(storageKey);

      const preferredTheme =
        savedTheme ||
        (
          window.matchMedia(
            "(prefers-color-scheme: light)"
          ).matches
            ? "light"
            : "dark"
        );

      applyTheme(preferredTheme);

      const toggle = document.getElementById(
        "theme-toggle"
      );

      toggle?.addEventListener("click", () => {
        const nextTheme =
          document.body.classList.contains(
            "light-theme"
          )
            ? "dark"
            : "light";

        localStorage.setItem(
          storageKey,
          nextTheme
        );

        applyTheme(nextTheme);
      });
    }
  );
})();