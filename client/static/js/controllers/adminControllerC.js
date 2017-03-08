app.controller('adminController', ['productFactory', '$scope', '$location', '$cookies', function(productFactory, $scope, $location, $cookies){
    var cookie = $cookies.get('cookieloggeduser')
    console.log(cookie)
}])
