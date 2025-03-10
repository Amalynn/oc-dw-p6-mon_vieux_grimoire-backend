const multer = require('multer');
const path = require('path');

const checkFileType = (file, cb) => {
    const fileType = /.webp|.jpg|.jpeg|.png/;
    const extensionName = fileType.test(path.extname(file.originalname).toLocaleLowerCase());
    const mimeType = fileType.test(file.mimetype);

    if (mimeType && extensionName) {
        return cb(null, true)
    } else {
        cb("Erreur: Image au format .webp, .jpg/.jpeg ou .png")
    }   
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images');
    },
    filename: (req, file, cb) => {
        const name = file.originalname.split(' ').join('_');        
        cb(null, Date.now() + '-' + name);
    }    
});

module.exports = multer({
    storage: storage,
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
}).single('image');