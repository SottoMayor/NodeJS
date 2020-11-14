const fs = require('fs');

const requestHandler = (req, res) => {

    const url = req.url;
    const method = req.method;

    if(url === '/'){
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>My Page!</title></head>');;
        res.write('<body><form method="POST" action="/create-user"><input type="text" name="username"><button type="submit">Send!</button></body>');
        res.write('</html>');
        return res.end();
    };
    if(url === '/users'){
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>My Page!</title></head>');;
        res.write('<body><ul><li>USER 1</li><li>USER 2 </li></ul></body>');
        res.write('</html>');
        return res.end();
    };
    if(url === '/create-user' && method === 'POST'){
        const body = [];
        res.on('data', (chuncks) => {
            body.push(chuncks);
        });
        res.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const user = parsedBody.split('=')[1];
            console.log(user);
        });
        res.statusCode = 302;
        res.setHeader('location', '/');
        res.end();
    };
    res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>My Page!</title></head>');;
        res.write('<body><h2>Page not Found!</h2></body>');
        res.write('</html>');
        return res.end();
};

module.exports.message = "Coding HARD!";
module.exports.routes = requestHandler;