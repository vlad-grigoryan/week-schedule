'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    userId : Schema.Types.ObjectId,
    startTime: Date,
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
    'userId',
    'startDate',
    'created',
    'updated'
];

schema.pre('save', function (next) {
    next();
});

mongoose.model('WorkTime', schema);