document.addEventListener("DOMContentLoaded", () => {
  const stages = [
    {
      label: "STAGE 01",
      title: "Enterprise Technology Foundation",
      period: "2016–2017",
      icon: "server",
      introduction:
        "I began my career working closely with enterprise systems, organisational users and day-to-day technology operations.",
      doing:
        "Supporting business systems, infrastructure, users and operational technology adoption.",
      developed:
        "An understanding of how systems affect people, processes, service delivery and organisational performance.",
      changed:
        "I became increasingly interested in improving systems rather than only supporting their daily operation.",
      forward:
        "This foundation prepared me to move into product implementation, coordination and practical solution delivery.",
      capabilities: [
        "Enterprise Systems",
        "User Support",
        "Business Operations",
        "Technology Adoption"
      ]
    },
    {
      label: "STAGE 02",
      title: "From Support to Solution Delivery",
      period: "2017–2021",
      icon: "puzzle",
      introduction:
        "My responsibilities expanded beyond supporting existing technology into coordinating initiatives and contributing to product development.",
      doing:
        "Understanding business requirements, coordinating implementation and helping improve practical digital products.",
      developed:
        "Requirements thinking, stakeholder coordination, product awareness and an understanding of the full implementation lifecycle.",
      changed:
        "I began seeing technology as a solution-development discipline rather than a collection of isolated systems.",
      forward:
        "This experience prepared me to operate at the centre of larger cross-functional delivery environments.",
      capabilities: [
        "Requirements Gathering",
        "Product Development",
        "Project Coordination",
        "Stakeholder Management"
      ]
    },
    {
      label: "STAGE 03",
      title: "Data-Led Technical Delivery",
      period: "2021–2024",
      icon: "chart-no-axes-combined",
      introduction:
        "I moved into a cross-functional delivery environment involving engineering, operations, quality assurance and client-facing teams.",
      doing:
        "Coordinating execution, monitoring delivery, managing risks and supporting performance improvement across technical programmes.",
      developed:
        "KPI design, dashboard reporting, operational analytics, delivery governance and cross-functional leadership.",
      changed:
        "Data became central to how I understood performance, identified problems and supported decisions.",
      forward:
        "This created the motivation to move from using analytical outputs into personally building the systems that produce them.",
      capabilities: [
        "Technical Delivery",
        "Performance Analytics",
        "KPI Reporting",
        "Cross-Functional Leadership"
      ]
    },
    {
      label: "STAGE 04",
      title: "Hands-On Cloud and AI Engineering",
      period: "2024–2026",
      icon: "cloud-cog",
      introduction:
        "I made a deliberate transition from primarily coordinating technology delivery into personally designing and building technical platforms.",
      doing:
        "Building batch pipelines, lakehouse platforms, event-driven streaming systems, APIs, analytics products and applied AI applications.",
      developed:
        "Python, SQL, PySpark, Databricks, Google Cloud, software engineering, machine learning and solution architecture.",
      changed:
        "My role evolved from supporting and coordinating technical work into owning complete implementation workflows.",
      forward:
        "This stage combined my delivery background with the ability to architect, build, test, deploy and document solutions.",
      capabilities: [
        "Cloud Data Engineering",
        "Streaming Systems",
        "Applied AI",
        "Backend Development"
      ]
    },
    {
      label: "STAGE 05",
      title: "Integrated Engineering Profile",
      period: "Today",
      icon: "orbit",
      introduction:
        "Today I combine cloud data engineering, applied AI and technical delivery into one connected professional profile.",
      doing:
        "Taking solutions from business understanding and architecture through implementation, governance, deployment, monitoring and communication.",
      developed:
        "The ability to connect business problems, technical architecture, implementation quality and measurable outcomes.",
      changed:
        "My experience now spans both delivery leadership and hands-on technical engineering.",
      forward:
        "This positions me to contribute as a cloud data engineer, applied AI engineer or technical delivery professional in complex environments.",
      capabilities: [
        "End-to-End Engineering",
        "Solution Architecture",
        "Technical Delivery",
        "Business Alignment"
      ]
    }
  ];

  const stageButtons = [
    ...document.querySelectorAll(".evolution-stage-button")
  ];

  const constellationButtons = [
    ...document.querySelectorAll(".constellation-stage")
  ];

  const viewButtons = [
    ...document.querySelectorAll("[data-evolution-view]")
  ];

  const timelineView = document.querySelector(
    '[data-evolution-panel="timeline"]'
  );

  const constellationView = document.querySelector(
    '[data-evolution-panel="constellation"]'
  );

  const storyCard = document.getElementById(
    "evolution-story-card"
  );

  const stageLabel = document.getElementById(
    "evolution-stage-label"
  );

  const progressBar = document.getElementById(
    "evolution-progress-bar"
  );

  const lineProgress = document.querySelector(
    ".evolution-line-progress"
  );

  const journeyPulse = document.querySelector(
    ".journey-pulse"
  );

  const playButton = document.getElementById(
    "journey-play-button"
  );

  const showFullButton = document.getElementById(
    "show-full-journey"
  );

  const fullJourneyBoard = document.getElementById(
    "full-journey-board"
  );

  let activeStage = 0;
  let journeyTimer = null;
  let isPlaying = false;

  function updateStoryContent(index) {
    const stage = stages[index];

    storyCard.classList.remove("story-visible");
    storyCard.classList.add("story-changing");

    window.setTimeout(() => {
      document.getElementById(
        "story-stage-label"
      ).textContent = stage.label;

      document.getElementById(
        "story-stage-title"
      ).textContent = stage.title;

      document.getElementById(
        "story-stage-period"
      ).textContent = stage.period;

      document.getElementById(
        "story-introduction"
      ).textContent = stage.introduction;

      document.getElementById(
        "story-doing"
      ).textContent = stage.doing;

      document.getElementById(
        "story-developed"
      ).textContent = stage.developed;

      document.getElementById(
        "story-changed"
      ).textContent = stage.changed;

      document.getElementById(
        "story-forward"
      ).textContent = stage.forward;

      const storyIcon = document.getElementById(
        "story-stage-icon"
      );

      storyIcon.innerHTML =
        `<i data-lucide="${stage.icon}"></i>`;

      const coreIcon = document.getElementById(
        "evolution-core-icon"
      );

      coreIcon.setAttribute(
        "data-lucide",
        stage.icon
      );

      const tagContainer = document.getElementById(
        "story-capability-tags"
      );

      tagContainer.innerHTML = stage.capabilities
        .map((capability) => `<span>${capability}</span>`)
        .join("");

      window.lucide?.createIcons();

      storyCard.classList.remove("story-changing");

      requestAnimationFrame(() => {
        storyCard.classList.add("story-visible");
      });
    }, 240);
  }

  function updateStageButtons(index) {
    stageButtons.forEach((button, buttonIndex) => {
      const active = buttonIndex === index;

      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));

      button.classList.toggle(
        "completed",
        buttonIndex < index
      );
    });

    constellationButtons.forEach(
      (button, buttonIndex) => {
        button.classList.toggle(
          "active",
          buttonIndex === index
        );

        button.classList.toggle(
          "completed",
          buttonIndex < index
        );
      }
    );
  }

  function updateProgress(index) {
    const percentage =
      (index / (stages.length - 1)) * 100;

    progressBar.style.width =
      `${((index + 1) / stages.length) * 100}%`;

    lineProgress.style.width =
      `${percentage}%`;

    journeyPulse.style.left =
      `${percentage}%`;

    stageLabel.textContent =
      `STAGE ${String(index + 1).padStart(2, "0")} OF 05`;
  }

  function selectStage(index) {
    activeStage = index;

    updateStageButtons(index);
    updateProgress(index);
    updateStoryContent(index);
  }

  function stopJourney() {
    clearInterval(journeyTimer);
    journeyTimer = null;
    isPlaying = false;

    playButton.innerHTML = `
      <i data-lucide="play"></i>
      <span>Play My Journey</span>
    `;

    window.lucide?.createIcons();
  }

  function playJourney() {
    if (isPlaying) {
      stopJourney();
      return;
    }

    isPlaying = true;
    selectStage(0);

    playButton.innerHTML = `
      <i data-lucide="pause"></i>
      <span>Pause Journey</span>
    `;

    window.lucide?.createIcons();

    journeyTimer = window.setInterval(() => {
      if (activeStage >= stages.length - 1) {
        stopJourney();
        return;
      }

      selectStage(activeStage + 1);
    }, 3000);
  }

  function changeView(viewName) {
    viewButtons.forEach((button) => {
      button.classList.toggle(
        "active",
        button.dataset.evolutionView === viewName
      );
    });

    const timelineActive =
      viewName === "timeline";

    timelineView.hidden = !timelineActive;
    constellationView.hidden = timelineActive;

    timelineView.classList.toggle(
      "active",
      timelineActive
    );

    constellationView.classList.toggle(
      "active",
      !timelineActive
    );

    stopJourney();
  }

  stageButtons.forEach((button) => {
    button.addEventListener("click", () => {
      stopJourney();
      selectStage(
        Number(button.dataset.stageIndex)
      );
    });
  });

  constellationButtons.forEach((button) => {
    button.addEventListener("click", () => {
      selectStage(
        Number(button.dataset.constellationStage)
      );
    });
  });

  viewButtons.forEach((button) => {
    button.addEventListener("click", () => {
      changeView(button.dataset.evolutionView);
    });
  });

  playButton.addEventListener(
    "click",
    playJourney
  );

  showFullButton.addEventListener("click", () => {
    const currentlyHidden = fullJourneyBoard.hidden;

    fullJourneyBoard.hidden = !currentlyHidden;

    showFullButton.classList.toggle(
      "active",
      currentlyHidden
    );

    showFullButton.innerHTML = currentlyHidden
      ? `
        <i data-lucide="x"></i>
        Hide Full Journey
      `
      : `
        <i data-lucide="layout-grid"></i>
        Show Full Journey
      `;

    window.lucide?.createIcons();

    if (currentlyHidden) {
      requestAnimationFrame(() => {
        fullJourneyBoard.classList.add("visible");
      });

      fullJourneyBoard.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    } else {
      fullJourneyBoard.classList.remove("visible");
    }
  });

  selectStage(0);
});