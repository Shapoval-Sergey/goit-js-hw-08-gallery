import items from './gallery-items.js'; //eslint-disable-line

const listRef = document.querySelector('.js-gallery');

const createItem = function(obj) {
  const item = document.createElement('li');
  const link = document.createElement('a');
  const img = document.createElement('img');
  item.classList.add('gallery__item');
  link.classList.add('gallery__link');
  link.setAttribute('href', obj.original);
  img.classList.add('gallery__image');
  img.setAttribute('src', obj.preview);
  img.setAttribute('data-source', obj.original);
  img.setAttribute('alt', obj.description);
  link.appendChild(img);
  item.appendChild(link);
  return item;
};

const arrImg = items.map(item => {
  return createItem(item);
});

listRef.append(...arrImg);
console.log(listRef);

// const modalRef = document.querySelector('.js-lightbox');
const modalImageRef = document.querySelector('.lightbox__image');
const openModal = document.querySelector('.lightbox');
const closeModalBtn = document.querySelector(
  'button[data-action="close-lightbox"]',
);
// const backdropRef = document.querySelector('.js-backdrop');

const onOpenModal = function() {
  openModal.classList.add('is-open');
};

const onCloseModal = function() {
  openModal.classList.remove('is-open');
};

const onImgClick = function(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  const imageTag = event.target;
  const largeImage = imageTag.dataset.source;
  modalImageRef.src = largeImage;
  onOpenModal();
};

const onBtnClick = function(event) {
  // console.log(event.target.nodeName);
  if (event.target.nodeName !== 'BUTTON') {
    return;
  }
  onCloseModal();
};

listRef.addEventListener('click', onImgClick);
openModal.addEventListener('click', onBtnClick);
// closeModalBtn.addEventListener('click', onBtnClick);
openModal.addEventListener('click', onOpenModal);
closeModalBtn.addEventListener('click', onCloseModal);
// backdropRef.addEventListener('click', onBackDropClick);
