const menuToggle = document.querySelector("[data-menu-toggle]");
const menu = document.querySelector("[data-menu]");

if (menuToggle && menu) {
  const openLabel = menuToggle.dataset.openLabel || "Open menu";
  const closeLabel = menuToggle.dataset.closeLabel || "Close menu";

  menuToggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? closeLabel : openLabel);
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", openLabel);
    });
  });
}

const whatsappNumber = "6285760707000";
const defaultWhatsappMessage = `Halo Karya Raja, saya tertarik untuk konsultasi personal branding.

Nama:
Profesi/Bisnis:
Akun Instagram/TikTok:
Tujuan personal branding:
Tantangan saat ini:
Apakah butuh bantuan social media management juga? Ya/Tidak

Boleh dibantu arahan langkah berikutnya?`;

document.querySelectorAll("[data-whatsapp]").forEach((link) => {
  const whatsappMessage = link.dataset.message || defaultWhatsappMessage;
  link.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
});
