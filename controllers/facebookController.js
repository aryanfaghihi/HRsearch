// Expires on 1st of December
// Get it from: https://developers.facebook.com/tools/debug/
var FB = require('fb');

FB.setAccessToken('CAAOqwgwZAa2sBAFGs8cFfDAgnxlXGCHVMQZC39JPU6AIny9YFhq0u82UuBpCxgJSqFYBu7tgagjnoJ2qQN8b6JZCCgZBlK2ZCirQPbUz4u4p56WNXZAQhwNGiON2KQJFBrwZASAnt7dvN4tUT958VGHL8vpZBZAmIPRgnPSoIZAPRchM9S8g88JsMA');

module.exports.facebookOutput = function() {
    FB.api(
        '/search/',
        'GET',
        {"q": "michael", "type": "user"},
        function (response) {
            console.log(response);
        }
    );

    FB.api(
        "/689472364489971",
        function (response) {
            if (response && !response.error) {
                console.log(response);
            }
        }
    );

    FB.api(
        '/689472364489971',
        'GET',
        {"fields": "picture"},
        function (response) {
            console.log(response)
        }
    );
}
