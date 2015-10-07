var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cheerio = require('cheerio');
var linkedinController = require('./controllers/linkedinController');
var facebookController = require('./controllers/facebookController');
var twitterController = require('./controllers/twitterController');
var mongoose = require('mongoose');
var http = require('http');
var app = express();

//linkedinController.linkedinOutput();
//facebookController.facebookOutput();


app.get('/', function (req, res) {
    res.sendfile("./client/views/index.html");
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use('/scripts', express.static(__dirname + '/client/scripts'));

// REST API
app.get('/api/searchResults', twitterController.twitterOutput);
app.post('/api/searchResults', twitterController.twitterOutput);
//app.put('/api/searchResultsPost', twitterController.twitterOutput);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


module.exports = app;