const User = require('../models/user');

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
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

/*
module.exports.patchUserMe = (req, res) => {
  User.findByIdAndUpdate(req.params.id, { name: '' })
    .then(user => res.send({ data: user }))
    .catch(error => res.status(500).send({ message: 'Произошла ошибка' }));

};

router.patch('/:id', (req, res) => {
  // обновим имя найденного по _id пользователя
  User.findByIdAndUpdate(req.params.id, { name: 'Виктор Гусев' })

});


*/
