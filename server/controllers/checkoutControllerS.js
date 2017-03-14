var mongoose = require('mongoose')
var Product = mongoose.model('Product');
var stripe = require('stripe')("sk_test_Bh706tLx8fOXj8JzeZFyaDlx")


module.exports = {

charge: function(req, res){
	stripe.charges.create({
		amount: 1000,
		currency: "usd",
		description: "the rock t shirt",
		source: req.body.token,
	}, function(err, charge) {
		if(err){
			console.error(err);
		} else {
			console.log(charge);
		}
	}
)}


};
