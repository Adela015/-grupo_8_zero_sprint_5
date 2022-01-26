const req = require('express/lib/request');
const path = require('path');
const jsonDB = require ('../model/jsonDatabase');
const productModel = jsonDB('user');
const bcrypt= require('bcryptjs')
const {validationResult} = require('express-validator');
const { send } = require('express/lib/response');

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
    processRegister:(req, res) =>{
        const result = validationResult(req)
        if (result.errors.length > 0) {
            return res.render('register', {
                errors: result.mapped(),
                oldData: req.body
            });
            
        }
        
    },
    

    login:(req,res) => {
        res.render('login');
    },
    
    access: (req,res) =>{
        let errors = validationResult(req);
        if (errors.isEmpty()){
            res.redirect('/')
        } else {
            res.render('login', {errors: errors.array()})
        }
        
    }
}



module.exports = userController;