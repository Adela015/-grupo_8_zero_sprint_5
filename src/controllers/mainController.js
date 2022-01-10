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
    }
}


module.exports = mainController;