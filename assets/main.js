const nav = document.getElementById("nav");
const toggle = document.getElementById("toggle");
const links = document.getElementById("links");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const progress = document.createElement("div");
progress.className = "scroll-progress";
progress.setAttribute("aria-hidden", "true");
document.body.prepend(progress);

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

window.addEventListener("resize", () => {
  if (window.innerWidth > 820) setMenu(false);
});

function syncScrollState() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const scrollRatio = maxScroll > 0 ? window.scrollY / maxScroll : 0;

  nav.classList.toggle("scrolled", window.scrollY > 60);
  progress.style.transform = `scaleX(${scrollRatio})`;
  document.documentElement.style.setProperty(
    "--scroll-progress",
    scrollRatio.toFixed(4),
  );
  document.documentElement.style.setProperty(
    "--hero-scale",
    (1.04 + scrollRatio * 0.05).toFixed(4),
  );
}

window.addEventListener("scroll", syncScrollState, { passive: true });
syncScrollState();

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

if (!reduceMotion.matches && matchMedia("(hover:hover) and (pointer:fine)").matches) {
  document
    .querySelectorAll(
      ".service, .work-item, .project-tile, .belief-card, .framework-card, .benefit, .timeline-card, .hero-image",
    )
    .forEach((card) => {
      card.addEventListener("mousemove", (event) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;

        card.style.setProperty("--tilt-x", `${(-y * 5).toFixed(2)}deg`);
        card.style.setProperty("--tilt-y", `${(x * 5).toFixed(2)}deg`);
        card.style.setProperty("--pointer-x", `${(x + 0.5) * 100}%`);
        card.style.setProperty("--pointer-y", `${(y + 0.5) * 100}%`);
      });

      card.addEventListener("mouseleave", () => {
        card.style.setProperty("--tilt-x", "0deg");
        card.style.setProperty("--tilt-y", "0deg");
        card.style.setProperty("--pointer-x", "50%");
        card.style.setProperty("--pointer-y", "50%");
      });
    });
}
