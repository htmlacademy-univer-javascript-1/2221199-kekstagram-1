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

const validateHashtagFormat = (value) => {
  if (value === '') {
    return true;
  }
  else {
    return value.split(' ').every((hashtag) => HASHTAG_REG.test(hashtag));
  }
};

const validateDuplicateHashtag = (value) => !anyElementIsDuplicated(value.toLowerCase().split(' '));

pristine.addValidator(
  hashtagsField,
  validateHashtagsCount,
  `Нельзя указать больше ${MAX_HASHTAGS_COUNT} хэш-тегов`
);

pristine.addValidator(
  hashtagsField,
  validateHashtagFormat,
  `Хэш-тэги должны быть вида #hashtag и разделены пробелами. Макс. длинна хэш-тега - ${MAX_HASHTAG_LENGTH}`
);

pristine.addValidator(
  hashtagsField,
  validateDuplicateHashtag,
  'Один и тот же хэш-тег не может быть использован дважды. Хэш-теги нечувствительны к регистру'
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

uploadForm.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});

// let hashtagErrorMessage;
// function validateHashtags(value) {
//   hashtagErrorMessage = '';
//   const hashtags = value.toLowerCase().split(' ');
//   if (hashtags.length > MAX_HASHTAGS_COUNT) {
//     hashtagErrorMessage = `Нельзя указать больше ${MAX_HASHTAGS_COUNT} хэш-тегов`;
//     return false;
//   }
//   hashtags.forEach((hashtag) => {
//     if (!HASHTAG_REG.test(hashtag)) {
//       if (hashtag[0] !== '#') {
//         hashtagErrorMessage = 'Хэш-тег должен начинается с #';
//         return false;
//       }
//       if (!checkStringLength(hashtag, MAX_HASHTAG_LENGTH)) {
//         hashtagErrorMessage = `Максимальная длина одного хэш-тега - ${MAX_HASHTAG_LENGTH} символов, включая решётку`;
//         return false;
//       }
//       hashtagErrorMessage = 'Хэш-тэг может состоять только из букв и цифр и не может состоять из одной решетки. Хэш-теги разделяются пробелами';
//       return false;
//     }
//   });
//   if (anyElementIsDuplicated(hashtags)) {
//     hashtagErrorMessage = 'Один и тот же хэш-тег не может быть использован дважды. Хэш-теги нечувствительны к регистру';
//     return false;
//   }
//   return true;
// }
