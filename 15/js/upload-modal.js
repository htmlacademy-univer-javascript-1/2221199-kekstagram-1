import {isEscapeKey} from './util.js';
import {changeImageScale, addZoomButtonsClickHandlers, removeZoomButtonsClickHandlers, DEFAULT_SCALE_VALUE} from './scale-control.js';
import {addSubmitButtonHandler, removeSubmitButtonHandler} from './form.js';
import {setSlider, addEffectsListClickHandler, removeEffectsListClickHandler} from './effect-slider.js';
import './form.js';

const uploadModal = document.querySelector('.img-upload');
const uploadFileInput = uploadModal.querySelector('#upload-file');
const uploadOverlay = uploadModal.querySelector('.img-upload__overlay');
const modalCloseButton = uploadModal.querySelector('#upload-cancel');
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const descriptionField = uploadModal.querySelector('[name="description"]');
const hashtagsField = uploadModal.querySelector('[name="hashtags"]');

const bringToDefaults = () => {
  changeImageScale(DEFAULT_SCALE_VALUE);
  setSlider('none');
  hashtagsField.value = '';
  descriptionField.value = '';
  document.querySelector('#effect-none').checked = true;
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
  document.querySelector('.load-error-message').classList.remove('hidden');
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
  document.querySelector('.load-error-message').classList.add('hidden');
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

const closeSuccessUploadMessage = () => {
  document.querySelector('.success').remove();
  document.removeEventListener('keydown', onSuccessEscKeydown);
  document.addEventListener('keydown', onModalEscKeydown);
  document.removeEventListener('click', onSuccessOuterAreaClick);
};

const closeErrorUploadMessage = () => {
  document.querySelector('.error').remove();
  document.removeEventListener('keydown', onErrorEscKeydown);
  document.addEventListener('keydown', onModalEscKeydown);
  document.removeEventListener('click', onErrorOuterAreaClick);
};

const showSuccessUploadMessage = () => {
  const message = successMessageTemplate.cloneNode(true);
  message.style.zIndex = '10000';
  document.body.append(message);
  bringToDefaults();
  document.querySelector('.success__button').addEventListener('click', closeSuccessUploadMessage);
  document.addEventListener('keydown', onSuccessEscKeydown);
  document.removeEventListener('keydown', onModalEscKeydown);
  document.addEventListener('click', onSuccessOuterAreaClick);
};

const showErrorUploadMessage = () => {
  const message = errorMessageTemplate.cloneNode(true);
  message.style.zIndex = '10000';
  document.body.append(message);
  bringToDefaults();
  document.querySelector('.error__button').addEventListener('click', closeErrorUploadMessage);
  document.addEventListener('keydown', onErrorEscKeydown);
  document.removeEventListener('keydown', onModalEscKeydown);
  document.addEventListener('click', onErrorOuterAreaClick);
};

function onSuccessEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeSuccessUploadMessage();
  }
}

function onErrorEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeErrorUploadMessage();
  }
}

function onSuccessOuterAreaClick(evt) {
  if (evt.target.closest('.success__inner') === null) {
    closeSuccessUploadMessage();
  }
}

function onErrorOuterAreaClick(evt) {
  if (evt.target.closest('.error__inner') === null) {
    closeErrorUploadMessage();
  }
}

export {onModalEscKeydown, showAlert, showSuccessUploadMessage, showErrorUploadMessage};
