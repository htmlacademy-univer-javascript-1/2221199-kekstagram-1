import {isEscapeKey, checkStringLength, anyElementIsDuplicated} from './util.js';
import {sendData} from './api.js';
import {onModalEscKeydown, bringToDefaults} from './upload-modal.js';

const MAX_DESCRIPTION_LENGTH = 140;
const MAX_HASHTAG_LENGTH = 20;
const MAX_HASHTAGS_COUNT = 5;
const HASHTAG_REG = /^#[A-za-zА-Яа-яЁё\d]{1,19}$/;

const uploadModal = document.querySelector('.img-upload');
const uploadForm = uploadModal.querySelector('.img-upload__form');
const descriptionField = uploadForm.querySelector('[name="description"]');
const hashtagsField = uploadForm.querySelector('[name="hashtags"]');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error-text',
});

const validateHashtagsCount = (value) =>
  (value === '')
    ? true
    : value.split(' ').length <= MAX_HASHTAGS_COUNT;

const validateHashtagFormat = (value) =>
  (value === '')
    ? true
    : value.split(' ').every((hashtag) => HASHTAG_REG.test(hashtag));

const validateDuplicateHashtag = (value) =>
  (value === '')
    ? true
    : !anyElementIsDuplicated(value.toLowerCase().split(' '));

pristine.addValidator(
  hashtagsField,
  validateHashtagFormat,
  `Хэш-тэги должны быть вида #hashtag и разделены пробелами. Макс. длинна хэш-тега - ${MAX_HASHTAG_LENGTH}`,
  3
);

pristine.addValidator(
  hashtagsField,
  validateDuplicateHashtag,
  'Один и тот же хэш-тег не может быть использован дважды. Хэш-теги нечувствительны к регистру',
  2
);

pristine.addValidator(
  hashtagsField,
  validateHashtagsCount,
  `Нельзя указать больше ${MAX_HASHTAGS_COUNT} хэш-тегов`,
  1
);

pristine.addValidator(
  descriptionField,
  (description) => checkStringLength(description, MAX_DESCRIPTION_LENGTH),
  `До ${MAX_DESCRIPTION_LENGTH} символов (включительно)`
);

descriptionField.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
});

hashtagsField.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
});

const submitForm = (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
};

const addSubmitButtonHandler = () => {
  uploadForm.addEventListener('submit', submitForm);
};

const removeSubmitButtonHandler = () => {
  uploadForm.removeEventListener('submit', submitForm);
};

const setUserFormSubmit = (onSuccess, onError) => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      sendData(
        () => {
          onSuccess();
        },
        () => {
          onError();
        },
        new FormData(uploadForm)
      );
    }
  });
};

const onSuccessEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeSuccessUploadMessage();
  }
};

const onErrorEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeErrorUploadMessage();
  }
};

const onSuccessOuterAreaClick = (evt) => {
  if (evt.target.closest('.success__inner') === null) {
    closeSuccessUploadMessage();
  }
};

const onErrorOuterAreaClick = (evt) => {
  if (evt.target.closest('.error__inner') === null) {
    closeErrorUploadMessage();
  }
};

function closeSuccessUploadMessage() {
  document.querySelector('.success').remove();
  document.removeEventListener('keydown', onSuccessEscKeydown);
  document.addEventListener('keydown', onModalEscKeydown);
  document.removeEventListener('click', onSuccessOuterAreaClick);
}

function closeErrorUploadMessage() {
  document.querySelector('.error').remove();
  document.removeEventListener('keydown', onErrorEscKeydown);
  document.addEventListener('keydown', onModalEscKeydown);
  document.removeEventListener('click', onErrorOuterAreaClick);
}

const showSummaryUploadMessage = (messageTemplate) => {
  const message = messageTemplate.cloneNode(true);
  message.style.zIndex = '10000';
  document.body.append(message);
  document.removeEventListener('keydown', onModalEscKeydown);
  if (messageTemplate.classList.contains('success')) {
    bringToDefaults();
    document.querySelector('.success__button').addEventListener('click', closeSuccessUploadMessage);
    document.addEventListener('keydown', onSuccessEscKeydown);
    document.addEventListener('click', onSuccessOuterAreaClick);
  } else if (messageTemplate.classList.contains('error')) {
    document.querySelector('.error__button').addEventListener('click', closeErrorUploadMessage);
    document.addEventListener('keydown', onErrorEscKeydown);
    document.addEventListener('click', onErrorOuterAreaClick);
  }
};

export {addSubmitButtonHandler, removeSubmitButtonHandler, setUserFormSubmit, showSummaryUploadMessage};
