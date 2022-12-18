import './render-thumbnails.js';
import './upload-modal.js';
import {getData} from './api.js';
import {fillThumbnails} from './render-thumbnails.js';
import {showAlert, showSuccessUploadMessage, showErrorUploadMessage} from './upload-modal.js';
import {setUserFormSubmit} from './form.js';
import {activateFilters} from './thumbnails-filters.js';

getData(
  (pictures) => {
    fillThumbnails(pictures);
    activateFilters(pictures);
  },
  () => {
    showAlert('Не удалось загрузить данные. Перезагрузите страницу либо попробуйте позже, мы уже исправляем это!');
  });

setUserFormSubmit(
  () => {
    showSuccessUploadMessage();
  },
  () => {
    showErrorUploadMessage();
  }
);
