//REQUIRES
const express = require('express');
const app = express();
const path = require('path');
const mainController = require('./src/controllers/mainController');
const port = 3000;
//const multer = require('multer')

//RUTAS
const mainRutas = require('./src/routers/mainRouter');
const productRutas = require('./src/routers/productRouter');
const userRutas = require('./src/routers/userRouter');

//EXPRESS
app.use(express.static('public'));

//TEMPLATE ENGINE
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/src/views'));

//MIDDLEWARES
app.use(express.urlencoded({ extended: false }));
app.use(express.json());



//METHOD OVERRIDE
const methodOverride  = require("method-override");
app.use(methodOverride("_method"));


app.listen(process.env.PORT ||port, () => console.log(`Servidor funcionando en el puerto ${port}! <3`));


// --------------------------------- RUTAS -------------------------------- //

app.use('/', mainRutas);
app.use('/products',productRutas);
app.use('/user', userRutas);
