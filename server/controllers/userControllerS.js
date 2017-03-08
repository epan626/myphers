var mongoose = require('mongoose')
var User = mongoose.model('User');
var bcrypt = require('bcrypt');

module.exports = {
  create: function(req, res){
    console.log(req.body)
    console.log('here0')
    User.find({email: req.body.email}, function(err, user){
      console.log(user)
      if(!user[0]){
        console.log('here')
        var user = new User({email: req.body.email, first_name: req.body.first_name, last_name: req.body.last_name, password: req.body.password})
        user.save(function(err, user){
          console.log('here1')
            if(err){
              console.log('error while creating user')
            } else {
              console.log('creating user ' + user)
            }
          })
      } else {
        res.json('This email already exist')
      }
    })
  },
  login: function(req, res){
    User.find({email: req.body.email}, function(err, user){
      if(err){
        console.log('Error locating user')
      } else {
        if(!user[0]){
          res.json('The email/password is incorrect')
        }
        else if (bcrypt.compareSync(req.body.password, user[0].password) == false){
          res.json('The email/password is incorrect')
        } else {
          console.log(user)
          res.json(user)
        }
      }
    })
  },
  loggeduser: function(req, res){
    User.find({_id: req.body.cookie}, function(err, user){
      if(err){
        console.log('error locating user')
      } else {
        res.json(user)
      }
    })
  },
  allusers: function(req, res){
    User.find({}, function(err, user){
      if(err){
       console.log('error locating all users')
     } else {
       res.json(user)
     }
    })
  },
  deleteuser: function(req, res){
    console.log(req.body)
    console.log('up')
    User.remove({_id: req.body._id}, function(err, user){
      if(err){
        console.log('error deleting user')
      } else {
        res.json('successfully deleted')
      }
    })
  }
  // editpage: function(req, res) {
  //   Product.find({_id: req.params.id}, function(err, product){
  //     if(err){
  //     res.json(err)
  //   } else {
  //     console.log(product)
  //     res.json(product)
  //   }
  //   })
  // },
  // updateProduct: function(req, res){
  //   console.log('atupdate')
  //   console.log(req.body.quantity)
  //   Product.update({_id: req.body._id}, {name: req.body.name, description: req.body.description, image: req.body.image, quantity: req.body.quantity}, function(err, product){
  //     if(err){
  //       console.log(err)
  //       console.log('error?')
  //     res.json(err)
  //   } else {
  //     Product.save
  //   }
  //   })
  // },
  //
  // deleteProduct: function(req, res){
  //   console.log(req.params)
  //   console.log('up')
  //   Product.remove({_id: req.params.id}, function(err, success){
  //     if(err){
  //       console.log(err)
  //       console.log('error?')
  //     } else {
  //       console.log('successfully deleted')
  //       res.json('success')
  //     }
  //   })
  // }
}
