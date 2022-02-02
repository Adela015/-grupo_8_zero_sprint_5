const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require ('path');


let productController = require('../controllers/productController');
const adminMiddleware = require('../middlewares/adminMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,path.resolve(__dirname,"../../public/images/albumes"));
    },
    filename: function (req, file, cb) {
        cb(null, 'img-' + Date.now() + path.extname(file.originalname))
    }
});

var upload = multer({ storage: storage });


router.get('/productCart',authMiddleware, productController.productCart) //http://localhost:3000/products/productCart

router.get('/productDetail', productController.productDetail); //http://localhost:3000/products/productDetail

router.get('/productList', productController.productList); //http://localhost:3000/products/productList

router.get('/productAdd',authMiddleware,adminMiddleware , productController.productAdd);//http://localhost:3000/products/productAdd

router.get('/wishList',authMiddleware, productController.wishList);//http://localhost:3000/products/wishList

//Editar productos

router.get('/productEdit/:id',adminMiddleware, productController.edit);

router.put('/productEdit/:id',upload.single("productImage"), productController.editarAccion);

router.post('/productAdd',upload.single("image"), productController.create);

router.get('/productDetail/:id',productController.productDetail);

router.get('/productEdit',adminMiddleware,productController.alls);

router.get('/productList',productController.productList);

router.delete('/borrar/:id',adminMiddleware,productController.delete);

module.exports = router;