var googleScraper = require('google-search-scraper');
var linkedinProfileScraper = require('./linkedinProfileScraper');
var scrape = require('scrape-url');

module.exports.linkedinOutputOld = function (req, res) {
    var options = {
        query: 'Aryan Faghihi site:linkedin.com'
    };
    var googleResults = [];
    var googleResultsCallback = 0;
    googleScraper.search(options, function (err, url) {
        if (err) throw err;
        if (!url.indexOf('/dir')) {
            googleResults.push(url);
            googleResultsCallback++;
        }


        if (googleResultsCallback === 5) {
            console.log(googleResults);

            /*
            var linkedinResults = [];
            var i = 0;

            while (i+1 < googleResults.length) {
                linkedinProfileScraper.output(googleResults[i], function (callbackResults) {
                    console.log(callbackResults);
                });
                i++;
            }
            */

        }

    });
};