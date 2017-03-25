app.controller('producteditController', ['$scope', 'productFactory', '$routeParams', '$location', function($scope, productFactory, $routeParams, $location){
  $scope.products = []
   $scope.categories = ["shirt", "sweater", "jacket", "shorts", "pants", "other"]

  var editpage = function() {
    productFactory.editpage(function(product){
      console.log(product.data)
      $scope.products = product.data
      console.log($scope.products);         $scope.selectedCategories = $scope.products[0].category
    })
  }
  editpage()

  $scope.updateProduct = function(){
    console.log($scope.products[0])
    productFactory.updateProduct($scope.products[0], function(result){
      console.log(result);
    })
    $location.url('/products')
  }
  $scope.deleteProduct = function() {
    console.log($scope.products[0])
    productFactory.deleteProduct()
    $location.url('/products')
  }
  $scope.changeMainEditImage = function(image){
    console.log(image);
    $(document).on('click', '.editImagePreview', function(){
      $('#mainEditImage').attr('src', image)
    })
      // $('.editImagePreview').click(function(){
      //   console.log("clicked");
      //   $('#mainEditImage').attr('src', image)
      //  })

    if(image != $scope.products[0].image[0]){
      var newOrder = []
      console.log(newOrder);
      newOrder.push(image)
      for(var x = 1; x < $scope.products[0].image.length; x++ ){
        if(image == $scope.products[0].image[x]){
          newOrder.push($scope.products[0].image[0])
        } else {
          newOrder.push($scope.products[0].image[x])
        }
      }
      $scope.products[0].newOrder = newOrder
      console.log($scope.products[0]);
      productFactory.changeMainEditImage($scope.products[0], function(result){
       console.log(result);
    })
    }
}
}]);
