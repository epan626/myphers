app.controller('dashboardController', ['orderFactory', 'userFactory', '$scope', '$location', '$cookies', function(orderFactory, userFactory, $scope, $location, $cookies){
   var cookie = $cookies.get('cookieloggeduser')

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
