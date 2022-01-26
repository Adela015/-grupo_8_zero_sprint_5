const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
const { body } = require('express-validator')


const validationsLogin = [
    body('email').notEmpty().isEmail().withMessage('Debes ingresar un correo electrónico válido'),
    body('password').isLength({min: 8}).withMessage('Debes ingresar una contraseña de mínimo 8 carácteres')
]

const validations =[
    body('nombre').notEmpty().withMessage('Debes ingresar tu nombre'),
    body('apellido').notEmpty().withMessage('Debes ingresar tu apellido'),
    body('email').notEmpty().isEmail().withMessage('Debes ingresar un correo electrónico'),
    body('contraseña').notEmpty().withMessage('Debes ingresar una contraseña válida').isLength({min:8}).withMessage('La contraseña debe ser mas larga')
] 

//Formulario de registro

router.get('/register', userController.register) //http://localhost:3000/user/register

router.post('/register', validations , userController.processRegister)

router.post('/register', userController.create)

router.get('/login', userController.login)//http://localhost:3000/user/login

//procesa el regristro
router.post('/login', validationsLogin, userController.access)


module.exports = router;
