document.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }

  const externalLinks = document.querySelectorAll('a[target="_blank"]');
  externalLinks.forEach((link) => {
    if (!link.rel.includes("noopener")) {
      link.rel = `${link.rel} noopener noreferrer`.trim();
    }
  });
});
