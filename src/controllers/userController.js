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

        let users = productModel.readFile();
        let logged = users.find(user => user.email === req.body.email);
        // let registered = users.find(user => user.email === req.body.email);


        if (logged){
            let confirm = bcrypt.compareSync(req.body.password, logged.password)
            if(!confirm){
                return res.render('user/login',{
                    password: !confirm ? 'Las contraseñas no coinciden' : null
                })
            }

            if(req.body.remember){
                res.cookie('email', req.body.email, {maxAge: 1000*60*60})
            }

            req.session.user = logged

            return res.redirect('/')




        } else {
            return res.render('user/login',{
                email: registered ? 'Usuario no está registrado' : null
            })
        }




        // let errors = validationResult(req);
        // if (errors.isEmpty()){
        //     let usersJSON = fs .readFileSync( __dirname, './data/user');
        //     let users;
        //     if(usersJSON == ''){
        //         users = []
        //     } else {
        //         usersJSON = JSON.parse(usersJSON)
        //     }
            
        //     for (let i = 0; i < users.length; i++){
        //         if(users[i].email == req.body.email){
        //             if (bcryptjs.compareSync(req.body.password, users[i].password)){
        //                 let userToLogin = users[i]
        //                 break;
        //             }
        //         }
        //     }

        //     if (userToLogin == undefined){
        //         return res.render('login', {errors:[
        //             {msg: 'Credenciales invalidas'}
        //         ]})
        //     }

        //     req.session.userLogged = userToLogin;

        // } else {
        //     res.render('login', {errors: errors.array()})
        // }
        
    }




}



module.exports = userController;