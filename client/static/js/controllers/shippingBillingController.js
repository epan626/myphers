app.controller('shippingBillingController', ['$scope', '$rootScope', 'productFactory', '$routeParams', '$location', '$cookies', function($scope, $rootScope, productFactory, $routeParams, $location, $cookies){
  var cookieProducts = $cookies.getObject('cookieProducts')
	var shipInfo = $cookies.getObject('shipInfo')
	var billInfo = $cookies.getObject('billInfo')
	$scope.products = []
	$scope.cart = {}
  $scope.quantityOptions = []
	var populateCart = function() {
		$scope.cart = cookieProducts
		// $scope.cartLength = Object.keys($scope.cart).length
	}
		populateCart()
		var findCartProducts = function(){
	    $scope.grandTotal  = 0
			productFactory.findCartProducts(cookieProducts, function(result){
				$scope.detailCart = result.data
	      for(var x = 0; x<$scope.detailCart.products.length; x++){
	        $scope.grandTotal += parseInt($scope.detailCart.products[x].subtotal)
	      }
	      $scope.grandTotal = ($scope.grandTotal).toFixed(2)
			})

		}
		console.log(cookieProducts);
		findCartProducts()

		$scope.shippingAddress = function(customer){
			$cookies.putObject('shipInfo', customer)
			$location.url('/checkout')
		}
		$scope.billingAddress = function(customer1){
			$cookies.putObject('billInfo', customer1)
			$location.url('/checkout')
		}

//for billing page
		// $scope.checked = function(customer){
		// 	if(customer.checked){
		// 		customer.FirstName = shipInfo.FirstName
		// 		customer.LastName = shipInfo.LastName
		// 		customer.NumberStreet = shipInfo.NumberStreet
		// 		customer.email = shipInfo.email
		// 		customer.AddressTwo = shipInfo.AddressTwo
		// 		customer.townCity = shipInfo.townCity
		// 		customer.state = shipInfo.state
		// 		customer.zipCode = shipInfo.zipCode
		// 		customer.country = shipInfo.country
		// 	} else {
		// 		customer.FirstName = ""
		// 		customer.LastName = ""
		// 		customer.NumberStreet = ""
		// 		customer.AddressTwo = ""
		// 		customer.townCity = ""
		// 		customer.state = ""
		// 		customer.zipCode = ""
		// 		customer.country = ""
		// 		customer.email = ""
		// 	}
		// }


}])
