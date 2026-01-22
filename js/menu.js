// js/menu.js

// --- Load menu items from menu.html ---
fetch('menu.html')
  .then(response => response.text())
  .then(html => {
    const menuContainer = document.getElementById('menu-container');
    menuContainer.innerHTML = html;

    // --- Reapply hover logic for submenus ---
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

        // Prevent closing if mouse still inside
        if (item.contains(e.relatedTarget)) return;

        closeTimer = setTimeout(() => {
          item.classList.remove("show");
        }, CLOSE_DELAY);
      });
    });
  })
  .catch(err => console.error("Failed to load menu items:", err));
