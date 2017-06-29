'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    googleId: Number,
    firstName: String,
    lastName: String,
    email:String,
    hd: String,
    workingDays: Array,
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