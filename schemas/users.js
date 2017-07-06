'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    googleId: String,
    firstName: String,
    lastName: String,
    email:String,
    picture: String,
    hd: String,
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    }
});

schema.statics.publicFields = [
    'firstName',
    'lastName',
    'picture',
    'email',
    'hd',
    'workingDays',
    'created',
    'updated'
];

schema.pre('save', function (next) {
    next();
});

mongoose.model('User', schema);