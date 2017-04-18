var mongoose = require('mongoose')
var Product = mongoose.model('Product');
var fs = require('fs');

module.exports = {
  editpage: function(req, res) {
    Product.find({_id: req.params.id}, function(err, product){
      if(err){
      res.json(err)
    } else {
      res.json(product)
    }
    })
  },
  //updates product
  updateProduct: function(req, res){
    Product.update({_id: req.body._id}, {name: req.body.name, description: req.body.description, image: req.body.image, inventory: req.body.inventory, size: req.body.size, sold: req.body.sold, price: req.body.price, condition: req.body.condition}, function(err, product){
      if(err){
        res.json(err)
      } else {
        res.json('Product was updated successfully.')
      }
    })
  },
  //rearranges the product view images
  changeMainEditImage: function(req, res){
    Product.update({_id: req.body._id}, {image: req.body.newOrder}, function(err, product){
      if(err){
        console.error(err);
      } else {
        res.json(product)
      }
    })
  },
   //locates and deletes product's images from server then from DB
  deleteProduct: function(req, res){
    Product.findOne({_id: req.params.id}, function(err, product){
      if(err){
        console.error(err);
      } else {
        for(let i = 0; i < product.image.length; i++){
          let imageLocation = product.image[i]
          try {
            fs.unlinkSync(imageLocation);
          } catch (err) {
            console.log(err);
          }
        }
        Product.remove({_id: req.params.id}, function(err, success){
          if(err){
            console.log(err)
          } else {
            res.json('Product was deleted successfully')
          }
        })
      }
    })
  },

}
