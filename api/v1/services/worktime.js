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

    return User.aggregate([
        {
            '$lookup': {
                from: "worktimes",
                localField: "_id",
                foreignField: "userId",
                as: "workSchedule"
            }
        },
        { '$match': { "workSchedule": {$not: {$size: 0}}} }
    ]).then(function (userData) {
        return userData.map(function (data, index) {
            for(var i = 0; i < data.workSchedule.length; i++) {
                if(data.workSchedule[i] && data.workSchedule[i].startTime
                    && moment(new Date()).local().startOf('day').isAfter(moment(data.workSchedule[i].startTime).local())){
                    data.workSchedule.splice(i, 1);
                }
            }

            return data;
        })
    })
};