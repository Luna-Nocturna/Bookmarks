const OPEN_DELAY = 200;
const CLOSE_DELAY = 350;

// Desktop hover behavior
document.querySelectorAll("nav li").forEach(item => {
  let openTimer;
  let closeTimer;

  item.addEventListener("mouseenter", () => {
    if(window.innerWidth > 768){
      clearTimeout(closeTimer);
      openTimer = setTimeout(() => {
        item.classList.add("show");
      }, OPEN_DELAY);
    }
  });

  item.addEventListener("mouseleave", (e) => {
    if(window.innerWidth > 768){
      clearTimeout(openTimer);
      if (item.contains(e.relatedTarget)) return;
      closeTimer = setTimeout(() => {
        item.classList.remove("show");
      }, CLOSE_DELAY);
    }
  });
});

// Mobile submenu toggle
document.querySelectorAll(".menu-bar li > a").forEach(link => {
  link.addEventListener("click", (e) => {
    if(window.innerWidth <= 768){
      const parent = link.parentElement;
      const submenu = parent.querySelector("ul");
      if(submenu){
        e.preventDefault();
        parent.classList.toggle("show");
      }
    }
  });
});

// Hamburger toggle
document.getElementById("hamburger").addEventListener("click", () => {
  document.querySelector(".menu-bar > ul").classList.toggle("show");
});
