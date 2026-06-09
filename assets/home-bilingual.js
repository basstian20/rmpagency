const revealTargets = document.querySelectorAll(
  "[data-reveal], [data-reveal-group]"
);

if ("IntersectionObserver" in window) {
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
