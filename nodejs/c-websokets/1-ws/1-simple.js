const ws = require('ws');

const server = new ws.WebSocketServer({ port: 3001, host: '127.0.0.1' });

server.on('connection', () => {
    console.log('New connection');
});
