const express = require('express');
const router = express.Router();

const bookController = require('../controllers/book.controller');
const auth = require('../middlewares/auth');

router.get('/:id', bookController.getOneBook);
router.get('/bestrating', bookController.getBestRatingBooks);
router.post('/', auth, bookController.createBook);
router.put('/:id', auth, bookController.updateBook);
router.delete('/:id', auth, bookController.deleteBook);
router.post('/:id/rating', auth, bookController.createRatingBook);
router.get('/',bookController.getAllBooks);

module.exports = router;