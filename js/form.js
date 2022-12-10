import {isEscapeKey, checkStringLength, anyElementIsDuplicated} from './util.js';

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

const validateHashtagsCount = (value) => value.split(' ').length <= MAX_HASHTAGS_COUNT;

const validateHashtagFormat = (value) =>
  (value === '')
    ? true
    : value.split(' ').every((hashtag) => HASHTAG_REG.test(hashtag));

const validateDuplicateHashtag = (value) => !anyElementIsDuplicated(value.toLowerCase().split(' '));

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

uploadForm.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});

export {addSubmitButtonHandler, removeSubmitButtonHandler};
