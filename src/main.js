import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { fetchingFrom } from "./js/pixabay-api";
import { render } from "./js/render-functions";


export const elem = {
  gallery: document.querySelector('.gallery'),
  form: document.querySelector('.form'),
  wordInput: document.querySelector('.input'),
  loader: document.querySelector('.loader'),
};

export const lightbox = new SimpleLightbox('.gallery-link', {
  captionsData: "alt",
  captionDelay: 250,
  overlay: true,
  overlayOpacity: 0.7,
});

export let word = '';

hideLoading();

elem.form.addEventListener("submit", e => {
  e.preventDefault();

  elem.gallery.innerHTML = '';
  word = elem.wordInput.value.trim();

  if (word !== '') {
    fetchingFrom(word)
      .then(data => {
        render(data);
        hideLoading();
      })
      .catch(error => console.log(error));
  }
  else {
    displayToast("Please complete the field!")
  }
  elem.form.reset();
});

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

function hideLoading() {
  elem.loader.style.display = 'none';
}