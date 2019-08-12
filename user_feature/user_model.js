"use strict";

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	lastName: String,
	firstName: String,
	userEmail: String,
	password: String,
	createdAt: {type: Date, default: Date.now}
})

const User = mongoose.model('user', userSchema);

module.exports = { User };
