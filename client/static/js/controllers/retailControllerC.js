app.controller('retailController', ['$scope', '$rootScope', 'productFactory', '$routeParams', '$location', '$cookies', function($scope, $rootScope, productFactory, $routeParams, $location, $cookies){
  var cookieProducts = $cookies.getObject('cookieProducts')
	$scope.products = []
	$scope.cart = {}

	var populateCart = function() {
		$scope.cart = cookieProducts
		// $scope.cartLength = Object.keys($scope.cart).length
	}
		populateCart()
  var showSelectedProduct = function() {
    productFactory.editpage(function(product){
      $scope.products = product.data
    })
  }
  showSelectedProduct()


	$scope.addToCart = function(product, quantity) {
		var id = product._id
		var allProduct = $cookies.getObject('cookieProducts')
		var newProducts = {}
		if(cookieProducts == undefined) {
			newProducts[id] = quantity
			$cookies.putObject('cookieProducts', newProducts)
		} else if(!(id in allProduct)){
				if(quantity <= product.quantity ) {
					newProducts[id] = quantity
					Object.assign(newProducts, allProduct)
					$cookies.putObject('cookieProducts', newProducts)
				}
			} else {
				if(id in allProduct){
					var newQuantity = parseInt(allProduct[id])+parseInt(quantity)
					if(newQuantity <= parseInt(product.quantity)) {
						allProduct[id] = newQuantity.toString()
					$cookies.putObject('cookieProducts', allProduct)
					}
				}
			}
	}

}])
