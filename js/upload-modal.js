import {isEscapeKey} from './util.js';
import {changeImageScale, addZoomButtonsClickHandlers, removeZoomButtonsClickHandlers, DEFAULT_SCALE_VALUE} from './scale-control.js';
import {addSubmitButtonHandler, removeSubmitButtonHandler} from './form.js';
import {setSlider, addEffectsListClickHandler, removeEffectsListClickHandler} from './effect-slider.js';
import {uploadUserPhoto} from './upload-image.js';
import {addPictureListClickHandlers, removePictureListClickHandlers} from './render-thumbnails.js';
import './form.js';

const uploadModal = document.querySelector('.img-upload');
const uploadFileInput = uploadModal.querySelector('#upload-file');
const uploadOverlay = uploadModal.querySelector('.img-upload__overlay');
const modalCloseButton = uploadModal.querySelector('#upload-cancel');
const descriptionField = uploadModal.querySelector('[name="description"]');
const hashtagsField = uploadModal.querySelector('[name="hashtags"]');
const noneEffect = uploadModal.querySelector('#effect-none');

const bringToDefaults = () => {
  changeImageScale(DEFAULT_SCALE_VALUE);
  setSlider('none');
  hashtagsField.value = '';
  descriptionField.value = '';
  noneEffect.checked = true;
};

const toggleLoadErrorMessage = () => {
  const loadErrorMessage = document.querySelector('.load-error-message');
  if (loadErrorMessage) {
    loadErrorMessage.classList.toggle('hidden');
  }
};

const closeUploadingModal = () => {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  modalCloseButton.removeEventListener('click', closeUploadingModal);
  document.removeEventListener('keydown', onModalEscKeydown);
  uploadFileInput.value = '';
  removeSubmitButtonHandler();
  removeEffectsListClickHandler();
  removeZoomButtonsClickHandlers();
  addPictureListClickHandlers();
  toggleLoadErrorMessage();
};

const openUploadingModal = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  bringToDefaults();
  modalCloseButton.addEventListener('click', closeUploadingModal);
  document.addEventListener('keydown', onModalEscKeydown);
  addSubmitButtonHandler();
  addEffectsListClickHandler();
  addZoomButtonsClickHandlers();
  removePictureListClickHandlers();
  uploadUserPhoto();
  toggleLoadErrorMessage();
};

function onModalEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    closeUploadingModal();
  }
}

uploadFileInput.addEventListener('change', () => {
  openUploadingModal();
});

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.classList.add('load-error-message');
  alertContainer.style.zIndex = '100';
  alertContainer.style.width = '500px';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.margin = '0 auto';
  alertContainer.style.fontSize = '26px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.lineHeight = '30px';
  alertContainer.style.backgroundColor = '#f04848';
  alertContainer.style.borderRadius = '15px';
  alertContainer.style.textTransform = 'none';

  alertContainer.textContent = message;

  document.body.append(alertContainer);
};

export {onModalEscKeydown, showAlert, bringToDefaults, closeUploadingModal};
