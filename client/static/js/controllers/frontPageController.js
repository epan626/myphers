app.controller('frontPageController', ['productFactory', 'lookbookFactory','bannerFactory', '$scope', '$rootScope','$location', '$cookies', function(productFactory, lookbookFactory, bannerFactory, $scope, $rootScope, $location, $cookies){
    var cookie = $cookies.get('cookieloggeduser')
    $scope.newProducts = []

$scope.showLookbook2 = false
 $scope.showNav = false
    $scope.showLookbook = function(){
      if ($scope.showNav == true) {
        $scope.showNav = false
      }
      if($scope.showLookbook2 == false){
        $scope.showLookbook2 = true
        return $scope.showLookbook2
      } else {
        $scope.showLookbook2 = false
        return $scope.showLookbook2
      }

    }

    $scope.showShop = function(){
      if ($scope.showLookbook2 == true) {
        $scope.showLookbook2 = false
      }
      if($scope.showNav == false){
        $scope.showNav = true
        return $scope.showNav
      } else {
        $scope.showNav = false
        return $scope.showNav
      }
    }
    var populateNewArrivals = function() {
      productFactory.populateNewArrivals(function(products){
        $scope.newProducts = products.data
        $scope.productIndex = -$scope.newProducts.length-1
      })
    }
    populateNewArrivals()

$scope.frontBanner =[]
    var getFrontProductsBanners = function(){
      bannerFactory.getFrontProductsBanners(function(data){
        for (var i = 0; i < data.data[0].image.length; i++) {
          $scope.frontBanner.push(data.data[0].image[i])
        }
      console.log($scope.frontBanner);
      })
    }
    getFrontProductsBanners()

        var getLookbooks = function () {
          lookbookFactory.getLookbooks(function(data){
            $scope.lookbooks = data.data
          })
        }
        getLookbooks()

var getFrontLookbooks = function(){
  lookbookFactory.getLookbooks(function(data){
    $scope.lookbooks2 = data.data
  })
}
getFrontLookbooks()
    // $scope.rightNewArrivalArrow = function(){
    //   if($scope.productIndex<$scope.newProducts.length){
    //      $scope.productIndex += 4
    //      if($scope.productIndex+4 >= $scope.newProducts.length){
    //        document.getElementById("newArrivalsRightArrow").disabled = true;
    //        document.getElementById("newArrivalsRightArrow").style.visibility = "hidden";
    //      }
    //      console.log($scope.productIndex);
    //      console.log($scope.newProducts.length);
    //   }
    // }
    //
    // $scope.leftNewArrivalsArrow = function(){
    //   if($scope.productIndex +4 >= $scope.newProducts.length){
    //      document.getElementById("newArrivalsRightArrow").disabled = false;
    //      document.getElementById("newArrivalsRightArrow").style.visibility = "visible";
    //   }
    //   if($scope.productIndex != 0){
    //      $scope.productIndex -= 4
    //   }
    // }



}])
