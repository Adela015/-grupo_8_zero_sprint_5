const req = require('express/lib/request');
const path = require('path');
const jsonDB = require ('../model/jsonDatabase');
const productModel = jsonDB('user');
const bcrypt= require('bcryptjs')


const userController = {

    register:(req,res) => {
        res.render('register')
    },
    create: (req,res)=>{
        let usuario = {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            contraseña: bcrypt.hashSync(req.body.contraseña),
            fecha: req.body.fecha
        }
        productModel.create(usuario);
        res.redirect('/')
    },
    

    login:(req,res) => {
        res.render('login');
    },
    
}



module.exports = userController;