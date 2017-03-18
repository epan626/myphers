app.factory('productFactory', ['$http', '$routeParams', function($http, $routeParams){
  var users = [];
  var factory = {};
  factory.getProducts = function(callback){
    $http.get('/getProducts')
    .then(
      function(result){
        callback(result)
      }
    )
  }
  factory.editpage = function(callback){
    $http.get('/editpage/'+$routeParams.id)
    .then(
      function(result){
        callback(result)
      }
    )
  }
  // factory.edit = function(product){
  //   $http.get('/editpage', product)
  // }
  factory.updateProduct = function(product, callback){
    $http.put('/updateProduct', product)
    .then(
      function(result){
        callback(result)
      }
    )
  }
  factory.deleteProduct = function(callback){
    $http.delete('/deleteProduct/'+$routeParams.id)
    .then(
      console.log('Successfully deleted')
    )
  }

  factory.orderProduct = function(order, callback){
    $http.put('/orderProduct', order)
    .then(
      function(result){
        console.log(result)
      }
    )
  }

  factory.populateNewArrivals = function(callback){
    $http.get('/populateNewArrivals')
    .then(
      function(result){
        callback(result)
      }
    )
  }
  factory.findCartProducts = function(cart, callback){
    $http.post('/findCartProducts', cart )
    .then(
      function(result){
        callback(result)
      }
    )
  }
  factory.changeMainEditImage = function(product, callback){
    $http.put('/changeMainEditImage', product)
    .then(
      function(result){
        callback(result)
      }
    )
  }
return factory

}])
