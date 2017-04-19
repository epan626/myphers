var mongoose = require('mongoose')
var User = mongoose.model('User');
var Product = mongoose.model('Product')
var Order = mongoose.model('Order')

module.exports = {
  orderproduct: function(req, res){
    User.find({_id: req.body.customer._id}, function(err, user){
      if(err){
        console.log('error locating user')
      } else {
        Product.find({_id: req.body.product._id}, function(err, product){
          if(err){
            console.log('error locating product')
          } else {
            var newProductAmount = parseInt(product[0].quantity) - parseInt(req.body.quantity)
            var newSoldAmount = parseInt(product[0].sold) + parseInt(req.body.quantity)
            var username = user[0].first_name +" "+ user[0].last_name
            var order = new Order({_user: user[0], _product: product[0], customer: username, product: product[0].name, quantity: req.body.quantity})
            // user[0]._orders.push(order)
            // user[0].save()
            Product.update({_id: req.body.product._id}, {name: req.body.product.name, description: req.body.product.description, image: req.body.product.image, quantity: newProductAmount, sold: newSoldAmount }, function(err, product1){
              if(err){
                console.log('error updating product')
              } else {
                order.save(function(err, order){
                  if(err){
                    console.error(err);
                    res.json("There was an error while creating the product")
                  } else{
                    Order.find({}, function(err, allOrders){
                      res.json(allOrders)
                    });
                  }
                });
              }
            })
            }
          })
        }
      })
    },
  getOrders: function(req, res){
    Order.find({})
    .sort({createdAt: 'desc'})
    .populate('_user').exec(function(err, orders){
      if(err){
       console.log('error locating all orders')
     } else {
       for (let i = 0; i < orders.length; i++) {
        for (let x = 0; x < orders[i]._products.length; x++) {
          let temp = Object.keys(orders[i]._products[x])
         Product.find({_id: {$in: temp}}).lean().exec(function(err, product){
           if(err){
             console.error(err);
           } else {
              orders[i]._products[x].info = []
             for (var e = 0; e < product.length; e++) {
               orders[i]._products[x].info.push(product[e])
               if(orders[i]._products[x+1]==null){
                 if(orders[i+1]==null){
                   res.json(orders)
                 }
               }
             }
           }
         })
        }
       }
     }
    })
   },
   orderStatusChange: function(req, res){
     var status = false
     if(req.body.status == false){
       status = false
     } else {
       status = true
     }
     Order.update({_id: req.body._id}, {status: status}, function(err, order){
       if(err){
         console.error(err);
       } else {
         Order.find({})
         .sort({createdAt: 'desc'})
         .populate('_user').exec(function(err, orders){
           if (err) {
             console.log(err);
           } else {
             res.json(orders)
           }
         });
       }
     })
  },
   saveTrackingNumber: function(req, res){
     Order.update({_id: req.body._id}, {$set: {trackingNumber: req.body.trackingNumber}}, function(err, order){
       if(err){
         console.error(err);
       } else {
         res.json(order)
       }
     })
   }

};
