app.controller('SearchController', ['$scope', '$resource', function ($scope, $resource) {
    var twitterAPI = $resource('/api/twitterSearch', {query: ''});
    var facebookAPI = $resource('/api/facebookSearch', {query: ''});
    var LinkedInAPI = $resource('/api/linkedinkSearch', {query: ''});

    $scope.sendSearch = function () {
        twitterAPI.query({query:$scope.searchText}, function (data) {
            console.log(data);
            $scope.twitterResults = (data);
        });

        facebookAPI.query({query:$scope.searchText}, function (data) {
            console.log(data);
            $scope.facebookResults = (data);
        });

        LinkedInAPI.query({query:$scope.searchText}, function (data) {
            console.log(data);
            $scope.linkedinResults = (data);
        })
    }


}]);