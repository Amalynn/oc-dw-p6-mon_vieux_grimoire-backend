const express = require('express');
const router = express.Router();

const bookController = require('../controllers/book.controller');
const auth = require('../middlewares/auth');
const uploadImage = require('../middlewares/multer-config');
const convertImageToWebp = require('../middlewares/convertImageToWebp');
const updateAverageRating = require('../middlewares/updateAverageRating');

router.get('/bestrating', bookController.getBestRatingBooks);
router.post('/:id/rating', auth, bookController.createRatingBook, updateAverageRating);
router.get('/:id', bookController.getOneBook);
router.post('/', auth, uploadImage, convertImageToWebp, bookController.createBook);
router.put('/:id', auth, uploadImage, convertImageToWebp, bookController.updateBook);
router.delete('/:id', auth, bookController.deleteBook);
router.get('/',bookController.getAllBooks);

module.exports = router;