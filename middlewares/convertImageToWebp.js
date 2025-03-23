const sharp = require('sharp');
const path = require('path');

module.exports = async (req, res, next) => {
    try {
        if(req.file) {
            const {originalname, buffer} = req.file;
            const filenameWithoutSpace = originalname.split(' ').join('_'); 
            const filenameWithoutExtension = path.basename(filenameWithoutSpace, path.extname(filenameWithoutSpace));
            const ref = `${Date.now()}-${filenameWithoutExtension}.webp`;
            const metadata = await sharp(buffer).metadata();
            const resizedWidth = 600;            

            if(metadata.width > 800 ) {
                await sharp(buffer)
                    .resize({width: resizedWidth})
                    .webp({quality: 70})
                    .toFile(`./images/${ref}`);            

            } else {
                await sharp(buffer)
                    .webp({quality: 70})
                    .toFile(`./images/${ref}`);               
            } 
            
            req.file.filename = ref; 
            next();
                   
        } else {
            next();
        }       
    } catch (error) {
        return res.status(500).json({error});
    }    
};
