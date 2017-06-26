'use strict';

var validator = require('express-validator').validator;
var mongoose = require('mongoose');

var userService;

var User = mongoose.model('User');

function userHandler(user) {
    userService = user;
}

userHandler.prototype.getUsers = function(req, res, next) {
    userService.getUsers()
        .then(function(users) {
            res.status(200).send(users);
        })
        .catch(next);
};

module.exports = userHandler;