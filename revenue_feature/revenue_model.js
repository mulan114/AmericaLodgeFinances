"use strict";

const mongoose = require("mongoose");

const revenueSchema = new mongoose.Schema({
	amount: Number,
	// type can only be payment or donation
	type: {
		type: String, enum : ['CHAR DONATION','LODGE DONATION','FOOD PAYMENT','MERCH PAYMENT']
	}, 
	lastName: String,
	firstName: String,
	createdAt: {type: Date, default: Date.now}
})

const Revenue = mongoose.model('revenue', revenueSchema);

module.exports = { Revenue };
