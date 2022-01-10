const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();


router.get('/register', userController.register) //http://localhost:3000/user/register

router.post('/register', userController.create)

router.get('/login', userController.login)//http://localhost:3000/user/login



module.exports = router;
