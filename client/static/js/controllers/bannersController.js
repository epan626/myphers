app.controller('bannersController', ['$scope', 'bannerFactory', 'userFactory', '$routeParams', '$location', '$cookies', function($scope, bannerFactory,  userFactory, $routeParams, $location, $cookies){
  $scope.loggeduser = {}
  $scope.users =[]
	$scope.bannerCat = ["front", "shirt", "all", ".data", "bottoms", "accessories"]
  var cookie = $cookies.get('cookieloggeduser')

var isUserAdmin = function () {
  if(cookie != undefined) {
    userFactory.isUserAdmin(cookie, function(loggeduser){
      $scope.loggeduser = loggeduser
      if($scope.loggeduser.access_level != 10){
        $location.url('/')
      }
    })
  } else {
    console.log("not logged in");
    $location.url('/')
  }
}
isUserAdmin()

	$scope.dropzoneConfig = {
    'options': {
      url : '/upload_banner',
      maxThumbnailFilesize: 10,
      parallelUploads: 4,
      uploadMultiple: true,
      autoProcessQueue: false
      // previewTemplate: document.getElementById('preview-template').innerHTML
    }
  };


	$scope.createBanner = function(){
		$scope.messages = [];
		$scope.errors = false;
		if($scope.banner==undefined){
			$scope.errors = true;
			$scope.messages.push('Please enter banner information.');
		}
		if(!$scope.banner.category){
			$scope.errors = true;
			$scope.messages.push('Please enter a category.');
		}
		else{
			if($scope.errors == false){
				$scope.dropzone.processQueue()
			}
		}
	}

	$scope.getBanners = function () {
    bannerFactory.getBanners(function(data){
			$scope.frontBanner = []
			for(let i = 0; i < data.data.length; i++){
				if(data.data[i].category == 'front'){
					for (var x = 0; x < data.data[i].image.length; x++) {
						$scope.frontBanner.push(data.data[i].image[x])
						console.log($scope.frontBanner);
					}
					console.log($scope.frontBanner);
				}
				else if(data.data[i].category == 'all'){
					$scope.allBanner = data.data[i].image[0]
				}
				else if(data.data[i].category == 'shirt'){
					$scope.shirtBanner = data.data[i].image[0]
				}
				else if(data.data[i].category == 'outerwear'){
					$scope.outerwearBanner = data.data[i].image[0]
				}
				else if(data.data[i].category == 'bottoms'){
					$scope.bottomsBanner = data.data[i].image[0]
				}
				else if(data.data[i].category == 'accessories'){
					$scope.accessoriesBanner = data.data[i].image[0]
				}
			}
			console.log(data.data);
    })
  }
  $scope.getBanners()






var isUserLogged = function () {
  if($cookies.get('cookieloggeduser') != undefined) {
    $location.url('/dashboard')
  } else {
    console.log("not logged in");
  }
}
// isUserLogged()
var showloggeduser = function () {
      userFactory.showloggeduser(cookie, function(loggeduser){
        $scope.loggeduser = loggeduser
        console.log($scope.loggeduser)
      })
    }
showloggeduser()

    $scope.logout = function() {
      $cookies.remove('cookieloggeduser')
      $location.url('/')
    }


}]);
