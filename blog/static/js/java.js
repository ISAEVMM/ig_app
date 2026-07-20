// ==================== PROFILE FORM TOGGLE ====================
const btn = document.getElementById("toggleForm");
const form = document.getElementById("profileForm");

if (btn && form) {
  btn.addEventListener("click", () => {
    form.classList.toggle("show");
    btn.textContent = form.classList.contains("show") 
      ? "Скрыть" 
      : "Редактировать профиль";
  });
}

// ==================== LIGHTBOX ====================
const lightbox = document.getElementById("imgLightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxClose = document.getElementById("lightboxClose");

if (lightbox && lightboxImg && lightboxClose) {
  
  const openLightbox = (src) => {
    lightboxImg.src = src;
    lightbox.classList.add("show");
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    lightbox.classList.remove("show");
    document.body.style.overflow = "visible";
  };

  // Все кликабельные изображения
  document.querySelectorAll('.profile-avatar, .lightbox-trigger, .article-img, img.rounded-circle').forEach(img => {
    img.style.cursor = "pointer";
    img.addEventListener("click", (e) => {
      e.preventDefault();
      if (img.src) openLightbox(img.src);
    });
  });

  // Закрытие
  lightboxClose.addEventListener("click", closeLightbox);
  
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("show")) {
      closeLightbox();
    }
  });
}

// ==================== О НАС ТОГГЛ ====================
document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.getElementById("toggle-sections-btn");
  const sectionsContent = document.getElementById("sections-content");

  if (toggleBtn && sectionsContent) {
    toggleBtn.addEventListener("click", function () {
      sectionsContent.classList.toggle("d-none");
      
      toggleBtn.textContent = sectionsContent.classList.contains("d-none") 
        ? "О нас" 
        : "Скрыть";
    });
  }
});