app.factory('checkoutFactory', ['$http', '$routeParams', function($http, $routeParams){
var factory = {}

factory.handleStripe = function(token, shipInfo, nameCard, cookieProducts, callback){
	var customerInfo = {}
	customerInfo.token = token
	customerInfo.shipInfo = shipInfo
	customerInfo.NameCard = nameCard
	// customerInfo.billInfo = billInfo
	customerInfo.products = cookieProducts
	$http.post('/handleStripe', customerInfo)
	.then(
		function(result){
			callback(result)
		}
	)
}

return factory
}])
