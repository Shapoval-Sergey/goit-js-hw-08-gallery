import items from './gallery-items.js'; //eslint-disable-line

const listRef = document.querySelector('.js-gallery');

let count = 0;
function createItem(obj) {
  const item = document.createElement('li');
  const link = document.createElement('a');
  const img = document.createElement('img');
  item.classList.add('gallery__item');
  link.classList.add('gallery__link');
  link.setAttribute('href', obj.original);
  img.classList.add('gallery__image');
  img.setAttribute('src', obj.preview);
  img.setAttribute('data-source', obj.original);
  img.setAttribute('data-index', `${count - 1}`);
  img.setAttribute('alt', obj.description);
  link.appendChild(img);
  item.appendChild(link);
  return item;
}

const arrImg = items.map(objImg => {
  count += 1;
  return createItem(objImg);
});

listRef.append(...arrImg);

console.dir(arrImg);

const modalImageRef = document.querySelector('.lightbox__image');
const galleryImgRef = document.querySelector('.gallery__image');
const openModalRef = document.querySelector('.lightbox');
const closeModalBtnRef = document.querySelector(
  'button[data-action="close-lightbox"]',
);

function onPressEscape(event) {
  if (event.code === 'Escape') {
    onCloseModal();
  }
}

function onOpenModal(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  const imageTag = event.target;
  const largeImage = imageTag.dataset.source;
  console.dir(imageTag.dataset.index);
  modalImageRef.src = largeImage;
  openModalRef.classList.add('is-open');
  window.addEventListener('keydown', onPressEscape);
}

function onCloseModal() {
  openModalRef.classList.remove('is-open');
  modalImageRef.src = '';
  window.removeEventListener('keydown', onPressEscape);
}

function onOverlayClick() {
  onCloseModal();
}

function onLeaftImg(event) {
  if (event.code === 'ArrowRight') {
    const indexImg = Number(event.target.children[0].dataset.index);
  }
}

listRef.addEventListener('click', onOpenModal);
closeModalBtnRef.addEventListener('click', onCloseModal);
openModalRef.addEventListener('click', onOverlayClick);

window.addEventListener('keydown', onLeaftImg); // ArrowRight, ArrowLeft
