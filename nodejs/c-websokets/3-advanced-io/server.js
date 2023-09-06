const { createServer } = require('node:http');
const express = require('express');
const { Server } = require('socket.io');

const port = process.env.PORT || 3002;
const host = process.env.HOST || '127.0.0.1';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('User connected!');

  socket.emit('message', 'Server: You are connected!');
  io.emit('message', 'New user connected!');

  socket.on('chatMessage', message => {
    io.emit('message', message); // Broadcasting for all connected users
  });

  socket.on('disconnect', () => {
    console.log('User disconnected!');
  });
});

httpServer.listen(port, host, () => {
  console.log(`Http server is listening on ${host}:${port}`);
});