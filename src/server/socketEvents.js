exports = module.exports = function(io) {
  io.on('connection', function(socket) {
    socket.join('Lobby');
    socket.on('chat mounted', function(user) {
      // TODO: Does the server need to know the user?
      socket.emit('receive socket', socket.id)
    })
    socket.on('leave channel', function(channel) {
      socket.leave(channel)
    })
    socket.on('join channel', function(channel) {
      socket.join(channel.name)
    })
    socket.on('new message', function(msg) {
      socket.broadcast.to(msg.channelID).emit('new bc message', msg);
    });
    socket.on('new channel', function(channel) {
      socket.broadcast.emit('new channel', channel)
    });
    socket.on('typing', function (data) {
      socket.broadcast.to(data.channel).emit('typing bc', data.user);
    });
    socket.on('stop typing', function (data) {
      socket.broadcast.to(data.channel).emit('stop typing bc', data.user);
    });
    // socket.on('private message', function(id, msg) {
    //   console.log(id, msg);
    //   socket.broadcast.to(id).emit('send private message', msg);
    //   //socket.join(id) ?
    // })
    socket.on('new private channel', function(socketID, channel) {
      console.log(socketID, channel);
      socket.broadcast.to(socketID).emit('receive private channel', channel);
    })
  });
}
