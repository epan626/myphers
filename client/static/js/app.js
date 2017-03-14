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
});


app.directive('dropzone', function(){
  return function (scope, element, attrs) {
  var config, dropzone;

  config = scope[attrs.dropzone];

  dropzone = new Dropzone(element[0], config.options);

  angular.forEach(config.eventHandlers, function (handler, event) {
    dropzone.on(event, handler);
  });

  dropzone.on("sending", function (file, xhr, formData) {
    formData.append("name", scope.product.name)
    formData.append("description", scope.product.description)
    formData.append("quantity", scope.product.quantity)
  })

  dropzone.on("complete", function(file, xhr, formData){
    scope.getProducts()
    scope.product.name = ""
    scope.product.description = ""
    scope.product.quantity = 1
    dropzone.removeAllFiles()
  })

  scope.dropzone = dropzone;

  };
})
