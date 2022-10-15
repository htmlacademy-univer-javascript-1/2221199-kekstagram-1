const getRandomInRange = (start, end) => start >= 0 && end >= start ? Math.round(Math.random() * (end - start)) + start : -1;

const getRandomArrayElement = (array) => array[getRandomInRange(0, array.length - 1)];

const checkStringLength = (commentary, maxLength) => commentary.length <= maxLength;

checkStringLength('asd', 5);

export {getRandomInRange, getRandomArrayElement, checkStringLength};
