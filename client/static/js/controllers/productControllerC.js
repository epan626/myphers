app.controller('productController', ['productFactory', '$scope', '$location', '$cookies', function(productFactory, $scope, $location, $cookies){
  $scope.products = [];
//   $scope.loggeduser = {};
//   $scope.allmessage = [];
//
//   var cookie = $cookies.get('cookieloggeduser')

$scope.createProduct = function() {
  $scope.messages = [];
  $scope.errors = false;
  if($scope.product==undefined){
    $scope.errors = true;
    $scope.messages.push('Please enter product information.');
  }
  if(!$scope.product.name){
    $scope.errors = true;
    $scope.messages.push('Please enter product name.');
  }
  if($scope.product.image =='http://'){
    $scope.errors = true;
    $scope.messages.push('Please enter an image url.');
  }
  if(!$scope.product.description){
    $scope.errors = true;
    $scope.messages.push('Please enter product description.');
  }
  if(!$scope.product.quantity){
    $scope.errors = true;
    $scope.messages.push('Please enter product quantity.');
  } else{
    if($scope.errors == false){
    $scope.errors = false;
    productFactory.createProduct($scope.product, function(result){
      getProducts()
  });
    }
  }
};

var getProducts = function () {
  console.log('here1')
  productFactory.getProducts(function(data){
  $scope.products = data.data;
  console.log($scope.products)
})
}
getProducts()

$scope.edit = function(){
  productFactory.edit($scope.product)
}
}])
