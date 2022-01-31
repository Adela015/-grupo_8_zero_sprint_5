const path = require('path')

const mainController = {

    index: (req,res) => {
        res.render('index');
    },
    about: (req,res) => {
        res.render('about');
    },
    newsLetter: (req,res) => {
        res.render('newsLetter');
    },
    avatar: (req,res) => {
        res.render('avatar');
    }
}


module.exports = mainController;