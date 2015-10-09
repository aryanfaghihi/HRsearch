var googleScraper = require('google-search-scraper');
var scrape = require('scrape-url');

module.exports.linkedinOutputOld = function () {
    var options = {
        query: 'janith randeniya site:linkedin.com',
        limit: '5'
    };
    var googleResults = [];
    var callBacks = 0;
    googleScraper.search(options, function (err, url) {
        if (err) throw err;
        callBacks++;
        googleResults.push(url);

        if (callBacks === 5) {
            console.log(googleResults);
            callBacks = 0;

            var linkedinResults = [];
            var i = 0;

            while (i+1 < googleResults.length) {
                var searchUrl = googleResults[0];
                var keywords = ['.full-name', '.title', '.locality',
                    '.education header h4', '.education header h4 a',
                    '.background-experience div div header h4 a'];

                scrape(searchUrl, keywords,
                    function (error, name, title, locality, educationWithoutLink, educationWithLinks,
                              experienceWithLink) {


                        console.log(name[0].html());
                        /*
                         linkedinResults[i].name = name[0].html();
                         console.log(linkedinResults[i].name);
                         linkedinResults[i].title = title[0].html();
                         console.log(linkedinResults[i].title);
                         linkedinResults[i].location = locality[0].html();
                         console.log(linkedinResults[i].location);

                         console.log('THIS IS IT: ' + linkedinResults);
                         */

                        // Getting Education data
                        //for (var i = 0; i < educationWithoutLink.length; i++) {
                        //    if (educationWithoutLink[i].html().indexOf('<a href') == undefined) {
                        //        console.log(educationWithoutLink[i].html())
                        //    }
                        //}
                        //for (var i = 0; i < educationWithLinks.length; i++) {
                        //    console.log(educationWithLinks[i].html())
                        //}
                        //// Getting experience data
                        //for (var i = 0; i < experienceWithLink.length; i++) {
                        //    console.log(experienceWithLink[i].html());
                        //}


                    });
                i++;
            }

        }
    });
};