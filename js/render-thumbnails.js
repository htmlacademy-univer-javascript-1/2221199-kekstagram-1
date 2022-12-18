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
    const pictureImg = picture.querySelector('.picture__img');
    pictureImg.src = pictureData.url;
    pictureImg.dataset.pictureData = JSON.stringify(pictureData);
    picture.querySelector('.picture__comments').textContent = pictureData.comments.length.toString();
    picture.querySelector('.picture__likes').textContent = pictureData.likes;
    pictureListFragment.appendChild(picture);
  });
  pictureList.appendChild(pictureListFragment);
};

pictureList.addEventListener('click', (evt) => {
  const target = evt.target;
  if (target.nodeName === 'IMG') {
    openBigPicture(JSON.parse(target.dataset.pictureData));
  }
});

export {fillThumbnails};
