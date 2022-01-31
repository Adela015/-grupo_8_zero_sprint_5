const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage(
    {
        destination:function(req,file,cb){
            cb(null,"./public/images/avatars")
        },
        filename: function(req,file,cb){
            cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`);
        }
    }
    )
    
    const upload = multer({storage});
    
module.exports = upload;