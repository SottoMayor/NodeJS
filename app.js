//rewriting code with expressJS tools

/*const http = require('http');*/ //we don't need anymore!

const express = require('express');
const app = express();

app.use((req, res, next) => {

    console.log('I\'m a middleware!');
    
    next();
});

app.use((req, res, next) => {

    console.log('I\'m a another middleware! ihullll!');
    res.send('<h2>Hello World!!!</h2>')

});

//we don't need anymore!
/*
const server = http.createServer(app);

server.listen(3000);
*/

app.listen(3000);