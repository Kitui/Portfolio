document.addEventListener("DOMContentLoaded", () => {
  const valueStages = [
    {
      label: "UNDERSTAND",
      title:
        "Turn business needs into clear technical requirements.",
      description:
        "I start by understanding the users, processes, data, constraints and decisions involved. This prevents teams from building impressive systems that do not solve the real problem.",
      icon: "users-round",
      outcomeIcon: "target",
      focusAreas: [
        "Business Context",
        "Requirements",
        "Users",
        "Processes",
        "Expected Outcomes"
      ],
      outcome:
        "Clarity on the real problem and a shared understanding of what success looks like."
    },
    {
      label: "DESIGN",
      title:
        "Translate requirements into practical architecture.",
      description:
        "I define how data should be collected, processed, validated, stored and consumed, then select technologies based on reliability, scale, governance, cost and operational needs.",
      icon: "panels-top-left",
      outcomeIcon: "route",
      focusAreas: [
        "Solution Architecture",
        "Data Modelling",
        "Technology Selection",
        "Security",
        "Scalability"
      ],
      outcome:
        "A clear technical blueprint that balances business needs, engineering quality and operational realities."
    },
    {
      label: "BUILD",
      title:
        "Develop dependable systems that remain trustworthy.",
      description:
        "I build batch and streaming pipelines, data platforms, APIs, analytical layers and intelligent applications with validation, failure handling, observability and maintainability included from the beginning.",
      icon: "settings-2",
      outcomeIcon: "shield-check",
      focusAreas: [
        "Data Pipelines",
        "Streaming Systems",
        "Backend APIs",
        "Data Quality",
        "Monitoring",
        "Applied AI"
      ],
      outcome:
        "Reliable technical systems and trusted information that users and organisations can depend on."
    },
    {
      label: "DELIVER VALUE",
      title:
        "Connect technical outputs to practical organisational impact.",
      description:
        "I turn engineering work into usable outcomes through trusted datasets, operational metrics, dashboards, decision-support systems and clear communication with technical and non-technical stakeholders.",
      icon: "target",
      outcomeIcon: "chart-no-axes-combined",
      focusAreas: [
        "Business Intelligence",
        "KPI Reporting",
        "Decision Support",
        "Stakeholder Communication",
        "Continuous Improvement"
      ],
      outcome:
        "Technical solutions that support better decisions, stronger operations and measurable business value."
    }
  ];

  const tabs = [
    ...document.querySelectorAll(
      "[data-value-stage]"
    )
  ];

  const indicators = [
    ...document.querySelectorAll(
      ".value-stage-indicator span"
    )
  ];

  const panel = document.getElementById(
    "active-value-panel"
  );

  let activeStage = 0;
  let autoPlayTimer = null;

  function createFocusList(items) {
    return items
      .map((item) => `<li>${item}</li>`)
      .join("");
  }

  function updateActiveStage(index) {
    const stage = valueStages[index];

    activeStage = index;

    tabs.forEach((tab, tabIndex) => {
      const active = tabIndex === index;

      tab.classList.toggle("active", active);
      tab.setAttribute(
        "aria-selected",
        String(active)
      );
    });

    indicators.forEach(
      (indicator, indicatorIndex) => {
        indicator.classList.toggle(
          "active",
          indicatorIndex === index
        );
      }
    );

    panel.classList.add("value-panel-changing");

    window.setTimeout(() => {
      document.getElementById(
        "active-value-label"
      ).textContent = stage.label;

      document.getElementById(
        "active-value-title"
      ).textContent = stage.title;

      document.getElementById(
        "active-value-description"
      ).textContent = stage.description;

      document.getElementById(
        "active-value-focus-list"
      ).innerHTML = createFocusList(
        stage.focusAreas
      );

      document.getElementById(
        "active-value-outcome"
      ).textContent = stage.outcome;

      document.getElementById(
        "active-value-icon"
      ).innerHTML =
        `<i data-lucide="${stage.icon}"></i>`;

      document.getElementById(
        "value-outcome-icon"
      ).innerHTML =
        `<i data-lucide="${stage.outcomeIcon}"></i>`;

      window.lucide?.createIcons();

      panel.classList.remove(
        "value-panel-changing"
      );

      panel.classList.add(
        "value-panel-arriving"
      );

      window.setTimeout(() => {
        panel.classList.remove(
          "value-panel-arriving"
        );
      }, 500);
    }, 220);
  }

  function stopAutoPlay() {
    window.clearInterval(autoPlayTimer);
    autoPlayTimer = null;
  }

  function startAutoPlay() {
    stopAutoPlay();

    autoPlayTimer = window.setInterval(() => {
      const nextStage =
        (activeStage + 1) % valueStages.length;

      updateActiveStage(nextStage);
    }, 6500);
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      stopAutoPlay();

      updateActiveStage(
        Number(tab.dataset.valueStage)
      );

      startAutoPlay();
    });
  });

  panel?.addEventListener(
    "mouseenter",
    stopAutoPlay
  );

  panel?.addEventListener(
    "mouseleave",
    startAutoPlay
  );

  updateActiveStage(0);
  startAutoPlay();
});