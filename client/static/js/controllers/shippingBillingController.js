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
      $scope.grandTotal  = 0.00
  		productFactory.findCartProducts(cookieProducts, function(result){
  			$scope.detailCart = result.data
        console.log(result.data);
        for(var x = 0; x<$scope.detailCart.products.length; x++){
          if ($scope.grandTotal == 0.00) {
            $scope.grandTotal = parseFloat($scope.detailCart.products[x].subtotal)
          } else {
             $scope.grandTotal += parseFloat($scope.detailCart.products[x].subtotal)
          }

        }
        $scope.shippingCost = (parseFloat($scope.detailCart.shippingCost)).toFixed(2)
        $scope.grandTotal = $scope.grandTotal + $scope.detailCart.shippingCost

  		})
  	}
  	findCartProducts()


		$scope.shippingAddress = function(customer){
      console.log(customer);
      $scope.errors = false
      $scope.messages = []
      if(customer == undefined){
        $scope.errors = true
        $scope.messages.push('Please fill out shipping info')
      } else {
        if(!customer.FirstName){
          $scope.errors = true
          $scope.messages.push('First name is required')
        }
        if(!customer.email){
          $scope.errors = true
          $scope.messages.push('Email is required')
        }
        if(!customer.NumberStreet){
          $scope.errors = true
          $scope.messages.push('Property number and street is required')
        }
        if(!customer.townCity){
          $scope.errors = true
          $scope.messages.push('City or town is required')
        }
        if(!customer.state){
          $scope.errors = true
          $scope.messages.push('State is required')
        }
        if(!customer.zipCode){
          $scope.errors = true
          $scope.messages.push('Zipcode is required')
        }
        if(!customer.country){
          $scope.errors = true
          $scope.messages.push('Country is required')
        }
        else if ( $scope.errors == false){
          $cookies.putObject('shipInfo', customer)
    			$location.url('/checkout')
        }
      }


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
