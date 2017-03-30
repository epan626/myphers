app.controller('checkoutController', ['$scope', 'productFactory', 'checkoutFactory', 'userFactory', '$routeParams', '$location', '$cookies', function($scope, productFactory, checkoutFactory,  userFactory, $routeParams, $location, $cookies){

  $scope.cookieProducts = $cookies.getObject('cookieProducts')
  $scope.shipInfo = $cookies.getObject('shipInfo')
  var billInfo = $cookies.getObject('billInfo')


  $scope.handleStripe = function(status, response){
	  if(response.error) {
			    console.log("error");
      } else {
        console.log(status);
        console.log(response);
			  token = response.id
				checkoutFactory.handleStripe(token, $scope.shipInfo, $scope.name, $scope.cookieProducts, function(result){
					console.log(result);
          console.log('im back bitches');
          $cookies.remove('cookieProducts')
          $cookies.remove('shipInfo')
          $cookies.remove('billInfo')
          $location.url('/')
				})
      }
  }

  var findCartProducts = function(){
    $scope.grandTotal  = 0
    productFactory.findCartProducts($scope.cookieProducts, function(result){
      $scope.detailCart = result.data
      console.log($scope.detailCart);
      for(var x = 0; x<$scope.detailCart.products.length; x++){
        $scope.grandTotal += parseInt($scope.detailCart.products[x].subtotal)
        if($scope.detailCart.products[x]._id in $scope.cookieProducts){
          $scope.detailCart.products[x].qty = $scope.cookieProducts[$scope.detailCart.products[x]._id]
        }
      }
      $scope.shippingCost = ($scope.detailCart.shippingCost).toFixed(2)
      $scope.grandTotal = (parseInt($scope.grandTotal)+parseInt($scope.shippingCost)).toFixed(2)
    })
  }
  findCartProducts()



}]);
