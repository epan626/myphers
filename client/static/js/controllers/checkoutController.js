app.controller('checkoutController', ['$scope', '$rootScope', 'productFactory', 'checkoutFactory', 'userFactory', '$routeParams', '$location', '$cookies', function($scope, $rootScope,productFactory, checkoutFactory,  userFactory, $routeParams, $location, $cookies){

  $scope.cookieProducts = $cookies.getObject('cookieProducts')
  $scope.shipInfo = $cookies.getObject('shipInfo')
  var billInfo = $cookies.getObject('billInfo')


  $scope.handleStripe = function(status, response){
    $scope.messages = []
    $scope.errors = false
	  if(response.error || status == 400) {
      $scope.messages.push("Invalid Credit Card")
			$scope.errors = true
      } else {
			  token = response.id
				checkoutFactory.handleStripe(token, $scope.shipInfo, $scope.name, $scope.cookieProducts, function(result){
          $cookies.remove('cookieProducts')
          $cookies.remove('shipInfo')
          $cookies.remove('billInfo')
          $rootScope.thankyou = "Thank you for your purchase! Your receipt will be sent to "+result.data.email+"."
          $location.url('/')
				})
      }
  }

  var findCartProducts = function(){
    $scope.grandTotal  = 0.00
    productFactory.findCartProducts($scope.cookieProducts, function(result){
      $scope.detailCart = result.data
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


}]);
