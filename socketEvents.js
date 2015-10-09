exports = module.exports = function(io) {
  io.on('connection', function(socket) {

    // A new connection, which at the moment is anyone loading up the website
    console.log(socket.id + ' connected');
    socket.on('user online', function(username) {
      console.log(username + ' connected');
      socket.broadcast.emit('user online', username)
      socket.username = username;
    });

    // when a disconnection occurs, we remove the user from the online users list
    socket.on('disconnect', function() {
      console.log(socket.username + ' on the socket:' + socket.id + ' disconnected');
      socket.broadcast.emit('disconnect bc', socket.username)
    });

    // Right now, a person can signout and still stay connected to their socket, so we have this event for the signout button
    socket.on('signOut', function() {
      socket.broadcast.emit('user logged out', socket.username)
    })

    // on a new message, the message gets broadcast to everyone else online
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
