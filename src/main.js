import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { connectionFrom} from "./js/pixabay-api";
import { render } from "./js/render-functions";


export const elem = {
  gallery: document.querySelector('.gallery'),
  form: document.querySelector('.form'),
  wordInput: document.querySelector('.input'),
  loader: document.querySelector('.loader'),
  addButton: document.querySelector(`.button`)
};

export const lightbox = new SimpleLightbox('.gallery-link', {
  captionsData: "alt",
  captionDelay: 250,
  overlay: true,
  overlayOpacity: 0.7,
});

const perPage = 15;

export let word = '';

export let currentPage=1;

elem.form.addEventListener("submit", submitImageFinder);
elem.addButton.addEventListener('click', moreImages);

hideButton();
hideLoading();
async function submitImageFinder(event){
  event.preventDefault();
  
  showLoading();
  
  
  elem.gallery.innerHTML = '';
  
  word = elem.wordInput.value.trim();

  if (word !== '') {
    await connectionFrom(word, currentPage)
      .then(data => {
        render(data);
        hideLoading();
        showButton();
      })
      .catch(error => console.log(error));
  }
  else {
    displayToast("Please complete the field!")
    hideLoading();
    hideButton();
  }
  
  elem.form.reset();
  
    const inputHeight = elem.wordInput.getBoundingClientRect();
    window.scrollBy({
      top: inputHeight.height * 2 + 48,
      behavior: 'smooth',
    });
};

async function moreImages(event) {
  
  event.preventDefault();
  
  hideButton();
  showLoading();

  currentPage += 1;
  
  const images = await connectionFrom(word, currentPage);
  if (currentPage >= Math.ceil(images.totalHits / perPage)) {
    displayToast("We're sorry, but you've reached the end of search results.")
    hideLoading();
    hideButton();
  }
  else {
    render(images);
    hideLoading();
    showButton();
    const card = document.querySelector('.gallery-item');
    const cardHeight = card.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight.height * 2 + 48,
      behavior: 'smooth',
    });
  }
}

export function displayToast(message) {
  iziToast.error({
    title: 'Error',
    message: message,
    position: 'topRight',
  });
}

export function showLoading() {
  elem.loader.style.display = 'block';
}

export function hideLoading() {
  elem.loader.style.display = 'none';
}

export function showButton() {
  elem.addButton.style.display = 'block';
}

export function hideButton() {
  elem.addButton.style.display = 'none';
}