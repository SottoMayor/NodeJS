const http = require('http');

var server = http.createServer((req, res) => {

    console.log(req);

});

server.listen(3000);
//Exec in your nagivation 'localhost:3000' if you use localhost and the port is 3000