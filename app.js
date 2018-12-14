/* Dependencies */
const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const controllers = require('./controllers');

const app = express();

/* Helmet helps you secure your Express apps by setting various HTTP headers. */
app.use(helmet());

/* ZLib compression */
app.use(compression());

/* Express.js view engine for handlebars.js */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

/* HTTP request logger middleware for node.js */
app.use(logger('dev'));

/* It parses incoming requests with JSON payloads. */
app.use(express.json());

/* It parses incoming requests with urlencoded payloads. */
app.use(express.urlencoded({ extended: false }));

/* Parse Cookie header and populate req.cookies with an object keyed by the cookie names. */
app.use(cookieParser());

/* It serves static files and is based on serve-static. */
app.use(express.static(path.join(__dirname, 'public')));
// app.use('/socket.io-client', express.static(`${__dirname}/node_modules/socket.io-client/`));

/* Controllers */
app.use(controllers);

module.exports = app;
