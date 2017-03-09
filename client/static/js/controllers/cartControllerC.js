app.controller('cartController', ['$scope', '$rootScope', 'productFactory', '$routeParams', '$location', '$cookies', function($scope, $rootScope, productFactory, $routeParams, $location, $cookies){
  var cookieProducts = $cookies.getObject('cookieProducts')
	var findCartProducts = function(){
		productFactory.findCartProducts(cookieProducts, function(result){
			$scope.detailCart = result.data
			console.log($scope.detailCart);
		})
	}
	findCartProducts()
}]);
