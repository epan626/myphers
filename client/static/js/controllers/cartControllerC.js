app.controller('cartController', ['$scope', '$rootScope', 'productFactory', '$routeParams', '$location', '$cookies', function($scope, $rootScope, productFactory, $routeParams, $location, $cookies){
  var cookieProducts = $cookies.getObject('cookieProducts')
	var findCartProducts = function(){
    $scope.grandTotal  = 0
		productFactory.findCartProducts(cookieProducts, function(result){
			$scope.detailCart = result.data
      console.log($scope.detailCart);
      for(var x = 0; x<$scope.detailCart.products.length; x++){
        $scope.grandTotal += parseInt($scope.detailCart.products[x].subtotal)
      }
      $scope.shippingCost = ($scope.detailCart.shippingCost).toFixed(2)
      $scope.grandTotal = (parseInt($scope.grandTotal)+parseInt($scope.shippingCost)).toFixed(2)
		})
	}
	findCartProducts()

  $scope.removeFromCart = function(product){
    $scope.shippingCost = 0
    var allProduct = $cookies.getObject('cookieProducts')
    var id = product._id

    if(id in allProduct){
      delete allProduct[id]
      product.hide=true
    }
    productFactory.removeFromCart(allProduct, function(result){
      $cookies.putObject('cookieProducts', allProduct)
      $scope.grandTotal  = 0
      $scope.detailCart = result.data
      for(var x = 0; x<$scope.detailCart.products.length; x++){
        $scope.grandTotal += parseInt($scope.detailCart.products[x].subtotal)
      }
      $scope.grandTotal += result.data.shippingCost
      $scope.shippingCost = (result.data.shippingCost).toFixed(2)
      $scope.grandTotal = ($scope.grandTotal).toFixed(2)
    })
  }

  $scope.updateCart = function(newQuantity){
    var newProducts ={}
    $scope.messages = [];
    $scope.errors = false;
    for(var x = 0; x<newQuantity.length; x++){
      if(newQuantity[x].qty>newQuantity[x].inventory){
        $scope.messages.push(newQuantity[x].name +"\'s max quantity is "+ newQuantity[x].inventory);
        $scope.errors = true
      }
    }
    if($scope.errors == false){
      $scope.grandTotal  = 0
      for(var i = 0; i<newQuantity.length; i++){
        var id = newQuantity[i]._id
        if(newQuantity[i].qty > 0) {
          newProducts[id] = parseInt(newQuantity[i].qty)
        }
      }
       $cookies.putObject('cookieProducts', newProducts)
  		productFactory.findCartProducts(newProducts, function(result){
  			$scope.detailCart = result.data
        for(var x = 0; x<$scope.detailCart.products.length; x++){
          $scope.grandTotal += parseInt($scope.detailCart.products[x].subtotal)
        }
        $scope.shippingCost = (result.data.shippingCost).toFixed(2)

        $scope.grandTotal = $scope.grandTotal + parseInt(result.data.shippingCost)
        $scope.grandTotal = ($scope.grandTotal).toFixed(2)
  		})
    }
  }

  // $scope.logout = function() {
  //   $cookies.remove('cookieloggeduser')
  //   $location.url('/')
  // }


}]);
