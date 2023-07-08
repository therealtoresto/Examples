const http = require('node:http');
const fs = require('node:fs/promises');

require('dotenv').config();

const PORT = process.env.PORT;
const HOSTNAME = process.env.HOSTNAME;

console.dir({ env: process.env });

fs.readFile('./.env', 'utf-8').then((file) => {
    console.dir({ '.env': file });
})

const server = http.createServer((req, res) => {
    res.end('Hello, universe!');
});

server.listen(PORT, HOSTNAME, () => {
    console.log(`Http server is listening ${HOSTNAME}:${PORT}`);
});
