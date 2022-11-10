import {createPictures} from './data.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictureList = document.querySelector('.pictures');
const pictureListFragment = document.createDocumentFragment();
const picturesData = createPictures();

picturesData.forEach((pictureData) => {
  const picture = pictureTemplate.cloneNode(true);
  picture.querySelector('.picture__img').src = pictureData.url;
  picture.querySelector('.picture__comments').textContent = pictureData.comments.length;
  picture.querySelector('.picture__likes').textContent = pictureData.likes;

  pictureListFragment.appendChild(picture);
});

pictureList.appendChild(pictureListFragment);
