var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');
var cheerio = require('cheerio');
var FB = require('fb');
var Twitter = require('twitter');

var app = express();

// Facebook API
// Expires on 1st of December
// Get it from: https://developers.facebook.com/tools/debug/
/*
 FB.setAccessToken('CAAOqwgwZAa2sBAFGs8cFfDAgnxlXGCHVMQZC39JPU6AIny9YFhq0u82UuBpCxgJSqFYBu7tgagjnoJ2qQN8b6JZCCgZBlK2ZCirQPbUz4u4p56WNXZAQhwNGiON2KQJFBrwZASAnt7dvN4tUT958VGHL8vpZBZAmIPRgnPSoIZAPRchM9S8g88JsMA');

 FB.api(
 '/search/',
 'GET',
 {"q": "michael", "type": "user"},
 function (response) {
 //console.log(response);
 }
 );

 FB.api(
 "/689472364489971",
 function (response) {
 if (response && !response.error) {
 //console.log(response);
 }
 }
 );

 FB.api(
 '/689472364489971',
 'GET',
 {"fields": "picture"},
 function (response) {
 //console.log(response)
 }
 );
 */
// Twitter API ////////////////////////////////////////////////////////////
/*
 var client = new Twitter({
 consumer_key: 'nFRH5Fhwou0GxGfV4sEcWJtXV',
 consumer_secret: 'uUgSPmjE04zY8Zq2Sdg84VL0OVJyPIwaf3Sd6gzpzL5s5hCLKe',
 access_token_key: '434681197-oQQAsYsWaLfeN2wmtFCQCQsiXq8qS04Fae5ite0k',
 access_token_secret: 'UkDlIt8Gyyi49Y5bfwBZHeua8LxKW8xr7DATtMT0Ah5ZT'
 });


 var params = {q: 'Elahm', count: '5'};
 client.get('users/search.json', params, function (error, tweets, response) {
 console.log(error);
 if (!error) {
 console.log(response.body);
 }
 });
 */

///////////////////////////////////////////////////
// Google Results Scraper
var googleScraper = require('google-search-scraper');

var options = {
    query: 'Aryan Faghihi site:linkedin.com',
    limit: '10'
};
var googleResults = [];
googleScraper.search(options, function (err, url) {
    if (err) throw err;
    googleResults.push(url);
    console.log(googleResults);
});

// LinkedIn API Scraper /////////////////////////////////////////////
/*
 scrape = require('scrape-url');
 var keywords = ['.full-name', '.title', '.locality',
 '.education header h4', '.education header h4 a',
 '.background-experience div div header h4 a'];

 scrape('https://au.linkedin.com/in/rayemagp', keywords,
 function (error, name, title, locality, educationWithoutLink, educationWithLinks,
 experienceWithLink) {

 console.log(error);
 console.log(name[0].html());
 console.log(title[0].html());
 console.log(locality[0].html());
 // Getting Education data
 for (var i = 0; i < educationWithoutLink.length; i++) {
 if (educationWithoutLink[i].html().indexOf('<a href') == undefined) {
 console.log(educationWithoutLink[i].html())
 }
 }
 for (var i = 0; i < educationWithLinks.length; i++) {
 console.log(educationWithLinks[i].html())
 }
 // Getting experience data
 for (var i = 0; i < experienceWithLink.length; i++) {
 console.log(experienceWithLink[i].html())
 }


 });
 */




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
