module.exports = async (req, res) => {
    try {
        const book = req.book;        

        if(!book) {
            return res.status(404).json({message: "Livre non trouvé"});
        }
    
        const numberOfNotes = book.ratings.length;
        const sumOfNotes = book.ratings.reduce((acc, currentValue) => acc + currentValue.grade, 0); 
        const mean =  sumOfNotes / numberOfNotes;      
    
        book.averageRating = parseFloat(mean.toFixed(1));
    
        const updatedBook = await book.save();

        if(updatedBook) {
            res.status(201).json(updatedBook)
        }        
        
    } catch (error) {
        res.status(500).json({error})
    }    
};
