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
