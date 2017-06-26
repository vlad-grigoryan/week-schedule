'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name: String,
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
    'name',
    'name',
    'created',
    'updated'
];

schema.pre('save', function (next) {
    next();
});

mongoose.model('User', schema);