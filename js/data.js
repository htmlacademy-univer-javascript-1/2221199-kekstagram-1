import {getRandomInRange, getRandomArrayElement} from './util.js';

const PHOTOGRAPHIES_COUNT = 25;

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
];

const DESCRIPTIONS = [
  'Крутышка!',
  'Не круто',
  'Крутяк',
  'бебрики',
  'ку челики чд кд',
  'отдыхаю =))))',
  'урфу норм уник',
  'джаваскрипт люблю капец',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

let commentId = 0;
const createComment = () => ({
  id: commentId++,
  avatar: `img/avatar-${getRandomInRange(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

let currentId = 0;
const createPicture = () => ({
  id: ++currentId,
  url: `photos/${currentId}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInRange(15, 200),
  comments: Array.from({length: getRandomInRange(1, 5)}, createComment),
});

const createPictures = () => Array.from({length: PHOTOGRAPHIES_COUNT}, createPicture);

export {createPictures};
