const multer = require('multer');
const path = require('path');

const checkFileType = (file, cb) => {
    const fileType = /.jpg|.jpeg|.png/;
    const extensionName = fileType.test(path.extname(file.originalname).toLocaleLowerCase());
    const mimeType = fileType.test(file.mimetype);

    if (mimeType && extensionName) {
        return cb(null, true)
    } else {
        cb(new Error("Erreur: Image au format .jpg/.jpeg ou .png uniquement"))
    }   
}

const storage = multer.memoryStorage();

module.exports = multer({
    storage: storage,
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
}).single('image');