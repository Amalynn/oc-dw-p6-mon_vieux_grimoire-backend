const Book = require('../models/Book');

/**
 * Get a book following a specific ID
 * @route GET /api/books/:id 
 * @access Public  
 */
exports.getOneBook = async (req, res) => {
    try {
        const book = await Book.findOne({_id: req.params.id}) ;
        return res.status(200).json(book)
    } catch (error) {
        return res.status(404).json({error})
    }
};

/**
 * Get tree books having the best ranking
 * @route GET /api/books/bestrating
 * @access Public  
 */
exports.getBestRatingBooks = async (req, res) => {
    try {
        const bestBooks = await Book.find({}).sort({averageRating: -1}).limit(3)
        return res.status(200).json(bestBooks)        
    } catch (error) {
        return res.status(500).json({error})
    }
};

/**
 * Create a book
 * @route POST /api/books/
 * @access Private  
 */
exports.createBook = (req, res) => {
    console.log(req.body.book);
    const bookObject = JSON.parse(req.body.book) ;   
    console.log(bookObject);
    //delete thingObject._id;
    delete bookObject._userId;
    const book = new Book({
    ...bookObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    console.log(book);
    //thing.save()
    //.then(() => res.status(201).json({message: 'Objet enregistré !'}))
    //.catch( error => res.status(400).json({error}));
    res.status(200).json({message: "Objet crée"});
};

exports.updateBook = (req, res,next) => {

};

exports.deleteBook = (req, res,next) => {

};

exports.createRatingBook = (req, res,next) => {

};

/**
 * Get all books from the database
 * @route GET /api/books
 * @access Public  
 */
exports.getAllBooks = async (req, res) => {    
    try {
        const allBooks = await Book.find({}) ;
        return res.status(200).json(allBooks)
    } catch (error) {
        return res.status(400).json({error})
    }     
};
