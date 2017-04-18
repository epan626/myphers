app.controller('orderController', ['orderFactory', 'userFactory', '$scope', '$location', '$cookies', function(orderFactory, userFactory, $scope, $location, $cookies){
    var cookie = $cookies.get('cookieloggeduser')

 var showallusers = function() {
   userFactory.allusers(function(data) {
     $scope.users = data
   })
 }
 showallusers()

 var getOrders = function(){
   orderFactory.getOrders(function(data){
     $scope.orders = data.data
     console.log($scope.orders);

   })
 }
getOrders()

$scope.orderStatusChange = function(order){
  orderFactory.orderStatusChange(order, function(data){
    $scope.orders = data.data
  })
}

 $scope.logout = function() {
   $cookies.remove('cookieloggeduser')
   $location.url('/')
 }

}])
