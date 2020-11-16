const express = require('express');
const app = express();

/*
app.use((req, res, next) => {

    console.log('Hello World... I am the first middleware!');

    next();
});

app.use((req, res, next) => {

    console.log('Hello World... I am the last middleware!');

    res.send('<h2>I am the Boss!</h2>');
});
*/

app.use('/users',(req, res, next) => {

    console.log('Users page!')
    res.send('<h2>Hello... USERS page!</h2>');

});

app.use('/',(req, res, next) => {

    console.log('HOME page!')
    res.send('<h2>Hi... HOME page!</h2>');

});


app.listen(3000);