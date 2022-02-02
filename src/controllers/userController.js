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
            const errores = validationResult(req)
            if (errores.errors.length > 0) {
                return res.render('register', {
                    errors: errores.mapped(),
                    oldData: req.body
                });
                
            }
            let userInDb = productModel.findField('email', req.body.email);

            if(userInDb) {
                return res.render('register', {
                    errors: {
                        email:{
                            msg: 'Este correo ya está registrado'
                        }
                    },
                    oldData: req.body
                })
            };

            let usuario = {
                ...req.body,
                avatar: req.file?req.file.filename:' ',
                contraseña: bcrypt.hashSync(req.body.contraseña, 10),
                isAdmin: String(req.body.email).includes('@zero.com')
            };
            console.log(usuario);
            productModel.create(usuario);
            res.redirect('login')
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
        };
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