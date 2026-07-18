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

  const replyToField = document.getElementById(
    "contact-reply-to"
  );

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

    if (!field) {
      return false;
    }

    const value = field.value.trim();
    let valid = false;

    switch (name) {
      case "name":
        valid = value.length >= 2;
        break;

      case "email":
        valid = isValidEmail(value);
        break;

      case "subject":
        valid = value.length >= 3;
        break;

      case "message":
        valid = value.length >= 10;
        break;

      default:
        valid = false;
    }

    const fieldContainer = field.closest(
      ".contact-field"
    );

    fieldContainer?.classList.toggle(
      "valid",
      valid
    );

    fieldContainer?.classList.toggle(
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

  function formIsValid() {
    return (
      getValidFieldCount() ===
      Object.keys(fields).length
    );
  }

  function updateSignal() {
    const validCount = getValidFieldCount();

    signalBars.forEach((bar, index) => {
      bar.classList.toggle(
        "active",
        index < validCount
      );
    });

    const labels = [
      "Waiting for input",
      "Weak signal",
      "Building connection",
      "Almost ready",
      "Ready to transmit"
    ];

    signalLabel.textContent =
      labels[validCount];

    submitButton.disabled =
      !formIsValid() || isSubmitting;

    submitText.textContent = formIsValid()
      ? "Send Message"
      : "Complete Required Fields";
  }

  function updateCharacterCount() {
    characterCount.textContent =
      `${fields.message.value.length} / 1000`;
  }

  function setStatus(type, message) {
    status.className = "contact-form-status";

    if (type) {
      status.classList.add(type);
    }

    status.textContent = message;
  }

  function setSubmitting(submitting) {
    isSubmitting = submitting;
    submitButton.disabled =
      submitting || !formIsValid();
  }

  function resetFormState() {
    form.reset();

    Object.values(fields).forEach((field) => {
      field
        .closest(".contact-field")
        ?.classList.remove("valid", "invalid");
    });

    updateCharacterCount();
    updateSignal();
  }

  Object.entries(fields).forEach(
    ([name, field]) => {
      field.addEventListener("input", () => {
        validateField(name);

        if (name === "message") {
          updateCharacterCount();
        }

        updateSignal();
        setStatus("", "");
      });

      field.addEventListener("blur", () => {
        validateField(name);
      });
    }
  );

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const honeypot = document.getElementById(
      "company-website"
    );

    if (honeypot?.value.trim()) {
      return;
    }

    if (!formIsValid()) {
      updateSignal();

      setStatus(
        "error",
        "Please complete every required field correctly."
      );

      return;
    }

    replyToField.value =
      fields.email.value.trim();

    setSubmitting(true);

    form.dataset.submissionState = "validating";
    submitText.textContent = "Validating";
    setStatus("", "Checking your message...");

    await new Promise((resolve) => {
      window.setTimeout(resolve, 500);
    });

    form.dataset.submissionState = "transmitting";
    submitText.textContent = "Transmitting";
    setStatus("", "Sending your message...");

    try {
      const formData = new FormData(form);

      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json"
        }
      });

      if (!response.ok) {
        const responseData =
          await response.json().catch(() => null);

        const errorMessage =
          responseData?.errors
            ?.map((error) => error.message)
            .join(", ") ||
          "The message could not be sent.";

        throw new Error(errorMessage);
      }

      form.dataset.submissionState = "sent";
      submitText.textContent = "Message Sent";

      setStatus(
        "success",
        "Thank you. Your message has been sent successfully."
      );

      resetFormState();

      window.setTimeout(() => {
        submitText.textContent =
          "Complete Required Fields";

        form.dataset.submissionState = "";
        setSubmitting(false);
        updateSignal();
      }, 2500);
    } catch (error) {
      console.error(
        "Contact form submission failed:",
        error
      );

      form.dataset.submissionState = "error";
      submitText.textContent = "Try Again";

      setStatus(
        "error",
        error.message ||
          "Something went wrong. Please try again."
      );

      setSubmitting(false);
      updateSignal();
    }
  });

  updateCharacterCount();
  updateSignal();
});