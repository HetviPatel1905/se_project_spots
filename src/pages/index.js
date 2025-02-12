import "./index.css";

import {
  enableValidation,
  settings,
  resetValidation,
  disableButton,
} from "../scripts/validation.js";

import Api from "../utils/api.js";
import { setButtonText } from "../utils/helpers.js";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "387e9c57-78bd-45cf-b6d3-39b296708050",
    "Content-Type": "application/json",
  },
});

api
  .getAppInfo()
  .then(([cards, users]) => {
    cards.forEach((item) => {
      const cardElement = getCardElement(item);
      cardsList.append(cardElement);
    });

    profileName.textContent = users.name;
    profileDescription.textContent = users.about;
    profileAvatar.src = users.avatar;
    profileAvatar.alt = users.name;
  })
  .catch((err) => {
    console.error(err);
  });

// profile
const profileEditButton = document.querySelector(".profile__edit-btn");
const profileAddButton = document.querySelector(".profile__add-btn");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__avatar");

// avatar

const avatarButton = document.querySelector(".profile__avatar-btn");
const avatarModal = document.querySelector("#avatar-modal");
const avatarForm = avatarModal.querySelector("#avatar-form");
const avatarInput = avatarModal.querySelector("#profile-avatar-input");
const avatarCloseButton = avatarModal.querySelector(".avatar-close-btn");
const avatarSubmitButton = avatarModal.querySelector(
  "#modal__submit_avatar-btn"
);

// Edit forms
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditModalCloseBtn =
  profileEditModal.querySelector(".modal__close-btn");
const profileForm = document.forms["profile-form"];
const profileEditNameInput = profileEditModal.querySelector(
  "#profile-name-input"
);
const profileEditDescriptonInput = profileEditModal.querySelector(
  "#profile-description-input"
);

// add card form
const profileAddModal = document.querySelector("#profile-add-modal");
const profileAddModalCloseBtn =
  profileAddModal.querySelector(".modal__close-btn");
const cardAddForm = document.forms["profile-add-form"];
const cardSubmitButton = profileAddModal.querySelector(".modal__btn");
const profileAddImageInput = profileAddModal.querySelector(
  "#profile-add-image-input"
);
const profileAddCaptionInput = profileAddModal.querySelector(
  "#profile-add-caption-input"
);

const previewModal = document.querySelector("#preview-modal");
const previewModalImage = previewModal.querySelector(".modal__image");
const previewModalCaption = previewModal.querySelector(".modal__caption");
const previewCloseButton = previewModal.querySelector(
  ".modal__close-btn_type_preview"
);

// card
const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");
let selectedCard;
let selectedCardId;

// delete card
const deleteModal = document.querySelector("#delete-modal");
const deleteForm = deleteModal.querySelector("#delete-form");
const deleteCloseButton = deleteModal.querySelector(".delete-close-btn");
const deleteCancelButton = document.getElementById("modal__cancel-btn");

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardNameEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardLikeBtn = cardElement.querySelector(".card__like-btn");
  const cardDeleteBtn = cardElement.querySelector(".card__delete-btn");

  cardNameEl.textContent = data.name;
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;

  cardImageEl.addEventListener("click", () => {
    openModal(previewModal);
    previewModalImage.src = data.link;
    previewModalImage.alt = data.name;
    previewModalCaption.textContent = data.name;
  });

  if (data.isLiked) {
    cardLikeBtn.classList.toggle("card__like-btn_liked");
  }

  cardLikeBtn.addEventListener("click", (evt) => {
    handleLike(evt, data._id);
  });

  cardDeleteBtn.addEventListener("click", (evt) =>
    handleDeleteCard(cardElement, data._id)
  );

  return cardElement;
}

function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const modalOpened = document.querySelector(".modal_opened");
    closeModal(modalOpened);
  }
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  modal.addEventListener("click", closeModalByOverlay);
  document.addEventListener("keydown", handleEscClose);
}

function closeModalByOverlay(evt) {
  if ((evt.target.contains = "modal")) closeModal(evt.target);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  modal.removeEventListener("click", closeModalByOverlay);
  document.removeEventListener("keydown", handleEscClose);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true);

  api
    .editUserInfo({
      name: profileEditNameInput.value,
      about: profileEditDescriptonInput.value,
    })
    .then((data) => {
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
      closeModal(profileEditModal);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(submitBtn, false);
    });
}

function handleProfileAddSubmit(evt) {
  evt.preventDefault();

  const submitBtn = evt.submitter;
  console.log(submitBtn);
  setButtonText(submitBtn, true);

  api
    .getNewCard({
      name: profileAddCaptionInput.value,
      link: profileAddImageInput.value,
    })
    .then((data) => {
      const cardElement = getCardElement(data);
      cardsList.prepend(cardElement);

      disableButton(submitBtn, settings);
      evt.target.reset();
      closeModal(profileAddModal);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(submitBtn, false);
    });
}

function handleAvatarSubmit(evt) {
  evt.preventDefault();

  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true);

  api
    .setNewAvatar(avatarInput.value)
    .then((data) => {
      profileAvatar.src = data.avatar;

      disableButton(submitBtn, settings);
      evt.target.reset();
      closeModal(avatarModal);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(submitBtn, false);
    });
}

function handleDeleteSubmit(evt) {
  evt.preventDefault();

  const submitBtn = evt.submitter;
  submitBtn.textContent = "Deleting...";

  api
    .deleteCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      closeModal(deleteModal);
    })
    .catch((err) => {
      console.error("Error deleting card:", err);
    })
    .finally(() => {
      submitBtn.textContent = "Delete";
    });
}

function handleLike(evt, id) {
  const isLiked = evt.target.classList.contains("card__like-btn_liked");

  api
    .handleLikeStatus(id, isLiked)
    .then(() => {
      evt.target.classList.toggle("card__like-btn_liked");
    })
    .catch(console.error);
}

function handleDeleteCard(cardElement, dataId) {
  selectedCard = cardElement;
  selectedCardId = dataId;
  openModal(deleteModal);
}

profileEditButton.addEventListener("click", () => {
  profileEditNameInput.value = profileName.textContent;
  profileEditDescriptonInput.value = profileDescription.textContent;
  resetValidation(
    profileForm,
    [profileEditNameInput, profileEditDescriptonInput],
    settings
  );
  openModal(profileEditModal);
});

profileEditModalCloseBtn.addEventListener("click", () => {
  closeModal(profileEditModal);
});

profileAddButton.addEventListener("click", () => {
  openModal(profileAddModal);
});

profileAddModalCloseBtn.addEventListener("click", () => {
  closeModal(profileAddModal);
});

previewCloseButton.addEventListener("click", () => {
  closeModal(previewModal);
});

avatarButton.addEventListener("click", () => {
  openModal(avatarModal);
});

avatarCloseButton.addEventListener("click", () => {
  closeModal(avatarModal);
});

deleteCancelButton.addEventListener("click", () => {
  closeModal(deleteModal);
});

deleteForm.addEventListener("submit", handleDeleteSubmit);
profileForm.addEventListener("submit", handleProfileFormSubmit);
cardAddForm.addEventListener("submit", handleProfileAddSubmit);
avatarForm.addEventListener("submit", handleAvatarSubmit);

enableValidation(settings);
