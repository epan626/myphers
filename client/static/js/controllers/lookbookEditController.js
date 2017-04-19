app.controller('lookbookEditController', ['$scope', 'productFactory', 'userFactory', 'lookbookAdminFactory', '$routeParams', '$location', '$cookies', function($scope, productFactory, userFactory, lookbookAdminFactory, $routeParams, $location, $cookies){
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
lookbookEditPage = function(){
	lookbookAdminFactory.lookbookEditPage(function(lookbook){
		$scope.lookbook = lookbook.data[0]
	})
}
	lookbookEditPage()
$scope.deleteLookbook = function(){
 lookbookAdminFactory.deleteLookbook()
	 $location.url('/lookbookAdmin')
}

}]);
