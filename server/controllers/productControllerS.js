var mongoose = require('mongoose')
var Product = mongoose.model('Product');

module.exports = {
  createNewProduct: function(req, res){
    var inventory = parseInt(req.body.inventory)
    var product = new Product({name: req.body.name, description: req.body.description, inventory: inventory, price: req.body.price, category: req.body.category, size: req.body.size, image: []})
    req.files.forEach(function(imageFile){
      product.image.push(imageFile.path)
    })
    product.save(function(err, product){
      if(err){
        console.error(err);
        res.json("There was an error while creating the product")
      } else{
        Product.find({}, function(err, allProducts){
          res.json(allProducts)
        });
      }
    });
  },
  getProducts: function(req, res){
    Product.find({}).sort({createdAt: 'desc'}).exec(function(err, products){
      if(err){
        console.error(err);
      } else {
        res.json(products)
      }
    })
  },
  getTops: function(req, res){
    Product.find({category: {$nin: ["pants", "shorts", "other"]}}).sort({createdAt: 'desc'}).exec(function(err, products){
      if(err){
        console.error(err);
      } else {
        res.json(products)
      }
    })
  },
  getBottoms: function(req, res){
    Product.find({category: {$nin: ["shirt", "sweater", "jacket", "other"]}}).sort({createdAt: 'desc'}).exec(function(err, products){
      if(err){
        console.error(err);
      } else {
        res.json(products)
      }
    })
  },
  getAccessories: function(req, res){
    Product.find({category: {$in: ["other"]}}).sort({createdAt: 'desc'}).exec(function(err, products){
      if(err){
        console.error(err);
      } else {
        res.json(products)
      }
    })
  },
  populateNewArrivals: function(req, res){
    Product.find({}).sort({createdAt: 'desc'}).exec(function(err, products){
      if(err){
        console.log('Error occurred locating products')
      } else {
        res.json(products)
      }
    })
  },
  findCartProducts: function(req, res){
    console.log(req.body);
    var count = Object.keys(req.body).length
    var allDetailCart = {}
    var cartProduct = []
    for(var x = 0; x<count; x++){
      cartProduct.push(Object.keys(req.body)[x])
    }
      Product.find({_id: { $in: cartProduct}}).lean().exec(function(err, product){
        if(err){
          console.error('error');
        } else {

          for(var i = 0; i<product.length; i++){
            product[i].qty = req.body[product[i]._id];
            product[i].subtotal = (product[i].qty* product[i].price).toFixed(2)
          }
          allDetailCart['products'] = product
          res.json(allDetailCart)
        }
      })
  }
};
