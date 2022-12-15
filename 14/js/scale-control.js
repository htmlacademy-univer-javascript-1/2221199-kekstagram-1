const SCALE_CHANGE_STEP = 25;
const DEFAULT_SCALE_VALUE = 100;
const MAX_SCALE_VALUE = 100;
const MIN_SCALE_VALUE = 25;

const uploadModal = document.querySelector('.img-upload');
const scaleControl = document.querySelector('.img-upload__scale');
const zoomOutButton = scaleControl.querySelector('.scale__control--smaller');
const zoomInButton = scaleControl.querySelector('.scale__control--bigger');
const scaleControlValue = scaleControl.querySelector('.scale__control--value');
const uploadedImg = uploadModal.querySelector('.img-upload__preview img');

const convertToPercents = (value) => value / 100;

const changeImageScale = (scaleValue) => {
  uploadedImg.style.transform = `scale(${convertToPercents(scaleValue)})`;
  scaleControlValue.value = `${scaleValue}%`;
};

const increaseScale = () => {
  let currentScaleValue = parseInt(scaleControlValue.value, 10);
  if (currentScaleValue === MAX_SCALE_VALUE) {
    return;
  }
  currentScaleValue += SCALE_CHANGE_STEP;
  changeImageScale(currentScaleValue);
};

const decreaseScale = () => {
  let currentScaleValue = parseInt(scaleControlValue.value, 10);
  if (currentScaleValue === MIN_SCALE_VALUE) {
    return;
  }
  currentScaleValue -= SCALE_CHANGE_STEP;
  changeImageScale(currentScaleValue);
};

const addZoomButtonsClickHandlers = () => {
  zoomOutButton.addEventListener('click', decreaseScale);
  zoomInButton.addEventListener('click', increaseScale);
};

const removeZoomButtonsClickHandlers = () => {
  zoomOutButton.removeEventListener('click', decreaseScale);
  zoomInButton.removeEventListener('click', increaseScale);
};

export {changeImageScale, addZoomButtonsClickHandlers, removeZoomButtonsClickHandlers, DEFAULT_SCALE_VALUE};
