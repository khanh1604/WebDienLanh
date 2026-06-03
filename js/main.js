(function () {
  const track = document.querySelector(".carousel-track");
  const slides = document.querySelectorAll(".carousel-slide");
  const dots = document.querySelectorAll(".carousel-dots button");
  const prevBtn = document.querySelector(".carousel-prev");
  const nextBtn = document.querySelector(".carousel-next");
  let current = 0;
  let autoplayTimer;

  function goTo(index) {
    if (!track || slides.length === 0) return;
    current = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle("active", i === current));
  }

  function next() {
    goTo(current + 1);
  }

  function prev() {
    goTo(current - 1);
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(next, 5000);
  }

  function stopAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
  }

  if (nextBtn) nextBtn.addEventListener("click", () => { next(); startAutoplay(); });
  if (prevBtn) prevBtn.addEventListener("click", () => { prev(); startAutoplay(); });
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      goTo(i);
      startAutoplay();
    });
  });

  const hero = document.querySelector(".hero");
  if (hero) {
    hero.addEventListener("mouseenter", stopAutoplay);
    hero.addEventListener("mouseleave", startAutoplay);
  }

  startAutoplay();
  goTo(0);

  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");
  if (navToggle && nav) {
    navToggle.addEventListener("click", () => nav.classList.toggle("open"));
  }

  const navLinks = document.querySelectorAll(".nav a");
  const sections = document.querySelectorAll("section[id]");

  function setActiveNav() {
    let currentId = "trang-chu";
    const scrollY = window.scrollY + 100;
    sections.forEach((sec) => {
      if (sec.offsetTop <= scrollY) currentId = sec.id;
    });
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${currentId}`);
    });
  }

  window.addEventListener("scroll", setActiveNav);
  setActiveNav();

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (nav) nav.classList.remove("open");
    });
  });

  const topBtn = document.querySelector(".float-top");
  if (topBtn) {
    window.addEventListener("scroll", () => {
      topBtn.classList.toggle("visible", window.scrollY > 400);
    });
    topBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  const form = document.querySelector(".contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Cảm ơn bạn! Chúng tôi sẽ liên hệ sớm nhất.");
      form.reset();
    });
  }
})();
