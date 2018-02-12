const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose'),
const passport = require('passport');
const session = require('express-session');

require('./db');
require('./auth');
const User = mongoose.model('User');

const index = require('./routes/index');
const users = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// enable sessions:
const sessionOptions = {
    secret: 'session secret',
    resave: true,
    saveUninitialized: true
};
app.use(session(sessionOptions));

//enable passport middleware:
app.use(passport.initialize()); //to start up passport
app.use(passport.session()); //to enable persistent login sessions

//Allow for dropping user into local context of templates:
const dropUserIntoLocalContext = function(req, res, next){
  res.locals.user = req.user;
  next();
};
app.use(dropUserIntoLocalContext);


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
