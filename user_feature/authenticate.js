const mongoose = require('mongoose');
const {User} = require('./user_model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');

exports.doLogin = (req, res) => {
    User.findOne({userEmail: req.body.email})
        .then((user) => {
            console.log(user);
            if(!req.body.email || !req.body.password){
                res.status(401).json({
                    message: 'You must enter a username and password'
                });
                return;
            }

            if(!user){
                res.status(404).json({
                    message: 'The user does not exist'
                });
                return;
            }

            if(!bcrypt.compareSync(req.body.password, user.password)){
                res.status(401).json({
                    message: 'Password does not match'
                });
                return;
            }

            let userToken = {
                email: user.userEmail,
                id: user._id
            };

            token = jwt.sign(userToken, config.JWT_SECRET);

            console.log(token);

            res.status(200).json({
                message: ` ${user.userEmail} successfully logged in`,
                data: {
                    userId: user._id,
                    token: token,
                    email: user.email
                }

            });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Something has happened at last catch",
                data: err
            });
        });
};

exports.doRegister = (req, res) => {
    console.log('in do register');
    User.findOne({userEmail: req.body.email})
        .then((user) => {
            if(user){
                res.status(404).json({
                    message: 'This user already exists'
                });
                return;
            }

            const newUser = new User();
            newUser.lastName = req.body.lastName;
            newUser.firstName = req.body.firstName;
            newUser.userEmail = req.body.email;

            bcrypt.hash(req.body.password, 10)
                .then(function (hash) {
                    newUser.password = hash;

                    newUser
                        .save()
                        .then(user => {
                            res.status(200).json({
                                message: "This is the user!!",
                                data: user
                            });
                        })
                        .catch(err => {
                            res.status(500).json({
                                message: "Something has happened in user",
                                data: err
                            });
                        });
                })
                .catch(function (err) {
                    console.log(err);

                    res.status(500).json({
                        message: "Something has happened in bcrypt",
                        err: err
                    });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Something has happened",
                data: err
            });
        });
    });

};