import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchImages } from './js/pixabay-api.js';
import { handleSuccess } from './js/render-function.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export const refs = {
  form: document.querySelector('.form'),
  gallery: document.querySelector('.gallery'),
  loaderContainer: document.querySelector('.loader-container'),
  loadMoreBtn: document.createElement('button'),
};

refs.loadMoreBtn.textContent = 'Load more';
refs.loadMoreBtn.classList.add('button', 'load-more', 'is-hidden');
refs.gallery.insertAdjacentElement('afterend', refs.loadMoreBtn);

let query = '';
let page = 1;
const perPage = 15;
let lightbox = new SimpleLightbox('.gallery a', { captionDelay: 300, captionsData: 'alt' });

refs.form.addEventListener('submit', handleSubmit);
refs.loadMoreBtn.addEventListener('click', handleLoadMore);

function handleSubmit(event) {
  event.preventDefault();
  query = event.currentTarget.elements.state.value.trim();
  if (!query) {
    iziToast.error({ message: 'Please enter your request', position: 'topRight' });
    return;
  }
  page = 1;
  refs.gallery.innerHTML = '';
  refs.loadMoreBtn.classList.add('is-hidden');
  fetchAndRenderImages();
}

async function handleLoadMore() {
  page += 1;
  await fetchAndRenderImages();
}

async function fetchAndRenderImages() {
  try {
    refs.loaderContainer.classList.remove('is-hidden');
    const data = await fetchImages(query, page);
    if (data.hits.length === 0) {
      iziToast.error({ message: 'No images found. Try another search!', position: 'topRight' });
      return;
    }
    refs.gallery.insertAdjacentHTML('beforeend', handleSuccess(data.hits));
    lightbox.refresh();
    smoothScroll();
    
    if (page * perPage >= data.totalHits) {
      refs.loadMoreBtn.classList.add('is-hidden');
      iziToast.info({ message: "We're sorry, but you've reached the end of search results.", position: 'topRight' });
    } else {
      refs.loadMoreBtn.classList.remove('is-hidden');
    }
  } catch (error) {
    iziToast.error({ message: 'Error fetching images. Please try again later.', position: 'topRight' });
    console.error(error);
  } finally {
    refs.loaderContainer.classList.add('is-hidden');
  }
}

function smoothScroll() {
  const { height } = refs.gallery.firstElementChild.getBoundingClientRect();
  window.scrollBy({ top: height * 2 + 20, behavior: 'smooth' });
}