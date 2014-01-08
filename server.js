var io = require('socket.io').listen(8000);

io.sockets.on('connection', function (socket) {
  socket.on('message', function (data) {
    socket.emit('news', { hello: 'world' });
  });

  socket.on('another-message', function (data) {
    socket.emit('not-news', { hello: 'world' });
  });
});