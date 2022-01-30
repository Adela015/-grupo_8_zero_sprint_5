const express = require('express');
const mainController = require('../controllers/mainController');
const router = express.Router();


router.get('/', mainController.index);  //http://localhost:3000/

router.get('/about', mainController.about); //http://localhost:3000/about

router.get('/newsLetter', mainController.newsLetter); //http://localhost:3000/newsLetter

router.get('/error404', mainController.error404); //http://localhost:3000/newsLetter

module.exports = router;