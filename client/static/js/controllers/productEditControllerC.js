app.controller('producteditController', ['$scope', 'productFactory', '$routeParams', '$location', function($scope, productFactory, $routeParams, $location){
  $scope.products = []
  var editpage = function() {
    productFactory.editpage(function(product){
      console.log('back2')
      console.log(product.data)
      $scope.products = product.data
    })
  }
  editpage()

  $scope.updateProduct = function(){
    console.log($scope.products[0])
    productFactory.updateProduct($scope.products[0])
    $location.url('/products')
  }
  $scope.deleteProduct = function() {
    console.log($scope.products[0])
    productFactory.deleteProduct()
    $location.url('/products')
  }
}]);
