import {openBigPicture} from './big-picture.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictureList = document.querySelector('.pictures');
const pictureListFragment = document.createDocumentFragment();

const clearOldThumbnails = () => {
  const oldThumbnails = document.querySelectorAll('.pictures .picture');
  oldThumbnails.forEach((oldThumbnail) => {
    oldThumbnail.remove();
  });
};

const fillThumbnails = (picturesData) => {
  clearOldThumbnails();
  picturesData.forEach((pictureData) => {
    const picture = pictureTemplate.cloneNode(true);
    picture.dataset.pictureData = JSON.stringify(pictureData);
    const pictureImg = picture.querySelector('.picture__img');
    pictureImg.src = pictureData.url;
    picture.querySelector('.picture__comments').textContent = pictureData.comments.length.toString();
    picture.querySelector('.picture__likes').textContent = pictureData.likes;
    pictureListFragment.appendChild(picture);
  });
  pictureList.appendChild(pictureListFragment);
};

const onPictureListClick = (evt) => {
  const target = evt.target.closest('.pictures a.picture');
  if (target !== null) {
    openBigPicture(JSON.parse(target.dataset.pictureData));
  }
};

const addPictureListClickHandlers = () => {
  pictureList.addEventListener('click', onPictureListClick);
};

const removePictureListClickHandlers = () => {
  pictureList.removeEventListener('click', onPictureListClick);
};

addPictureListClickHandlers();

export {fillThumbnails, addPictureListClickHandlers, removePictureListClickHandlers};
