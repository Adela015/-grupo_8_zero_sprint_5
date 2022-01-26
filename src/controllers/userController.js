const req = require('express/lib/request');
const path = require('path');
const fs = require('fs');
const jsonDB = require ('../model/jsonDatabase');
const productModel = jsonDB('user');
const bcrypt= require('bcryptjs')
const {validationResult} = require('express-validator');
const { send } = require('express/lib/response');
const bcryptjs = require('bcryptjs');

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
    
    access: (req,res) =>{

        let users = productModel.findField('email', req.body);

        if (users){
            let confirm = bcrypt.compareSync(req.body.password, users.password)
            if(confirm){
                delete users.password
                req.session.userLogged = users

                if(req.body.remember){
                    res.cookie('email', req.body.email, {maxAge: 1000*60*60})
                }
                return res.redirect('/')
            }
            return res.render('user/login',{
                error: {
                    password: {
                        msg: 'La contraseña no es válida'
                    }
                }
            })
        }
        return res.render('user/login',{
            errors: { 
                email: { msg: 'Por favor, ingresá un email válido'},
            },
        })
    }
}


module.exports = userController;