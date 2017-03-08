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
    console.log('atupdate')
    console.log(req.body.quantity)
    Product.update({_id: req.body._id}, {name: req.body.name, description: req.body.description, image: req.body.image, quantity: req.body.quantity}, function(err, product){
      if(err){
        console.log(err)
        console.log('error?')
      res.json(err)
    } else {
      res.json('yes')
    }
    })
  },

  deleteProduct: function(req, res){
    console.log(req.params)
    console.log('up')
    Product.remove({_id: req.params.id}, function(err, success){
      if(err){
        console.log(err)
        console.log('error?')
      } else {
        console.log('successfully deleted')
        res.json('success')
      }
    })
  }
}
