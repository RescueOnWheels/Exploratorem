const io = require('socket.io')();

io.on('connection', (socket) => {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', (data) => {
    console.log(data);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
module.exports = io;
