"use strict";

const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
	amount: Number,
	payeeName: String,
	createdAt: {type: Date, default: Date.now}
})


const Expense = mongoose.model('expense', expenseSchema);

module.exports = { Expense };
