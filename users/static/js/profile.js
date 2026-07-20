// //base Функции//

// // profile функции//

// 1. Логика скрытия/показа формы редактирования
const btn = document.getElementById("toggleForm");
const form = document.getElementById("profileForm");

if (btn && form) {
  // Добавили проверку, чтобы не было ошибок, если элементов нет на странице
  btn.addEventListener("click", () => {
    form.classList.toggle("show");

    btn.textContent = form.classList.contains("show")
      ? "Скрыть"
      : "Редактировать профиль";
  });
}

// 2. Логика лайтбокса (увеличение фото профиля)
const profileImg = document.getElementById("profileImg");
const lightbox = document.getElementById("imgLightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxClose = document.getElementById("lightboxClose");

if (profileImg && lightbox && lightboxImg && lightboxClose) {
  profileImg.addEventListener("click", () => {
    lightboxImg.src = profileImg.src;
    lightbox.classList.add("show");
  });

  lightboxClose.addEventListener("click", () => {
    lightbox.classList.remove("show");
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove("show");
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      lightbox.classList.remove("show");
    }
  });
}
