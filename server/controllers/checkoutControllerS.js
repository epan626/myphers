var mongoose = require('mongoose')
var Product = mongoose.model('Product');
var User = mongoose.model('User');
var stripe = require('stripe')("sk_test_Bh706tLx8fOXj8JzeZFyaDlx")


module.exports = {

charge: function(req, res){
	var count = Object.keys(req.body.products).length
	var cartProduct = []
	var final = {}
	var grandtotal = 0.00
	var shipCalculator = {
		jacket: 0, sweater: 0, sweatshirt: 0, shirt: 0, shorts: 0, pants: 0, other: 0
	};
	var shippingCost = 0




	for(var x = 0; x<count; x++){
		cartProduct.push(Object.keys(req.body.products)[x])
	}
	Product.find({_id: { $in: cartProduct}}).lean().exec(function(err, result){

		if(err){
			console.error(err);
		} else {
			for(var i = 0; i<result.length; i++){
				result[i].qty = req.body.products[result[i]._id]
				result[i].subtotal = (result[i].qty*result[i].price).toFixed(2)
				if(result[i].category in shipCalculator){
					shipCalculator[result[i].category] +=req.body.products[result[i]._id]
				}
			}
			if(shipCalculator['jacket']==1){
				shippingCost = 10
			}
			else if(shipCalculator['jacket']>1){
				shippingCost = 12
			}
			else if(shipCalculator['sweater']>0){
				shippingCost = 8
			}
			else if(shipCalculator['sweatshirt'] > 0 ){
				shippingCost = 6
			}
			else if(shipCalculator['shirt'] + shipCalculator['shorts'] + shipCalculator['pants'] + shipCalculator['other'] > 5 ) {
				shippingCost = 7
			}
			else if(shipCalculator['shirt'] + shipCalculator['shorts'] + shipCalculator['pants'] + shipCalculator['other'] > 3 ) {
				shippingCost = 6
			}
			else if(shipCalculator['shirt'] > 0 || shipCalculator['shorts'] > 0 || shipCalculator['pants'] > 0 || shipCalculator['other'] > 0 ){
				shippingCost = 5
			}
			for(var y = 0; y<result.length; y++){
				grandtotal = (grandtotal + parseInt(result[y].subtotal))
			}
			grandtotal = (grandtotal + shippingCost)

			final['grandtotal'] = grandtotal.toFixed(2)

			var price = grandtotal.toFixed(2).split('.').join("")
		}
		User.findOne({email: req.body.shipInfo.email}, function(err, user){
			if(err){
				console.log('error');
				stripe.customers.create({
					email: req.body.shipInfo.email,
					source: req.body.token,
				})
				.then(function(customer){
					stripe.charges.create({
						amount: price,
						currency: "usd",
						description: "Myphers",
						customer: customer.id,
					}, function(err, charge) {
						if(err){
							console.error(err);
						} else {
							res.json(charge);
						}
				})
				})
			} else {
				if(user.email == req.body.shipInfo.email){
					console.log(user);
					if(user.customer == null){
						console.log('here');
						stripe.customers.create({
							email: req.body.shipInfo.email,
							source: req.body.token,
						})
						.then(function(customer){
						User.update({email:req.body.shipInfo.email}, {
							customer: customer.id}, function(err, user){
								if(err){
									console.log(err);
								} else {
									stripe.charges.create({
										amount: price,
										currency: "usd",
										description: "Myphers",
										customer: user.customer,
									}, function(err, charge) {
										if(err){
											console.error(err);
										} else {
											res.json(charge);
										}
								})
								}
							})

						})
					} else {
						// if customer exist and they have a stripe customer ID
						if(user.customer != null){
							//fetch the customer
							stripe.customers.retrieve(user.customer, function(err, customer){
								if(err){
									console.log(err);
								} else {
									//update the source token to the new one
									stripe.customers.update(user.customer, {
										 source: req.body.token
									}, function(err, customer){
										if(err){
											console.error(err);
										} else {
											//creates the charge and charges the card
											stripe.charges.create({
												amount: price,
												currency: "usd",
												description: "Myphers",
												customer: user.customer,
											}, function(err, charge) {
												if(err){
													console.error(err);
												} else {
													//loops through cart to update the database
													for(var i = 0; i < result.length; i++){
														if(req.body.products[result[i]._id] > 1){
															var quant = req.body.products[result[i]._id]
															Product.update({_id: result[i]._id}, {
																$inc: {sold: quant, inventory: -(quant)}}, function(err, product){
																if(err){
																	console.log(err);
																} else {
																	console.log(product);
																	var result = {}
																	result.email = charge.data
																	console.log(result);
																	// result.amount = charge.data.amount
																	res.json(result)
																}
															})
														}
													}

												}
										})
										}
									})
								}
							})

						}
					}


				}
			}
		})



	}
)}


};
