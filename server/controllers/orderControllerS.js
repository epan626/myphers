var mongoose = require('mongoose')
var User = mongoose.model('User');
var Product = mongoose.model('Product')
var Order = mongoose.model('Order')

module.exports = {
  orderproduct: function(req, res){
    console.log(req.body)
      console.log('up here')
    User.find({_id: req.body.customer._id}, function(err, user){
      if(err){
        console.log('error locating user')
      } else {
        Product.find({_id: req.body.product._id}, function(err, product){
          if(err){
            console.log('error locating product')
          } else {
            console.log(req.body.quantity)
            console.log('up here')
            var newProductAmount = parseInt(product[0].quantity) - parseInt(req.body.quantity)
            var newSoldAmount = parseInt(product[0].sold) + parseInt(req.body.quantity)
            var username = user[0].first_name +" "+ user[0].last_name
            var order = new Order({_user: user[0], _product: product[0], customer: username, product: product[0].name, quantity: req.body.quantity})
            user[0]._orders.push(order)
            user[0].save()
            Product.update({_id: req.body.product._id}, {name: req.body.product.name, description: req.body.product.description, image: req.body.product.image, quantity: newProductAmount, sold: newSoldAmount }, function(err, product1){
              if(err){
                console.log('error updating product')
              } else {
                console.log(product1)
                order.save()
                res.json(order)
              }
            })
            }
          })
        }
      })
    },
  showallorders: function(req, res){
    Order.find({}, function(err, orders){
      if(err){
       console.log('error locating all orders')
     } else {
       res.json(orders)
     }
    })
  }
};
