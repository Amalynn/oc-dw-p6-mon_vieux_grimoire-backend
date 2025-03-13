module.exports = async (req, res) => {
    try {
        const book = req.book;

        if(!book) {
            return res.status(404).json({message: "Livre non trouvé"});
        }
        
        const numberOfNotes = book.ratings.length;
        const sumOfNotes = book.ratings.reduce((acc, currentValue) => acc + currentValue.grade, 0);
       
        book.averageRating = sumOfNotes / numberOfNotes ;
        
        await book.save();
        res.status(200).json({book});

    } catch (error) {
        res.status(500).json({error});
    }     
};
