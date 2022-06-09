import {photosUsersList} from './user_photo.js';
import {isEscEvent, isOverlayClick} from './util.js';

const bigPicture = document.querySelector('.big-picture');
const pictures = document.querySelectorAll('.picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentCount = bigPicture.querySelector('.comments-count');
const socialCommentList = bigPicture.querySelector('.social__comments');
const socialCaption = bigPicture.querySelector('.social__caption');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const commentLoader = bigPicture.querySelector('.comments-loader');
const bigPictureBtnClose = bigPicture.querySelector('.big-picture__cancel');

// Проверка на нажатую кнопку Esc и закрытие полноэкранной фотографии
const onBigPictureEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    bigPictureClose();
  }
};

// Проверка по клику на оверлей и закрытие полноэкранной фотографии
const onBigPictureOverlayClick = (evt) => {
  if (isOverlayClick(evt)) {
    evt.preventDefault();
    bigPictureClose();
  }
};

// Получаю из массива комментарии, создаю разметку и вставляю их под фото
const getComments = (array) => {
  array.forEach((elem) => {
    const commentElement = document.createElement('li');
    commentElement.classList.add('social__comment');
    const commentPicture = document.createElement('img');
    commentPicture.classList.add('social__picture');
    commentPicture.src = elem.avatar;
    commentPicture.alt = elem.name;
    commentPicture.width = 35;
    commentPicture.height = 35;
    commentElement.appendChild(commentPicture);
    const commentText = document.createElement('p');
    commentText.classList.add('social__text');
    commentText.textContent = elem.message;
    commentElement.appendChild(commentText);
    socialCommentList.appendChild(commentElement);
  });
};

// Наполняем полноэкранную фотографию данными
const showBigPicture = (photo) => {
  for (let i = 0; i <= photosUsersList.length - 1; i ++ ) {
    if (photosUsersList[i].url === photo.getAttribute('src')) {
      const currentPhoto = photosUsersList[i];

      bigPicture.classList.remove('hidden');
      bigPictureImg.src = currentPhoto.url;
      likesCount.textContent = currentPhoto.likes;
      commentCount.textContent = currentPhoto.comments.length;
      socialCaption.textContent = currentPhoto.description;
      socialCommentCount.classList.add('hidden');
      commentLoader.classList.add('hidden');
      document.querySelector('body').classList.add('modal-open');
      getComments(currentPhoto.comments);

      document.addEventListener('keydown', onBigPictureEscKeydown);
      document.addEventListener('click', onBigPictureOverlayClick);
    }
  }
};

// Обработчик клика на каждую маленькую фотографию
pictures.forEach((picture) => {
  picture.addEventListener('click', (evt) => {
    evt.preventDefault();
    const photoElement = evt.target;
    socialCommentList.innerHTML = '';
    showBigPicture(photoElement);
  });
});

// Функция закрытия полноэкранной фотографии
function bigPictureClose () {
  bigPicture.classList.add('hidden');
  socialCommentCount.classList.remove('hidden');
  commentLoader.classList.remove('hidden');
  document.querySelector('body').classList.remove('modal-open');

  document.removeEventListener('keydown', onBigPictureEscKeydown);
  document.removeEventListener('click', onBigPictureOverlayClick);
}

//  Обработчик закрытия полноэкранной фотографии по клику на крестик
bigPictureBtnClose.addEventListener('click', () => {
  bigPictureClose();
});

export {bigPicture};
