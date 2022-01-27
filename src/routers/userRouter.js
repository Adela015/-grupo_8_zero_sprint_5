const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
const { body } = require('express-validator')
const validacionesMiddleware = require('../middlewares/validatorMiddleware');


router.get('/register', userController.register) //http://localhost:3000/user/register

router.post('/register', validacionesMiddleware, userController.create)

router.get('/login', userController.login)//http://localhost:3000/user/login

router.post('/login', userController.access)


module.exports = router;
