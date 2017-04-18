app.factory('orderFactory', ['$http', '$routeParams', function($http, $routeParams){
  var users = [];
  var factory = {};
  factory.getOrders = function(callback){
    $http.get('/getOrders')
    .then(
      function(result){
        callback(result)
      }
    )
  }
	factory.orderStatusChange = function(order, callback){
    $http.put('/orderStatusChange', order)
    .then(
      function(result){
        callback(result)
      }
    )
  }
return factory

}])
