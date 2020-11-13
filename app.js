const http = require('http');

var server = http.createServer((req, res) => {

    //Basic of Requests...
    console.log(req.url, req.method, req.headers);
    //process.exit();

});

server.listen(3000);
