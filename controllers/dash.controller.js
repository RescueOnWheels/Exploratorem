/* Dependencies */
const express = require('express');
const Client = require('ssh2').Client;
const io = require('./io.controller');

/* Constants */
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('dash', { title: 'Express' });

  io.on('connection', (socket) => {
    const conn = new Client();
    conn.on('ready', () => {
      socket.emit('info', 'Client :: ready');
      conn.shell((err, stream) => {
        if (err) throw err;
        stream.on('close', () => {
          socket.emit('info', 'Stream :: close');
          conn.end();
        }).on('data', (data) => {
          socket.emit('input', data);
        });
        socket.on('output', (data) => {
          stream.write(data);
        });
      });
    }).connect({
      host: '172.20.10.8',
      port: 22,
      username: 'pi',
      password: 'raspberry',
    });
  });
});

/* Exports */
module.exports = router;
