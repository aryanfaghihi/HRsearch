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
    var searchUrl = 'http://au.linkedin.com/pub/dir/?first=' + givenName + '&last=' + lastName;
    var keywords = ['.vcard h2 strong'];

    console.log('URL is: ' + searchUrl);
    scrape(searchUrl, keywords,
        function (error, address) {
            if (error) {
                console.log(error);
            }

            if (address[0] == undefined) {
                console.log('Address is undefined. Try again.');
            }
            else {
                console.log('First address :' + address[0]);
                console.log('LinkedIn: Address link is valid.');
                var reqUrls = [];
                var magicNumber = 0;

                address.forEach(function (thisUrl) {
                    var urlHref = thisUrl[0].children[1].attribs.href;
                    reqUrls.push(urlHref);
                    if (magicNumber == 0) {
                        getResults();
                        magicNumber++;
                    }
                });


                console.log(reqUrls);
                var linkedinResults = [];

                var k = 0;

                function getResults() {

                    console.log('LinkedIn: asking linkedinProfile.');
                    linkedinProfileScraper.output(reqUrls[k], function (callbackResults) {
                        console.log('LinkedIn scraper is working!');
                        linkedinResults.push(callbackResults);
                        console.log(linkedinResults);
                        k++;
                        if (k == 5 || k > address.length) {
                            res.send(linkedinResults);

                        }
                        else {
                            getResults();
                        }
                    });

                }


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
        });

};
