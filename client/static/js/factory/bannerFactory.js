app.factory('bannerFactory', ['$http', '$routeParams', function($http, $routeParams){
  var users = [];
  var factory = {};
  factory.getBanners = function(callback){
    $http.get('/getBanners')
    .then(
      function(result){
        callback(result)
      }
    )
  }
	factory.getAllProductsBanners = function(callback){
    $http.get('/getAllProductsBanners')
    .then(
      function(result){
        callback(result)
      }
    )
  }
	factory.getFrontProductsBanners = function(callback){
    $http.get('/getFrontProductsBanners')
    .then(
      function(result){
        callback(result)
      }
    )
	}
	factory.getOuterwearProductsBanners = function(callback){
    $http.get('/getOuterwearProductsBanners')
    .then(
      function(result){
        callback(result)
      }
    )
	}
	factory.getAccessoriesProductsBanners = function(callback){
    $http.get('/getAccessoriesProductsBanners')
    .then(
      function(result){
        callback(result)
      }
    )
  }
	factory.getShirtProductsBanners = function(callback){
    $http.get('/getShirtProductsBanners')
    .then(
      function(result){
        callback(result)
      }
    )
  }
	factory.getBottomProductsBanners = function(callback){
    $http.get('/getBottomProductsBanners')
    .then(
      function(result){
        callback(result)
      }
    )
  }
return factory

}])
