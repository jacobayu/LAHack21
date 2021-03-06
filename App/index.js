require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('morgan');

const server = express();

const indexRouter = require('./routes/index');
const userInterfaceRouter = require('./routes/userInterface');
server.use(express.urlencoded({ extended: true }));

server.use(express());
server.use(express.json());

// view engine setup
server.set('view engine', 'ejs');
server.set('views', path.join(__dirname, 'views'));
server.use(logger('dev'));
server.use(helmet());
server.use(cors());
server.use(express.static(path.join(__dirname, 'public')));

server.use('/', indexRouter);
server.use('/userInterface', userInterfaceRouter);
// server.use(function(req, res, next) {
//     res.setHeader(
//         'Content-Security-Policy',
//         "default-src 'self'; font-src 'self'; img-src 'self'; script-src 'self'; style-src 'self'; frame-src 'self'; "
//       );
//     next(createError(404));
// });

// error handler
server.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = server;
