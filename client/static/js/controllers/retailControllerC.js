app.controller('retailController', ['$scope', '$rootScope', 'productFactory', '$routeParams', '$location', '$cookies', function($scope, $rootScope, productFactory, $routeParams, $location, $cookies){
  var cookieProducts = $cookies.getObject('cookieProducts')
	$scope.products = []
	$scope.cart = {}
  $scope.quantityOptions = []
	var populateCart = function() {
		$scope.cart = cookieProducts
		// $scope.cartLength = Object.keys($scope.cart).length
	}
		populateCart()
  var showSelectedProduct = function() {
    productFactory.editpage(function(product){
      $scope.products = product.data
      var count = 0
      for(var x = 0; x<product.data[0].inventory; x++){
        count ++
        $scope.quantityOptions.push(count)
      }
    })
  }
  showSelectedProduct()

  $scope.changeQuantity = function(product, quantity){
    $scope.quantity = quantity
  }

	$scope.addToCart = function(product) {
		var id = product._id
		var allProduct = $cookies.getObject('cookieProducts')
		var newProducts = {}
    var quantity = 0
    if(product.inventory>1){
      if($scope.quantity == undefined){
        quantity = 1
      } else {
        quantity = $scope.quantity
      }
    } else {
      if(product.inventory==1){
        quantity = 1
      }
    }
    if(cookieProducts == undefined) {
      newProducts[id] = quantity
      $cookies.putObject('cookieProducts', newProducts)
    } else if(!(id in allProduct)){
        if(quantity <= product.inventory ) {
          newProducts[id] = quantity
          Object.assign(newProducts, allProduct)
          $cookies.putObject('cookieProducts', newProducts)
        }
      } else {
        if(id in allProduct){
          var newQuantity = parseInt(allProduct[id])+parseInt(quantity)
          if(newQuantity <= parseInt(product.inventory)) {
            allProduct[id] = newQuantity
          $cookies.putObject('cookieProducts', allProduct)
        } else if (newQuantity >=parseInt(product.inventory)){
          allProduct[id] = product.inventory
          $cookies.putObject('cookieProducts', allProduct)
        }
        }
      }
    }
  $scope.changeMainRetailImage = function(image){
    console.log(image);
    $(document).on('click', '.previewRetailImage', function(){
      $('#mainRetailImage').attr('src', image)
    })
      // $('.editImagePreview').click(function(){
      //   console.log("clicked");
      //   $('#mainEditImage').attr('src', image)
      //  })

    // if(image != $scope.products[0].image[0]){
    //   var newOrder = []
    //   console.log(newOrder);
    //   newOrder.push(image)
    //   for(var x = 1; x < $scope.products[0].image.length; x++ ){
    //     if(image == $scope.products[0].image[x]){
    //       newOrder.push($scope.products[0].image[0])
    //     } else {
    //       newOrder.push($scope.products[0].image[x])
    //     }
    //   }
    //   $scope.products[0].newOrder = newOrder
    //   console.log($scope.products[0]);
    //   productFactory.changeMainEditImage($scope.products[0], function(result){
    //    console.log(result);
    // })
    // }
}

}])
