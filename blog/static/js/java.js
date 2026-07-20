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

// Lightbox
const lightbox = document.getElementById("imgLightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxClose = document.getElementById("lightboxClose");

if (lightbox && lightboxImg && lightboxClose) {
  const openLightbox = (src) => {
    lightboxImg.src = src;
    lightbox.classList.add("show");
    document.body.style.overflow = "hidden"; // убираем прокрутку страницы
  };

  const closeLightbox = () => {
    lightbox.classList.remove("show");
    document.body.style.overflow = "visible";
  };

  // Все изображения, которые должны открываться в lightbox (включая триггеры картинок постов)
  const clickableImages = document.querySelectorAll(
    ".profile-avatar, .account-img, .article-img, .lightbox-trigger",
  );

  clickableImages.forEach((img) => {
    img.addEventListener("click", (e) => {
      e.preventDefault();
      if (img.src) {
        openLightbox(img.src);
      }
    });
  });

  // Закрытие
  lightboxClose.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("show")) {
      closeLightbox();
    }
  });
}
document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.getElementById("toggle-sections-btn");
  const sectionsContent = document.getElementById("sections-content");

  toggleBtn.addEventListener("click", function () {
    // Переключаем Bootstrap-класс 'd-none' (display: none)
    sectionsContent.classList.toggle("d-none");

    // Меняем текст на кнопке в зависимости от состояния
    if (sectionsContent.classList.contains("d-none")) {
      toggleBtn.textContent = "Показать разделы";
    } else {
      toggleBtn.textContent = "Скрыть разделы";
    }
  });
});
