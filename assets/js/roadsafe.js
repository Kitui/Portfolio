document.addEventListener("DOMContentLoaded", () => {
  const emptyState = document.getElementById(
    "roadsafe-empty-state"
  );

  const countLabel = document.getElementById(
    "roadsafe-visible-count"
  );

  const toggleButtons = [
    ...document.querySelectorAll("[data-roadsafe-toggle]")
  ];

  const showAllButton = document.getElementById(
    "show-all-roadsafe"
  );

  const hideAllButton = document.getElementById(
    "hide-all-roadsafe"
  );

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const orderedSections = [
    "metrics",
    "overview",
    "architecture",
    "problem",
    "solution",
    "ownership",
    "stack",
    "pipeline",
    "governance",
    "outcomes"
  ];

  const visibleSections = new Set();

  let architectureTimer = null;
  let pipelineTimer = null;

  function getSection(name) {
    return document.querySelector(
      `[data-roadsafe-section="${name}"]`
    );
  }

  function getButton(name) {
    return document.querySelector(
      `[data-roadsafe-toggle="${name}"]`
    );
  }

  function updateEmptyState() {
    const hasVisibleSections = visibleSections.size > 0;

    emptyState.hidden = hasVisibleSections;

    countLabel.textContent =
      `${visibleSections.size} ${
        visibleSections.size === 1
          ? "SECTION"
          : "SECTIONS"
      } OPEN`;
  }

  function updateButtonState(name, isVisible) {
    const button = getButton(name);

    if (!button) {
      return;
    }

    button.classList.toggle("active", isVisible);
    button.setAttribute(
      "aria-pressed",
      String(isVisible)
    );
  }

  function updateUrl() {
    const url = new URL(window.location.href);

    if (visibleSections.size === 0) {
      url.searchParams.delete("sections");
    } else {
      const selectedSections = orderedSections.filter(
        (name) => visibleSections.has(name)
      );

      url.searchParams.set(
        "sections",
        selectedSections.join(",")
      );
    }

    window.history.replaceState(
      {},
      "",
      `${url.pathname}${url.search}${url.hash}`
    );
  }

  function resetArchitectureAnimation() {
    clearTimeout(architectureTimer);

    document
      .querySelectorAll("[data-architecture-node]")
      .forEach((node) => {
        node.classList.remove("active");
      });

    document
      .querySelectorAll(".roadsafe-wave-path")
      .forEach((connector) => {
        connector.classList.remove("active");
      });
  }

  function runArchitectureAnimation() {
    if (
      reducedMotion ||
      !visibleSections.has("architecture")
    ) {
      return;
    }

    resetArchitectureAnimation();

    const nodes = [
      ...document.querySelectorAll(
        "[data-architecture-node]"
      )
    ];

    const connectors = [
      ...document.querySelectorAll(
        ".roadsafe-wave-path"
      )
    ];

    nodes.forEach((node, index) => {
      window.setTimeout(() => {
        nodes.forEach((item) => {
          item.classList.remove("active");
        });

        node.classList.add("active");

        if (connectors[index]) {
          connectors[index].classList.remove(
            "active"
          );

          void connectors[index].offsetWidth;

          connectors[index].classList.add(
            "active"
          );
        }
      }, index * 560);
    });

    architectureTimer = window.setTimeout(
      runArchitectureAnimation,
      5000
    );
  }

  function resetPipelineAnimation() {
    clearTimeout(pipelineTimer);

    document
      .querySelectorAll(
        ".roadsafe-pipeline-step"
      )
      .forEach((node) => {
        node.classList.remove("active");
      });

    document
      .querySelectorAll(
        ".roadsafe-pipeline-connector"
      )
      .forEach((connector) => {
        connector.classList.remove("active");
      });
  }

  function runPipelineAnimation() {
    if (
      reducedMotion ||
      !visibleSections.has("pipeline")
    ) {
      return;
    }

    resetPipelineAnimation();

    const steps = [
      ...document.querySelectorAll(
        ".roadsafe-pipeline-step"
      )
    ];

    const connectors = [
      ...document.querySelectorAll(
        ".roadsafe-pipeline-connector"
      )
    ];

    steps.forEach((step, index) => {
      window.setTimeout(() => {
        steps.forEach((item) => {
          item.classList.remove("active");
        });

        step.classList.add("active");

        if (connectors[index]) {
          connectors[index].classList.remove(
            "active"
          );

          void connectors[index].offsetWidth;

          connectors[index].classList.add(
            "active"
          );
        }
      }, index * 500);
    });

    pipelineTimer = window.setTimeout(
      runPipelineAnimation,
      4500
    );
  }

  function startInternalAnimation(name) {
    if (name === "architecture") {
      runArchitectureAnimation();
    }

    if (name === "pipeline") {
      runPipelineAnimation();
    }
  }

  function stopInternalAnimation(name) {
    if (name === "architecture") {
      resetArchitectureAnimation();
    }

    if (name === "pipeline") {
      resetPipelineAnimation();
    }
  }

  function openSection(name, delay = 0) {
    const section = getSection(name);

    if (!section || visibleSections.has(name)) {
      return;
    }

    window.setTimeout(() => {
      section.hidden = false;

      requestAnimationFrame(() => {
        section.classList.add("entering");

        requestAnimationFrame(() => {
          section.classList.add("visible");
          section.classList.remove("entering");
        });
      });

      visibleSections.add(name);
      updateButtonState(name, true);
      updateEmptyState();
      updateUrl();

      window.setTimeout(() => {
        startInternalAnimation(name);
      }, reducedMotion ? 0 : 650);
    }, delay);
  }

  function closeSection(name, delay = 0) {
    const section = getSection(name);

    if (!section || !visibleSections.has(name)) {
      return;
    }

    window.setTimeout(() => {
      stopInternalAnimation(name);

      section.classList.add("leaving");
      section.classList.remove("visible");

      visibleSections.delete(name);
      updateButtonState(name, false);
      updateEmptyState();
      updateUrl();

      window.setTimeout(() => {
        section.hidden = true;
        section.classList.remove("leaving");
      }, reducedMotion ? 1 : 520);
    }, delay);
  }

  function toggleSection(name) {
    if (visibleSections.has(name)) {
      closeSection(name);
    } else {
      openSection(name);
    }
  }

  function showAllSections() {
    orderedSections.forEach((name, index) => {
      openSection(name, index * 120);
    });
  }

  function hideAllSections() {
    [...orderedSections]
      .reverse()
      .forEach((name, index) => {
        closeSection(name, index * 90);
      });
  }

  function restoreFromUrl() {
    const params = new URLSearchParams(
      window.location.search
    );

    const selectedSections = params
      .get("sections")
      ?.split(",")
      .filter((name) =>
        orderedSections.includes(name)
      );

    if (!selectedSections?.length) {
      updateEmptyState();
      return;
    }

    selectedSections.forEach((name, index) => {
      openSection(name, index * 90);
    });
  }

  toggleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      toggleSection(
        button.dataset.roadsafeToggle
      );
    });
  });

  showAllButton?.addEventListener(
    "click",
    showAllSections
  );

  hideAllButton?.addEventListener(
    "click",
    hideAllSections
  );

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      hideAllSections();
    }
  });

  restoreFromUrl();

  if (window.lucide) {
    window.lucide.createIcons();
  }
});