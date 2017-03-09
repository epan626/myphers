var mongoose = require('mongoose'),
    Schema   = mongoose.Schema

var ProductSchema = new mongoose.Schema({
  name:{type: String, require: true},
  description: {type: String, require:true},
  image: {data: Buffer, contentType: String, require:false},
  quantity: {type: Number, require:true},
  sold: {type: Number, default: 0}
}, {timestamps: true});


module.exports = mongoose.model('Product', ProductSchema);
