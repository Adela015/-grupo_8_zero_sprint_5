const req = require('express/lib/request');
const path = require('path');
const jsonDB = require ('../model/jsonDatabase');
const productModel = jsonDB('products');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


const productController = {

    alls:(req,res) => {
        let productos = productModel.all();
        res.render('./products/productList',{productos:productos,mil:toThousand})
    },
    productList:(req,res) => {
        let productos = productModel.all();
        res.render('./products/productList',{productos:productos,mil:toThousand})
    },
    edit2:(req, res) => {
        let id = req.params.id;
        let producto = productModel.find(id);
        res.render('./products/productEdit2',{producto})
    }, 
    create:(req,res) => {
        let producto ={
            name: req.body.name,
            artist: req.body.artist,
            genre: req.body.genre,
            category: req.body.category,
            description: req.body.description,
            price: Number(req.body.price),
            image: req.file.filename
        };
        productModel.create(producto);
        res.redirect("/products/productList");
    },
    detail:function (req,res) {
        let id = req.params.id;
        let producto = productModel.find(id);
        let productos = productModel.all();
        res.render('./products/productDetail',{producto,mil:toThousand,productos:productos})
    },
    editarAccion:(req,res) => {
        let images = productModel.find(req.params.id);
        let producto ={
            id: req.params.id,
            name: req.body.productName,
            artist: req.body.productArt,
            description: req.body.productDescription,
            price:Number(req.body.productPrice),
            category: req.body.category,
            //image:req.file!=null?req.file.filename:images/albumes.imagen
            image: req.file.filename
        };
        productModel.update(producto);
        res.redirect("/products/productList")
    },
    delete:(req,res) => {
        productModel.delete(req.params.id);
        res.redirect("/products/productList");
    },
    delete:(req,res) => {
        productModel.delete(req.params.id);
        res.redirect("/products/productList");
    },

//ORIGINAL
    productCart:(req,res) => {
        res.render('productCart');
    },

    productDetail:(req,res) => {
        let id = req.params.id;
        let producto = productModel.find(id);
        res.render('productDetail',{producto,mil:toThousand})
    },
    productList:(req,res) => {
        let productos = productModel.all();
        res.render('productList',{productos:productos,mil:toThousand});
    },

    productList2:(req,res) => {
        res.render('productList2');
    },

    productAdd:(req,res) => {
        res.render('productAdd');
    },
    wishList:(req,res) => {
        res.render('wishList');
    },
    edit:(req, res) => {
        let id = req.params.id;
        let producto = productModel.find(id);
        res.render('productEdit',{producto})
    }
}


module.exports = productController;