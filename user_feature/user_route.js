const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const auth = require('./authenticate');

const userRouter = express.Router();
const { User } = require('../user_feature/user_model');

console.log('in user route');
userRouter.post('/', auth.doRegister);

module.exports = userRouter;