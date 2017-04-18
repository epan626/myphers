var mongoose = require('mongoose'),
    Schema   = mongoose.Schema

var OrderSchema = new mongoose.Schema({
  _user: {type: Schema.Types.ObjectId, ref: 'User'},
  _products: {type: Array},
  shippingAddress: {type: Array},
  grandTotal: {type: String},
  status: {type: Boolean, default: false},
  trackingNumber: {type: String}
}, {timestamps: true});


module.exports = mongoose.model('Order', OrderSchema);
