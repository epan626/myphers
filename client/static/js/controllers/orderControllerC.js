app.controller('orderController', ['orderFactory', 'userFactory', '$scope', '$location', '$cookies', function(orderFactory, userFactory, $scope, $location, $cookies){
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
