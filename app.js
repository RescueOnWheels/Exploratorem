/* Dependencies */
const helmet = require('helmet');

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const controllers = require('./controllers');

const app = express();

/* Helmet helps you secure your Express apps by setting various HTTP headers. */
app.use(helmet());

/* Express.js view engine for handlebars.js */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(controllers);

module.exports = app;
