const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    imageUrl: {type: String, required: true},
    year: {type: Number, required: true},
    genre: String,
    ratings: [{grade: {type: Number, min: 0, max: 5}}],
    averageRating: {type: Number,min:0, max: 5}
});

module.exports = mongoose.model('Book', bookSchema);