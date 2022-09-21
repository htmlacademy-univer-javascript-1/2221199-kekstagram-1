function getRandomInRange(start, end) {
  return start >= 0 && end >= start ? Math.round(Math.random() * (end - start)) + start : -1;
}

function checkStringLength (commentary, maxLength) {
  return commentary.length <= maxLength;
}

getRandomInRange(1, 100);
checkStringLength('asd', 5);
