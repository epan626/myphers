app.controller('lookbookAdminController', ['lookbookAdminFactory', '$scope', '$location', '$cookies', function(lookbookAdminFactory, $scope, $location, $cookies){
  $scope.products = [];
  var cookie = $cookies.get('cookieloggeduser')

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
