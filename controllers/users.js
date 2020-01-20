const bcrypt = require('bcryptjs'); // импортируем bcrypt
const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((user) => {
      if (user.length === 0) {
        return res.status(404).send({ message: 'База данных user пуста! ' });
      }
      return res.send({ data: user });
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.createUser = (req, res) => {
  const ({ name, about, avatar, email }) = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({ name, about, avatar, email, password: hash }))
    .then(({ name, about, avatar, email }) => res.send({ name, about, avatar, email }))
    .catch(() => res.status(404).send({ message: 'Произошла ошибка, неудалось создать пользователя' }));
};

module.exports.getUser = (req, res) => {
  User.findById(req.user._id)
    .then((userId) => {
      if (!userId) {
        res.status(404).send({ message: 'Такого пользователя нет' });
      } else {
        res.send({ userId });
      }
    })
    .catch(() => res.status(500).send({ message: 'Нет пользователя с таким id' }));
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
    // создадим токен
      const token = jwt.sign({ _id: user._id }, 'some-secret-key');
      res.cookie('token', token);
      res.status(200).send({ token });
      // вернём токен
      res.send({ token });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};
