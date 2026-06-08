const nav = document.getElementById("nav");
const toggle = document.getElementById("toggle");
const links = document.getElementById("links");

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

window.addEventListener(
  "scroll",
  () => nav.classList.toggle("scrolled", window.scrollY > 60),
  { passive: true },
);

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
