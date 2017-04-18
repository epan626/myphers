app.controller('accessoriesController', ['$scope', '$rootScope', 'productFactory', 'bannerFactory', '$routeParams', '$location', '$cookies', function($scope, $rootScope, productFactory, bannerFactory, $routeParams, $location, $cookies){
  var cookieProducts = $cookies.getObject('cookieProducts')
	$scope.products = []
	$scope.cart = {}
  $scope.quantityOptions = []
	var populateCart = function() {
		$scope.cart = cookieProducts
		// $scope.cartLength = Object.keys($scope.cart).length
	}
		populateCart()

    var getAccessoriesProductsBanners = function(){
      bannerFactory.getAccessoriesProductsBanners(function(data){
        $scope.accessoriesProductBanner = data.data[0].image[0]
      })
    }
    getAccessoriesProductsBanners()

		$scope.getAccessories = function () {
	    productFactory.getAccessories(function(data){
	      $scope.products = data.data;
				console.log($scope.products);
	    })
	  }
	  $scope.getAccessories()






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
