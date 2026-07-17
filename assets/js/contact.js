document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById(
    "portfolio-contact-form"
  );

  if (!form) {
    return;
  }

  const fields = {
    name: document.getElementById("contact-name"),
    email: document.getElementById("contact-email"),
    subject: document.getElementById("contact-subject"),
    message: document.getElementById("contact-message")
  };

  const submitButton = document.getElementById(
    "contact-submit-button"
  );

  const submitText = submitButton.querySelector(
    ".submit-button-text"
  );

  const status = document.getElementById(
    "contact-form-status"
  );

  const characterCount = document.getElementById(
    "contact-character-count"
  );

  const signalLabel = document.getElementById(
    "contact-signal-label"
  );

  const signalBars = [
    ...document.querySelectorAll(
      ".contact-signal-bars span"
    )
  ];

  let isSubmitting = false;

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      value.trim()
    );
  }

  function validateField(name) {
    const field = fields[name];
    const value = field.value.trim();

    let valid = false;

    if (name === "name") {
      valid = value.length >= 2;
    }

    if (name === "email") {
      valid = isValidEmail(value);
    }

    if (name === "subject") {
      valid = value.length >= 3;
    }

    if (name === "message") {
      valid = value.length >= 10;
    }

    const fieldContainer = field.closest(
      ".contact-field"
    );

    fieldContainer.classList.toggle(
      "valid",
      valid
    );

    fieldContainer.classList.toggle(
      "invalid",
      value.length > 0 && !valid
    );

    return valid;
  }

  function getValidFieldCount() {
    return Object.keys(fields).filter(
      validateField
    ).length;
  }

  function updateSignal() {
    const validCount = getValidFieldCount();

    signalBars.forEach((bar, index) => {
      bar.classList.toggle(
        "active",
        index < validCount
      );
    });

    const messages = [
      "Waiting for input",
      "Weak signal",
      "Building connection",
      "Almost ready",
      "Ready to transmit"
    ];

    signalLabel.textContent =
      messages[validCount];

    form.dataset.signalStrength =
      String(validCount);

    const allValid =
      validCount === Object.keys(fields).length;

    submitButton.disabled =
      !allValid || isSubmitting;

    submitText.textContent = allValid
      ? "Send Message"
      : "Complete Required Fields";
  }

  function updateCharacterCount() {
    characterCount.textContent =
      `${fields.message.value.length} / 1000`;
  }

  function setSubmissionState(
    state,
    message = ""
  ) {
    form.dataset.submissionState = state;
    status.textContent = message;

    if (state === "validating") {
      isSubmitting = true;
      submitButton.disabled = true;
      submitText.textContent = "Validating";
    }

    if (state === "transmitting") {
      submitText.textContent = "Preparing Email";
    }

    if (state === "sent") {
      submitText.textContent = "Email Prepared";
      status.className =
        "contact-form-status success";
    }

    if (state === "error") {
      isSubmitting = false;
      submitText.textContent = "Try Again";
      submitButton.disabled = false;
      status.className =
        "contact-form-status error";
    }

    window.lucide?.createIcons();
  }

  function buildMailtoLink() {
    const name = fields.name.value.trim();
    const email = fields.email.value.trim();
    const subject = fields.subject.value.trim();
    const message = fields.message.value.trim();

    const body = [
      `Hello Paul,`,
      ``,
      message,
      ``,
      `Regards,`,
      name,
      email
    ].join("\n");

    const query = new URLSearchParams({
      subject,
      body
    });

    return (
      "mailto:paulkitui@gmail.com?" +
      query.toString()
    );
  }

  Object.entries(fields).forEach(
    ([name, field]) => {
      field.addEventListener("input", () => {
        validateField(name);

        if (name === "message") {
          updateCharacterCount();
        }

        updateSignal();

        status.textContent = "";
        status.className =
          "contact-form-status";
      });

      field.addEventListener("blur", () => {
        validateField(name);
      });
    }
  );

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const honeypot = document.getElementById(
      "company-website"
    );

    if (honeypot.value.trim()) {
      return;
    }

    const allValid =
      getValidFieldCount() ===
      Object.keys(fields).length;

    if (!allValid) {
      updateSignal();

      setSubmissionState(
        "error",
        "Please complete every required field correctly."
      );

      return;
    }

    setSubmissionState(
      "validating",
      "Checking your message..."
    );

    window.setTimeout(() => {
      setSubmissionState(
        "transmitting",
        "Preparing your email application..."
      );
    }, 650);

    window.setTimeout(() => {
      const mailtoLink = buildMailtoLink();

      setSubmissionState(
        "sent",
        "Your email application should open with the message prepared."
      );

      window.location.href = mailtoLink;

      window.setTimeout(() => {
        isSubmitting = false;
        submitButton.disabled = false;
        submitText.textContent =
          "Send Message";
      }, 1500);
    }, 1400);
  });

  updateCharacterCount();
  updateSignal();
});