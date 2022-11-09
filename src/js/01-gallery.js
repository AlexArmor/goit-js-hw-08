// Add imports above this line
import { galleryItems } from './gallery-items';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
// Change code below this line

const galleryGroup = document.querySelector('.gallery');

function createGallaryMarkup() {
    const markup = galleryItems.map(elem => {
        return `<a class="gallery__item" href="${elem.original}">
        <img class="gallery__image" src="${elem.preview}" alt="${elem.description}" />
      </a>`
    }).join('');

    galleryGroup.innerHTML = markup;
}

createGallaryMarkup();

var lightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250 });
