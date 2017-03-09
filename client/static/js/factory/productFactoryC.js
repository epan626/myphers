app.factory('productFactory', ['$http', '$routeParams', function($http, $routeParams){
  var users = [];
  var factory = {};
  // var one = [];
  // var loggeduser = {}
  factory.createProduct = function(product, callback){
    console.log(product)
    $http.post('/createProduct', product)
    .then(
      function(result){
        callback()
      })
  }
  factory.getProducts = function(callback){
    console.log('here2')
    $http.get('/getProducts')
    .then(
      function(result){
        console.log('here again')
        console.log(result)
        callback(result)
      }
    )
  }
  factory.editpage = function(callback){
    console.log($routeParams)
    $http.get('/editpage/'+$routeParams.id)
    .then(
      function(result){
        console.log('back')
        console.log(result)
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
    console.log('error?')
    $http.put('/orderProduct', order)
    .then(
      function(result){
        console.log('error?')
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

return factory

}])
