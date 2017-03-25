Stripe.setPublishableKey('pk_test_7HijwgM5g2NN7U9q9pTS7QCD')

var app = angular.module('app', ['ngRoute', 'ngCookies', 'ui.bootstrap', 'angularPayments'])
/* configuration for angular route */
app.config(['$locationProvider', function($locationProvider){
  $locationProvider.hashPrefix('')
  // $locationProvider.html5Mode(true)
}])



app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/front.html',
    })
    .when('/register', {
      templateUrl: '/login.html'
    })
    .when('/dashboard', {
      templateUrl: '/dashboard.html',
    })
    .when('/products',{
      templateUrl: '/products.html',
    })
    .when('/edit/:id', {
      templateUrl: '/edit.html',
    })
    .when('/customers',{
      templateUrl: '/customers.html',
    })
    .when('/orders', {
      templateUrl: '/orders.html',
    })
    .when('/retail/:id', {
      templateUrl: '/retail.html',
    })
    .when('/cart', {
      templateUrl: '/cart.html',
    })
    .when('/shopping_cart', {
      templateUrl: '/shopping_cart.html'
    })
    .when('/checkout',{
      templateUrl:'/checkout.html'
    })
    .when('/all',{
      templateUrl:'/all.html'
    })
    .when('/tops',{
      templateUrl:'/tops.html'
    })
    .when('/bottoms',{
      templateUrl:'/bottoms.html'
    })
    .when('/accessories',{
      templateUrl:'/accessories.html'
    })
});


app.directive('dropzone', function(){
  return function (scope, element, attrs) {
  var config, dropzone;

  config = scope[attrs.dropzone];

  dropzone = new Dropzone(element[0], config.options);

  angular.forEach(config.eventHandlers, function (handler, event) {
    dropzone.on(event, handler);
  });
    var flag = false
  dropzone.on("sending", function (file, xhr, formData) {
    if(flag == false){
      formData.append("name", scope.product.name)
      formData.append("description", scope.product.description)
      formData.append("inventory", scope.product.inventory)
      formData.append("price", scope.product.price)
      formData.append("category", scope.product.category)
      formData.append("size", scope.product.size)
      flag = true
    }

  })

  dropzone.on("complete", function(file, xhr, formData){
    scope.getProducts()
    scope.product.name = ""
    scope.product.description = ""
    scope.product.inventory = 1
    scope.product.price = 0
    scope.product.category = ""
    scope.product.size = ""
    flag = false
    dropzone.removeAllFiles()
  })

  scope.dropzone = dropzone;

  };
})
