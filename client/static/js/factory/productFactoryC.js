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
  factory.getSoldOutProducts = function(callback){
    $http.get('/getSoldOutProducts')
    .then(
      function(result){
        callback(result)
      }
    )
  }
  factory.getShirts = function(callback){
    $http.get('/getShirts')
    .then(
      function(result){
        callback(result)
      }
    )
  }
  factory.getOuterwear = function(callback){
    $http.get('/getOuterwear')
    .then(
      function(result){
        callback(result)
      }
    )
  }
  factory.getBottoms = function(callback){
    $http.get('/getBottoms')
    .then(
      function(result){
        callback(result)
      }
    )
  }
  factory.getAccessories = function(callback){
    $http.get('/getAccessories')
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
      function(result){
        callback(result)
      }
    )
  }

  factory.orderProduct = function(order, callback){
    $http.put('/orderProduct', order)
    .then(
      function(result){
        callback(result)
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
  factory.removeFromCart = function(allProduct, callback){
    $http.post('/findCartProducts', allProduct)
    .then(
      function(result){
        callback(result)
      }
    )
  }

return factory

}])
