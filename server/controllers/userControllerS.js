var mongoose = require('mongoose')
var User = mongoose.model('User');
var bcrypt = require('bcrypt');

module.exports = {
  create: function(req, res){
    User.find({email: req.body.email}, function(err, user){
      if(!user[0]){
        var user = new User({email: req.body.email, first_name: req.body.first_name, last_name: req.body.last_name, password: req.body.password})
        user.save(function(err, user){
            if(err){
              console.error('error while creating user')
            } else {
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
  isUserAdmin: function(req, res){
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
    User.remove({_id: req.body._id}, function(err, user){
      if(err){
        console.log('error deleting user')
      } else {
        res.json('successfully deleted')
      }
    })
  }

}
