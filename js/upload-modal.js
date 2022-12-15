import {isEscapeKey} from './util.js';
import {changeImageScale, addZoomButtonsClickHandlers, removeZoomButtonsClickHandlers, DEFAULT_SCALE_VALUE} from './scale-control.js';
import {addSubmitButtonHandler, removeSubmitButtonHandler} from './form.js';
import {setSlider, addEffectsListClickHandler, removeEffectsListClickHandler} from './effect-slider.js';
import './form.js';

const uploadModal = document.querySelector('.img-upload');
const uploadFileInput = uploadModal.querySelector('#upload-file');
const uploadOverlay = uploadModal.querySelector('.img-upload__overlay');
const modalCloseButton = uploadModal.querySelector('#upload-cancel');

const closeUploadingModal = () => {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  modalCloseButton.removeEventListener('click', closeUploadingModal);
  document.removeEventListener('keydown', onModalEscKeydown);
  uploadFileInput.value = '';
  removeSubmitButtonHandler();
  removeEffectsListClickHandler();
  removeZoomButtonsClickHandlers();
};

const openUploadingModal = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  modalCloseButton.addEventListener('click', closeUploadingModal);
  document.addEventListener('keydown', onModalEscKeydown);
  addSubmitButtonHandler();
  addEffectsListClickHandler();
  changeImageScale(DEFAULT_SCALE_VALUE);
  addZoomButtonsClickHandlers();
  setSlider('none');
};

function onModalEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    closeUploadingModal();
  }
}

uploadFileInput.addEventListener('change', () => {
  openUploadingModal();
});
