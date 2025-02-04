import "/src/pages/index.css";

import {
  resetValidation,
  settings,
  enableValidation,
  disableButton,
} from "../scripts/validation.js";

import Api from "../utils/api.js";
import { DllReferencePlugin } from "webpack";

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
    console.log(users);
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

// Edit forms
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditModalCloseBtn =
  profileEditModal.querySelector(".modal__close-btn");
const profileForm = profileEditModal.querySelector("#profile-form");
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
const cardSubmitButton = profileAddModal.querySelector(".modal__submit-btn");
const profileAddImageInput = profileAddModal.querySelector(
  "#profile-add-image-input"
);
const profileAddCaptionInput = profileAddModal.querySelector(
  "#profile-add-caption-input"
);

//avatar
const avatarModal = document.querySelector("#avatar-modal");
const avatarInput = avatarModal.querySelector("#profile-avatar-input");
const avatarButton = avatarModal.querySelector("#profile__avatar-btn");

const avatarModalCloseBtn = avatarModal.querySelector(".modal__close-btn");
const avatarForm = avatarModal.querySelector(".modal__submit-btn");
const avatarSubmitButton = avatarModal.querySelector(".modal__submit-btn");

//preview
const previewModal = document.querySelector("#preview-modal");
const previewModalImage = previewModal.querySelector(".modal__image");
const previewModalCaption = previewModal.querySelector(".modal__caption");
const previewCloseButton = previewModal.querySelector(
  ".modal__close-btn_type_preview"
);

// card
const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

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

  cardLikeBtn.addEventListener("click", () => {
    cardLikeBtn.classList.toggle("card__like-btn_liked");
  });

  cardImageEl.addEventListener("click", () => {
    openModal(previewModal);
    previewModalImage.src = data.link;
    previewModalImage.alt = data.name;
    previewModalCaption.textContent = data.name;
  });

  cardDeleteBtn.addEventListener("click", () => {
    console.log(cardElement);
    cardElement.remove();
  });

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
  if ((evt.target.classList.contains = "modal")) closeModal(evt.target);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  modal.removeEventListener("click", closeModalByOverlay);
  document.removeEventListener("keydown", handleEscClose);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  api
    .editUserInfo({
      name: profileEditNameInput.value,
      about: profileEditDescriptonInput.value,
    })
    .then((data) => {
      console.log(data);
      profileName.textContent = data.profileName;
      profileDescription.textContent = data.profileDescription;
      closeModal(profileEditModal);
    })
    .catch(console.error);
}

function handleProfileAddSubmit(evt) {
  evt.preventDefault();
  api
    .getNewCard({
      name: profileAddCaptionInput.value,
      link: profileAddImageInput.value,
    })
    .then((data) => {
      console.log(data);
      const InputValues = {
        link: data.profileAddImageInput,
        name: data.profileAddCaptionInput,
      };
      const cardElement = getCardElement(InputValues);
      cardsList.prepend(cardElement);
      evt.target.reset();
      disableButton(cardSubmitButton, settings);
      closeModal(profileAddModal);
    })
    .catch(console.error);
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

avatarButton.addEventListener("click", () => {
  openModal(avatarModal);
});

profileAddModalCloseBtn.addEventListener("click", () => {
  closeModal(profileAddModal);
});

previewCloseButton.addEventListener("click", () => {
  closeModal(previewModal);
});

profileForm.addEventListener("submit", handleProfileFormSubmit);
cardAddForm.addEventListener("submit", handleProfileAddSubmit);

enableValidation(settings);
