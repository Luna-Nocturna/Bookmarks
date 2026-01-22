// ===================== MENU POPULATION =====================
const menuContainer = document.getElementById("menu-container");

fetch("menu.html")
  .then(response => response.text())
  .then(html => {
    menuContainer.innerHTML = html;

    // After menu is added, initialize hover behavior
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
  .catch(err => console.error("Failed to load menu:", err));


// ===================== SLIDESHOW =====================
const slideshowImages = [
  "images/Wallpaper_1.png",
  "images/Wallpaper_2.png",
  "images/Wallpaper_3.png"
];

const slideshow = document.getElementById("slideshow");
let currentIndex = 0;
let nextIndex = 1;
let fadeDuration = 1000; // fade duration in ms
let displayDuration = 7000; // how long each image stays fully visible

// Initialize first image
slideshow.style.backgroundImage = `url('${slideshowImages[0]}')`;

// Preload images
slideshowImages.forEach(src => {
  const img = new Image();
  img.src = src;
});

// Function to fade to next image
function fadeToNextImage() {
  const nextImage = slideshowImages[nextIndex];
  const fadeDiv = document.createElement("div");

  fadeDiv.style.backgroundImage = `url('${nextImage}')`;
  fadeDiv.style.position = "absolute";
  fadeDiv.style.top = 0;
  fadeDiv.style.left = 0;
  fadeDiv.style.width = "100%";
  fadeDiv.style.height = "100%";
  fadeDiv.style.backgroundSize = "cover";
  fadeDiv.style.backgroundPosition = "center";
  fadeDiv.style.backgroundRepeat = "no-repeat";
  fadeDiv.style.opacity = 0;
  fadeDiv.style.transition = `opacity ${fadeDuration}ms ease-in-out`;
  fadeDiv.style.zIndex = -2;

  slideshow.appendChild(fadeDiv);

  // trigger fade in
  requestAnimationFrame(() => {
    fadeDiv.style.opacity = 1;
  });

  // After fade duration, remove old image and reset z-index
  setTimeout(() => {
    slideshow.style.backgroundImage = `url('${nextImage}')`;
    slideshow.removeChild(fadeDiv);

    currentIndex = nextIndex;
    nextIndex = (nextIndex + 1) % slideshowImages.length;
  }, fadeDuration);
}

// Start slideshow loop
setInterval(fadeToNextImage, displayDuration);
