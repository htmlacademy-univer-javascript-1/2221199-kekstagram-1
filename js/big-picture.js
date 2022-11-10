const bigPicture = document.querySelector('.big-picture');
const bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');

const addThumbnailClickHandler = (thumbnail, pictureData) => {
  thumbnail.addEventListener('click', (evt) => {
    evt.preventDefault();
    openBigPicture(pictureData);
    addModalCloseHandlers();
  });
};

const createCommentHTML = (commentData) => {
  return `
    <li class="social__comment">
        <img
            class="social__picture"
            src="${commentData.avatar}"
            alt="${commentData.name}"
            width="35" height="35">
        <p class="social__text">${commentData.message}</p>
    </li>`
}

const openBigPicture = (pictureData) => {
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = pictureData.url;
  bigPicture.querySelector('.likes-count').textContent = pictureData.likes;
  bigPicture.querySelector('.comments-count').textContent = pictureData.comments.length.toString();
  bigPicture.querySelector('.social__caption').textContent = pictureData.description;
  const commentsList = bigPicture.querySelector('.social__comments');

  pictureData.comments.forEach((commentData) => {
    commentsList.insertAdjacentHTML('beforeend', createCommentHTML(commentData));
  });

  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');
  document.body.classList.add('modal-open');
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  removeModalCloseHandlers();
};

const addModalCloseHandlers = () => {
  bigPictureCloseButton.addEventListener('click', closeBigPicture);
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape')
      closeBigPicture();
  });
};

const removeModalCloseHandlers = () => {
  bigPictureCloseButton.removeEventListener('click', closeBigPicture);
  document.removeEventListener('keydown', (evt) => {
    if (evt.key === 'Escape')
      closeBigPicture();
  });
};

export {addThumbnailClickHandler};
