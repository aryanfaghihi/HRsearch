app.controller('SearchController', ['$scope', '$resource', function ($scope, $resource) {
    var searchAPI = $resource('/api/searchResults', {query: ''});

    $scope.sendSearch = function () {
        console.log($scope.searchText);
        searchAPI.query({query:$scope.searchText}, function (data) {
            console.log(data);
            $scope.SearchResults = (data);
        })
    }
}]);