app.controller('frontPageController', ['productFactory', '$scope', '$location', '$cookies', function(productFactory, $scope, $location, $cookies){
    var cookie = $cookies.get('cookieloggeduser')
    $scope.newProducts = []


    var populateNewArrivals = function() {
      productFactory.populateNewArrivals(function(products){
        $scope.newProducts = products.data
        $scope.productIndex = -$scope.newProducts.length-1
      })
    }
    populateNewArrivals()

    $scope.rightNewArrivalArrow = function(){
      if($scope.productIndex<$scope.newProducts.length){
         $scope.productIndex += 4
         if($scope.productIndex+4 >= $scope.newProducts.length){
           document.getElementById("newArrivalsRightArrow").disabled = true;
           document.getElementById("newArrivalsRightArrow").style.visibility = "hidden";
         }
         console.log($scope.productIndex);
         console.log($scope.newProducts.length);
      }
    }

    $scope.leftNewArrivalsArrow = function(){
      if($scope.productIndex +4 >= $scope.newProducts.length){
         document.getElementById("newArrivalsRightArrow").disabled = false;
         document.getElementById("newArrivalsRightArrow").style.visibility = "visible";
      }
      if($scope.productIndex != 0){
         $scope.productIndex -= 4
      }
    }



}])
