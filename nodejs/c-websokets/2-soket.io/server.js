const { createServer } = require('node:http');
const express = require('express');
const { Server } = require('socket.io');

const port = 3002;
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('Log: User connected!');
  socket.emit('message', 'Server: User connected!');
});

httpServer.listen(port, () => {
  console.log(`Listening on *:${port}`);
});