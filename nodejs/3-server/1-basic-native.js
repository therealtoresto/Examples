const http = require('node:http');

// creating http server
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>HEADER</h1><p>Hello universe</p><h2>header2</h2>');
});

// running http server
server.listen(3000, '127.0.0.1', () => {
    console.log('Server is started on 3000 port');
});
