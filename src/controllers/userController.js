const req = require('express/lib/request');
const path = require('path');
const jsonDB = require ('../model/jsonDatabase');
const productModel = jsonDB('user');


const userController = {

    register:(req,res) => {
        res.render('register')
    },
    // registerPost: (req, res) => {
    //     let user = {
    //         userNombre: req.body.registerNombre,
    //         userApellido: req.body.registerApellido,
    //         userEmail: req.body.registerEmail,
    //         userPassword:req.body.registerPassword,
    //         userPasswordRepeat:req.body.registerPasswordRepeat,
    //         userRol:req.body.registerRol
    //     }
    //     let errores = validationResult(req)
    //     if(errores.isEmpty()){
    //     const registerUser = modelController.create(user)
    //     res.redirect("/")
    // }else{
    //     res.render("users/register", {
    //         errores:errores.mapped(),
    //         old: req.body
    //     })
    // } 

    login:(req,res) => {
        res.render('login');
    },
    create: (req,res)=>{
        let usuario = {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            contraseña: req.body.contraseña,
            fecha: req.body.fecha
        }
        productModel.create(usuario);
        res.redirect('/')
    }
}

// }


module.exports = userController;