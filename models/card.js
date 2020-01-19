const mongoose = require('mongoose');

const validate = /^(https|http)?:\/\/(www.)?[^-_.\s](\d{1,3}.\d{1,3}.\d{1,3}.\d{1,3})?(:\d+)?(.+[#a-zA-Z/:0-9]{1,})?\.(.+[#a-zA-Z/:0-9]{1,})?$/i;

const cardSchema = new mongoose.Schema({
  name: { // у пользователя есть имя — опишем требования к имени в схеме:
    type: String, // имя — это строка
    required: true, // оно должно быть у каждого пользователя, так что имя — обязательное поле
    minlength: 2, // минимальная длина имени — 2 символа
    maxlength: 30, // а максимальная — 30 символов
  },
  link: {
    type: String,
    match: validate,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],
  createAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);

/*

Лучшая ссылка из одного документа на другой —
идентификатор. Mongo автоматически создаёт
 поле _id — уникальный идентификатор для каждого документа.
  Этот идентификатор позволяет связать один документ с другим.
Чтобы сделать это на уровне схемы, полю следует установить
специальный тип — mongoose.Schema.Types.ObjectId и свойство ref.
В это свойство записывают имя модели, на которую мы ссылаемся:
creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
*/

/*
name — имя карточки, строка от 2 до 30 символов, обязательное поле;

link — ссылка на картинку, строка, обязательно поле;

owner — ссылка на модель автора карточки, тип ObjectId,
 обязательное поле;

likes — список лайкнувших пост пользователей,
 массив ObjectId, по умолчанию — пустой массив (поле default).

createdAt — дата создания, тип Date, значение по умолчанию Date.now.
Модель пользователя назовите user,
карточки — card. Для этого передайте имена моделей первым аргументом методу mongoose.model:
module.exports = mongoose.model('user', userSchema);
*/
