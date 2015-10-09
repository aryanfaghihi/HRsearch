// Expires on 1st of December
// Get it from: https://developers.facebook.com/tools/debug/
var FB = require('fb');

FB.setAccessToken('CAAOqwgwZAa2sBAIOsq9UfcsfF9IMcGwqLSHQk5pRwJAP3WYglZBRuHYZCy8DA7bTfChDMLZB18QZByetTr1QO1OoZBgrPQanbiUptbc8Ey9vYZBmZCeS6JHVTpeTDcIZAAlrgVPfg3Mz3nvhIZBtX2ogzfHZCmifBmEwRZA5IKnw3lmmBCkuZCEWY8IiNej7KZAF0erQyZCOhk5xfn7tWH70For4L0ZB');

module.exports.facebookOutput = function (req, res) {

    var searchReq = JSON.stringify(req['query'].query);
    console.log("FB: " + searchReq);
    FB.api(
        '/search/',
        'GET',
        {"q": searchReq, "type": "user", "fields": "picture, name", "limit": 5},
        function (response) {
            var facebookResults = response.data;
            console.log(facebookResults);
            res.send(facebookResults);
        }
    );

};
