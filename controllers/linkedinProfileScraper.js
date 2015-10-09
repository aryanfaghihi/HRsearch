var scrape = require('scrape-url');
// There will be user input.
module.exports.output = function (url, callback) {
    var keywords = ['.full-name', '.title', '.locality',
        '.education header h4'];

    scrape(url, keywords,
        function (error, name, title, locality, education) {
            if (error) {
                console.log('Error in linkedinProfileScraper ' + error)
            }

            var returnObject = {
                education: []
            };
            if (name[0] && title[0] && locality[0] && education) {
                console.log('Were in...');
                returnObject.name = name[0].html();
                // Short description of a person.
                returnObject.title = title[0].html();
                returnObject.locality = locality[0].html();


                var i = 0;
                while (i < education.length) {
                    if (education[i][0].children[0].attribs) {
                        // Educations with a link to the organisation.
                        var institution = education[i][0].children[0].children[0].data;
                        var instUrl = education[i][0].children[0].attribs.href;
                        returnObject.education.push({institution: institution, url: instUrl})
                    }
                    else {
                        var institution = education[i].html();
                        returnObject.education.push({institution: institution})
                    }
                    i++;
                    if (i == education.length) {
                        //console.log(returnObject);
                        callback(returnObject);
                    }
                }

            }
            else {
                callback(null);
            }
        });

};