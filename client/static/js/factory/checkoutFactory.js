app.factory('checkoutFactory', ['$http', '$routeParams', function($http, $routeParams){
var factory = {}

factory.handleStripe = function(token, callback){
	$http.post('/handleStripe', {token: token})
	.then(
		function(result){
			callback(result)
		}
	)
}

return factory
}])
