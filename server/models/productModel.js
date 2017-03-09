var mongoose = require('mongoose'),
    Schema   = mongoose.Schema

var ProductSchema = new mongoose.Schema({
  name:{type: String, require: true},
  description: {type: String, require:true},
  image: {type: String, require:true},
  inventory: {type: Number, require:true},
  sold: {type: Number, default: 0},
  price: {type: Number, require:true},
  condition: {type: String},
  sizing: {type: String}
}, {timestamps: true});


module.exports = mongoose.model('Product', ProductSchema);
