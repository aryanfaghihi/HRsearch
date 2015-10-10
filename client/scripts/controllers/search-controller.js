app.controller('SearchController', ['$scope', '$resource', function ($scope, $resource) {
    var twitterAPI = $resource('/api/twitterSearch', {query: ''});
    var facebookAPI = $resource('/api/facebookSearch', {query: '', limit: ''});
    var LinkedInAPI = $resource('/api/linkedinkSearch', {query: ''});

    var resultsLimit = 5;
    var FBresultsLimit = resultsLimit;
    var TWResultsLimit = resultsLimit;

    $scope.moreFBResults = function () {
        FBresultsLimit = FBresultsLimit + 5;
        facebookAPI.query({query: $scope.searchText, limit: FBresultsLimit}, function (data) {
            console.log(data);
            $scope.facebookResults = data;
        });
    };

    $scope.moreTWResults = function () {
        TWResultsLimit = TWResultsLimit + 5;
        twitterAPI.query({query: $scope.searchText, limit: TWResultsLimit}, function (data) {
            console.log(data);
            $scope.twitterResults = data;
        });
    };


    $scope.sendSearch = function () {

        $scope.twitterResults = [];
        $scope.facebookResults = [];

        twitterAPI.query({query: $scope.searchText, limit: resultsLimit}, function (data) {
            $scope.twitterResults = data;
        });


        facebookAPI.query({query: $scope.searchText, limit: resultsLimit}, function (data) {
            console.log(data);
            $scope.facebookResults = data;
        });


        /*
         LinkedInAPI.query({query: $scope.searchText}, function (data) {
         console.log(data);
         $scope.linkedinResults = (data);
         })
         */

    }


}]);