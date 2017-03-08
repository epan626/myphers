var mongoose = require('mongoose'),
    Schema   = mongoose.Schema

var OrderSchema = new mongoose.Schema({
  _user: {type: Schema.Types.ObjectId, ref: 'User'},
  _product: {type: Schema.Types.ObjectId, ref: 'Product'},
  customer: {type: String, require:true},
  product: {type: String, require:true},
  quantity: {type: Number, require:true}
}, {timestamps: true});


module.exports = mongoose.model('Order', OrderSchema);
