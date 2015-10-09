var scrape = require('scrape-url');
var linkedinProfileScraper = require('./linkedinProfileScraper');

module.exports.linkedinOutput = function (req, res) {
    var request = JSON.stringify(req['query'].query);

    console.log('LinkedIn Request: ' + request);
    var splitNames = request.split(' ');
    var givenName = '';
    var i = 0;
    while (i < splitNames.length - 1) {
        givenName = givenName + splitNames[i] + ' ';
        i++
    }
    // The last value of the array
    var lastName = splitNames[splitNames.length - 1];
    var searchUrl = 'https://au.linkedin.com/pub/dir/?first=' + givenName + '&last=' + lastName;
    var keywords = ['.vcard h2 strong'];

    scrape(searchUrl, keywords,
        function (error, url) {
            if (error) throw error;

            if (url) {
                console.log('Working as expected.');
                var reqUrls = [];

                url.forEach(function (thisUrl) {
                    var urlHref = thisUrl[0].children[1].attribs.href;
                    reqUrls.push(urlHref);
                });


                console.log(reqUrls);
                var linkedinResults = [];

                var k = 0;

                function getResults() {
                    linkedinProfileScraper.output(reqUrls[k], function (callbackResults) {
                        console.log('LinkedIn scraper is working!');
                        linkedinResults.push(callbackResults);
                        console.log(linkedinResults);
                        if (k < 5) {
                            getResults();
                            k++;
                        }
                        else {
                            res.send(linkedinResults);
                        }
                    });
                }

                getResults();


                //console.log(linkedinResults);
                //console.log(linkedinProfileScraper.output(reqUrls[k]));
                //linkedinResults.push(linkedinProfileScraper.output(reqUrls[k]));

                /*
                 console.log(linkedinResults);
                 if (k == reqUrls.length) {
                 // This will be the response
                 console.log(linkedinResults);
                 }
                 */

            }
            else {
                console.log('Try again');
                res.send('')
            }
        });
};
