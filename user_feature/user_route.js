const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const auth = require('./authenticate');

const userRouter = express.Router();
const { User } = require('../user_feature/user_model');

userRouter.post('/', auth.doRegister);

module.exports = userRouter;