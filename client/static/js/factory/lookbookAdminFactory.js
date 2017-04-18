app.factory('lookbookAdminFactory', ['$http', '$routeParams', function($http, $routeParams){
  var users = [];
  var factory = {};
  factory.getLookbooks = function(callback){
    $http.get('/getLookbooks')
    .then(
      function(result){
        callback(result)
      }
    )
  }
  factory.lookbookEditPage = function(callback){
    $http.get('/lookbookEditPage/'+$routeParams.id)
    .then( function(result){
      callback(result)
    })
  }
  factory.deleteLookbook = function(callback){
    $http.delete('/deleteLookbook/'+$routeParams.id)
  }


return factory

}])
