var mongoose = require('mongoose')
var Product = mongoose.model('Product');

module.exports = {
  createProduct: function(req, res){
    var product = new Product({name: req.body.name, description: req.body.description, image: req.body.image, quantity: req.body.quantity})
    product.save(function(err, product){
      if(err){
        console.log(err)
        res.json('Error while creating product')
      } else {
        console.log('Creating ' + product)
        Product.find({}, function(err, allproducts){
          res.json(allproducts)
      })
    }
  })},
  getProducts: function(req, res){
    Product.find({}, function(err, products){
      if(err){
        console.log('Error occurred locating products')
      } else {
        res.json(products)
      }
    })
  },
  populateNewArrivals: function(req, res){
    Product.find({}, function(err, products){
      if(err){
        console.log('Error populating new arrivals');
      } else {
        res.json(products)
      }
    })
  },
  findCartProducts: function(req, res){
    var count = Object.keys(req.body).length
    var allDetailCart = {}
    var cartProduct = []
    for(var x = 0; x<count; x++){
      cartProduct.push(Object.keys(req.body)[x])
    }
      // console.log(cartProduct);
      Product.find({_id: { $in: cartProduct}}).lean().exec(function(err, product){
        if(err){
          console.error('err');
        } else {
          // console.log(req.body);
          for(var i = 0; i<product.length; i++){
            product[i].qty = req.body[product[i]._id];
            console.log(product[i].qty);
            // console.log(product[i]);
          }
          allDetailCart['products'] = product
          // allDetailCart[quantity] = req.body
          console.log(allDetailCart);
          res.json(allDetailCart)
        }
      })
  }



};
