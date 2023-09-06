const ws = require('ws');

const server = new ws.WebSocketServer({ port: 3001 }, () => {
    console.log('WebSocket server started at port: 3001');
});

let clients = [];

server.on('connection', (ws) => {
    let id = clients.length;
    clients[id] = ws;
    console.log(`New connection №${id}`);

    clients[id].send(`Hello, your number is №${id}`);

    clients.forEach((client, index) => {
        if (index !== id) {
            client.send(`Connected new user №${id}`);
        }
    });
});
