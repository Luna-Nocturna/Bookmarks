// ===================== MENU POPULATION =====================
var menuContainer = document.getElementById("menu-container");
var hamburger = document.getElementById("hamburger");

fetch("menu.html")
  .then(function(response) { return response.text(); })
  .then(function(html) {
    menuContainer.innerHTML = html;

    var OPEN_DELAY = 200;
    var CLOSE_DELAY = 350;
    var MOBILE_BREAKPOINT = 768;

    // ===== HAMBURGER TOGGLE =====
    if (hamburger) {
      hamburger.addEventListener("click", function() {
        if (menuContainer.classList.contains("show")) {
          menuContainer.classList.remove("show");
        } else {
          menuContainer.classList.add("show");
        }
      });
    }

    // ===== SUBMENU BEHAVIOR =====
    var navItems = document.querySelectorAll("nav li");
    for (var i = 0; i < navItems.length; i++) {
      (function(item) {
        var openTimer;
        var closeTimer;

        var link = item.children[0];
        var submenu = item.querySelector("ul");

        // Desktop hover
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

        // Mobile tap
        if (submenu && link) {
          link.addEventListener("click", function(e) {
            if (window.innerWidth > MOBILE_BREAKPOINT) return;

            e.preventDefault(); // stop link
            var isOpen = item.classList.contains("show");

            // close sibling menus
            var siblings = item.parentNode.children;
            for (var j = 0; j < siblings.length; j++) {
              if (siblings[j] !== item) siblings[j].classList.remove("show");
            }

            if (isOpen) {
              item.classList.remove("show");
            } else {
              item.classList.add("show");
            }
          });
        }

      })(navItems[i]);
    }

    // Close menus when clicking outside (mobile)
    document.addEventListener("click", function(e) {
      if (window.innerWidth > MOBILE_BREAKPOINT) return;

      // Ignore clicks inside nav
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
        menuContainer.classList.remove("show");
        var openMenus = document.querySelectorAll("nav li.show");
        for (var i = 0; i < openMenus.length; i++) {
          openMenus[i].classList.remove("show");
        }
      }
    });

  })
  .catch(function(err) { console.error("Failed to load menu:", err); });


// ===================== SLIDESHOW =====================
var slideshowImages = [
  "images/Wallpaper_1.png",
  "images/Wallpaper_2.png",
  "images/Wallpaper_3.png"
];

var slideshow = document.getElementById("slideshow");
var currentIndex = 0;
var nextIndex = 1;
var fadeDuration = 1000;
var displayDuration = 7000;

var divA = document.createElement("div");
var divB = document.createElement("div");

var divs = [divA, divB];
for (var i = 0; i < divs.length; i++) {
  var div = divs[i];
  div.style.position = "absolute";
  div.style.top = 0;
  div.style.left = 0;
  div.style.width = "100%";
  div.style.height = "100%";
  div.style.backgroundSize = "cover";
  div.style.backgroundPosition = "center";
  div.style.backgroundRepeat = "no-repeat";
  div.style.transition = "opacity " + fadeDuration + "ms ease-in-out";
  div.style.zIndex = -2;
  slideshow.appendChild(div);
}

divA.style.backgroundImage = "url('" + slideshowImages[0] + "')";
divA.style.opacity = 1;
divB.style.opacity = 0;

var topDiv = divB;
var bottomDiv = divA;

function fadeToNextImage() {
  topDiv.style.backgroundImage = "url('" + slideshowImages[nextIndex] + "')";
  topDiv.style.opacity = 1;
  bottomDiv.style.opacity = 0;

  // swap
  var temp = topDiv;
  topDiv = bottomDiv;
  bottomDiv = temp;

  currentIndex = nextIndex;
  nextIndex = (nextIndex + 1) % slideshowImages.length;
}

setInterval(fadeToNextImage, displayDuration);
