'use strict';

var mongoose = require('mongoose');

var userService;


function userHandler(user) {
    userService = user;
}

userHandler.prototype.checkUserAuth = function(req, res, next) {
    req.checkBody('token').notEmpty();
    var errors = req.validationErrors();

    if (errors) {
        return res.status(400).send({error: 'VALIDATION', details: errors});
    }

    userService.checkUserAuth(req.body.token)
        .then(function(isAuthenticated) {
            res.status(200).send({'isAuthenticated' : isAuthenticated});
        })
        .catch(next);
};

userHandler.prototype.createUser = function(req, res, next) {
    req.checkBody('accessToken').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        return res.status(400).send({error: 'VALIDATION', details: errors});
    }

    userService.createUser(req.body.accessToken)
        .then(function(data) {
            if(data.error) {
                return res.status(400).send({error: 'VALIDATION', details: data.error})
            }
            return res.status(200).send(data);
        })
        .catch(next);
};

userHandler.prototype.getUser = function(req, res, next) {

    const accessToken = req.headers['access-token'];
    if (!accessToken) {
        return res.status(400).send({error: 'VALIDATION', details: errors})
    }

    userService.getUser(accessToken)
        .then(function (data) {
            if(data.error) {
                return res.status(400).send({error: 'VALIDATION', details: data.error})
            }
            return res.status(200).send(data);
        })
};

module.exports = userHandler;