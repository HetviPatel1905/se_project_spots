const initialCards = [
  {
    name: "Golden Gate Bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

// profile
const profileEditButton = document.querySelector(".profile__edit-btn");
const profileAddButton = document.querySelector(".profile__add-btn");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

// forms
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

const profileAddModal = document.querySelector("#profile-add-modal");
const profileAddModalCloseBtn =
  profileAddModal.querySelector(".modal__close-btn");
const profileAddForm = document.forms["profile-add-form"];
const profileAddImageInput = profileAddModal.querySelector(
  "#profile-add-image-input"
);
const profileAddCaptionInput = profileAddModal.querySelector(
  "#profile-add-caption-input"
);

const previewModal = document.querySelector("#preview-modal");
const previewModalImage = previewModal.querySelector(".modal__image_preview");
const previewModalCaption = previewModal.querySelector(
  ".modal__caption_preview"
);
const previewCloseButton = previewModal.querySelector(
  ".modal__close-btn_preview"
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

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileEditNameInput.value;
  profileDescription.textContent = profileEditDescriptonInput.value;
  closeModal(profileEditModal);
}

function handleProfileAddSubmit(evt) {
  evt.preventDefault();
  const InputValues = {
    link: profileAddImageInput.value,
    name: profileAddCaptionInput.value,
  };
  const cardElement = getCardElement(InputValues);
  cardsList.prepend(cardElement);
  closeModal(profileAddModal);
}

profileEditButton.addEventListener("click", () => {
  profileEditNameInput.value = profileName.textContent;
  profileEditDescriptonInput.value = profileDescription.textContent;
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

profileForm.addEventListener("submit", handleProfileFormSubmit);
profileAddForm.addEventListener("submit", handleProfileAddSubmit);

initialCards.forEach((item) => {
  const cardElement = getCardElement(item);
  cardsList.append(cardElement);
});
