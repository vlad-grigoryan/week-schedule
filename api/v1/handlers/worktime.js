'use strict';

var mongoose = require('mongoose');

var workTimeService;
var User = mongoose.model('User');


function workTimeHandler(worktime) {
    workTimeService = worktime;
}


workTimeHandler.prototype.setWorkingTime = function(req, res, next) {

    req.checkBody('changedTime').notEmpty();
    req.checkBody('userAccessToken').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        return res.status(400).send({error: 'VALIDATION', details: errors});
    }
    const userAccessToken = req.body.userAccessToken;
    const changedTime = req.body.changedTime;

    workTimeService.setWorkingTime(userAccessToken, changedTime)

};

workTimeHandler.prototype.getWorkingTime = function(req, res, next) {
    const accessToken = req.headers['access-token'];
    if (!accessToken) {
        return res.status(400).send({error: 'VALIDATION', details: errors})
    }

    workTimeService.getWorkingTime(accessToken)
        .then(function (data) {
            if(data.error) {
                return res.status(400).send({error: 'VALIDATION', details: data.error})
            }
            return res.status(200).send(data);
        })
};

workTimeHandler.prototype.getWorkSchedule = function(req, res, next) {
    const accessToken = req.headers['access-token'];
    if (!accessToken) {
        return res.status(400).send({error: 'VALIDATION', details: errors})
    }

    workTimeService.getWorkSchedule(accessToken)
        .then(function (data) {
            if(data.error) {
                return res.status(400).send({error: 'VALIDATION', details: data.error})
            }
            return res.status(200).send(data);
        })
};


module.exports = workTimeHandler;