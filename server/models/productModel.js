var mongoose = require('mongoose'),
    Schema   = mongoose.Schema

var ProductSchema = new mongoose.Schema({
  name:{type: String, require: true},
  description: {type: String, require:true},
  image: {data: Buffer, type: Array, require:false},
  inventory: {type: Number, require:true},
  sold: {type: Number, default: 0},
  price: {type: String, require:true},
  category: {type: String},
  size: {type: String}
}, {timestamps: true});


module.exports = mongoose.model('Product', ProductSchema);
