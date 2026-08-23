const actionsPanel = document.querySelector(".actions-panel");
const changeBtn = document.querySelector(".btn-change"); // перевір клас кнопки Change
const actionBtns = document.querySelectorAll(".actions-panel__btn"); // перевір клас 3 кнопок

// Перемикаємо клас is-hidden при кліку на Change
changeBtn.addEventListener("click", event => {
  event.stopPropagation(); // Щоб клік на Change не закривав панель одразу
  actionsPanel.classList.toggle("is-hidden");
});

// Закриваємо панель при виборі будь-якої з 3 кнопок (повертаємо is-hidden)
actionBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    actionsPanel.classList.add("is-hidden");
  });
});

// Закриваємо панель при кліку на пустий простір мимо панелі
document.addEventListener("click", event => {
  // Якщо панель ПОКАЗАНА (не має is-hidden) і клік був поза нею
  if (
    !actionsPanel.classList.contains("is-hidden") &&
    !actionsPanel.contains(event.target)
  ) {
    actionsPanel.classList.add("is-hidden");
  }
});
