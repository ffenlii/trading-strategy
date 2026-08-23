// document.addEventListener("DOMContentLoaded", () => {
//   // Отримуємо елементи модального вікна авторизації
//   const authBackdrop = document.getElementById("authBackdrop");
//   const btnUserOpen = document.querySelector(".modal__login"); // іконка юзера
//   const btnBack = document.querySelector(".modal-user__back"); // кнопка «назад»

//   const tabLogin = document.getElementById("tabLogin");
//   const tabRegister = document.getElementById("tabRegister");
//   const formLogin = document.getElementById("formLogin");
//   const formRegister = document.getElementById("formRegister");

//   const loginError = document.getElementById("loginError");
//   const regError = document.getElementById("regError");

//   // Отримуємо елемент для виводу імені в основному меню
//   const displayUsername = document.getElementById("displayUsername");

//   // Масив користувачів із пам'яті браузера
//   let users = JSON.parse(localStorage.getItem("smart_money_users")) || [];

//   // --- ФУНКЦІЯ ОНОВЛЕННЯ ІМЕНІ У МЕНЮ ---
//   function updateHeaderUsername() {
//     const currentUser = localStorage.getItem("smart_money_current_user");

//     if (displayUsername) {
//       if (currentUser) {
//         displayUsername.textContent = currentUser; // Виводить ім'я авторизованого юзера
//       } else {
//         displayUsername.textContent = "Увійти"; // Якщо ніхто не зайшов
//       }
//     }
//   }

//   // Викликаємо оновлення одразу при завантаженні сторінки
//   updateHeaderUsername();

//   // --- ВІДКРИТТЯ ТА ЗАКРИТТЯ МОДАЛКИ ---
//   if (btnUserOpen) {
//     btnUserOpen.addEventListener("click", () => {
//       authBackdrop.classList.remove("is-hidden");
//     });
//   }

//   if (btnBack) {
//     btnBack.addEventListener("click", () => {
//       authBackdrop.classList.add("is-hidden");
//     });
//   }

//   // --- ПЕРЕМИКАННЯ ТАБІВ ---
//   tabLogin.addEventListener("click", () => {
//     tabLogin.classList.add("active");
//     tabRegister.classList.remove("active");
//     formLogin.classList.remove("is-hidden");
//     formRegister.classList.add("is-hidden");
//     loginError.textContent = "";
//   });

//   tabRegister.addEventListener("click", () => {
//     tabRegister.classList.add("active");
//     tabLogin.classList.remove("active");
//     formRegister.classList.remove("is-hidden");
//     formLogin.classList.add("is-hidden");
//     regError.textContent = "";
//   });

//   // --- 1. ЛОГІКА РЕЄСТРАЦІЇ ---
//   formRegister.addEventListener("submit", e => {
//     e.preventDefault();

//     const username = document.getElementById("regUsername").value.trim();
//     const pass = document.getElementById("regPassword").value;
//     const passConfirm = document.getElementById("regPasswordConfirm").value;

//     if (pass !== passConfirm) {
//       regError.textContent = "Паролі не збігаються!";
//       return;
//     }

//     const userExists = users.some(u => u.username === username);
//     if (userExists) {
//       regError.textContent = "Користувач із таким логіном вже існує!";
//       return;
//     }

//     // Зберігаємо нового користувача
//     const newUser = { username, password: pass };
//     users.push(newUser);
//     localStorage.setItem("smart_money_users", JSON.stringify(users));
//     localStorage.setItem("smart_money_current_user", username);

//     // МИТТЄВО ОНОВЛЮЄМО ІМ'Я В МЕНЮ
//     updateHeaderUsername();

//     alert(`Акаунт "${username}" успішно створено!`);
//     formRegister.reset();
//     authBackdrop.classList.add("is-hidden");
//   });

//   // --- 2. ЛОГІКА ВХОДУ ---
//   formLogin.addEventListener("submit", e => {
//     e.preventDefault();

//     const username = document.getElementById("loginUsername").value.trim();
//     const pass = document.getElementById("loginPassword").value;

//     const foundUser = users.find(
//       u => u.username === username && u.password === pass,
//     );

//     if (!foundUser) {
//       loginError.textContent = "Невірний логін або пароль!";
//       return;
//     }

//     // Зберігаємо поточного користувача
//     localStorage.setItem("smart_money_current_user", username);

//     // МИТТЄВО ОНОВЛЮЄМО ІМ'Я В МЕНЮ
//     updateHeaderUsername();

//     alert(`Ласкаво просимо, ${username}!`);
//     formLogin.reset();
//     authBackdrop.classList.add("is-hidden");
//   });
// });

document.addEventListener("DOMContentLoaded", () => {
  // Отримуємо елементи модального вікна авторизації
  const authBackdrop = document.getElementById("authBackdrop");
  const btnUserOpen = document.querySelector(".modal__login"); // іконка юзера
  const btnBack = document.querySelector(".modal-user__back"); // кнопка «назад»

  const tabLogin = document.getElementById("tabLogin");
  const tabRegister = document.getElementById("tabRegister");
  const formLogin = document.getElementById("formLogin");
  const formRegister = document.getElementById("formRegister");

  const loginError = document.getElementById("loginError");
  const regError = document.getElementById("regError");

  // Елемент для виводу імені в основному меню
  const displayUsername = document.getElementById("displayUsername");

  // --- ФУНКЦІЯ ОНОВЛЕННЯ ІМЕНІ У МЕНЮ ---
  function updateHeaderUsername() {
    const currentUser = localStorage.getItem("smart_money_current_user");

    if (displayUsername) {
      if (currentUser) {
        displayUsername.textContent = currentUser;
      } else {
        displayUsername.textContent = "Увійти";
      }
    }
  }

  // Викликаємо оновлення одразу при завантаженні сторінки
  updateHeaderUsername();

  // --- ВІДКРИТТЯ ТА ЗАКРИТТЯ МОДАЛКИ ---
  if (btnUserOpen && authBackdrop) {
    btnUserOpen.addEventListener("click", () => {
      authBackdrop.classList.remove("is-hidden");
    });
  }

  if (btnBack && authBackdrop) {
    btnBack.addEventListener("click", () => {
      authBackdrop.classList.add("is-hidden");
    });
  }

  // --- ПЕРЕМИКАННЯ ТАБІВ ---
  if (tabLogin && tabRegister) {
    tabLogin.addEventListener("click", () => {
      tabLogin.classList.add("active");
      tabRegister.classList.remove("active");
      if (formLogin) formLogin.classList.remove("is-hidden");
      if (formRegister) formRegister.classList.add("is-hidden");
      if (loginError) loginError.textContent = "";
    });

    tabRegister.addEventListener("click", () => {
      tabRegister.classList.add("active");
      tabLogin.classList.remove("active");
      if (formRegister) formRegister.classList.remove("is-hidden");
      if (formLogin) formLogin.classList.add("is-hidden");
      if (regError) regError.textContent = "";
    });
  }

  // // --- 1. ЛОГІКА РЕЄСТРАЦІЇ ЧЕРЕЗ FIREBASE ---
  // if (formRegister) {
  //   formRegister.addEventListener("submit", async e => {
  //     e.preventDefault();
  //     if (regError) regError.textContent = "";

  //     const username = document.getElementById("regUsername").value.trim();
  //     const pass = document.getElementById("regPassword").value;
  //     const passConfirm = document.getElementById("regPasswordConfirm").value;

  //     if (pass !== passConfirm) {
  //       if (regError) regError.textContent = "Паролі не збігаються!";
  //       return;
  //     }

  //     try {
  //       // Перевіряємо в хмарі, чи існує вже такий користувач
  //       const userDoc = await db.collection("users").doc(username).get();

  //       if (userDoc.exists) {
  //         if (regError)
  //           regError.textContent = "Користувач із таким логіном вже існує!";
  //         return;
  //       }

  //       // Зберігаємо нового користувача у Firebase
  //       await db.collection("users").doc(username).set({
  //         username: username,
  //         password: pass,
  //         createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  //       });

  //       // Встановлюємо поточного користувача
  //       localStorage.setItem("smart_money_current_user", username);

  //       updateHeaderUsername();

  //       alert(`Акаунт "${username}" успішно створено!`);
  //       formRegister.reset();
  //       if (authBackdrop) authBackdrop.classList.add("is-hidden");

  //       // Оновлюємо сторінку, щоб пости завантажилися для нового юзера
  //       window.location.reload();
  //     } catch (error) {
  //       console.error("Помилка реєстрації:", error);
  //       if (regError) regError.textContent = "Помилка при реєстрації у хмару!";
  //     }
  //   });
  // }

  // --- 1. ЛОГІКА РЕЄСТРАЦІЇ ЧЕРЕЗ FIREBASE ---
  if (formRegister) {
    formRegister.addEventListener("submit", async e => {
      e.preventDefault();
      if (regError) regError.textContent = "";

      const username = document.getElementById("regUsername").value.trim();
      const phone = document.getElementById("regPhone").value.trim(); // <--- Отримуємо телефон
      const pass = document.getElementById("regPassword").value;
      const passConfirm = document.getElementById("regPasswordConfirm").value;

      if (pass !== passConfirm) {
        if (regError) regError.textContent = "Паролі не збігаються!";
        return;
      }

      try {
        // Перевіряємо в хмарі, чи існує вже такий користувач
        const userDoc = await db.collection("users").doc(username).get();

        if (userDoc.exists) {
          if (regError)
            regError.textContent = "Користувач із таким логіном вже існує!";
          return;
        }

        // Зберігаємо нового користувача у Firebase разом із телефоном
        await db.collection("users").doc(username).set({
          username: username,
          phone: phone, // <--- Зберігаємо телефон у базу
          password: pass,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });

        // Встановлюємо поточного користувача
        localStorage.setItem("smart_money_current_user", username);

        updateHeaderUsername();

        alert(`Акаунт "${username}" успішно створено!`);
        formRegister.reset();
        if (authBackdrop) authBackdrop.classList.add("is-hidden");

        // Оновлюємо сторінку, щоб пости завантажилися для нового юзера
        window.location.reload();
      } catch (error) {
        console.error("Помилка реєстрації:", error);
        if (regError) regError.textContent = "Помилка при реєстрації у хмару!";
      }
    });
  }

  // --- 2. ЛОГІКА ВХОДУ ЧЕРЕЗ FIREBASE ---
  if (formLogin) {
    formLogin.addEventListener("submit", async e => {
      e.preventDefault();
      if (loginError) loginError.textContent = "";

      const username = document.getElementById("loginUsername").value.trim();
      const pass = document.getElementById("loginPassword").value;

      try {
        // Шукаємо користувача у Firebase
        const userDoc = await db.collection("users").doc(username).get();

        if (!userDoc.exists || userDoc.data().password !== pass) {
          if (loginError) loginError.textContent = "Невірний логін або пароль!";
          return;
        }

        // Зберігаємо поточного користувача
        localStorage.setItem("smart_money_current_user", username);

        updateHeaderUsername();

        alert(`Ласкаво просимо, ${username}!`);
        formLogin.reset();
        if (authBackdrop) authBackdrop.classList.add("is-hidden");

        // Оновлюємо сторінку, щоб підтягнути пости користувача
        window.location.reload();
      } catch (error) {
        console.error("Помилка входу:", error);
        if (loginError)
          loginError.textContent = "Помилка з'єднання з сервером!";
      }
    });
  }
});
