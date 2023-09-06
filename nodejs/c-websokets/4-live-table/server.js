'use strict';

const fs = require('node:fs');
const http = require('node:http');
const { WebSocketServer } = require('ws');

const httpPort = 3002;
const wsPort = 3001;
const index = fs.readFileSync('./index.html', 'utf8');

const httpServer = http.createServer((req, res) => {
    res.writeHead(200);
    res.end(index);
});

httpServer.listen(httpPort, () => {
    console.log(`Http server is listening port ${httpPort}`);
});

const wsServer = new WebSocketServer({ port: wsPort });

const clients = new Map();

wsServer.on('connection', (server, socket) => {
    const connection = socket.client;
    const id = Math.random().toString(36).substring(2) + Date.now().toString(36);
    clients.set(id, server);
    console.log('Connected', connection.remoteAddress, id);
    server.on('message', (buffer) => {
        const str = buffer.toString();
        const message = JSON.parse(str);
        console.dir(message);
        clients.forEach((client, id) => {
            if (server !== client) {
                console.log(`Sended ${str} for ${id}`);
                client.send(str);
            }
        });
    });
    server.on('close', (reasonCode, buffer) => {
        const description = buffer.toString()
        clients.delete(id);
        console.log('Disconnected', connection.remoteAddress, id);
        console.dir({ reasonCode, description });
    });
});
