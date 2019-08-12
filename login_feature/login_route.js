'use strict';

const express = require('express');
const auth = require('../user_feature/authenticate');


const loginRouter = express.Router();

// The user provides a username and password to login
loginRouter.post('/', auth.doLogin);


module.exports = loginRouter;
