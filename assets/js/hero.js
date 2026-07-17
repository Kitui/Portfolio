document.addEventListener("DOMContentLoaded", () => {
  const visual = document.querySelector(
    ".hero-platform-visual"
  );

  if (!visual) {
    return;
  }

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reducedMotion) {
    return;
  }

  visual.addEventListener("pointermove", (event) => {
    const bounds = visual.getBoundingClientRect();

    const x =
      (event.clientX - bounds.left) /
      bounds.width -
      0.5;

    const y =
      (event.clientY - bounds.top) /
      bounds.height -
      0.5;

    visual.style.setProperty(
      "--hero-move-x",
      `${x * 10}px`
    );

    visual.style.setProperty(
      "--hero-move-y",
      `${y * 10}px`
    );

    visual
      .querySelector(".platform-stack")
      ?.style.setProperty(
        "translate",
        `${x * 8}px ${y * 8}px`
      );

    visual
      .querySelectorAll(".platform-signal-card")
      .forEach((card, index) => {
        const direction =
          index % 2 === 0 ? 1 : -1;

        card.style.translate =
          `${x * 7 * direction}px ${y * 7}px`;
      });
  });

  visual.addEventListener("pointerleave", () => {
    visual
      .querySelector(".platform-stack")
      ?.style.removeProperty("translate");

    visual
      .querySelectorAll(".platform-signal-card")
      .forEach((card) => {
        card.style.removeProperty("translate");
      });
  });
});