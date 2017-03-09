var app = angular.module('app', ['ngRoute', 'ngCookies'])
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
});

app.directive('dropzone', function(){
  return function (scope, element, attrs) {
  var config, dropzone;

  config = scope[attrs.dropzone];

  // create a Dropzone for the element with the given options
  dropzone = new Dropzone(element[0], config.options);

  // bind the given event handlers
  angular.forEach(config.eventHandlers, function (handler, event) {
    dropzone.on(event, handler);
  });

  // scope.processDropzone = function() {
  //   dropzone.processQueue();
  // };
  //
  // scope.resetDropzone = function() {
  //   dropzone.removeAllFiles();
  // }

  scope.dropzone = dropzone;

  };
})
