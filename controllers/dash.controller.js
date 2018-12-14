/* Dependencies */
const express = require('express');
const Client = require('ssh2').Client;
const http = require('http').Server(express);
const io = require('socket.io')(http);

/* Constants */
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('dash', { title: 'Express' });

  const conn = new Client();
  conn.on('ready', () => {
    console.log('Client :: ready');
    conn.shell((err, stream) => {
      if (err) throw err;
      stream.on('close', () => {
        console.log('Stream :: close');
        conn.end();
      }).on('data', (data) => {
        console.log(`STDOUT: ${data}`);
      }).stderr.on('data', (data) => {
        console.log(`STDERR: ${data}`);
      });
      stream.end('ls -l\nexit\n');
    });
  }).connect({
    host: '172.20.10.8',
    port: 22,
    username: 'pi',
    password: 'raspberry',
  });
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

http.listen(3001, () => {
  console.log('listening on *:3001');
});

/* Exports */
module.exports = router;
