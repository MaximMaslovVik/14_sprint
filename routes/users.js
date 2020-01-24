const router = require('express').Router();
const { getAllUsers, getUser, login } = require('../controllers/users');

router.get('/users', getAllUsers);
router.get('/users/:userId', getUser);
router.post('/signin', login);

module.exports = router;
