const http = require('http');
const fs = require('fs'); // file system

const server = http.createServer((req, res) => {

    const url = req.url;
    if (url == '/') {

        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>My Node Page</title></head>');
        res.write('<body><form method="POST" action="/message"><input type="text" name="message"><button type="submit">Send!</button></form></body>');
        res.write('</html>');
        return res.end();
    };

    var method = req.method;
    if (url === '/message' && method === 'POST'){
        const body = [];
        req.on('data', chunck => {
            //console.log(chunck)
            body.push(chunck);
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            //console.log(parsedBody);
            var message = parsedBody.split('=')[1];
            //Optimizing the Write File Code...
            fs.writeFile('message.txt', message, err =>{
                res.statusCode = 302;
                res.setHeader('location', '/');
                return res.end();
            });
        });
    };

    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My Node Page</title></head>');
    res.write('<body><h1>Hello world!</h1></body>');
    res.write('</html>');
    res.end();
});

server.listen(3000);
