app.controller('allController', ['$scope', '$rootScope', 'productFactory', 'bannerFactory', '$routeParams', '$location', '$cookies', function($scope, $rootScope, productFactory, bannerFactory, $routeParams, $location, $cookies){
  var cookieProducts = $cookies.getObject('cookieProducts')
	$scope.products = []
	$scope.cart = {}
  $scope.quantityOptions = []
	var populateCart = function() {
		$scope.cart = cookieProducts
		// $scope.cartLength = Object.keys($scope.cart).length
	}
		populateCart()

    var getAllProductsBanners = function(){
      bannerFactory.getAllProductsBanners(function(data){
        $scope.allProductBanner = data.data
        console.log($scope.allProductBanner);
      })
    }
    getAllProductsBanners()

		$scope.getProducts = function () {
	    productFactory.getProducts(function(data){
	      $scope.products = data.data;
	    })
	  }
	  $scope.getProducts()






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
