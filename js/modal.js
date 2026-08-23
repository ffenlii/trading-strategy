const modal = document.querySelector(".backdrop");
// 1. Знаходимо ВСІ кнопки з цим класом (отримуємо список)
const modalBtnsOpen = document.querySelectorAll(".modal-btn-open");
const modalBtnClose = document.querySelector(".modal-btn-close");

const toggleModal = () => modal.classList.toggle("is-hidden");
modalBtnsOpen.forEach(btn => {
  btn.addEventListener("click", toggleModal);
});

modalBtnClose.addEventListener("click", toggleModal);
