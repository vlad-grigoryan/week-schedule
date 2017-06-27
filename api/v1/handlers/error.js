'use strict';
var util = require('util');
var ApiError = require('../errors').ApiError;

function ErrorHandler() {

}

ErrorHandler.prototype.logErrors = function (err, req, res, next) {
    if (err.stack) {
        console.error(err.stack);
    }
    console.log(util.inspect(err, { depth: null, colors: true }));

    next(err);
};

ErrorHandler.prototype.classifyError = function(err, req, res, next) {
    if (err.status) {
        return next(err);
    }

    if (err.name === 'ValidationError' || err instanceof ApiError) {
        err.status = 400;
    }

    next(err);
};

ErrorHandler.prototype.errorHandler = function (err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.status ? err : '');
};


module.exports = ErrorHandler;