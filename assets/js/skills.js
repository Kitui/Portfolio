document.addEventListener("DOMContentLoaded", () => {
  const skillCategories = [
    {
      stage: "CAPABILITY 01",
      title: "Cloud Data Engineering",
      shortLabel: "DATA",
      icon: "database-zap",
      summary:
        "Designing reliable batch and streaming platforms that transform raw data into trusted analytical products.",
      build:
        "End-to-end ingestion, transformation, validation, curation and publishing pipelines.",
      practices:
        "Modular transformations, schema validation, auditability, data-quality checks and operational monitoring.",
      technologies: [
        "Python",
        "SQL",
        "PySpark",
        "Apache Spark",
        "Databricks",
        "Delta Lake",
        "ETL / ELT",
        "Batch Processing",
        "Stream Processing",
        "Data Pipeline Development",
        "Data Modelling",
        "Data Validation",
        "Data Quality Engineering"
      ],
      evidence: [
        "RoadSafe Lakehouse",
        "FlowOps",
        "BigQuery Publishing",
        "Medallion Pipelines"
      ],
      connections: [
        "Google Cloud Platform",
        "Data Platforms & Governance",
        "Streaming Systems"
      ]
    },
    {
      stage: "CAPABILITY 02",
      title: "Google Cloud Platform",
      shortLabel: "GCP",
      icon: "cloud-cog",
      summary:
        "Building scalable data and application platforms using managed Google Cloud services.",
      build:
        "Cloud-native ingestion services, analytical storage, event processing, monitoring and container deployments.",
      practices:
        "IAM configuration, secret management, cloud logging, environment separation and managed-service architecture.",
      technologies: [
        "BigQuery",
        "Cloud Run",
        "Pub/Sub",
        "Dataflow",
        "Cloud Storage",
        "Firestore",
        "Secret Manager",
        "Cloud Build",
        "Artifact Registry",
        "Cloud Logging",
        "Cloud Monitoring",
        "IAM"
      ],
      evidence: [
        "FlowOps",
        "RoadSafe BigQuery Publishing",
        "Cloud-Deployed APIs",
        "Operational Monitoring"
      ],
      connections: [
        "Cloud Infrastructure & DevOps",
        "Streaming Systems",
        "Backend Development"
      ]
    },
    {
      stage: "CAPABILITY 03",
      title: "Streaming & Event-Driven Systems",
      shortLabel: "STREAM",
      icon: "radio-tower",
      summary:
        "Designing systems that capture, validate, route and process events in near real time.",
      build:
        "Webhook ingestion, message-driven pipelines, event transformation, failure routing and analytical event storage.",
      practices:
        "Retry handling, idempotency, dead-letter routing, validation, durable messaging and observability.",
      technologies: [
        "Apache Beam",
        "Pub/Sub",
        "Real-Time Data Pipelines",
        "Event-Driven Architecture",
        "Webhooks",
        "Message Queues",
        "Dead-Letter Queues",
        "Retry Handling",
        "Idempotency",
        "Invalid-Event Routing"
      ],
      evidence: [
        "FlowOps",
        "GitHub Webhook Ingestion",
        "Dataflow Processing",
        "BigQuery Event Storage"
      ],
      connections: [
        "Google Cloud Platform",
        "Cloud Data Engineering",
        "Backend Development"
      ]
    },
    {
      stage: "CAPABILITY 04",
      title: "Data Platforms & Governance",
      shortLabel: "GOVERN",
      icon: "shield-check",
      summary:
        "Creating governed data platforms with clear layers, traceability, quality controls and consistent analytical models.",
      build:
        "Medallion lakehouses, semantic views, audit frameworks, orchestrated workflows and governed analytical datasets.",
      practices:
        "Schema enforcement, access governance, lineage, partitioning, clustering and quality monitoring.",
      technologies: [
        "Unity Catalog",
        "Medallion Architecture",
        "Semantic Modelling",
        "Pipeline Orchestration",
        "Workflow Automation",
        "Audit Logging",
        "Data Lineage",
        "Schema Validation",
        "Partitioning",
        "Clustering"
      ],
      evidence: [
        "RoadSafe Lakehouse",
        "Databricks Workflows",
        "Governed Data Layers",
        "Semantic Business Views"
      ],
      connections: [
        "Cloud Data Engineering",
        "Google Cloud Platform",
        "Analytics & AI"
      ]
    },
    {
      stage: "CAPABILITY 05",
      title: "Cloud Infrastructure & DevOps",
      shortLabel: "DEVOPS",
      icon: "boxes",
      summary:
        "Automating infrastructure, application delivery and repeatable cloud environments.",
      build:
        "Infrastructure definitions, containerised services, automated builds and reproducible deployment environments.",
      practices:
        "Infrastructure as Code, version control, CI/CD, environment management and deployment automation.",
      technologies: [
        "Terraform",
        "Infrastructure as Code",
        "Docker",
        "Containerisation",
        "Git",
        "GitHub",
        "GitHub Actions",
        "CI / CD",
        "Linux",
        "PowerShell",
        "Environment Configuration"
      ],
      evidence: [
        "FlowOps Infrastructure",
        "Terraform Provisioning",
        "Container Deployment",
        "GitHub-Based Delivery"
      ],
      connections: [
        "Google Cloud Platform",
        "Backend Development",
        "Streaming Systems"
      ]
    },
    {
      stage: "CAPABILITY 06",
      title: "Backend & API Development",
      shortLabel: "API",
      icon: "code-xml",
      summary:
        "Developing secure backend services and APIs that connect data, cloud platforms and intelligent applications.",
      build:
        "REST APIs, webhook receivers, machine-learning services, validation layers and modular backend applications.",
      practices:
        "Authentication, structured validation, JSON contracts, modular architecture and API integration.",
      technologies: [
        "FastAPI",
        "Flask",
        "REST APIs",
        "JSON",
        "Pydantic",
        "API Integration",
        "Authentication",
        "Request Validation",
        "Modular Backend Architecture"
      ],
      evidence: [
        "FlowOps Webhook Receiver",
        "Machine Learning APIs",
        "AI Platform Backends",
        "Cloud-Hosted Services"
      ],
      connections: [
        "Cloud Infrastructure & DevOps",
        "Applied AI",
        "Google Cloud Platform"
      ]
    },
    {
      stage: "CAPABILITY 07",
      title: "Analytics & Artificial Intelligence",
      shortLabel: "AI",
      icon: "brain-circuit",
      summary:
        "Using analytics, machine learning and intelligent systems to support prediction, recommendation and decision-making.",
      build:
        "Predictive models, explainable decision-support tools, customer analytics systems and AI-assisted applications.",
      practices:
        "Feature engineering, model evaluation, explainability, KPI design, analytical storytelling and business interpretation.",
      technologies: [
        "Pandas",
        "NumPy",
        "Scikit-learn",
        "Random Forest",
        "XGBoost",
        "LightGBM",
        "Machine Learning",
        "Predictive Analytics",
        "SHAP",
        "Reinforcement Learning",
        "Large Language Models",
        "AI Agents",
        "Business Intelligence",
        "KPI Reporting",
        "Dashboards"
      ],
      evidence: [
        "AI Bursary Allocation",
        "Customer IQ",
        "Data Reliability Copilot",
        "Decision-Support Platforms"
      ],
      connections: [
        "Cloud Data Engineering",
        "Backend Development",
        "Project Delivery"
      ]
    },
    {
      stage: "CAPABILITY 08",
      title: "Project Delivery & Collaboration",
      shortLabel: "DELIVERY",
      icon: "users-round",
      summary:
        "Connecting business objectives, technical execution, stakeholders and measurable delivery outcomes.",
      build:
        "Delivery plans, requirement frameworks, performance reporting, stakeholder communication and implementation workflows.",
      practices:
        "Risk management, cross-functional coordination, Agile delivery, executive reporting and performance monitoring.",
      technologies: [
        "Scrum",
        "Agile Delivery",
        "Technical Project Management",
        "Requirements Gathering",
        "Stakeholder Management",
        "Cross-Functional Leadership",
        "Risk Management",
        "Executive Reporting",
        "Delivery Planning",
        "Performance Monitoring"
      ],
      evidence: [
        "Engineering and Operations Coordination",
        "Client-Facing Delivery",
        "KPI Management",
        "Technical Implementation Leadership"
      ],
      connections: [
        "Cloud Data Engineering",
        "Analytics & AI",
        "Backend Development"
      ]
    }
  ];

  const technologyEvidence = {
    python: {
      title: "Python",
      description:
        "Primary programming language used across data engineering, APIs, analytics, automation and applied AI.",
      projects: [
        "RoadSafe Lakehouse",
        "FlowOps",
        "AI Bursary Platform",
        "Customer IQ"
      ],
      capabilities: [
        "Data Engineering",
        "Backend Development",
        "Applied AI"
      ]
    },
    pyspark: {
      title: "PySpark",
      description:
        "Used for scalable data transformation, validation and medallion-layer processing in Databricks.",
      projects: [
        "RoadSafe Lakehouse",
        "Bronze Processing",
        "Silver Transformations",
        "Gold Models"
      ],
      capabilities: [
        "Cloud Data Engineering",
        "Data Quality",
        "Lakehouse Architecture"
      ]
    },
    databricks: {
      title: "Databricks",
      description:
        "Used to build governed lakehouse pipelines, workflows, semantic models and monitored analytical layers.",
      projects: [
        "RoadSafe Lakehouse",
        "Databricks Workflows",
        "Unity Catalog Governance"
      ],
      capabilities: [
        "Lakehouse Engineering",
        "Workflow Automation",
        "Data Governance"
      ]
    },
    gcp: {
      title: "Google Cloud Platform",
      description:
        "Cloud platform used for streaming, serverless compute, analytical storage, monitoring and deployment.",
      projects: [
        "FlowOps",
        "RoadSafe BigQuery Publishing",
        "Cloud APIs"
      ],
      capabilities: [
        "Cloud Architecture",
        "Streaming Systems",
        "Cloud Operations"
      ]
    },
    pubsub: {
      title: "Pub/Sub",
      description:
        "Durable messaging service used to decouple webhook ingestion from streaming data processing.",
      projects: [
        "FlowOps",
        "Event Ingestion",
        "Dead-Letter Handling"
      ],
      capabilities: [
        "Streaming Systems",
        "Message Queues",
        "Event-Driven Architecture"
      ]
    },
    terraform: {
      title: "Terraform",
      description:
        "Used in FlowOps to define and provision repeatable Google Cloud infrastructure through code.",
      projects: [
        "FlowOps Infrastructure",
        "GCP Resource Provisioning",
        "Environment Configuration"
      ],
      capabilities: [
        "Infrastructure as Code",
        "Cloud DevOps",
        "Deployment Automation"
      ]
    },
    fastapi: {
      title: "FastAPI",
      description:
        "Backend framework used for webhook receivers, validation services and production-oriented APIs.",
      projects: [
        "FlowOps Webhook Receiver",
        "Machine Learning APIs",
        "AI Product Backends"
      ],
      capabilities: [
        "Backend Development",
        "Authentication",
        "Request Validation"
      ]
    },
    "machine-learning": {
      title: "Machine Learning",
      description:
        "Used to create predictive and explainable decision-support systems across multiple AI platforms.",
      projects: [
        "AI Bursary Allocation",
        "Customer IQ",
        "Data Reliability Copilot"
      ],
      capabilities: [
        "Predictive Analytics",
        "Explainable AI",
        "Decision Intelligence"
      ]
    }
  };

  const categoryButtons = [
    ...document.querySelectorAll("[data-skill-category]")
  ];

  const orbitButtons = [
    ...document.querySelectorAll("[data-orbit-category]")
  ];

  const viewButtons = [
    ...document.querySelectorAll("[data-skills-view]")
  ];

  const panels = [
    ...document.querySelectorAll("[data-skills-panel]")
  ];

  const technologyNodes = [
    ...document.querySelectorAll("[data-technology-node]")
  ];

  const filterButtons = [
    ...document.querySelectorAll("[data-map-filter]")
  ];

  const activePanel = document.getElementById(
    "active-skill-panel"
  );

  let activeCategory = 0;

  function createTags(items) {
    return items
      .map((item) => `<span>${item}</span>`)
      .join("");
  }

  function updateSkillContent(index) {
    const category = skillCategories[index];

    activePanel.classList.remove("skill-panel-visible");
    activePanel.classList.add("skill-panel-changing");

    window.setTimeout(() => {
      document.getElementById(
        "active-skill-stage"
      ).textContent = category.stage;

      document.getElementById(
        "active-skill-title"
      ).textContent = category.title;

      document.getElementById(
        "active-skill-summary"
      ).textContent = category.summary;

      document.getElementById(
        "skill-build-description"
      ).textContent = category.build;

      document.getElementById(
        "skill-practice-description"
      ).textContent = category.practices;

      document.getElementById(
        "skill-evidence-list"
      ).innerHTML = createTags(category.evidence);

      document.getElementById(
        "skill-connection-list"
      ).innerHTML = createTags(category.connections);

      document.getElementById(
        "active-technology-tags"
      ).innerHTML = createTags(category.technologies);

      const activeIcon = document.getElementById(
        "active-skill-icon"
      );

      activeIcon.innerHTML =
        `<i data-lucide="${category.icon}"></i>`;

      const coreIcon = document.getElementById(
        "skills-core-icon"
      );

      coreIcon.setAttribute(
        "data-lucide",
        category.icon
      );

      document.getElementById(
        "skills-core-label"
      ).textContent = category.shortLabel;

      document.getElementById(
        "skills-active-label"
      ).textContent = category.title.toUpperCase();

      document.getElementById(
        "skills-progress-bar"
      ).style.width =
        `${((index + 1) / skillCategories.length) * 100}%`;

      window.lucide?.createIcons();

      activePanel.classList.remove(
        "skill-panel-changing"
      );

      requestAnimationFrame(() => {
        activePanel.classList.add(
          "skill-panel-visible"
        );
      });
    }, 220);
  }

  function updateCategoryState(index) {
    categoryButtons.forEach((button, buttonIndex) => {
      const active = buttonIndex === index;

      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    orbitButtons.forEach((button, buttonIndex) => {
      button.classList.toggle(
        "active",
        buttonIndex === index
      );
    });
  }

  function selectCategory(index) {
    activeCategory = index;
    updateCategoryState(index);
    updateSkillContent(index);
  }

  function changeView(viewName) {
    viewButtons.forEach((button) => {
      button.classList.toggle(
        "active",
        button.dataset.skillsView === viewName
      );
    });

    panels.forEach((panel) => {
      const active =
        panel.dataset.skillsPanel === viewName;

      panel.hidden = !active;
      panel.classList.toggle("active", active);
    });
  }

  function selectTechnology(key) {
    const technology = technologyEvidence[key];

    if (!technology) {
      return;
    }

    technologyNodes.forEach((node) => {
      node.classList.toggle(
        "active",
        node.dataset.technologyNode === key
      );
    });

    const evidencePanel = document.getElementById(
      "technology-evidence-panel"
    );

    evidencePanel.classList.add(
      "technology-panel-changing"
    );

    window.setTimeout(() => {
      document.getElementById(
        "technology-evidence-title"
      ).textContent = technology.title;

      document.getElementById(
        "technology-evidence-description"
      ).textContent = technology.description;

      document.getElementById(
        "technology-project-tags"
      ).innerHTML = createTags(technology.projects);

      document.getElementById(
        "technology-capability-tags"
      ).innerHTML = createTags(technology.capabilities);

      evidencePanel.classList.remove(
        "technology-panel-changing"
      );
    }, 200);
  }

  function filterTechnologyNodes(group) {
    technologyNodes.forEach((node) => {
      const groups =
        node.dataset.mapGroup.split(" ");

      const visible =
        group === "all" || groups.includes(group);

      node.classList.toggle("filtered-out", !visible);
      node.disabled = !visible;
    });
  }

  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      selectCategory(
        Number(button.dataset.skillCategory)
      );
    });
  });

  orbitButtons.forEach((button) => {
    button.addEventListener("click", () => {
      selectCategory(
        Number(button.dataset.orbitCategory)
      );
    });
  });

  viewButtons.forEach((button) => {
    button.addEventListener("click", () => {
      changeView(button.dataset.skillsView);
    });
  });

  technologyNodes.forEach((node) => {
    node.addEventListener("click", () => {
      selectTechnology(
        node.dataset.technologyNode
      );
    });
  });

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((item) => {
        item.classList.remove("active");
      });

      button.classList.add("active");

      filterTechnologyNodes(
        button.dataset.mapFilter
      );
    });
  });

  selectCategory(0);
  selectTechnology("python");
});