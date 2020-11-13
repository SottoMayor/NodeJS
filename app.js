const http = require('http');

const server = http.createServer((req, res) => {

    //routing requests
    const url = req.url;
    if (url == '/'){

        res.setHeader('Content-Type', 'text/html'); 
        res.write('<html>');
        res.write('<head><title>My Node Page</title></head>');
        res.write('<body><form method="POST" action="/message"><input type="text"><button type="submit">Send!</button></form></body>');
        res.write('</html>');
        return res.end();
    };

    res.setHeader('Content-Type', 'text/html'); 
    res.write('<html>');
    res.write('<head><title>My Node Page</title></head>');
    res.write('<body><h1>Hello world!</h1></body>');
    res.write('</html>');
    res.end();
});

server.listen(3000);
