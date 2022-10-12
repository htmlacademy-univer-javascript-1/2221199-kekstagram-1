const PHOTOGRAPHIES_COUNT = 25
const COMMENTS_COUNT = 3

const NAMES = [
  'Артём',
  'Виктор',
  'Мария',
  'Никита',
  'Ксения',
  'Илья',
  'Андрей',
  'Апполонария',
  'Фелиция',
  'Канеки',
]

const DESCRIPTIONS = [
  'Крутышка!',
  'Не круто',
  'Крутяк',
  'Отстой',
  'норм бравлик',
  'бебрики',
  'фуу',
  'ку челики чд кд',
]

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
]

function getRandomInRange(start, end) {
  return start >= 0 && end >= start ? Math.round(Math.random() * (end - start)) + start : -1;
}

function checkStringLength (commentary, maxLength) {
  return commentary.length <= maxLength;
}

function getRandomArrayElement (array) {
  return array[getRandomInRange(0, DESCRIPTIONS.length - 1)];
}

let commentId = 0
function createComment() {
  return {
    id: commentId++,
    avatar: `img/avatar-${getRandomInRange(1, 6)}.svg`,
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(NAMES),
  }
}

let currentId = 0
function createPhotography() {
  return {
    id: ++currentId,
    url: `photos/${currentId}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInRange(15, 200),
    comments: Array.from({length: COMMENTS_COUNT}, createComment),
  }
}

checkStringLength('asd', 5);
let photographies = Array.from({length: PHOTOGRAPHIES_COUNT}, createPhotography)
console.log(photographies)
