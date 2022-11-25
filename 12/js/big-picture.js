import {isEscapeKey} from './util.js';

const COMMENTS_PER_LOAD = 5;

const bigPicture = document.querySelector('.big-picture');
const bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');
const loadCommentsButton = bigPicture.querySelector('.social__comments-loader');

let pictureComments;

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  bigPictureCloseButton.removeEventListener('click', closeBigPicture);
  document.removeEventListener('keydown', onPopupEscKeydown);
  loadCommentsButton.removeEventListener('click', loadMoreComments);
};

const addModalCloseHandlers = () => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  bigPictureCloseButton.addEventListener('click', closeBigPicture);
  document.addEventListener('keydown', onPopupEscKeydown);
  loadCommentsButton.addEventListener('click', loadMoreComments);
};

const openBigPicture = (pictureData) => {
  addModalCloseHandlers();
  pictureComments = pictureData.comments.slice();
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = pictureData.url;
  bigPicture.querySelector('.likes-count').textContent = pictureData.likes;
  bigPicture.querySelector('.social__caption').textContent = pictureData.description;
  bigPicture.querySelector('.social__comments').innerHTML = '';
  loadMoreComments(pictureComments);
};

function loadMoreComments() {
  const commentsList = bigPicture.querySelector('.social__comments');
  const currentCommentsCount = commentsList.children.length;
  const commentsCountAfterAdding = pictureComments.length > COMMENTS_PER_LOAD + currentCommentsCount ?
    COMMENTS_PER_LOAD + currentCommentsCount :
    pictureComments.length;
  const commentsCount = bigPicture.querySelector('.social__comment-count');
  commentsCount.innerHTML = '';
  commentsCount.insertAdjacentHTML('beforeend', `
    ${commentsCountAfterAdding} из <span className="comments-count">${pictureComments.length}</span> комментариев`);

  for (let i = currentCommentsCount; i < commentsCountAfterAdding; i++) {
    commentsList.insertAdjacentHTML('beforeend', `
    <li class="social__comment">
        <img
            class="social__picture"
            src="${pictureComments[i].avatar}"
            alt="${pictureComments[i].name}"
            width="35" height="35">
        <p class="social__text">${pictureComments[i].message}</p>
    </li>`);
  }
}

function onPopupEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

export {openBigPicture};
