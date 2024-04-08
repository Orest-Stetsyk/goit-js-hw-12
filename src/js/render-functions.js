import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { elem,hideLoading, lightbox, displayToast, showButton } from "../main";

export async function render(data) {
  if (data.totalHits === 0) {
    hideLoading(); 
    displayToast("Sorry, there are no images matching your search query. Please try again!");
     
  }
  else {
    const images = data.hits;

    const markup = images.map(image => `<li class="gallery-item">
                <a class="gallery-link" href="${image.largeImageURL}">
                  <img class="gallery-image" src="${image.webformatURL}" alt="${image.tags}" />
                </a>
                <div class="stats">
                  <p class="text">Likes<br/>${image.likes}</p>
                  <p class="text">Views<br/>${image.views}</p>
                  <p class="text">Comments<br/>${image.comments}</p>
                  <p class="text">Downloads<br/>${image.downloads}</p>
                </div>
              </li>`)
      .join('');
    elem.gallery.insertAdjacentHTML('beforeend', markup);
    
    lightbox.refresh();
    hideLoading();
    showButton();
  }
}