'use strict';

var request = require('request-promise');
var mongoose = require('mongoose');

var User = mongoose.model('User');



exports.saveUser = function (name, position) {
    var user =  new User({name: name});
    return user.save();
};
