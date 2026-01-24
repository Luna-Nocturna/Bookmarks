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

document.querySelectorAll("nav li").forEach(function(item) {
  let openTimer;
  let closeTimer;

  // first child <a>
  const link = item.children[0];
  // first <ul> inside item (submenu)
  const submenu = item.querySelector("ul");

  // ===== DESKTOP HOVER =====
  item.addEventListener("mouseenter", function() {
    if (window.innerWidth <= MOBILE_BREAKPOINT) return;
    clearTimeout(closeTimer);
    openTimer = setTimeout(function() {
      item.classList.add("show");
    }, OPEN_DELAY);
  });

  item.addEventListener("mouseleave", function(e) {
    if (window.innerWidth <= MOBILE_BREAKPOINT) return;
    clearTimeout(openTimer);
    if (item.contains(e.relatedTarget)) return;
    closeTimer = setTimeout(function() {
      item.classList.remove("show");
    }, CLOSE_DELAY);
  });

  // ===== MOBILE TAP =====
  if (submenu && link) {
    link.addEventListener("click", function(e) {
      if (window.innerWidth > MOBILE_BREAKPOINT) return;

      e.preventDefault(); // stop link

      var isOpen = item.classList.contains("show");

      // close sibling menus
      var siblings = item.parentNode.children;
      for (var i = 0; i < siblings.length; i++) {
        if (siblings[i] !== item) siblings[i].classList.remove("show");
      }

      if (isOpen) {
        item.classList.remove("show");
      } else {
        item.classList.add("show");
      }
    });
  }
});

// Close menus when clicking outside (mobile)
document.addEventListener("click", function(e) {
  if (window.innerWidth > MOBILE_BREAKPOINT) return;

  var target = e.target;
  var insideNav = false;
  while (target) {
    if (target.tagName === "NAV") {
      insideNav = true;
      break;
    }
    target = target.parentNode;
  }

  if (!insideNav) {
    var openMenus = document.querySelectorAll("nav li.show");
    for (var i = 0; i < openMenus.length; i++) {
      openMenus[i].classList.remove("show");
    }
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
