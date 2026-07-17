document.addEventListener("DOMContentLoaded", () => {
  const board = document.getElementById("flowops-content-board");
  const emptyState = document.getElementById("flowops-empty-state");
  const countLabel = document.getElementById("visible-section-count");

  const toggleButtons = [
    ...document.querySelectorAll("[data-section-toggle]")
  ];

  const sections = [
    ...document.querySelectorAll("[data-board-section]")
  ];

  const showAllButton = document.getElementById("show-all-flowops");
  const hideAllButton = document.getElementById("hide-all-flowops");

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const visibleSections = new Set();

  const orderedSectionNames = [
    "metrics",
    "overview",
    "architecture",
    "problem",
    "solution",
    "ownership",
    "stack",
    "pipeline",
    "outcomes"
  ];

  let architectureTimer = null;
  let pipelineTimer = null;

  function getSection(name) {
    return document.querySelector(
      `[data-board-section="${name}"]`
    );
  }

  function getButton(name) {
    return document.querySelector(
      `[data-section-toggle="${name}"]`
    );
  }

  function updateEmptyState() {
    const hasVisibleSections = visibleSections.size > 0;

    emptyState.hidden = hasVisibleSections;

    countLabel.textContent =
      `${visibleSections.size} ${
        visibleSections.size === 1 ? "SECTION" : "SECTIONS"
      } OPEN`;
  }

  function updateButtonState(name, visible) {
    const button = getButton(name);

    if (!button) {
      return;
    }

    button.classList.toggle("active", visible);
    button.setAttribute("aria-pressed", String(visible));
  }

  function resetArchitectureAnimation() {
    clearTimeout(architectureTimer);

    document
      .querySelectorAll("[data-flow-node]")
      .forEach((node) => {
        node.classList.remove("active");
      });

    document
      .querySelectorAll(".architecture-wave-path")
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
      ...document.querySelectorAll("[data-flow-node]")
    ];

    const connectors = [
      ...document.querySelectorAll(".architecture-wave-path")
    ];

    nodes.forEach((node, index) => {
      window.setTimeout(() => {
        nodes.forEach((item) => {
          item.classList.remove("active");
        });

        node.classList.add("active");

        if (connectors[index]) {
          connectors[index].classList.remove("active");

          void connectors[index].offsetWidth;

          connectors[index].classList.add("active");
        }
      }, index * 560);
    });

    architectureTimer = window.setTimeout(
      runArchitectureAnimation,
      4200
    );
  }

  function resetPipelineAnimation() {
    clearTimeout(pipelineTimer);

    document
      .querySelectorAll("[data-pipeline-node]")
      .forEach((node) => {
        node.classList.remove("active");
      });

    document
      .querySelectorAll(".pipeline-board-connector")
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

    const nodes = [
      ...document.querySelectorAll("[data-pipeline-node]")
    ];

    const connectors = [
      ...document.querySelectorAll(".pipeline-board-connector")
    ];

    nodes.forEach((node, index) => {
      window.setTimeout(() => {
        nodes.forEach((item) => {
          item.classList.remove("active");
        });

        node.classList.add("active");

        if (connectors[index]) {
          connectors[index].classList.remove("active");

          void connectors[index].offsetWidth;

          connectors[index].classList.add("active");
        }
      }, index * 520);
    });

    pipelineTimer = window.setTimeout(
      runPipelineAnimation,
      4000
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

      updateButtonState(name, false);
      visibleSections.delete(name);
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
    orderedSectionNames.forEach((name, index) => {
      openSection(name, index * 130);
    });
  }

  function hideAllSections() {
    [...orderedSectionNames]
      .reverse()
      .forEach((name, index) => {
        closeSection(name, index * 95);
      });
  }

  function updateUrl() {
    const url = new URL(window.location.href);

    if (visibleSections.size === 0) {
      url.searchParams.delete("sections");
    } else {
      const orderedVisible = orderedSectionNames.filter(
        (name) => visibleSections.has(name)
      );

      url.searchParams.set(
        "sections",
        orderedVisible.join(",")
      );
    }

    window.history.replaceState(
      {},
      "",
      `${url.pathname}${url.search}${url.hash}`
    );
  }

  function restoreFromUrl() {
    const params = new URLSearchParams(
      window.location.search
    );

    const sectionNames = params
      .get("sections")
      ?.split(",")
      .filter((name) =>
        orderedSectionNames.includes(name)
      );

    if (!sectionNames?.length) {
      updateEmptyState();
      return;
    }

    sectionNames.forEach((name, index) => {
      openSection(name, index * 100);
    });
  }

  toggleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      toggleSection(button.dataset.sectionToggle);
    });
  });

  showAllButton.addEventListener(
    "click",
    showAllSections
  );

  hideAllButton.addEventListener(
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