var io = require('socket.io').listen(8000);
var fs = require('fs');

eval(fs.readFileSync('json2.js') + '');

io.sockets.on('connection', function (socket) {
  socket.on('greet', function (greeting) {
      socket.broadcast.emit('join', socket.id);
      socket.emit('greet', 'hello');
      var connectedclients = [];
      io.sockets.clients().forEach(function (client) {
      	if(socket.id != client.id)
      		connectedclients.push(client.id);
      });
      socket.emit('connected clients', JSON.stringify(connectedclients));
  });

  socket.on('keydown', function (data) {
      console.log('keydown event ' + socket.id + " message: " + data);
      socket.broadcast.emit('keydown', {client: socket.id, key: data});
  });

  socket.on('keyup', function (data) {
      console.log('keydown event ' + socket.id + " message: " + data);
      socket.broadcast.emit('keyup', {client: socket.id, key: data});
  });

  socket.on('disconnect', function (data) {
  	socket.broadcast.emit('leave', socket.id);

  });
});