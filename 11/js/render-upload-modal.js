import {isEscapeKey} from './util.js';

const renderUploadModal = document.querySelector('.img-upload');
const uploadFileInput = renderUploadModal.querySelector('#upload-file');
const uploadOverlay = renderUploadModal.querySelector('.img-upload__overlay');
const modalCloseButton = renderUploadModal.querySelector('#upload-cancel');

const closeUploadingModal = () => {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  modalCloseButton.removeEventListener('click', closeUploadingModal);
  document.removeEventListener('keydown', onModalEscKeydown);
};

const openUploadingModal = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  modalCloseButton.addEventListener('click', closeUploadingModal);
  document.addEventListener('keydown', onModalEscKeydown);
};

function onModalEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    closeUploadingModal();
  }
}

uploadFileInput.addEventListener('change', () => {
  openUploadingModal();
});
