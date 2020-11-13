const http = require('http');

var server = http.createServer((req, res) => {

    console.log(req);
    //process.exit(); -> If we wanna stop the NodeJs loop of the serve, we execute process.exit(); 

});

server.listen(3000);
//Exec in your nagivation 'localhost:3000' if you use localhost and the port is 3000