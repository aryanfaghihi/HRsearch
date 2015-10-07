// Expires on 1st of December
// Get it from: https://developers.facebook.com/tools/debug/
var FB = require('fb');

FB.setAccessToken('CAAOqwgwZAa2sBAFGs8cFfDAgnxlXGCHVMQZC39JPU6AIny9YFhq0u82UuBpCxgJSqFYBu7tgagjnoJ2qQN8b6JZCCgZBlK2ZCirQPbUz4u4p56WNXZAQhwNGiON2KQJFBrwZASAnt7dvN4tUT958VGHL8vpZBZAmIPRgnPSoIZAPRchM9S8g88JsMA');

module.exports.facebookOutput = function (req, res) {
    var searchReq = JSON.stringify(req['query'].query);
    console.log("FB: " + searchReq);
    FB.api(
        '/search/',
        'GET',
        {"q": searchReq, "type": "user", "fields": "picture, name, education, bio, work"},
        function (response) {
            var facebookResults = response.data;
            res.send(facebookResults);
            console.log(facebookResults);
        }
    )
};
