/* Dependencies */
const express = require('express');
const Client = require('ssh2').Client;
const isReachable = require('is-reachable');
const io = require('./io.controller');

/* Constants */
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('dash', { title: 'Express' });

  io.on('connection', (socket) => {
    const conn = new Client();
    conn.on('error', (error) => {
      conn.end();
      socket.emit('error', error);
    });

    conn.on('ready', () => {
      socket.emit('info', 'Client :: ready');

      // Starts a shell session for sending and receiving data over sockets
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
    });

    // Checks if the pi is reachable, before attempting to connect to it.
    (async () => {
      if ((await isReachable('172.20.10.8'))) {
        conn.connect({
          host: '172.20.10.8',
          port: 22,
          username: 'pi',
          password: 'raspberry',
        });
      } else {
        socket.emit('pierror', 'pi unreachable');
      }
    })();
  });
});

/* Exports */
module.exports = router;
