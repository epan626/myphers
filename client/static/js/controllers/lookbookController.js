app.controller('lookbookController', ['lookbookFactory', '$scope', '$location', '$cookies', function(lookbookFactory, $scope, $location, $cookies){


  var getSingleLookbook = function () {
    lookbookFactory.getSingleLookbook(function(data){
       $scope.lookbook = data.data[0];
			 console.log($scope.lookbook);
    })
  }
  getSingleLookbook()

}])
