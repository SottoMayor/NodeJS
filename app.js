const http = require('http');

const express = require('express');
const app = express();

//Adding middleware...

app.use((req, res, next) => {

    console.log('I\'m a middleware!');
    
    next(); //Allows the request to continue to the next middleware in line!
});

app.use((req, res, next) => {

    console.log('I\'m a another middleware! ihullll!');

});

const server = http.createServer(app);

server.listen(3000);