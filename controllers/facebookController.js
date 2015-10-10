// Expires on 8th of December
// Get it from: https://developers.facebook.com/tools/debug/
var FB = require('fb');

FB.setAccessToken('CAAOqwgwZAa2sBAJHRP99uvbiqHrt7Lq8PMXjcdWmcnmCTPj3jhNImDqUJgQzl0ieNOvSf8CKhJZCoOappBUpucQ1q19dykQYQxkasDjIWpTqauVninTXkRmH5kpUW4zwZCvbxt2uoJ6pcdOJjZCveSb8A3g1bPVUTx4wBFG8OsDNYFa9pdGc');

module.exports.facebookOutput = function (req, res) {

    var searchLimit = req['query'].limit;
    var searchReq = req['query'].query;

    console.log("FB: " + searchReq);

    FB.api(
        '/search/',
        'GET',
        {"q": searchReq, "type": "user", "fields": "picture, name", "limit": searchLimit},
        function (response) {
            console.log(response);
            var facebookResults = response.data;
            console.log(facebookResults);
            res.send(facebookResults);
        }
    );

};
