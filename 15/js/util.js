const getRandomInRange = (start, end) => start >= 0 && end >= start ? Math.round(Math.random() * (end - start)) + start : -1;

const getRandomArrayElement = (array) => array[getRandomInRange(0, array.length - 1)];

const checkStringLength = (commentary, maxLength) => commentary.length <= maxLength;

const isEscapeKey = (evt) => evt.key === 'Escape';

const arrayContainsElement = (array, element) => array.indexOf(element) >= 0;

const anyElementIsDuplicated = (array) => {
  const temp = array.slice();
  const length = temp.length;
  for (let i = 0; i < length; i++) {
    const element = temp[0];
    temp.splice(0, 1);
    if (arrayContainsElement(temp, element)) {
      return true;
    }
  }
  return false;
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const throttle = (callback, delayBetweenFrames) => {
  let lastTime = 0;

  return (...rest) => {
    const now = new Date();
    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
};

getRandomArrayElement([]);

export {getRandomInRange, getRandomArrayElement, checkStringLength, isEscapeKey, arrayContainsElement,
  anyElementIsDuplicated, debounce, throttle};
