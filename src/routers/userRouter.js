const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
const {body} = require('express-validator')

const validationsLogin = [
    body('correo').isEmail().withMessage('Debe ser un correo válido'),
    body('contra').notEmpty().withMessage('Debes ingresar una contraseña')
]


router.get('/register', userController.register) //http://localhost:3000/user/register

router.post('/register', userController.create)

router.get('/login', userController.login)//http://localhost:3000/user/login

router.post('/login', userController.ingreso)


module.exports = router;
