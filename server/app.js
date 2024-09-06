var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config()

// using nodemon for auto refresh
var livereload = require("livereload");
var connectLiveReload = require("connect-livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});


// for other to connect
const cors = require('cors');
// const corsOptions = { // only available for this host
//  origin: ["http://localhost:5173"]
// }



// routes 
var HomeRouter = require('./routes/home');
var AnonymousRouter = require('./routes/unknownUser');
var LogInRouter = require('./routes/log_in')
var LogOutRouter = require('./routes/log_out')
var UserRouter = require('./routes/logged_in') 

var app = express();

app.use(connectLiveReload());
// app.use(cors(corsOptions));
app.use(cors({
  origin: 'http://localhost:5173', // React app URL
  credentials: true // Allow credentials (cookies)
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', HomeRouter);
app.use('/anonymous', AnonymousRouter);
app.use('/log_in', LogInRouter);
app.use('/log_out', LogOutRouter);
app.use('/user', UserRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
