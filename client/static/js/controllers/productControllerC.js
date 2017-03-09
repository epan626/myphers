app.controller('productController', ['productFactory', '$scope', '$location', '$cookies', function(productFactory, $scope, $location, $cookies){
  $scope.products = [];

  $scope.dropzoneConfig = {
    'options': {
      url : '/upload_pic',
      maxThumbnailFilesize: 10,
      parallelUploads: 4,
      uploadMultiple: true,
      autoProcessQueue: false
      // previewTemplate: document.getElementById('preview-template').innerHTML
    }
  };

  $scope.createProduct = function(){
    $scope.messages = [];
    $scope.errors = false;
    if($scope.product==undefined){
      $scope.errors = true;
      $scope.messages.push('Please enter product information.');
    }
    if(!$scope.product.name){
      $scope.errors = true;
      $scope.messages.push('Please enter product name.');
    }
    if(!$scope.product.description){
      $scope.errors = true;
      $scope.messages.push('Please enter product description.');
    }
    if(!$scope.product.quantity){
      $scope.errors = true;
      $scope.messages.push('Please enter product quantity.');
    }
    else{
      if($scope.errors == false){
        $scope.dropzone.processQueue()
      }
    }
  }

  $scope.reset = function(){
    $scope.dropzone.removeAllFiles()
  }

  $scope.getProducts = function () {
    productFactory.getProducts(function(data){
      $scope.products = data.data;
    })
  }
  $scope.getProducts()

  $scope.edit = function(){
    productFactory.edit($scope.product)
  }
}])
