var mongoose = require('mongoose')
var Banner = mongoose.model('Banner');
var fs = require('fs');

module.exports = {
  createBanner: function(req, res){
		Banner.find({category: req.body.category}, function(err, banner){
			if(err || banner == false){
        if(req.body.category == 'front'){
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
        } else {
          var banner = new Banner({category: req.body.category, image: req.files[0].path})
          banner.save(function(err, banner){
            if(err){
              res.json("There was an error while creating your banner")
            } else{
              Banner.find({}, function(err, allBanners){
                res.json(allBanners)
              });
            }
          })
        }
			} else {
        if (req.body.category == 'front') {
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
        } else {
          Banner.findOne({category: req.body.category}, function(err, banner2){
            if (banner2) {
              try {
                fs.unlinkSync(banner2.image[0]);
              } catch (err) {
                console.log(err);
              }
              Banner.update({category: req.body.category}, {$set: {image: req.files[0].path}}, function(err, banner3){
                if (err) {
                  console.error(err);
                } else {
                  res.json('/getBanners')
                }
              })
            }
          })
          }
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
	},
    deleteImagefromFrontBanner: function(req, res){
      Banner.findOne({category: 'front'}, function(err, banner2){
        if (banner2) {
          for(var x = 0; x<banner2.image.length; x++){
            if(banner2.image[x] == req.body.banner){
              try {
                fs.unlinkSync(req.body.banner);
              } catch (err) {
                console.log(err);
              }
              banner2.image.splice(x,1)
              banner2.save(function(err, banner3){
                if(err){
                  res.json("There was an error while creating your banner")
                } else {
                  Banner.find({}, function(err, allBanners){
                    if (allBanners) {
                      res.json(allBanners)
                    } else {
                      console.error(err);
                    }

                  });
                }
              });
            }
          }
        }
      })
    }

};
