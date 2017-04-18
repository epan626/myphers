app.factory('userFactory',['$http', '$routeParams', function($http, $routeParams){
  // var users = [];
  var factory = {};
  // var one = [];
  var loggeduser = {}
  //
  factory.add = function(user, callback){
    $http.post('/add', user)
    .then(
      function(result){
        callback(result.data)
      });
  }
  factory.login = function(user, callback){
    $http.post('/login', user)
    .then(
      function(result){
        console.log('back')
        if(typeof result.data === 'string'){
          callback(result)
        }
        else {
          loggeduser = result.data[0]
          callback(result.data[0])
        }
      });
  }
  factory.isUserAdmin = function(cookie, callback){
    console.log(cookie);
    $http.post('/isUserAdmin', {cookie: cookie})
    .then(
      function(result){
        callback(result.data[0])
      }
    )
  }
  factory.showloggeduser = function(cookie, callback){
    $http.post('/loggeduser', {cookie: cookie})
    .then(
      function(result){
        callback(result.data[0])
      }
    )
  }
  factory.logout = function(){
    loggeduser = {}
  }
  factory.allusers = function(callback){
    $http.get('/allusers')
    .then(
      function(result){
        callback(result.data)
      }
    )
  }
  factory.deleteUser = function(user, callback){
    $http.post('/deleteuser', user)
    .then(
      function(result){
        callback()
      }
    )
  }

  factory.showallorders = function (callback){
    $http.get('/showallorders')
    .then(
      function(result){
        callback(result)
      }
    )
  }

  return factory

}])
