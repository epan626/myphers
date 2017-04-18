app.controller('dashboardController', ['orderFactory', 'userFactory', '$scope', '$location', '$cookies', function(orderFactory, userFactory, $scope, $location, $cookies){
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
     console.log("not logged in");
     $location.url('/')
   }
 }
 isUserAdmin()

	 var getOrders = function(){
		 orderFactory.getOrders(function(data){
			 $scope.orders = data.data
			 console.log(data.data);
		 })
	 }
	getOrders()
	var showallusers = function() {
		userFactory.allusers(function(data) {
			$scope.users = data
		})
	}
	showallusers()

}])
