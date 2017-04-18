var mongoose = require('mongoose'),
    Schema   = mongoose.Schema

var BannerSchema = new mongoose.Schema({
  category:{type: String, require: true},
  image: {data: Buffer, type: Array, require:false}
}, {timestamps: true});


module.exports = mongoose.model('Banner', BannerSchema);
