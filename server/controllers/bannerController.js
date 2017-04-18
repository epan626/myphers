var mongoose = require('mongoose')
var Banner = mongoose.model('Banner');

module.exports = {
  createBanner: function(req, res){
		Banner.find({category: req.body.category}, function(err, banner){
			if(err || banner == false){
        var banner = new Banner({category: req.body.category, image: []})
        req.files.forEach(function(imageFile){
          banner.image.push(imageFile.path)
        })
        banner.save(function(err, banner){
          if(err){
            res.json("There was an error while creating your banner")
          } else{
            Banner.find({}, function(err, allBanners){
              res.json(allBanners)
            });
          }
        });
        console.log('here');
        console.log(banner);

			} else {
Banner.findOne({category: req.body.category}, function(err, banner2){
        req.files.forEach(function(imageFile){
          banner2.image.push(imageFile.path)
        })
        banner2.save(function(err, banner3){
          if(err){
            res.json("There was an error while creating your banner")
          } else{
            Banner.find({}, function(err, allBanners){
              res.json(allBanners)
            });
          }
        });
      })
			}
		})

  },
  getBanners: function(req, res){
    Banner.find({}).sort({createdAt: 'desc'}).exec(function(err, banners){
      if(err){
        console.error(err);
      } else {
        res.json(banners)
      }
    })
  },
	getAllProductsBanners: function(req, res){
		Banner.find({category: 'all'}).sort({createdAt: 'desc'}).exec(function(err, banners){
			if(err){
				console.error(err);
			} else {
				res.json(banners)
			}
		})
	},
	getFrontProductsBanners: function(req, res){
		Banner.find({category: 'front'}).exec(function(err, banners){
			if(err){
				console.error(err);
			} else {
				res.json(banners)
			}
		})
	},
	getOuterwearProductsBanners: function(req, res){
		Banner.find({category: 'outerwear'}).exec(function(err, banners){
			if(err){
				console.error(err);
			} else {
				res.json(banners)
			}
		})
	},
	getAccessoriesProductsBanners: function(req, res){
		Banner.find({category: 'accessories'}).exec(function(err, banners){
			if(err){
				console.error(err);
			} else {
				res.json(banners)
			}
		})
	},
	getShirtProductsBanners: function(req, res){
		Banner.find({category: 'shirt'}).exec(function(err, banners){
			if(err){
				console.error(err);
			} else {
				res.json(banners)
			}
		})
	},
	getBottomProductsBanners: function(req, res){
		Banner.find({category: 'bottoms'}).exec(function(err, banners){
			if(err){
				console.error(err);
			} else {
				res.json(banners)
			}
		})
	}

};
