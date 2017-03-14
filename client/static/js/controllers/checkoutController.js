app.controller('checkoutController', ['$scope', 'productFactory', 'checkoutFactory', 'userFactory', '$routeParams', '$location', '$cookies', function($scope, productFactory, checkoutFactory,  userFactory, $routeParams, $location, $cookies){



  $scope.handleStripe = function(status, response){
	  if(response.error) {
			    console.log("error");
      } else {
			  token = response.id
				checkoutFactory.handleStripe(token, function(result){
					console.log(result);
				})
      }
  }





}]);
