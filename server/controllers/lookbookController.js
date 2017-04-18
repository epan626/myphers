var mongoose = require('mongoose')
var Lookbook = mongoose.model('Lookbook');
var fs = require('fs');

module.exports = {
  createLookbook: function(req, res){
		Lookbook.findOne({title: req.body.title}, function(err, lookbook){
			if(err || lookbook == null){
				var lookbook = new Lookbook({title: req.body.title, description: req.body.description, image: []})
				req.files.forEach(function(imageFile){
		      lookbook.image.push(imageFile.path)
		    })
				lookbook.save(function(err, lookbook){
					if(err){
						res.json("There was an error while creating your banner")
					} else{
						Lookbook.find({}, function(err, allLookbook){
							res.json(allLookbook)
						});
					}
				});
			} else {
				res.json("This title is taken")
			}
		})

  },
  getLookbooks: function(req, res){
    Lookbook.find({}).sort({createdAt: 'desc'}).exec(function(err, lookbooks){
      if(err){
        console.error(err);
      } else {
        res.json(lookbooks)
      }
    })
  },
	getSingleLookbook: function(req, res){
		Lookbook.find({_id: req.params.id}).sort({createdAt: 'desc'}).exec(function(err, lookbook){
			if(err){
				console.error(err);
			} else {
				res.json(lookbook)
			}
		})
	},
	lookbookEditPage: function(req, res){
		Lookbook.find({_id: req.params.id}).sort({createdAt:'asc'}).exec(function(err, lookbook){
			if(err){
				console.error(err);
			} else {
				res.json(lookbook)
			}
		})
	},
	deleteLookbook: function(req, res){
    Lookbook.findOne({_id: req.params.id}, function(err, lookbook){
      if(err){
        console.error(err);
      } else {
        for(let i = 0; i < lookbook.image.length; i++){
          let imageLocation = lookbook.image[i]
          try {
            fs.unlinkSync(imageLocation);
          } catch (err) {
            console.log(err);
          }
        }
        Lookbook.remove({_id: req.params.id}, function(err, success){
          if(err){
            console.log(err)
          } else {
            res.json('Lookbook was deleted successfully')
          }
        })
      }
    })
  }
}
