const menuToggle = document.querySelector("[data-menu-toggle]");
const menu = document.querySelector("[data-menu]");

if (menuToggle && menu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || !menu.classList.contains("open")) return;
    menu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.focus();
  });
}

const whatsappNumber = "6285760707000";
const whatsappMessages = {
  id: `Halo Karya Raja, saya tertarik untuk konsultasi personal branding.

Nama:
Profesi/Bisnis:
Akun Instagram/TikTok:
Tujuan personal branding:
Tantangan saat ini:
Apakah butuh bantuan social media management juga? Ya/Tidak

Boleh dibantu arahan langkah berikutnya?`,
  en: `Hello Karya Raja, I am interested in a personal branding consultation.

Name:
Profession/Business:
Instagram/TikTok account:
Personal branding goal:
Current challenge:
Do you also need social media management support? Yes/No

Could you help me with the next step?`,
};

const pageLanguage = document.documentElement.lang === "en" ? "en" : "id";
const whatsappMessage = whatsappMessages[pageLanguage];
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

const setupWhatsappLink = (link) => {
  link.href = whatsappUrl;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
};

document.querySelectorAll("[data-whatsapp]").forEach(setupWhatsappLink);

const progress = document.createElement("div");
progress.className = "scroll-progress";
progress.setAttribute("aria-hidden", "true");
document.body.prepend(progress);

let progressFrame;
const updateProgress = () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0;
  progress.style.transform = `scaleX(${ratio})`;
  progressFrame = undefined;
};

window.addEventListener(
  "scroll",
  () => {
    if (progressFrame) return;
    progressFrame = window.requestAnimationFrame(updateProgress);
  },
  { passive: true }
);
updateProgress();

const tickerItems = [
  "Ngonten dimana aja kapan aja",
  "Personal Branding",
  "Content Strategy",
  "Social Media Management",
  "Creative Production",
  "Build Trust",
  "Stay Relevant",
];

const tickerSequence = tickerItems
  .map((item) => {
    const tag = item === tickerItems[0] ? "b" : "span";
    return `<${tag}>${item}</${tag}><i>+</i>`;
  })
  .join("");
const tickerMarkup = `<div class="ticker-group">${tickerSequence}</div><div class="ticker-group">${tickerSequence}</div>`;

const existingTicker = document.querySelector(".home-ticker-track");
if (existingTicker) existingTicker.innerHTML = tickerMarkup;

const main = document.querySelector("main");
if (main && !existingTicker) {
  const ticker = document.createElement("div");
  ticker.className = "signature-ticker";
  ticker.setAttribute("aria-hidden", "true");
  ticker.innerHTML = `<div class="signature-ticker-track">${tickerMarkup}</div>`;
  main.querySelector(".editorial-hero")?.insertAdjacentElement("afterend", ticker);
}

const mobileWhatsapp = document.createElement("a");
mobileWhatsapp.className = "mobile-whatsapp";
mobileWhatsapp.setAttribute("data-whatsapp", "");
mobileWhatsapp.setAttribute(
  "aria-label",
  pageLanguage === "en"
    ? "Start a WhatsApp consultation"
    : "Mulai konsultasi WhatsApp"
);
mobileWhatsapp.innerHTML = `<span>${
  pageLanguage === "en"
    ? "Consult on WhatsApp"
    : "Konsultasi via WhatsApp"
}</span><strong aria-hidden="true">WA</strong>`;
setupWhatsappLink(mobileWhatsapp);
document.body.append(mobileWhatsapp);

const updateMobileWhatsapp = () => {
  mobileWhatsapp.classList.toggle("is-visible", window.scrollY > 180);
};

window.addEventListener("scroll", updateMobileWhatsapp, { passive: true });
window.addEventListener("load", updateMobileWhatsapp);
updateMobileWhatsapp();
