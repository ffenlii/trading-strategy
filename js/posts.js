// document.addEventListener("DOMContentLoaded", () => {
//   const pageCategory = document.body.dataset.category || "default_page";

//   // Елементи формату/модалок
//   const btnAdd = document.querySelector(".actions-panel__btn.add");
//   const btnEditTrigger = document.querySelector(".actions-panel__btn.edit");
//   const postModal = document.getElementById("postModal");
//   const closePostModal = document.getElementById("closePostModal");
//   const postForm = document.getElementById("postForm");
//   const postContainer = document.querySelector(".post__container");
//   const modalTitle = postModal ? postModal.querySelector("h2") : null;
//   const submitBtn = postForm
//     ? postForm.querySelector('button[type="submit"]')
//     : null;

//   const fileInput = document.getElementById("postImages");
//   const previewContainer = document.getElementById("previewContainer");

//   // Редагування
//   const editStep1Modal = document.getElementById("editStep1Modal");
//   const closeEditStep1 = document.getElementById("closeEditStep1");
//   const editPostIdInput = document.getElementById("editPostIdInput");
//   const btnConfirmEditId = document.getElementById("btnConfirmEditId");

//   // Видалення
//   const btnDeleteTrigger = document.querySelector(".actions-panel__btn.delete");
//   const deleteStep1Modal = document.getElementById("deleteStep1Modal");
//   const closeDeleteStep1 = document.getElementById("closeDeleteStep1");
//   const deletePostIdInput = document.getElementById("deletePostIdInput");
//   const btnConfirmId = document.getElementById("btnConfirmId");

//   const deleteStep2Modal = document.getElementById("deleteStep2Modal");
//   const closeDeleteStep2 = document.getElementById("closeDeleteStep2");
//   const deleteConfirmText = document.getElementById("deleteConfirmText");
//   const btnFinalDelete = document.getElementById("btnFinalDelete");
//   const btnCancelDelete = document.getElementById("btnCancelDelete");

//   // Лайтбокс
//   const lightboxModal = document.getElementById("lightboxModal");
//   const lightboxImage = document.getElementById("lightboxImage");
//   const closeLightbox = document.getElementById("closeLightbox");
//   const prevImageBtn = document.getElementById("prevImage");
//   const nextImageBtn = document.getElementById("nextImage");

//   let pagePosts = []; // Зберігатимемо пости з Firebase
//   let selectedFiles = [];
//   let targetPostIdToDelete = null;
//   let editingPostId = null;

//   // --- 1. ЗАВАНТАЖЕННЯ ПОСТІВ З FIREBASE ---

//   async function fetchUserPosts() {
//     if (!postContainer) return;
//     const currentUser = localStorage.getItem("smart_money_current_user");

//     if (!currentUser) {
//       postContainer.innerHTML =
//         "<p>Будь ласка, увійдіть в акаунт, щоб бачити свої пости.</p>";
//       return;
//     }

//     postContainer.innerHTML = "<p>Завантаження постів з хмари...</p>";

//     try {
//       const snapshot = await db
//         .collection("posts")
//         .where("author", "==", currentUser)
//         .where("category", "==", pageCategory)
//         .get();

//       pagePosts = snapshot.docs.map(doc => ({
//         firestoreDocId: doc.id,
//         ...doc.data(),
//       }));

//       // Сортуємо за номерним ID
//       pagePosts.sort((a, b) => a.id - b.id);

//       renderUserPosts();
//     } catch (error) {
//       console.error("Помилка завантаження постів:", error);
//       postContainer.innerHTML =
//         "<p>Не вдалося завантажити пости з сервера.</p>";
//     }
//   }

//   function renderUserPosts() {
//     postContainer.innerHTML = "";

//     if (pagePosts.length === 0) {
//       postContainer.innerHTML =
//         "<p>На цій сторінці поки немає створених постів.</p>";
//       return;
//     }

//     pagePosts.forEach(post => {
//       const postCard = document.createElement("div");
//       postCard.classList.add("post-card");

//       let cardContent = `
//         <span class="post-card__id">ID: #${post.id}</span>
//         <h3 class="post-card__title">${post.title}</h3>
//         <p class="post-card__text">${post.text}</p>
//       `;

//       if (post.images && post.images.length > 0) {
//         cardContent += `<div class="post-card__gallery">`;
//         const visibleImages = post.images.slice(0, 4);
//         const hiddenImages = post.images.slice(4);

//         visibleImages.forEach(imgSrc => {
//           cardContent += `<img src="${imgSrc}" alt="Post photo" class="post-card__image" />`;
//         });

//         if (hiddenImages.length > 0) {
//           cardContent += `<div class="post-card__more-images is-hidden">`;
//           hiddenImages.forEach(imgSrc => {
//             cardContent += `<img src="${imgSrc}" alt="Post photo" class="post-card__image" />`;
//           });
//           cardContent += `</div>`;
//           cardContent += `
//             <button type="button" class="post-card__show-more-btn">
//               Показати ще (+${hiddenImages.length})
//             </button>
//           `;
//         }

//         cardContent += `</div>`;
//       }

//       postCard.innerHTML = cardContent;
//       postContainer.prepend(postCard);
//     });
//   }

//   fetchUserPosts();

//   // --- 2. ОБРОБКА ПРЕВ'Ю ФАЙЛІВ ---

//   if (fileInput) {
//     fileInput.addEventListener("change", e => {
//       const newFiles = Array.from(e.target.files).map(file => ({
//         type: "file",
//         data: file,
//       }));
//       selectedFiles = [...selectedFiles, ...newFiles];
//       renderPreviews();
//       fileInput.value = "";
//     });
//   }

//   function renderPreviews() {
//     if (!previewContainer) return;
//     previewContainer.innerHTML = "";

//     selectedFiles.forEach((item, index) => {
//       const imgWrap = document.createElement("div");
//       imgWrap.classList.add("preview-item");

//       if (item.type === "base64") {
//         imgWrap.innerHTML = `
//           <img src="${item.data}" alt="Preview" />
//           <button type="button" class="preview-remove" data-index="${index}">×</button>
//         `;
//         previewContainer.appendChild(imgWrap);
//       } else if (item.type === "file") {
//         const reader = new FileReader();
//         reader.onload = e => {
//           imgWrap.innerHTML = `
//             <img src="${e.target.result}" alt="Preview" />
//             <button type="button" class="preview-remove" data-index="${index}">×</button>
//           `;
//           previewContainer.appendChild(imgWrap);
//         };
//         reader.readAsDataURL(item.data);
//       }
//     });
//   }

//   if (previewContainer) {
//     previewContainer.addEventListener("click", e => {
//       if (e.target.classList.contains("preview-remove")) {
//         e.preventDefault();
//         const index = e.target.getAttribute("data-index");
//         selectedFiles.splice(index, 1);
//         renderPreviews();
//       }
//     });
//   }

//   if (postContainer) {
//     postContainer.addEventListener("click", e => {
//       if (e.target.classList.contains("post-card__show-more-btn")) {
//         const btn = e.target;
//         const gallery = btn.closest(".post-card__gallery");
//         const moreImagesContainer = gallery.querySelector(
//           ".post-card__more-images",
//         );

//         if (moreImagesContainer) {
//           moreImagesContainer.classList.remove("is-hidden");
//           btn.remove();
//         }
//       }
//     });
//   }

//   // --- 3. ВІДКРИТТЯ МОДАЛОК ---

//   if (btnAdd) {
//     btnAdd.addEventListener("click", () => {
//       if (!localStorage.getItem("smart_money_current_user")) {
//         alert("Спочатку увійдіть у свій акаунт!");
//         return;
//       }
//       editingPostId = null;
//       if (modalTitle) modalTitle.textContent = "Створити пост";
//       if (submitBtn) submitBtn.textContent = "Опублікувати";
//       resetForm();
//       postModal.classList.remove("is-hidden");
//     });
//   }

//   if (btnEditTrigger) {
//     btnEditTrigger.addEventListener("click", () => {
//       if (pagePosts.length === 0) {
//         alert("На цій сторінці немає постів для редагування!");
//         return;
//       }
//       editPostIdInput.value = "";
//       editStep1Modal.classList.remove("is-hidden");
//     });
//   }

//   if (btnConfirmEditId) {
//     btnConfirmEditId.addEventListener("click", () => {
//       const enteredId = Number(editPostIdInput.value.trim());
//       const targetPost = pagePosts.find(p => p.id === enteredId);

//       if (!targetPost) {
//         alert(`Пост з ID #${enteredId} не знайдено!`);
//         return;
//       }

//       editStep1Modal.classList.add("is-hidden");

//       editingPostId = enteredId;
//       document.getElementById("postTitle").value = targetPost.title || "";
//       document.getElementById("postText").value = targetPost.text || "";

//       selectedFiles = (targetPost.images || []).map(imgBase64 => ({
//         type: "base64",
//         data: imgBase64,
//       }));
//       renderPreviews();

//       if (modalTitle) modalTitle.textContent = `Редагувати пост #${enteredId}`;
//       if (submitBtn) submitBtn.textContent = "Зберегти зміни";

//       postModal.classList.remove("is-hidden");
//     });
//   }

//   if (closeEditStep1) {
//     closeEditStep1.addEventListener("click", () =>
//       editStep1Modal.classList.add("is-hidden"),
//     );
//   }

//   if (closePostModal) {
//     closePostModal.addEventListener("click", () => {
//       postModal.classList.add("is-hidden");
//       resetForm();
//     });
//   }

//   // --- 4. ЗБЕРЕЖЕННЯ ТА ОНОВЛЕННЯ В FIREBASE ---

//   const convertFileToBase64 = file => {
//     return new Promise(resolve => {
//       const reader = new FileReader();
//       reader.onload = event => {
//         const img = new Image();
//         img.onload = () => {
//           const canvas = document.createElement("canvas");
//           const MAX_WIDTH = 800;
//           let width = img.width;
//           let height = img.height;

//           if (width > MAX_WIDTH) {
//             height = Math.round((height * MAX_WIDTH) / width);
//             width = MAX_WIDTH;
//           }

//           canvas.width = width;
//           canvas.height = height;

//           const ctx = canvas.getContext("2d");
//           ctx.drawImage(img, 0, 0, width, height);

//           resolve(canvas.toDataURL("image/jpeg", 0.7));
//         };
//         img.src = event.target.result;
//       };
//       reader.readAsDataURL(file);
//     });
//   };

//   if (postForm) {
//     postForm.addEventListener("submit", async e => {
//       e.preventDefault();

//       const currentUser = localStorage.getItem("smart_money_current_user");
//       if (!currentUser) return;

//       const titleValue = document.getElementById("postTitle").value.trim();
//       const textValue = document.getElementById("postText").value.trim();

//       const finalImages = [];
//       for (const item of selectedFiles) {
//         if (item.type === "base64") {
//           finalImages.push(item.data);
//         } else if (item.type === "file") {
//           const base64 = await convertFileToBase64(item.data);
//           finalImages.push(base64);
//         }
//       }

//       if (submitBtn) submitBtn.textContent = "Збереження...";

//       try {
//         if (editingPostId !== null) {
//           // Оновлюємо існуючий документ
//           const targetPost = pagePosts.find(p => p.id === editingPostId);
//           if (targetPost && targetPost.firestoreDocId) {
//             await db.collection("posts").doc(targetPost.firestoreDocId).update({
//               title: titleValue,
//               text: textValue,
//               images: finalImages,
//             });
//           }
//         } else {
//           // Динамічний пошук найвищого ID
//           const maxId = pagePosts.reduce(
//             (max, post) => (post.id > max ? post.id : max),
//             0,
//           );
//           const newId = maxId + 1;

//           await db.collection("posts").add({
//             id: newId,
//             author: currentUser,
//             category: pageCategory,
//             title: titleValue,
//             text: textValue,
//             images: finalImages,
//             createdAt: firebase.firestore.FieldValue.serverTimestamp(),
//           });
//         }

//         resetForm();
//         postModal.classList.add("is-hidden");
//         await fetchUserPosts();
//       } catch (error) {
//         console.error("Помилка збереження:", error);
//         alert("Сталася помилка при збереженні поста в хмару!");
//       }
//     });
//   }

//   function resetForm() {
//     if (postForm) postForm.reset();
//     selectedFiles = [];
//     editingPostId = null;
//     if (previewContainer) previewContainer.innerHTML = "";
//   }

//   // --- 5. ВИДАЛЕННЯ З FIREBASE ТА ПЕРЕРАХУНОК ID ---

//   if (btnDeleteTrigger) {
//     btnDeleteTrigger.addEventListener("click", () => {
//       if (pagePosts.length === 0) {
//         alert("На цій сторінці немає постів для видалення!");
//         return;
//       }
//       deletePostIdInput.value = "";
//       deleteStep1Modal.classList.remove("is-hidden");
//     });
//   }

//   if (btnConfirmId) {
//     btnConfirmId.addEventListener("click", () => {
//       const enteredId = Number(deletePostIdInput.value.trim());
//       const postExists = pagePosts.some(p => p.id === enteredId);

//       if (!postExists) {
//         alert(`На цій сторінці пост з ID #${enteredId} не знайдено!`);
//         return;
//       }

//       targetPostIdToDelete = enteredId;
//       deleteConfirmText.textContent = `Чи ви впевнені, що хочете видалити пост з ID #${enteredId}?`;

//       deleteStep1Modal.classList.add("is-hidden");
//       deleteStep2Modal.classList.remove("is-hidden");
//     });
//   }

//   if (btnFinalDelete) {
//     btnFinalDelete.addEventListener("click", async () => {
//       try {
//         const targetPost = pagePosts.find(p => p.id === targetPostIdToDelete);

//         if (targetPost && targetPost.firestoreDocId) {
//           // 1. Видаляємо вибраний пост
//           await db.collection("posts").doc(targetPost.firestoreDocId).delete();

//           // 2. Перераховуємо порядкові ID для постів
//           const remainingPosts = pagePosts.filter(
//             p => p.id !== targetPostIdToDelete,
//           );
//           remainingPosts.sort((a, b) => a.id - b.id);

//           const updatePromises = remainingPosts.map((post, index) => {
//             const newId = index + 1;
//             if (post.id !== newId) {
//               return db
//                 .collection("posts")
//                 .doc(post.firestoreDocId)
//                 .update({ id: newId });
//             }
//             return Promise.resolve();
//           });

//           await Promise.all(updatePromises);
//         }

//         deleteStep2Modal.classList.add("is-hidden");
//         targetPostIdToDelete = null;
//         await fetchUserPosts();
//       } catch (error) {
//         console.error("Помилка видалення:", error);
//         alert("Не вдалося видалити пост!");
//       }
//     });
//   }

//   if (closeDeleteStep1) {
//     closeDeleteStep1.addEventListener("click", () =>
//       deleteStep1Modal.classList.add("is-hidden"),
//     );
//   }
//   if (closeDeleteStep2 || btnCancelDelete) {
//     const closeStep2Func = () => deleteStep2Modal.classList.add("is-hidden");
//     if (closeDeleteStep2)
//       closeDeleteStep2.addEventListener("click", closeStep2Func);
//     if (btnCancelDelete)
//       btnCancelDelete.addEventListener("click", closeStep2Func);
//   }

//   // --- 6. ЛАЙТБОКС ---

//   let currentPostGallery = [];
//   let currentImageIndex = 0;

//   if (postContainer && lightboxModal) {
//     postContainer.addEventListener("click", e => {
//       if (e.target.classList.contains("post-card__image")) {
//         const postCard = e.target.closest(".post-card");
//         const galleryImages = Array.from(
//           postCard.querySelectorAll(".post-card__image"),
//         );

//         currentPostGallery = galleryImages.map(img => img.src);
//         currentImageIndex = galleryImages.indexOf(e.target);

//         updateLightboxImage();
//         lightboxModal.classList.remove("is-hidden");
//       }
//     });
//   }

//   function updateLightboxImage() {
//     if (!lightboxImage) return;
//     lightboxImage.src = currentPostGallery[currentImageIndex];

//     if (prevImageBtn && nextImageBtn) {
//       if (currentPostGallery.length <= 1) {
//         prevImageBtn.style.display = "none";
//         nextImageBtn.style.display = "none";
//       } else {
//         prevImageBtn.style.display = "block";
//         nextImageBtn.style.display = "block";
//       }
//     }
//   }

//   if (prevImageBtn) {
//     prevImageBtn.addEventListener("click", () => {
//       currentImageIndex =
//         (currentImageIndex - 1 + currentPostGallery.length) %
//         currentPostGallery.length;
//       updateLightboxImage();
//     });
//   }

//   if (nextImageBtn) {
//     nextImageBtn.addEventListener("click", () => {
//       currentImageIndex = (currentImageIndex + 1) % currentPostGallery.length;
//       updateLightboxImage();
//     });
//   }

//   if (closeLightbox) {
//     closeLightbox.addEventListener("click", () => {
//       lightboxModal.classList.add("is-hidden");
//     });
//   }

//   if (lightboxModal) {
//     lightboxModal.addEventListener("click", e => {
//       if (e.target === lightboxModal) {
//         lightboxModal.classList.add("is-hidden");
//       }
//     });
//   }
// });

document.addEventListener("DOMContentLoaded", () => {
  const pageCategory = document.body.dataset.category || "default_page";

  // Елементи формату/модалок
  const btnAdd = document.querySelector(".actions-panel__btn.add");
  const btnEditTrigger = document.querySelector(".actions-panel__btn.edit");
  const postModal = document.getElementById("postModal");
  const closePostModal = document.getElementById("closePostModal");
  const postForm = document.getElementById("postForm");
  const postContainer = document.querySelector(".post__container");
  const modalTitle = postModal ? postModal.querySelector("h2") : null;
  const submitBtn = postForm
    ? postForm.querySelector('button[type="submit"]')
    : null;

  const fileInput = document.getElementById("postImages");
  const previewContainer = document.getElementById("previewContainer");

  // Редагування
  const editStep1Modal = document.getElementById("editStep1Modal");
  const closeEditStep1 = document.getElementById("closeEditStep1");
  const editPostIdInput = document.getElementById("editPostIdInput");
  const btnConfirmEditId = document.getElementById("btnConfirmEditId");

  // Видалення
  const btnDeleteTrigger = document.querySelector(".actions-panel__btn.delete");
  const deleteStep1Modal = document.getElementById("deleteStep1Modal");
  const closeDeleteStep1 = document.getElementById("closeDeleteStep1");
  const deletePostIdInput = document.getElementById("deletePostIdInput");
  const btnConfirmId = document.getElementById("btnConfirmId");

  const deleteStep2Modal = document.getElementById("deleteStep2Modal");
  const closeDeleteStep2 = document.getElementById("closeDeleteStep2");
  const deleteConfirmText = document.getElementById("deleteConfirmText");
  const btnFinalDelete = document.getElementById("btnFinalDelete");
  const btnCancelDelete = document.getElementById("btnCancelDelete");

  // Лайтбокс
  const lightboxModal = document.getElementById("lightboxModal");
  const lightboxImage = document.getElementById("lightboxImage");
  const closeLightbox = document.getElementById("closeLightbox");
  const prevImageBtn = document.getElementById("prevImage");
  const nextImageBtn = document.getElementById("nextImage");
  const downloadImageBtn = document.getElementById("downloadImageBtn"); // Елемент кнопки завантаження

  let pagePosts = []; // Зберігатимемо пости з Firebase
  let selectedFiles = [];
  let targetPostIdToDelete = null;
  let editingPostId = null;

  // --- 1. ЗАВАНТАЖЕННЯ ПОСТІВ З FIREBASE ---

  async function fetchUserPosts() {
    if (!postContainer) return;
    const currentUser = localStorage.getItem("smart_money_current_user");

    if (!currentUser) {
      postContainer.innerHTML =
        "<p>Будь ласка, увійдіть в акаунт, щоб бачити свої пости.</p>";
      return;
    }

    postContainer.innerHTML = "<p>Завантаження постів з хмари...</p>";

    try {
      const snapshot = await db
        .collection("posts")
        .where("author", "==", currentUser)
        .where("category", "==", pageCategory)
        .get();

      pagePosts = snapshot.docs.map(doc => ({
        firestoreDocId: doc.id,
        ...doc.data(),
      }));

      // Сортуємо за номерним ID
      pagePosts.sort((a, b) => a.id - b.id);

      renderUserPosts();
    } catch (error) {
      console.error("Помилка завантаження постів:", error);
      postContainer.innerHTML =
        "<p>Не вдалося завантажити пости з сервера.</p>";
    }
  }

  function renderUserPosts() {
    postContainer.innerHTML = "";

    if (pagePosts.length === 0) {
      postContainer.innerHTML =
        "<p>На цій сторінці поки немає створених постів.</p>";
      return;
    }

    pagePosts.forEach(post => {
      const postCard = document.createElement("div");
      postCard.classList.add("post-card");

      let cardContent = `
        <span class="post-card__id">ID: #${post.id}</span>
        <h3 class="post-card__title">${post.title}</h3>
        <p class="post-card__text">${post.text}</p>
      `;

      if (post.images && post.images.length > 0) {
        cardContent += `<div class="post-card__gallery">`;
        const visibleImages = post.images.slice(0, 4);
        const hiddenImages = post.images.slice(4);

        visibleImages.forEach(imgSrc => {
          cardContent += `<img src="${imgSrc}" alt="Post photo" class="post-card__image" />`;
        });

        if (hiddenImages.length > 0) {
          cardContent += `<div class="post-card__more-images is-hidden">`;
          hiddenImages.forEach(imgSrc => {
            cardContent += `<img src="${imgSrc}" alt="Post photo" class="post-card__image" />`;
          });
          cardContent += `</div>`;
          cardContent += `
            <button type="button" class="post-card__show-more-btn">
              Показати ще (+${hiddenImages.length})
            </button>
          `;
        }

        cardContent += `</div>`;
      }

      postCard.innerHTML = cardContent;
      postContainer.prepend(postCard);
    });
  }

  fetchUserPosts();

  // --- 2. ОБРОБКА ПРЕВ'Ю ФАЙЛІВ ---

  if (fileInput) {
    fileInput.addEventListener("change", e => {
      const newFiles = Array.from(e.target.files).map(file => ({
        type: "file",
        data: file,
      }));
      selectedFiles = [...selectedFiles, ...newFiles];
      renderPreviews();
      fileInput.value = "";
    });
  }

  function renderPreviews() {
    if (!previewContainer) return;
    previewContainer.innerHTML = "";

    selectedFiles.forEach((item, index) => {
      const imgWrap = document.createElement("div");
      imgWrap.classList.add("preview-item");

      if (item.type === "base64") {
        imgWrap.innerHTML = `
          <img src="${item.data}" alt="Preview" />
          <button type="button" class="preview-remove" data-index="${index}">×</button>
        `;
        previewContainer.appendChild(imgWrap);
      } else if (item.type === "file") {
        const reader = new FileReader();
        reader.onload = e => {
          imgWrap.innerHTML = `
            <img src="${e.target.result}" alt="Preview" />
            <button type="button" class="preview-remove" data-index="${index}">×</button>
          `;
          previewContainer.appendChild(imgWrap);
        };
        reader.readAsDataURL(item.data);
      }
    });
  }

  if (previewContainer) {
    previewContainer.addEventListener("click", e => {
      if (e.target.classList.contains("preview-remove")) {
        e.preventDefault();
        const index = e.target.getAttribute("data-index");
        selectedFiles.splice(index, 1);
        renderPreviews();
      }
    });
  }

  if (postContainer) {
    postContainer.addEventListener("click", e => {
      if (e.target.classList.contains("post-card__show-more-btn")) {
        const btn = e.target;
        const gallery = btn.closest(".post-card__gallery");
        const moreImagesContainer = gallery.querySelector(
          ".post-card__more-images",
        );

        if (moreImagesContainer) {
          moreImagesContainer.classList.remove("is-hidden");
          btn.remove();
        }
      }
    });
  }

  // --- 3. ВІДКРИТТЯ МОДАЛОК ---

  if (btnAdd) {
    btnAdd.addEventListener("click", () => {
      if (!localStorage.getItem("smart_money_current_user")) {
        alert("Спочатку увійдіть у свій акаунт!");
        return;
      }
      editingPostId = null;
      if (modalTitle) modalTitle.textContent = "Створити пост";
      if (submitBtn) submitBtn.textContent = "Опублікувати";
      resetForm();
      postModal.classList.remove("is-hidden");
    });
  }

  if (btnEditTrigger) {
    btnEditTrigger.addEventListener("click", () => {
      if (pagePosts.length === 0) {
        alert("На цій сторінці немає постів для редагування!");
        return;
      }
      editPostIdInput.value = "";
      editStep1Modal.classList.remove("is-hidden");
    });
  }

  if (btnConfirmEditId) {
    btnConfirmEditId.addEventListener("click", () => {
      const enteredId = Number(editPostIdInput.value.trim());
      const targetPost = pagePosts.find(p => p.id === enteredId);

      if (!targetPost) {
        alert(`Пост з ID #${enteredId} не знайдено!`);
        return;
      }

      editStep1Modal.classList.add("is-hidden");

      editingPostId = enteredId;
      document.getElementById("postTitle").value = targetPost.title || "";
      document.getElementById("postText").value = targetPost.text || "";

      selectedFiles = (targetPost.images || []).map(imgBase64 => ({
        type: "base64",
        data: imgBase64,
      }));
      renderPreviews();

      if (modalTitle) modalTitle.textContent = `Редагувати пост #${enteredId}`;
      if (submitBtn) submitBtn.textContent = "Зберегти зміни";

      postModal.classList.remove("is-hidden");
    });
  }

  if (closeEditStep1) {
    closeEditStep1.addEventListener("click", () =>
      editStep1Modal.classList.add("is-hidden"),
    );
  }

  if (closePostModal) {
    closePostModal.addEventListener("click", () => {
      postModal.classList.add("is-hidden");
      resetForm();
    });
  }

  // --- 4. ЗБЕРЕЖЕННЯ ТА ОНОВЛЕННЯ В FIREBASE ---

  const convertFileToBase64 = file => {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = event => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 800;
          let width = img.width;
          let height = img.height;

          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          resolve(canvas.toDataURL("image/jpeg", 0.7));
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  if (postForm) {
    postForm.addEventListener("submit", async e => {
      e.preventDefault();

      const currentUser = localStorage.getItem("smart_money_current_user");
      if (!currentUser) return;

      const titleValue = document.getElementById("postTitle").value.trim();
      const textValue = document.getElementById("postText").value.trim();

      const finalImages = [];
      for (const item of selectedFiles) {
        if (item.type === "base64") {
          finalImages.push(item.data);
        } else if (item.type === "file") {
          const base64 = await convertFileToBase64(item.data);
          finalImages.push(base64);
        }
      }

      if (submitBtn) submitBtn.textContent = "Збереження...";

      try {
        if (editingPostId !== null) {
          // Оновлюємо існуючий документ
          const targetPost = pagePosts.find(p => p.id === editingPostId);
          if (targetPost && targetPost.firestoreDocId) {
            await db.collection("posts").doc(targetPost.firestoreDocId).update({
              title: titleValue,
              text: textValue,
              images: finalImages,
            });
          }
        } else {
          // Динамічний пошук найвищого ID
          const maxId = pagePosts.reduce(
            (max, post) => (post.id > max ? post.id : max),
            0,
          );
          const newId = maxId + 1;

          await db.collection("posts").add({
            id: newId,
            author: currentUser,
            category: pageCategory,
            title: titleValue,
            text: textValue,
            images: finalImages,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          });
        }

        resetForm();
        postModal.classList.add("is-hidden");
        await fetchUserPosts();
      } catch (error) {
        console.error("Помилка збереження:", error);
        alert("Сталася помилка при збереженні поста в хмару!");
      }
    });
  }

  function resetForm() {
    if (postForm) postForm.reset();
    selectedFiles = [];
    editingPostId = null;
    if (previewContainer) previewContainer.innerHTML = "";
  }

  // --- 5. ВИДАЛЕННЯ З FIREBASE ТА ПЕРЕРАХУНОК ID ---

  if (btnDeleteTrigger) {
    btnDeleteTrigger.addEventListener("click", () => {
      if (pagePosts.length === 0) {
        alert("На цій сторінці немає постів для видалення!");
        return;
      }
      deletePostIdInput.value = "";
      deleteStep1Modal.classList.remove("is-hidden");
    });
  }

  if (btnConfirmId) {
    btnConfirmId.addEventListener("click", () => {
      const enteredId = Number(deletePostIdInput.value.trim());
      const postExists = pagePosts.some(p => p.id === enteredId);

      if (!postExists) {
        alert(`На цій сторінці пост з ID #${enteredId} не знайдено!`);
        return;
      }

      targetPostIdToDelete = enteredId;
      deleteConfirmText.textContent = `Чи ви впевнені, що хочете видалити пост з ID #${enteredId}?`;

      deleteStep1Modal.classList.add("is-hidden");
      deleteStep2Modal.classList.remove("is-hidden");
    });
  }

  if (btnFinalDelete) {
    btnFinalDelete.addEventListener("click", async () => {
      try {
        const targetPost = pagePosts.find(p => p.id === targetPostIdToDelete);

        if (targetPost && targetPost.firestoreDocId) {
          // 1. Видаляємо вибраний пост
          await db.collection("posts").doc(targetPost.firestoreDocId).delete();

          // 2. Перераховуємо порядкові ID для постів
          const remainingPosts = pagePosts.filter(
            p => p.id !== targetPostIdToDelete,
          );
          remainingPosts.sort((a, b) => a.id - b.id);

          const updatePromises = remainingPosts.map((post, index) => {
            const newId = index + 1;
            if (post.id !== newId) {
              return db
                .collection("posts")
                .doc(post.firestoreDocId)
                .update({ id: newId });
            }
            return Promise.resolve();
          });

          await Promise.all(updatePromises);
        }

        deleteStep2Modal.classList.add("is-hidden");
        targetPostIdToDelete = null;
        await fetchUserPosts();
      } catch (error) {
        console.error("Помилка видалення:", error);
        alert("Не вдалося видалити пост!");
      }
    });
  }

  if (closeDeleteStep1) {
    closeDeleteStep1.addEventListener("click", () =>
      deleteStep1Modal.classList.add("is-hidden"),
    );
  }
  if (closeDeleteStep2 || btnCancelDelete) {
    const closeStep2Func = () => deleteStep2Modal.classList.add("is-hidden");
    if (closeDeleteStep2)
      closeDeleteStep2.addEventListener("click", closeStep2Func);
    if (btnCancelDelete)
      btnCancelDelete.addEventListener("click", closeStep2Func);
  }

  // --- 6. ЛАЙТБОКС ---

  let currentPostGallery = [];
  let currentImageIndex = 0;

  if (postContainer && lightboxModal) {
    postContainer.addEventListener("click", e => {
      if (e.target.classList.contains("post-card__image")) {
        const postCard = e.target.closest(".post-card");
        const galleryImages = Array.from(
          postCard.querySelectorAll(".post-card__image"),
        );

        currentPostGallery = galleryImages.map(img => img.src);
        currentImageIndex = galleryImages.indexOf(e.target);

        updateLightboxImage();
        lightboxModal.classList.remove("is-hidden");
      }
    });
  }

  function updateLightboxImage() {
    if (!lightboxImage) return;

    const currentSrc = currentPostGallery[currentImageIndex];
    lightboxImage.src = currentSrc;

    // Оновлюємо посилання та ім'я для завантаження
    if (downloadImageBtn) {
      downloadImageBtn.href = currentSrc;
      downloadImageBtn.download = `photo_${currentImageIndex + 1}.jpg`;
    }

    if (prevImageBtn && nextImageBtn) {
      if (currentPostGallery.length <= 1) {
        prevImageBtn.style.display = "none";
        nextImageBtn.style.display = "none";
      } else {
        prevImageBtn.style.display = "block";
        nextImageBtn.style.display = "block";
      }
    }
  }

  if (prevImageBtn) {
    prevImageBtn.addEventListener("click", () => {
      currentImageIndex =
        (currentImageIndex - 1 + currentPostGallery.length) %
        currentPostGallery.length;
      updateLightboxImage();
    });
  }

  if (nextImageBtn) {
    nextImageBtn.addEventListener("click", () => {
      currentImageIndex = (currentImageIndex + 1) % currentPostGallery.length;
      updateLightboxImage();
    });
  }

  if (closeLightbox) {
    closeLightbox.addEventListener("click", () => {
      lightboxModal.classList.add("is-hidden");
    });
  }

  if (lightboxModal) {
    lightboxModal.addEventListener("click", e => {
      if (e.target === lightboxModal) {
        lightboxModal.classList.add("is-hidden");
      }
    });
  }
});
