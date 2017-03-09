app.controller('orderController', ['productFactory', 'userFactory', '$scope', '$location', '$cookies', function(productFactory, userFactory, $scope, $location, $cookies){
    var cookie = $cookies.get('cookieloggeduser')
    console.log("=======================");
    console.log(cookie);
    console.log("=======================");
 $scope.users = [];
 $scope.products =[];
 $scope.orders = [];

 var showallusers = function() {
   userFactory.allusers(function(data) {
     $scope.users = data
     console.log($scope.users)
   })
 }
 showallusers()


 var getProducts = function () {

   productFactory.getProducts(function(data){
   $scope.products = data.data;
   console.log($scope.products)
 })
 }
 getProducts()

 var showallorders = function() {
   userFactory.showallorders(function(data) {
     $scope.orders = data.data
     console.log($scope.orders)
   })
 }
 showallorders()
 $scope.logout = function() {
   $cookies.remove('cookieloggeduser')
   $location.url('/')
 }
$scope.order = function() {
   $scope.errors = false;
   $scope.messages = [];
  console.log($scope.selected)
  if(!$scope.selected){
    $scope.errors = true;
    $scope.messages.push('You must select a customer and product to place an order')
  }
  if($scope.selected.product.quantity==0){
    $scope.errors = true;
    $scope.messages.push('Sorry, but this item is soldout')
  }
  if($scope.selected.product.quantity-$scope.selected.quantity<0){
    $scope.errors = true;
    $scope.messages.push('Sorry, there is not enough quantity')
  } else {
    $scope.errors = false;
    productFactory.orderProduct($scope.selected, function(results){
      console.log(result)
    })
  }
}
}])
