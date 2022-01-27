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

        const result = validationResult(req)
        if (result.errors.length > 0) {
            return res.render('register', {
                errors: result.mapped(),
                oldData: req.body
            });
            
        }
        
        let userInDb = productModel.findField('email', req.body.email)

        if(userInDb) {
            return res.render('/register', {
                errors: {email:{
                    msg: 'Este correo ya está registrado'
                }},
                oldData: req.body
            })
        }

        let usuario = {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            contraseña: bcrypt.hashSync(req.body.contraseña, 10),
            fecha: req.body.fecha
        }
        console.log(usuario);
        productModel.create(usuario);
        res.redirect('/')
    },

    
    login:(req,res) => {
        res.render('login');
    },
    
    access: (req,res) =>{

        let users = productModel.findField('email', req.body.email);

        if (users){
            let confirm = bcrypt.compareSync(req.body.contraseña, users.contraseña)
            if(confirm){
                delete users.contraseña
                req.session.userLogged = users

                if(req.body.remember){
                    res.cookie('email', req.body.email, {maxAge: 1000*60*60})
                }
                return res.redirect('/')
            }
            return res.render('login',{
                errors: {
                    contraseña: {
                        msg: 'La contraseña no es válida'
                    }
                }
            })
        }
        return res.render('login',{
            errors: { 
                email: { msg: 'Por favor, ingresá un email válido'},
            },
        })
    },
    logout: (req, res) => {
        res.clearCookie('userEmail')
        req.session.destroy()
        return res.redirect('/')
    }
}


module.exports = userController;