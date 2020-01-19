const router = require('express').Router();
const { getAllUsers, getUser, createUser } = require('../controllers/users');

router.get('/users', getAllUsers);
router.get('/users/:userId', getUser);
router.post('/users', createUser);
// router.patch('/users/me', patchUserMe);

module.exports = router;
