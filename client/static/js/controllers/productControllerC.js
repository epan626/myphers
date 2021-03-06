app.controller('productController', ['productFactory', 'userFactory','$scope', '$location', '$cookies', function(productFactory, userFactory, $scope, $location, $cookies){
  $scope.products = [];
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
    $location.url('/')
  }
}
isUserAdmin()
  $scope.categories = ["shirt", "sweater", "jacket", "shorts", "pants", "other"]
  $scope.sizes = ["XS","S", "M", "L", "XL", "XXL"]
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
    if(!$scope.product.condition){
      $scope.errors = true;
      $scope.messages.push('Please enter product condition.');
    }
    if(!$scope.product.inventory){
      $scope.errors = true;
      $scope.messages.push('Please enter product inventory.');
    }
    if(!$scope.product.price){
      $scope.errors = true;
      $scope.messages.push('Please enter product price.');
    }
    if(!$scope.product.category){
      $scope.errors = true;
      $scope.messages.push('Please select a product category.');
    }
    if(!$scope.product.size){
      $scope.errors = true;
      $scope.messages.push('Please select a product size.');
    }
    else{
      if($scope.errors == false){
        $scope.dropzone.processQueue()
      }
    }
  }

  $scope.getProducts = function () {
    productFactory.getProducts(function(data){
      $scope.products = data.data;
    })
  }
  $scope.getProducts()

  var getSoldOutProducts = function(){
    productFactory.getSoldOutProducts(function(data){
      $scope.soldOutProducts = data.data
    })
  }
  getSoldOutProducts()

  $scope.edit = function(){
    productFactory.edit($scope.product)
  }
}])
