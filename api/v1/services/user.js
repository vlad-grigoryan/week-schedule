'use strict';

const mongoose = require('mongoose');
const Q = require('q');
const User = mongoose.model('User');

const config = require('../../../config/authConfig');
const googleService = require('./googleApi');




exports.checkUserAuth = function (accessToken) {

    return googleService.getUserData(accessToken)
        .then(function (userData) {
            if(userData && userData.hd !== config.requireMail) {
               return false;
            }
            return User.findOne({email: userData.email})
        })
        .then(function (user) {
            if(!user) {
                return false
            }
            return true
        })
};


exports.createUser = function (accessToken) {
    var userData = null;

    return googleService.getUserData(accessToken)
        .then(function (user) {
            userData = user;
            if(user && user.hd !== config.requireMail) {
                return {error: 'should_simply_email'}
            }
            return User.findOne({email: user.email})
        })
        .then(function (user) {
            if(!user) {
                user =  new User({
                    googleId: userData.id,
                    firstName: userData.given_name,
                    lastName: userData.family_name,
                    email: userData.email,
                    picture: userData.picture,
                    hd: userData.hd,
                });
                return user.save();
            }
        })
};

exports.getUser = function (accessToken) {
    return googleService.getUserData(accessToken)
        .then(function (userData) {
            return User.findOne({email: userData.email})
        })
        .then(function (user) {
            return user;
        })
};
