const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
const { body } = require('express-validator')
const validacionesMiddleware = require('../middlewares/validatorMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');


router.get('/register', guestMiddleware,userController.register) //http://localhost:3000/user/register

router.post('/register', validacionesMiddleware, userController.create)

router.get('/login', userController.login)//http://localhost:3000/user/login

router.post('/login', guestMiddleware,userController.access)

router.get('/logout', userController.logout);



module.exports = router;
