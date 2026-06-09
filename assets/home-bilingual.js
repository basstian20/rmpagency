const revealTargets = document.querySelectorAll(
  "[data-reveal], [data-reveal-group]"
);
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (reducedMotion.matches) {
  revealTargets.forEach((target) => target.classList.add("is-visible"));
  document.querySelectorAll("video[autoplay]").forEach((video) => video.pause());
} else if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );

  revealTargets.forEach((target) => revealObserver.observe(target));
} else {
  revealTargets.forEach((target) => target.classList.add("is-visible"));
}

const ticker = document.querySelector(
  ".home-ticker-track, .signature-ticker-track"
);

if (ticker && "IntersectionObserver" in window) {
  const tickerObserver = new IntersectionObserver(([entry]) => {
    ticker.style.animationPlayState = entry.isIntersecting ? "running" : "paused";
  });

  tickerObserver.observe(ticker);
}
