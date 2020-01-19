const router = require('express').Router();
const { cardsAll, cardCreate, deleteCard } = require('../controllers/cards');

router.get('/cards', cardsAll);
router.post('/cards', cardCreate);
router.delete('/cards/:cardId', deleteCard);

module.exports = router;
