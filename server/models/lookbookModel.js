var mongoose = require('mongoose'),
    Schema   = mongoose.Schema

var LookbookSchema = new mongoose.Schema({
  title:{type: String, require: true},
  description: {type: String},
  image: {data: Buffer, type: Array, require:false}
}, {timestamps: true});


module.exports = mongoose.model('Lookbook', LookbookSchema);
