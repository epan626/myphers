app.controller('lookbookAdminController', ['lookbookAdminFactory', 'userFactory', '$scope', '$location', '$cookies', function(lookbookAdminFactory, userFactory,  $scope, $location, $cookies){
  $scope.products = [];
  var cookie = $cookies.get('cookieloggeduser')
console.log(cookie);

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
      url : '/upload_lookbook',
      maxThumbnailFilesize: 10,
      parallelUploads: 4,
      uploadMultiple: true,
      autoProcessQueue: false
      // previewTemplate: document.getElementById('preview-template').innerHTML
    }
  };

  $scope.createLookbook = function(){
    console.log($scope.lookbook.description);
    $scope.messages = [];
    $scope.errors = false;
    if($scope.lookbook==undefined){
      $scope.errors = true;
      $scope.messages.push('Please enter lookbook information.');
    } else {
      if(!$scope.lookbook.title){
        $scope.errors = true;
        console.log('here');
        $scope.messages.push('Please enter lookbook title.');
      }
      else{
        if($scope.errors == false){
          $scope.dropzone.processQueue()
        }
      }
    }

  }
  //
  // $scope.reset = function(){
  //   $scope.dropzone.removeAllFiles()
  // }

  $scope.getLookbooks = function () {
    lookbookAdminFactory.getLookbooks(function(data){
       $scope.lookbooks = data.data;
    })
  }
  $scope.getLookbooks()


}])
