const express = require('express');
const app = express();

//Handling Different Routes

app.use('/', (req, res, next) =>{

    console.log('It always will run!');

    next();

});

app.use('/add-product', (req, res, next) => {

    res.send('<h2>The ADD PRODUCT page!</h2>');
    console.log('ADD PRODUCT page!');

});

app.use('/', (req, res, next) => {

    res.send('<h2>The HOME page!</h2>');
    console.log('HOME page');

});

app.listen(3000);