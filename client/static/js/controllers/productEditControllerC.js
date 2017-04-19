app.controller('producteditController', ['$scope', 'productFactory', 'userFactory', '$routeParams', '$location', '$cookies', function($scope, productFactory, userFactory, $routeParams, $location, $cookies){
  $scope.products = []
   $scope.categories = ["shirt", "sweater", "jacket", "shorts", "pants", "other"]
   var cookie = $cookies.get('cookieloggeduser')

   var isUserAdmin = function () {
     if(cookie != undefined) {
       userFactory.isUserAdmin(cookie, function(loggeduser){
         $scope.loggeduser = loggeduser
         if($scope.loggeduser.access_level != 10){
           $location.url('/')
         }
       })
     } else {
       $location.url('/')
     }
   }
   isUserAdmin()

  var editpage = function() {
    productFactory.editpage(function(product){
      $scope.products = product.data
      $scope.selectedCategories = $scope.products[0].category
    })
  }
  editpage()

  $scope.updateProduct = function(){
    productFactory.updateProduct($scope.products[0], function(result){
    })
    $location.url('/products')
  }
  $scope.deleteProduct = function() {
    productFactory.deleteProduct()
    $location.url('/products')
  }
  $scope.changeMainEditImage = function(image){
    $(document).on('click', '.editImagePreview', function(){
      $('#mainEditImage').attr('src', image)
    })
    if(image != $scope.products[0].image[0]){
      var newOrder = []
      newOrder.push(image)
      for(var x = 1; x < $scope.products[0].image.length; x++ ){
        if(image == $scope.products[0].image[x]){
          newOrder.push($scope.products[0].image[0])
        } else {
          newOrder.push($scope.products[0].image[x])
        }
      }
      $scope.products[0].newOrder = newOrder
      productFactory.changeMainEditImage($scope.products[0], function(result){
    })
    }
}
}]);
