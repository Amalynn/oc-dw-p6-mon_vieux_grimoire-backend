const Book = require('../models/Book');
const fs = require('fs');

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
    const bookObject = JSON.parse(req.body.book);           
    delete bookObject.userId;

    const book = new Book({
    ...bookObject,
    userId: req.auth['userId'],
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });

    book.save()
        .then(() => {
            res.status(201).json({message: "Livre ajouté !"})
        })
        .catch( error => {
            res.status(500).json({error})
        });    
};

exports.updateBook = (req, res,next) => {

};

/**
 * Delete a book
 * @route DELETE /api/books/:id
 * @access Private  
 */
exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findById({_id: req.params.id});  
        
        if(!book) {
            return res.status(404).json({message: "Livre non trouvé"});
        }

        if(book.userId !== req.auth.userId) {
            return res.status(403).json({message: "Vous n'êtes pas autorisé à supprimé ce livre"});
        } else {
            const fileName = book.imageUrl.split('/images/')[1] ;
            
            fs.unlink(`images/${fileName}`, () => {
                Book.deleteOne({_id: req.params.id})
                    .then( () => {
                        res.status(200).json({message: "Livre supprimé !"})
                    })
                    .catch(error => {
                        res.status(401).json({error})
                    });
            });           
        }
    } catch(error) {
        return res.status(500).json({error})
    }    
};

/**
 * Note a book
 * @route POST /api/books/:id/rating
 * @access Private  
 */
exports.createRatingBook = async (req, res, next) => {
    try {        
        const existingRating = await Book.findOne({
            _id: req.params.id,
            "ratings.userId" : req.auth.userId
            }
        );
        
        if(existingRating) {
            return res.status(403).json({message: "Vous avez déjà noté ce livre. Ajout d'une nouvelle note impossible"});
        }

        if(req.body.grade < 0 || req.body.grade > 5) {
            return res.status(400).json({message: "La note doit être comprise entre 0 et 5"});
        }

        const book = await Book.findById({_id: req.params.id});              

        if(!book) {
            return res.status(404).json({message: "Livre non trouvé"});
        }        
        
        book.ratings.push({
            userId: req.auth.userId,
            grade: parseInt(req.body.rating)
        });

        await book.save();

        req.book = book;
        next();
        
    } catch (error) {
       return res.status(500).json({error})  
    }    
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
