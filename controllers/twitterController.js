var Twitter = require('twitter');

var client = new Twitter({
    consumer_key: 'nFRH5Fhwou0GxGfV4sEcWJtXV',
    consumer_secret: 'uUgSPmjE04zY8Zq2Sdg84VL0OVJyPIwaf3Sd6gzpzL5s5hCLKe',
    access_token_key: '434681197-oQQAsYsWaLfeN2wmtFCQCQsiXq8qS04Fae5ite0k',
    access_token_secret: 'UkDlIt8Gyyi49Y5bfwBZHeua8LxKW8xr7DATtMT0Ah5ZT'
});


module.exports.twitterOutput = function (req, res) {

    var searchLimit = req['query'].limit;
    var searchReq = req['query'].query;
    console.log('Twitter Search Query: ' + searchReq);

    var params = {q: searchReq, count: searchLimit};
    client.get('users/search.json', params, function (error, tweets, response) {
        console.log(error);
        var twitterResults = JSON.parse(response.body);
        res.send(twitterResults);
    });
};