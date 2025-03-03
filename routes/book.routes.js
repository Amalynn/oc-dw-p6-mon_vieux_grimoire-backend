const express = require('express');
const router = express.Router();

const bookController = require('../controllers/book.controller');

router.get('/:id', bookController.getOneBook);
router.get('/bestrating', bookController.getBestRatingBooks);
router.post('/', bookController.createBook);
router.put('/:id', bookController.updateBook);
router.delete('/:id', bookController.deleteBook);
router.post('/:id/rating', bookController.createRatingBook);
router.get('/',bookController.getAllBooks);

module.exports = router;