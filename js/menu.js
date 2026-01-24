// ===================== MENU POPULATION =====================
const menuContainer = document.getElementById("menu-container");

fetch("menu.html")
  .then(response => response.text())
  .then(html => {
    menuContainer.innerHTML = html;

    // Initialize submenu hover
const OPEN_DELAY = 200;
const CLOSE_DELAY = 350;
const MOBILE_BREAKPOINT = 768;

document.querySelectorAll("nav li").forEach(item => {
  let openTimer;
  let closeTimer;
  const link = item.querySelector(":scope > a");
  const submenu = item.querySelector(":scope > ul");

  // ===== DESKTOP HOVER =====
  item.addEventListener("mouseenter", () => {
    if (window.innerWidth <= MOBILE_BREAKPOINT) return;
    clearTimeout(closeTimer);
    openTimer = setTimeout(() => {
      item.classList.add("show");
    }, OPEN_DELAY);
  });

  item.addEventListener("mouseleave", (e) => {
    if (window.innerWidth <= MOBILE_BREAKPOINT) return;
    clearTimeout(openTimer);
    if (item.contains(e.relatedTarget)) return;
    closeTimer = setTimeout(() => {
      item.classList.remove("show");
    }, CLOSE_DELAY);
  });

  // ===== MOBILE TAP =====
  if (submenu && link) {
    link.addEventListener("click", (e) => {
      if (window.innerWidth > MOBILE_BREAKPOINT) return;

      e.preventDefault(); // stop navigation
      const isOpen = item.classList.contains("show");

      // close siblings
      item.parentElement.querySelectorAll(":scope > li.show").forEach(li => {
        if (li !== item) li.classList.remove("show");
      });

      item.classList.toggle("show", !isOpen);
    });
  }
});

// Close menus when tapping outside (mobile)
document.addEventListener("click", (e) => {
  if (window.innerWidth > MOBILE_BREAKPOINT) return;
  if (!e.target.closest("nav")) {
    document.querySelectorAll("nav li.show").forEach(li => {
      li.classList.remove("show");
    });
  }
});

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
const fadeDuration = 1000; // fade time in ms
const displayDuration = 7000; // full visible time

// Create two stacked divs for crossfade
const divA = document.createElement("div");
const divB = document.createElement("div");

[divA, divB].forEach(div => {
  div.style.position = "absolute";
  div.style.top = 0;
  div.style.left = 0;
  div.style.width = "100%";
  div.style.height = "100%";
  div.style.backgroundSize = "cover";
  div.style.backgroundPosition = "center";
  div.style.backgroundRepeat = "no-repeat";
  div.style.transition = `opacity ${fadeDuration}ms ease-in-out`;
  div.style.zIndex = -2;
  slideshow.appendChild(div);
});

// Initialize images
divA.style.backgroundImage = `url('${slideshowImages[0]}')`;
divA.style.opacity = 1;
divB.style.opacity = 0;

// Swap divs references
let topDiv = divB;
let bottomDiv = divA;

function fadeToNextImage() {
  topDiv.style.backgroundImage = `url('${slideshowImages[nextIndex]}')`;
  topDiv.style.opacity = 1; // fade in

  // fade out bottom div
  bottomDiv.style.opacity = 0;

  // After fade, swap references
  [topDiv, bottomDiv] = [bottomDiv, topDiv];

  currentIndex = nextIndex;
  nextIndex = (nextIndex + 1) % slideshowImages.length;
}

// Start the slideshow
setInterval(fadeToNextImage, displayDuration);
