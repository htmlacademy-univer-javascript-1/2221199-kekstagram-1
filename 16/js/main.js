import './render-thumbnails.js';
import './upload-modal.js';
import {getData} from './api.js';
import {fillThumbnails} from './render-thumbnails.js';
import {showAlert} from './upload-modal.js';
import {setUserFormSubmit, showSummaryUploadMessage} from './form.js';
import {activateFilters} from './thumbnails-filters.js';

const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

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
    showSummaryUploadMessage(successMessageTemplate);
  },
  () => {
    showSummaryUploadMessage(errorMessageTemplate);
  }
);
