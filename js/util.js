const getRandomInRange = (start, end) => {
  return start >= 0 && end >= start ? Math.round(Math.random() * (end - start)) + start : -1;
}

const checkStringLength = (commentary, maxLength) => {
  return commentary.length <= maxLength;
}

const getRandomArrayElement = (array) => {
  return array[getRandomInRange(0, array.length - 1)];
}

checkStringLength('asd', 5);

export {getRandomInRange, getRandomArrayElement, checkStringLength}
