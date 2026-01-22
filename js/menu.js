// Delay times in milliseconds
const OPEN_DELAY = 200;
const CLOSE_DELAY = 350;

// Select all menu items with submenus
document.querySelectorAll(".menu-bar li").forEach(item => {
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
