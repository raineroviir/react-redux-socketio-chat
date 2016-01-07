exports = module.exports = function(io) {
  io.on('connection', function(socket) {
    socket.on('new message', function(msg) {
      socket.broadcast.emit('new bc message', msg);
    });
    socket.on('new channel', function(channel) {
      socket.broadcast.emit('new channel', channel)
    });
    socket.on('typing', function () {
      socket.broadcast.emit('typing bc', socket.username);
    });
    socket.on('stop typing', function () {
      socket.broadcast.emit('stop typing bc', socket.username);
    });
  });
}
