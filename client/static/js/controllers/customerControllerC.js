app.controller('customerController', ['$scope', 'productFactory', 'userFactory', '$routeParams', '$location', '$cookies', function($scope, productFactory,  userFactory, $routeParams, $location, $cookies){
  $scope.loggeduser = {}
  $scope.users =[]
  var cookie = $cookies.get('cookieloggeduser')

  console.log(cookie)

  $scope.register = function(){
    $scope.messages = [];
    $scope.errors = false;
  if($scope.user==undefined){
    $scope.errors = true;
    $scope.messages.push('Your information is required!')
  }
  if(!$scope.user.email){
    $scope.errors = true;
    $scope.messages.push('Your email is required!')
  }
  if(!$scope.user.first_name){
    $scope.errors = true;
    $scope.messages.push('Your first name is required!')
  }
  if(!$scope.user.last_name){
    $scope.errors = true;
    $scope.messages.push('Your last name is required!')
  }
  if(!$scope.user.password){
    $scope.errors = true;
    $scope.messages.push('Your password is required!')
  }
  if($scope.user.password != $scope.user.conpassword){
    $scope.errors = true;
    $scope.messages.push('Your password must match')
  }
  else {
    if($scope.errors == false){
      userFactory.add($scope.user, function(result){
          $scope.errors = true;
          $scope.messages.push(result);
      })
    }
  }
};

$scope.login = function() {
  $scope.messages = [];
  $scope.errors = false;
if($scope.one==undefined){
  $scope.errors = true;
  $scope.messages.push('Your login information is required!')
  }
if(!$scope.one.email){
  $scope.errors = true;
  $scope.messages.push('Your email is required!')
  }
if(!$scope.one.password){
  $scope.errors = true;
  $scope.messages.push('Your password is required!')
} else {
  if($scope.errors == false){
  userFactory.login($scope.one, function(result){
          if(typeof result.data === 'string'){
            $scope.errors = true;
            $scope.messages.push(result.data);
          } else {
          $cookies.put('cookieloggeduser', result._id)
          $location.url('/dashboard')
          }
      })
  }
}
}

var isUserLogged = function () {
  if(cookie != undefined) {
    $location.url('/dashboard')
  } else {
    console.log("not logged in");
  }
}
isUserLogged()
var showloggeduser = function () {
      userFactory.showloggeduser(cookie, function(loggeduser){
        $scope.loggeduser = loggeduser
        console.log($scope.loggeduser)
      })
    }
showloggeduser()

    $scope.logout = function() {
      $cookies.remove('cookieloggeduser')
      $location.url('/')
    }

  var showallusers = function() {
    userFactory.allusers(function(data) {
      $scope.users = data
    })
  }
  showallusers()
$scope.deleteUser = function(user){
  console.log(user)
  userFactory.deleteUser(user, function(callback){
    showallusers()
  })
}
}]);
