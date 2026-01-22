document.addEventListener("DOMContentLoaded", () => {
  // ===================== MENU HOVER =====================
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

  // ===================== SLIDESHOW =====================
  const slideshowImages = [
    'images/Wallpaper_1.png',
    'images/Wallpaper_2.png',
    'images/Wallpaper_3.png'
  ];

  let currentIndex = 0;

  // Create slideshow container if not already in HTML
  let slideshowEl = document.getElementById('slideshow');
  if (!slideshowEl) {
    slideshowEl = document.createElement('div');
    slideshowEl.id = 'slideshow';
    document.body.prepend(slideshowEl);
  }

  // Initial setup
  slideshowEl.style.position = 'fixed';
  slideshowEl.style.top = '0';
  slideshowEl.style.left = '0';
  slideshowEl.style.width = '100%';
  slideshowEl.style.height = '100%';
  slideshowEl.style.zIndex = '-1';
  slideshowEl.style.backgroundColor = '#393f42'; // default while loading
  slideshowEl.style.backgroundSize = 'cover';
  slideshowEl.style.backgroundPosition = 'center';

  // Add first image
  const firstDiv = document.createElement('div');
  firstDiv.style.backgroundImage = `url('${slideshowImages[0]}')`;
  firstDiv.style.position = 'absolute';
  firstDiv.style.top = '0';
  firstDiv.style.left = '0';
  firstDiv.style.width = '100%';
  firstDiv.style.height = '100%';
  firstDiv.style.backgroundSize = 'cover';
  firstDiv.style.backgroundPosition = 'center';
  firstDiv.style.opacity = '1';
  firstDiv.style.transition = 'opacity 1s ease';
  slideshowEl.appendChild(firstDiv);

  setInterval(() => {
    const nextIndex = (currentIndex + 1) % slideshowImages.length;
    const nextDiv = document.createElement('div');
    nextDiv.style.backgroundImage = `url('${slideshowImages[nextIndex]}')`;
    nextDiv.style.position = 'absolute';
    nextDiv.style.top = '0';
    nextDiv.style.left = '0';
    nextDiv.style.width = '100%';
    nextDiv.style.height = '100%';
    nextDiv.style.backgroundSize = 'cover';
    nextDiv.style.backgroundPosition = 'center';
    nextDiv.style.opacity = '0';
    nextDiv.style.transition = 'opacity 1s ease';
    slideshowEl.appendChild(nextDiv);

    // Trigger fade
    requestAnimationFrame(() => {
      nextDiv.style.opacity = '1';
    });

    // Remove old image after fade completes
    setTimeout(() => {
      slideshowEl.querySelectorAll('div').forEach((div, i, arr) => {
        if (i < arr.length - 1) div.remove();
      });
    }, 1000);

    currentIndex = nextIndex;
  }, 7000);
});
