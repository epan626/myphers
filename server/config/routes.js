var mongoose = require('mongoose');
var Product = require('../controllers/productControllerS.js');
var editProduct = require('../controllers/productEditControllerS.js');
var User = require('../controllers/userControllerS.js');
var Order = require('../controllers/orderControllerS.js');
var Checkout = require('../controllers/checkoutControllerS.js')
var Banner = require('../controllers/bannerController.js')
var Lookbook = require('../controllers/lookbookController.js')
var fs = require('fs');


module.exports = function(app){
  app.post('/createProduct', function(req, res){
    Product.createProduct(req, res)
  })
  app.get('/getProducts', function(req, res){
    Product.getProducts(req, res)
  })
  app.get('/getOrders', function(req, res){
    Order.getOrders(req, res)
  })
  app.put('/orderStatusChange', function(req, res){
    Order.orderStatusChange(req, res)
  })
  app.get('/getBanners', function(req, res){
    Banner.getBanners(req, res)
  })
  app.get('/getLookbooks', function(req, res){
    Lookbook.getLookbooks(req, res)
  })
  app.get('/getAllProductsBanners', function(req, res){
    Banner.getAllProductsBanners(req, res)
  })
  app.get('/getFrontProductsBanners', function(req, res){
    Banner.getFrontProductsBanners(req, res)
  })
  app.get('/getAccessoriesProductsBanners', function(req, res){
    Banner.getAccessoriesProductsBanners(req, res)
  })
  app.get('/getShirtProductsBanners', function(req, res){
    Banner.getShirtProductsBanners(req, res)
  })
  app.get('/getBottomProductsBanners', function(req, res){
    Banner.getBottomProductsBanners(req, res)
  })
  app.get('/getOuterwearProductsBanners', function(req, res){
    Banner.getOuterwearProductsBanners(req, res)
  })
  app.get('/getSoldOutProducts', function(req, res){
    Product.getSoldOutProducts(req, res)
  })
  app.get('/getShirts', function(req, res){
    Product.getShirts(req, res)
  })
  app.get('/getOuterwear', function(req, res){
    Product.getOuterwear(req, res)
  })
  app.get('/getBottoms', function(req, res){
    Product.getBottoms(req, res)
  })
  app.get('/getAccessories', function(req, res){
    Product.getAccessories(req, res)
  })
  app.get('/editpage/:id', function(req, res){
    editProduct.editpage(req, res)
  })
  app.put('/updateProduct', function(req, res){
    editProduct.updateProduct(req, res)
  })
  app.delete('/deleteProduct/:id', function(req, res){
    editProduct.deleteProduct(req, res)
  })
  app.delete('/deleteLookbook/:id', function(req, res){
    Lookbook.deleteLookbook(req, res)
  })
  app.post('/add', function(req, res){
    User.create(req, res)
  })
  app.post('/login', function(req, res){
    User.login(req, res)
  })
  app.post('/loggeduser', function(req, res){
    User.loggeduser(req, res)
  })
  app.post('/isUserAdmin', function(req, res){
    User.isUserAdmin(req, res)
  })
  app.get('/allusers',  function(req, res){
    User.allusers(req, res)
  })
  app.post('/deleteuser', function(req, res){
    User.deleteuser(req, res)
  })
  app.put('/orderProduct', function(req, res){
    Order.orderproduct(req, res)
  })
  app.get('/populateNewArrivals', function(req, res){
    Product.populateNewArrivals(req, res)
  })
  app.post('/findCartProducts', function(req, res ){
    Product.findCartProducts(req, res)
  })
  app.post('/upload_pic', function(req, res){
    Product.createNewProduct(req, res)
  })
  app.post('/upload_banner', function(req, res){
    Banner.createBanner(req, res)
  })
  app.post('/upload_lookbook', function(req, res){
    Lookbook.createLookbook(req, res)
  })
  app.post('/handleStripe', function(req, res){
    Checkout.charge(req, res)
  })
  app.put('/changeMainEditImage', function(req, res){
    editProduct.changeMainEditImage(req, res)
  })
  app.put('/saveTrackingNumber', function(req, res){
    Order.saveTrackingNumber(req, res)
  })
  app.get('/lookbookEditPage/:id', function(req, res){
    Lookbook.lookbookEditPage(req, res)
  })
  app.get('/getSingleLookbook/:id', function(req, res){
    Lookbook.getSingleLookbook(req, res)
  })
  app.put('/deleteImagefromFrontBanner', function(req, res){
    Banner.deleteImagefromFrontBanner(req, res)
  })
}
