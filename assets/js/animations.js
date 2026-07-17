document.addEventListener("DOMContentLoaded", () => {
  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.16,
    }
  );

  revealElements.forEach((element) => revealObserver.observe(element));

  const art = document.querySelector(".orbital-art");

  if (art && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.addEventListener("pointermove", (event) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 12;
      const y = (event.clientY / window.innerHeight - 0.5) * 12;

      art.style.transform = `translate(${x}px, ${y}px)`;
    });
  }
});
