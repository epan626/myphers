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
    Product.find({inventory: {$gt: 0}}).sort({createdAt: 'desc'}).exec(function(err, products){
      if(err){
        console.error(err);
      } else {
        res.json(products)
      }
    })
  },
  getTops: function(req, res){
    Product.find({category: {$nin: ["pants", "shorts", "other"]}, inventory: {$gt: 0}}).sort({createdAt: 'desc'}).exec(function(err, products){
      if(err){
        console.error(err);
      } else {
        console.log(products);
        res.json(products)
      }
    })
  },
  getBottoms: function(req, res){
    Product.find({category: {$nin: ["shirt", "sweater", "jacket", "other"]}, inventory: {$gt: 0}}).sort({createdAt: 'desc'}).exec(function(err, products){
      if(err){
        console.error(err);
      } else {
        res.json(products)
      }
    })
  },
  getAccessories: function(req, res){
    Product.find({category: {$in: ["other"]}, inventory: {$gt: 0}}).sort({createdAt: 'desc'}).exec(function(err, products){
      if(err){
        console.error(err);
      } else {
        res.json(products)
      }
    })
  },
  populateNewArrivals: function(req, res){
    Product.find({inventory: {$gt: 0}}).sort({createdAt: 'desc'}).exec(function(err, products){
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
    var shipCalculator = {
      jacket: 0, sweater: 0, sweatshirt: 0, shirt: 0, shorts: 0, pants: 0, other: 0
    };
    var shippingCost = 0
    console.log(count);
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
            if(product[i].category in shipCalculator){
              shipCalculator[product[i].category] +=req.body[product[i]._id]
            }
          }
          // need shipping logic here
          if(shipCalculator['jacket']==1){
            shippingCost = 10
          }
          else if(shipCalculator['jacket']>1){
            shippingCost = 12
          }
          else if(shipCalculator['sweater']>0){
            shippingCost = 8
          }
          else if(shipCalculator['sweatshirt'] > 0 ){
            shippingCost = 6
          }
          else if(shipCalculator['shirt'] + shipCalculator['shorts'] + shipCalculator['pants'] + shipCalculator['other'] > 5 ) {
            shippingCost = 7
          }
          else if(shipCalculator['shirt'] + shipCalculator['shorts'] + shipCalculator['pants'] + shipCalculator['other'] > 3 ) {
            shippingCost = 6
          }
          else if(shipCalculator['shirt'] > 0 || shipCalculator['shorts'] > 0 || shipCalculator['pants'] > 0 || shipCalculator['other'] > 0 ){
            shippingCost = 5
          }
          allDetailCart['products'] = product
          allDetailCart['shippingCost'] = shippingCost
          console.log(shipCalculator);
          res.json(allDetailCart)
        }
      })
  }
};
