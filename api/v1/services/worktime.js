var mongoose = require('mongoose');
var Q = require('q');
var moment = require('moment');

var WorkTime = mongoose.model('WorkTime');
var User = mongoose.model('User');
const googleService = require('./googleApi');
const config = require('../../../config/authConfig');


exports.setWorkingTime = function (accessToken, startTime) {
    var userId;
    startTime = moment(startTime).local().seconds(0).milliseconds(0).toISOString();

    return googleService.getUserData(accessToken)
        .then(function (userData) {
            return User.findOne({email: userData.email})
        })
        .then(function (user) {
            const dayStart = moment(startTime).local().startOf('day');
            const dayEnd = moment(startTime).local().endOf('day');

            userId = user._id;

            return WorkTime.findOne({
                startTime: {$gte: dayStart, $lt: dayEnd},
                userId: userId
            })
        })
        .then(function (worktime) {
            if (!worktime) {
                worktime = new WorkTime({
                    userId: userId,
                    startTime: moment(startTime).local()
                });
            } else {
                worktime.startTime = moment(startTime).local();
            }
            return worktime.save();
        })
};

exports.getWorkingTime = function (accessToken) {

    return googleService.getUserData(accessToken)
        .then(function (userData) {
            return User.findOne({ email: userData.email })
        })
        .then(function (user) {
            return WorkTime.find({ userId: user._id })
        })
        .then(function (worktime) {
            return worktime
        })
};

exports.getWorkSchedule = function () {
    var weekSchedule = [];
    var now = new Date();
    now.setHours(9);
    now.setMinutes(0);
    now.setSeconds(0);

    return WorkTime.aggregate([
        { '$match': {startTime: {$gte : now}}},
        { '$sort' : {userId: 1, startTime: 1}},
        { '$group': {_id: "$userId", times: {$push: "$startTime"}}},
        {
            '$lookup': {
                from: "users",
                localField: "_id",
                foreignField: "_id",
                as: "userData"
            }
        }

    ])
};