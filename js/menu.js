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

    // If the mouse is still inside this menu or a child, do nothing
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
const slideshowEl = document.getElementById('slideshow');

function showNextSlide() {
  slideshowEl.style.opacity = 0; // fade out
  setTimeout(() => {
    slideshowEl.style.backgroundImage = `url('${slideshowImages[currentIndex]}')`;
    slideshowEl.style.opacity = 1; // fade in
    currentIndex = (currentIndex + 1) % slideshowImages.length;
  }, 1000); // match CSS transition duration
}

// Initialize first slide
slideshowEl.style.backgroundImage = `url('${slideshowImages[0]}')`;
slideshowEl.style.opacity = 1;

// Change slide every 7 seconds
setInterval(showNextSlide, 7000);
