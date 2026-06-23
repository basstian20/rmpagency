const nav = document.getElementById("nav");
const toggle = document.getElementById("toggle");
const links = document.getElementById("links");
const root = document.documentElement;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const mobileViewport = window.matchMedia("(max-width: 820px)");
const coarsePointer = window.matchMedia("(pointer: coarse)");
const desktopBreakpoint = window.matchMedia("(min-width: 821px)");

const progress = document.createElement("div");
progress.className = "scroll-progress";
progress.setAttribute("aria-hidden", "true");
document.body.prepend(progress);

function addMediaChangeListener(query, callback) {
  if (typeof query.addEventListener === "function") {
    query.addEventListener("change", callback);
    return;
  }

  if (typeof query.addListener === "function") {
    query.addListener(callback);
  }
}

function shouldUseSimplifiedEffects() {
  return mobileViewport.matches || coarsePointer.matches || reduceMotion.matches;
}

function setMenu(open) {
  document.body.classList.toggle("nav-open", open);
  nav.classList.toggle("opened", open);
  links.classList.toggle("open", open);
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute(
    "aria-label",
    window.KaryaI18n?.t(open ? "Close menu" : "Open menu") ||
      (open ? "Close menu" : "Open menu"),
  );
}

toggle.addEventListener("click", () => {
  setMenu(toggle.getAttribute("aria-expanded") !== "true");
});

links.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

const whatsappNumber = "6285760707000";
const whatsappMessage =
  "Halo Karya Raja, saya tertarik untuk berkonsultasi dan memulai proyek bersama Karya Raja. Saya ingin berdiskusi mengenai brand serta kebutuhan proyek saya. Mohon informasi untuk langkah selanjutnya. Terima kasih.";

document.querySelectorAll("[data-whatsapp-cta]").forEach((cta) => {
  cta.addEventListener("click", (event) => {
    event.preventDefault();

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      whatsappMessage,
    )}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  });
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenu(false);
});

addMediaChangeListener(desktopBreakpoint, (event) => {
  if (event.matches) setMenu(false);
});

const heroVisual = document.querySelector(".hero-visual video");
let scrollFrame = null;
let navIsScrolled = null;
let lastProgressRatio = -1;
let lastHeroScale = "";

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function updateNavState(scrollY) {
  const nextState = scrollY > 60;

  if (nextState === navIsScrolled) return;

  navIsScrolled = nextState;
  nav.classList.toggle("scrolled", nextState);
}

function updateProgress(ratio) {
  if (Math.abs(ratio - lastProgressRatio) < 0.002) return;

  lastProgressRatio = ratio;
  progress.style.transform = `scaleX(${ratio.toFixed(4)})`;
}

function updateHeroScale(scrollY, viewportHeight) {
  if (!heroVisual || shouldUseSimplifiedEffects()) {
    if (lastHeroScale) {
      root.style.removeProperty("--hero-scale");
      lastHeroScale = "";
    }
    return;
  }

  const heroProgress = clamp(scrollY / viewportHeight, 0, 1);
  const nextScale = (1.04 + heroProgress * 0.03).toFixed(4);

  if (nextScale === lastHeroScale) return;

  lastHeroScale = nextScale;
  root.style.setProperty("--hero-scale", nextScale);
}

function updateScrollState() {
  const scrollY = window.scrollY;
  const viewportHeight = window.innerHeight;
  const maxScroll = root.scrollHeight - viewportHeight;
  const scrollRatio = clamp(maxScroll > 0 ? scrollY / maxScroll : 0, 0, 1);

  updateNavState(scrollY);
  updateProgress(scrollRatio);
  updateHeroScale(scrollY, viewportHeight);
}

function requestScrollUpdate() {
  if (scrollFrame !== null) return;

  scrollFrame = window.requestAnimationFrame(() => {
    scrollFrame = null;
    updateScrollState();
  });
}

window.addEventListener("scroll", requestScrollUpdate, { passive: true });
window.addEventListener("resize", requestScrollUpdate, { passive: true });

[mobileViewport, coarsePointer, reduceMotion].forEach((query) => {
  addMediaChangeListener(query, requestScrollUpdate);
});

updateScrollState();

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  },
  { threshold: 0.12 },
);

document.querySelectorAll(".reveal, .reveal-stagger").forEach((item) => {
  observer.observe(item);
});

function initLazyVideos() {
  const lazyVideos = [...document.querySelectorAll("video[data-lazy-video]")];

  if (!lazyVideos.length) return;

  const shouldReduceMotion = () => reduceMotion.matches;

  const loadVideo = (video) => {
    if (video.dataset.loaded === "true") return;

    const source = video.dataset.src;
    if (!source) return;

    video.src = source;
    video.load();
    video.dataset.loaded = "true";
  };

  const playVideo = (video) => {
    if (
      shouldReduceMotion() ||
      video.dataset.loaded !== "true" ||
      !video.paused
    ) {
      return;
    }

    const playPromise = video.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {});
    }
  };

  const pauseVideo = (video) => {
    if (!video.paused) video.pause();
  };

  if (!("IntersectionObserver" in window)) {
    lazyVideos.forEach((video) => {
      loadVideo(video);
      if (shouldReduceMotion()) {
        pauseVideo(video);
        return;
      }

      playVideo(video);
    });
    return;
  }

  const loadObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        loadVideo(entry.target);
        if (entry.target.dataset.lazyVisible === "true") {
          playVideo(entry.target);
        }
        loadObserver.unobserve(entry.target);
      });
    },
    { rootMargin: "300px 0px", threshold: 0 },
  );

  const playbackObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
          entry.target.dataset.lazyVisible = "true";
          playVideo(entry.target);
        } else {
          entry.target.dataset.lazyVisible = "false";
          pauseVideo(entry.target);
        }
      });
    },
    { threshold: [0, 0.35] },
  );

  lazyVideos.forEach((video) => {
    loadObserver.observe(video);
    playbackObserver.observe(video);
  });

  addMediaChangeListener(reduceMotion, () => {
    if (shouldReduceMotion()) {
      lazyVideos.forEach(pauseVideo);
    }
  });
}

initLazyVideos();

const activeSectionObserver = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;

    links.querySelectorAll('a[href^="#"], a[href^="/#"]').forEach((link) => {
      const target = link.getAttribute("href").replace("/", "");
      if (target.length > 1) {
        link.classList.toggle("active", target === `#${visible.target.id}`);
      }
    });
  },
  {
    rootMargin: "-38% 0px -50% 0px",
    threshold: [0.18, 0.32, 0.5],
  },
);

document.querySelectorAll("main section[id]").forEach((section) => {
  activeSectionObserver.observe(section);
});

const serviceIndex = document.querySelector(".service-index");
const serviceCards = [...document.querySelectorAll(".service-detail[id]")];

if (serviceIndex && serviceCards.length) {
  const serviceLinks = [...serviceIndex.querySelectorAll('a[href^="#"]')];

  const setActiveService = (serviceId) => {
    serviceLinks.forEach((link) => {
      const active = link.getAttribute("href") === `#${serviceId}`;
      link.classList.toggle("is-active", active);
      link.toggleAttribute("aria-current", active);

      if (active) {
        link.scrollIntoView({
          behavior: reduceMotion.matches ? "auto" : "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    });
  };

  let activeServiceId = "";

  const activateService = (serviceId) => {
    if (!serviceId || serviceId === activeServiceId) return;

    activeServiceId = serviceId;
    setActiveService(activeServiceId);
  };

  activateService(serviceCards[0].id);

  if ("IntersectionObserver" in window) {
    const serviceObserver = new IntersectionObserver(
      (entries) => {
        const activeEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
          .at(-1);

        activateService(activeEntry?.target.id);
      },
      {
        rootMargin: "-34% 0px -58% 0px",
        threshold: [0, 0.01],
      },
    );

    serviceCards.forEach((card) => serviceObserver.observe(card));
  }
}

const finePointer = matchMedia("(hover:hover) and (pointer:fine)");
if (finePointer.matches) {
  const tiltCards = [
    ...document
    .querySelectorAll(
      ".service, .work-item, .project-tile, .belief-card, .framework-card, .benefit, .timeline-card, .hero-image",
    ),
  ];

  const resetTilt = (card) => {
    card.style.setProperty("--tilt-x", "0deg");
    card.style.setProperty("--tilt-y", "0deg");
    card.style.setProperty("--pointer-x", "50%");
    card.style.setProperty("--pointer-y", "50%");
  };

  tiltCards.forEach((card) => {
      card.addEventListener("mousemove", (event) => {
        if (shouldUseSimplifiedEffects()) return;

        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;

        card.style.setProperty("--tilt-x", `${(-y * 5).toFixed(2)}deg`);
        card.style.setProperty("--tilt-y", `${(x * 5).toFixed(2)}deg`);
        card.style.setProperty("--pointer-x", `${(x + 0.5) * 100}%`);
        card.style.setProperty("--pointer-y", `${(y + 0.5) * 100}%`);
      });

      card.addEventListener("mouseleave", () => {
        resetTilt(card);
      });
    });

  [mobileViewport, coarsePointer, reduceMotion].forEach((query) => {
    addMediaChangeListener(query, () => {
      if (shouldUseSimplifiedEffects()) tiltCards.forEach(resetTilt);
    });
  });
}
