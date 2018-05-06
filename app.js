var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');
var book = require('./routes/Book');
var chart = require('./routes/Chart');
var app = express();
var mongoose = require('mongoose');


mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/oneMillion', { promiseLibrary: require('bluebird') })
  .then(() =>  console.log('MongoDB connection succesful'))
  .catch((err) => console.error(err));

app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/books', express.static(path.join(__dirname, 'dist')));
app.use('/book', book);
app.use('/charts', express.static(path.join(__dirname, 'dist')));
app.use('/chart', chart);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
