const initialcards = [
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

const profileEditButton = document.querySelector(".profile__edit-btn");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditModalCloseBtn =
  profileEditModal.querySelector(".modal__close-btn");

const profileName = document.querySelector(".profile__name");
const profileEditNameInput = profileEditModal.querySelector(
  "#profile-name-input"
);

const profileDescription = document.querySelector(".profile__description");
const profileEditDescriptonInput = profileEditModal.querySelector(
  "#profile-description-input"
);

const profileForm = document.forms["profile-form"];
const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardNameEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");

  cardNameEl.textContent = data.name;
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;

  return cardElement;
}

function openModal() {
  profileEditNameInput.value = profileName.textContent;
  profileEditDescriptonInput.value = profileDescription.textContent;
  profileEditModal.classList.add("modal_opened");
}

function closeModal() {
  profileEditModal.classList.remove("modal_opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileEditNameInput.value;
  profileDescription.textContent = profileEditDescriptonInput.value;
  closeModal();
}

profileEditButton.addEventListener("click", openModal);
profileEditModalCloseBtn.addEventListener("click", closeModal);
profileForm.addEventListener("submit", handleProfileFormSubmit);

for (let i = 0; i < initialcards.length; i++) {
  const cardElement = getCardElement(initialcards[i]);
  cardsList.append(cardElement);
}
