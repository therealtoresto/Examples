const renderChatPage = (req, res) => {
    res.render('chat');
}

const wsConnController = (wsServer, socket) => {
    console.log('Client connected!');

    socket.emit('message', 'Server: You are connected!');
    wsServer.emit('message', 'New user connected!');

    socket.on('chatMessage', (message) => {
        wsServer.emit('message', message); // Broadcasting for all connected users
    });

  socket.on('disconnect', () => {
    console.log('User disconnected!');
  });
}

module.exports = {
    renderChatPage,
    wsConnController
}