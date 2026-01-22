// ===================== DESKTOP HOVER =====================
const OPEN_DELAY = 200;
const CLOSE_DELAY = 350;

document.querySelectorAll("nav li").forEach(item => {
  let openTimer;
  let closeTimer;

  item.addEventListener("mouseenter", () => {
    clearTimeout(closeTimer);
    openTimer = setTimeout(() => {
      item.classList.add("show");
    }, OPEN_DELAY);
  });

  item.addEventListener("mouseleave", (e) => {
    clearTimeout(openTimer);

    // If the mouse is still inside this menu or a child, do nothing
    if (item.contains(e.relatedTarget)) return;

    closeTimer = setTimeout(() => {
      item.classList.remove("show");
    }, CLOSE_DELAY);
  });
});

// ===================== MOBILE HAMBURGER =====================
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const menuBar = document.querySelector(".menu-bar");

  hamburger.addEventListener("click", () => {
    menuBar.classList.toggle("active");
  });
});
