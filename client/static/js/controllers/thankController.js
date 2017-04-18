app.controller('thankController', ['$scope', '$rootScope', 'productFactory', 'userFactory', '$routeParams', '$location', '$cookies', function($scope, $rootScope, productFactory,  userFactory, $routeParams, $location, $cookies){
  $scope.loggeduser = {}
  $scope.users =[]
  var cookie = $cookies.get('cookieloggeduser')

  console.log(cookie)

   console.log($rootScope.thankyou);
}]);
