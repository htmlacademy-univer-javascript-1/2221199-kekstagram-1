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

const changeImageScale = (scaleValue) => {
  uploadedImg.style.transform = `scale(${scaleValue / 100})`;
  scaleControlValue.value = `${scaleValue}%`;
};

const addZoomButtonsClickHandlers = () => {
  zoomOutButton.addEventListener('click', () => {
    let currentScaleValue = parseInt(scaleControlValue.value, 10);
    if (currentScaleValue === MIN_SCALE_VALUE) {
      return;
    }
    currentScaleValue -= SCALE_CHANGE_STEP;
    changeImageScale(currentScaleValue);
  });

  zoomInButton.addEventListener('click', () => {
    let currentScaleValue = parseInt(scaleControlValue.value, 10);
    if (currentScaleValue === MAX_SCALE_VALUE) {
      return;
    }
    currentScaleValue += SCALE_CHANGE_STEP;
    changeImageScale(currentScaleValue);
  });
};

const removeZoomButtonsClickHandlers = () => {
  zoomOutButton.removeEventListener('click', () => {
    let currentScaleValue = parseInt(scaleControlValue.value, 10);
    if (currentScaleValue === MIN_SCALE_VALUE) {
      return;
    }
    currentScaleValue -= SCALE_CHANGE_STEP;
    changeImageScale(currentScaleValue);
  });

  zoomInButton.removeEventListener('click', () => {
    let currentScaleValue = parseInt(scaleControlValue.value, 10);
    if (currentScaleValue === MAX_SCALE_VALUE) {
      return;
    }
    currentScaleValue += SCALE_CHANGE_STEP;
    changeImageScale(currentScaleValue);
  });
};

export {changeImageScale, addZoomButtonsClickHandlers, removeZoomButtonsClickHandlers, DEFAULT_SCALE_VALUE};
