const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
const { body } = require('express-validator')

const validationsLogin = [
    body('email').notEmpty().isEmail().withMessage('Debes ingresar un correo electrónico válido'),
    body('password').isLength({min: 8}).withMessage('Debes ingresar una contraseña de mínimo 8 carácteres')
]


router.get('/register', userController.register) //http://localhost:3000/user/register

router.post('/register', userController.create)

router.get('/login', userController.login)//http://localhost:3000/user/login

router.post('/login', validationsLogin, userController.access)


module.exports = router;
