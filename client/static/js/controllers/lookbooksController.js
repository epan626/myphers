app.controller('lookbooksController', ['lookbookFactory', '$scope', '$location', '$cookies', function(lookbookFactory, $scope, $location, $cookies){


  var getLookbooks = function () {
    lookbookFactory.getLookbooks(function(data){
       $scope.lookbooks = data.data;
    })
  }
  getLookbooks()

}])
