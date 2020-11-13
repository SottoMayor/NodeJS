const http = require('http');

var server = http.createServer((req, res) => {

    console.log(req.url, req.method, req.headers);
    //process.exit();

    //Sending responses...
    res.setHeader('Content-Type', 'text/html'); //The first argument is the pattern of server and the secondy is our response.
    res.write('<html>');
    res.write('<head><title>My Node Page</title></head>');
    res.write('<body><h1>Hello world!</h1></body>');
    res.write('</html>');
    res.end();
});

server.listen(3000);
