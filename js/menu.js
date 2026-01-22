// Load menu.html into #menu-container
fetch('menu.html')
  .then(response => response.text())
  .then(html => {
    document.getElementById('menu-container').innerHTML = html;

    // After menu is loaded, add hover events
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

        if (item.contains(e.relatedTarget)) return;

        closeTimer = setTimeout(() => {
          item.classList.remove("show");
        }, CLOSE_DELAY);
      });
    });
  })
  .catch(err => console.error('Error loading menu:', err));
