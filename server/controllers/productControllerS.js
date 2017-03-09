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
  createNewProduct: function(req, res){
    var quantity = parseInt(req.body.quantity)
    var product = new Product({name: req.body.name, description: req.body.description, quantity: quantity, image: []})
    req.files.forEach(function(imageFile){
      product.image.push(imageFile.path)
    })
    product.save(function(err, product){
      if(err){
        console.log(err);
        res.json("There was an error while creating the product")
      } else{
        console.log(product);
        Product.find({}, function(err, allProducts){
          res.json(allProducts)
        });
      }
    });
  }

};
