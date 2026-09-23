const menuButton = document.querySelector("[data-menu-button]");
const nav = document.querySelector("[data-nav]");
menuButton?.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!open));
  menuButton.setAttribute("aria-label", open ? "打开导航" : "关闭导航");
  nav?.classList.toggle("open", !open);
  document.body.classList.toggle("menu-open", !open);
});
nav?.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    menuButton?.setAttribute("aria-expanded", "false");
    nav?.classList.remove("open");
    document.body.classList.remove("menu-open");
  }),
);
const slides = [...document.querySelectorAll("[data-slide]")];
const dots = [...document.querySelectorAll("[data-dot]")];
const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;
let currentSlide = 0;
let slideTimer;
function showSlide(index) {
  if (!slides.length) return;
  currentSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === currentSlide);
    slide.setAttribute("aria-hidden", String(i !== currentSlide));
  });
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentSlide);
    dot.setAttribute("aria-current", i === currentSlide ? "true" : "false");
  });
}
function startCarousel() {
  if (reducedMotion || slides.length < 2) return;
  clearInterval(slideTimer);
  slideTimer = setInterval(() => showSlide(currentSlide + 1), 6500);
}
document.querySelector("[data-prev]")?.addEventListener("click", () => {
  showSlide(currentSlide - 1);
  startCarousel();
});
document.querySelector("[data-next]")?.addEventListener("click", () => {
  showSlide(currentSlide + 1);
  startCarousel();
});
dots.forEach((dot, i) =>
  dot.addEventListener("click", () => {
    showSlide(i);
    startCarousel();
  }),
);
showSlide(0);
startCarousel();
const revealItems = document.querySelectorAll(".reveal");
if (reducedMotion || !("IntersectionObserver" in window))
  revealItems.forEach((item) => item.classList.add("visible"));
else {
  const observer = new IntersectionObserver(
    (entries, currentObserver) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          currentObserver.unobserve(entry.target);
        }
      }),
    { threshold: 0.12 },
  );
  revealItems.forEach((item) => observer.observe(item));
}
document.querySelectorAll("[data-year]").forEach((item) => {
  item.textContent = new Date().getFullYear();
});
