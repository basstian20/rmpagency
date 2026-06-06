const cursor = document.getElementById("cursor"),
  ring = document.getElementById("cursor-ring");
if (
  cursor &&
  ring &&
  matchMedia("(hover:hover) and (pointer:fine)").matches
) {
  let mx = 0,
    my = 0,
    rx = 0,
    ry = 0;
  addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + "px";
    cursor.style.top = my + "px";
  });
  (function anim() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + "px";
    ring.style.top = ry + "px";
    requestAnimationFrame(anim);
  })();
  document
    .querySelectorAll("a,button,.work-item,.service")
    .forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursor.style.transform = "translate(-50%,-50%) scale(2.5)";
        ring.style.transform = "translate(-50%,-50%) scale(1.4)";
      });
      el.addEventListener("mouseleave", () => {
        cursor.style.transform = "translate(-50%,-50%) scale(1)";
        ring.style.transform = "translate(-50%,-50%) scale(1)";
      });
    });
}
const aboutImg = document.querySelector(".about-img");
if (aboutImg && matchMedia("(hover:hover) and (pointer:fine)").matches) {
  aboutImg.addEventListener("mousemove", (e) => {
    const rect = aboutImg.getBoundingClientRect();
    const  x = ((e.clientX - rect.left) / rect.width) * 100;
    const  y = ((e.clientY - rect.top) / rect.height) * 100;
    aboutImg.style.setProperty("--x", `${x}%`);
    aboutImg.style.setProperty("--y", `${y}%`);
  });
  aboutImg.addEventListener("mouseleave", () => {
    aboutImg.style.setProperty("--x", "50%");
    aboutImg.style.setProperty("--y", "50%");
  });
}
