app.factory('lookbookFactory', ['$http', '$routeParams', function($http, $routeParams){
  var factory = {};
  factory.getLookbooks = function(callback){
		console.log('heye');
    $http.get('/getLookbooks')
    .then(
      function(result){
        callback(result)
      }
    )
  }
	factory.getSingleLookbook = function(callback){
		$http.get('/getSingleLookbook/'+$routeParams.id)
		.then(
			function(result){
				callback(result)
			}
		)
	}

return factory

}])
