var mongoose = require('mongoose')
var Product = mongoose.model('Product');

module.exports = {
  editpage: function(req, res) {
    Product.find({_id: req.params.id}, function(err, product){
      if(err){
      res.json(err)
    } else {
      console.log(product)
      res.json(product)
    }
    })
  },
  updateProduct: function(req, res){
    Product.update({_id: req.body._id}, {name: req.body.name, description: req.body.description, image: req.body.image, inventory: req.body.inventory, size: req.body.size, sold: req.body.sold, price: req.body.price, condition: req.body.condition}, function(err, product){
      if(err){
        console.log(err)
        res.json(err)
    } else {
      res.json('Product was updated successfully.')
    }
    })
  },
  changeMainEditImage: function(req, res){
    Product.update({_id: req.body._id}, {image: req.body.newOrder}, function(err, product){
      if(err){
        console.error(err);
      } else {
        console.log(product);
        res.json(product)
      }
    })
  },
  deleteProduct: function(req, res){
    Product.remove({_id: req.params.id}, function(err, success){
      if(err){
        console.log(err)
      } else {
        res.json('Product was deleted successfully')
      }
    })
  }
}
