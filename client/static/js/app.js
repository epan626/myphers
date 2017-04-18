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
    .when('/banners',{
      templateUrl: '/banners.html',
    })
    .when('/edit/:id', {
      templateUrl: '/edit.html',
    })
    .when('/lookbookEdit/:id', {
      templateUrl: 'lookbookEdit.html'
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
    .when('/shirts',{
      templateUrl:'/shirts.html'
    })
    .when('/bottoms',{
      templateUrl:'/bottoms.html'
    })
    .when('/outerwear',{
      templateUrl: '/outerwear.html'
    })
    .when('/accessories',{
      templateUrl:'/accessories.html'
    })
    .when('/shipping',{
      templateUrl: '/shipping.html'
    })
    .when('/billing',{
      templateUrl: '/billing.html'
    })
    .when('/lookbookAdmin',{
      templateUrl: 'lookbookAdmin.html'
    })
    .when('/lookbooks',{
      templateUrl: 'lookbooks.html'
    })
    .when('/lookbook/:id',{
      templateUrl: 'lookbook.html'
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
      if(scope.product){
        formData.append("name", scope.product.name)
        formData.append("description", scope.product.description)
        formData.append("inventory", scope.product.inventory)
        formData.append("price", scope.product.price)
        formData.append("category", scope.product.category)
        formData.append("size", scope.product.size)
        flag = true
      }
      else if(scope.banner){
        formData.append("category", scope.banner.category)
        flag = true
      }
      else if(scope.lookbook){
        formData.append("title", scope.lookbook.title)
        formData.append("description", scope.lookbook.description)
        flag = true
      }
    }

  })

  dropzone.on("complete", function(file, xhr, formData){
    if(scope.product){
      scope.getProducts()
      scope.product.name = ""
      scope.product.description = ""
      scope.product.inventory = 1
      scope.product.price = 0
      scope.product.category = ""
      scope.product.size = ""
      flag = false
      dropzone.removeAllFiles()
    }
    else if(scope.banner){
      scope.getBanners()
      scope.banner.category = ""
      flag = false
      dropzone.removeAllFiles()
    }
    else if(scope.lookbook){
      scope.getLookbooks()
      scope.lookbook.title = ""
      scope.lookbook.description = ""
      flag = true
      dropzone.removeAllFiles()
    }

  })

  scope.dropzone = dropzone;

  };
})
