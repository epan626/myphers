app.controller('frontPageController', ['productFactory', '$scope', '$location', '$cookies', function(productFactory, $scope, $location, $cookies){
    var cookie = $cookies.get('cookieloggeduser')
    $scope.newProducts = []

    var populateNewArrivals = function() {
      productFactory.populateNewArrivals(function(products){
        $scope.newProducts = products.data
      })
    }
    populateNewArrivals()
}])
