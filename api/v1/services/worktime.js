var mongoose = require('mongoose');
var Q = require('q');

var WorkTime = mongoose.model('WorkTime');
var User = mongoose.model('User');


var google = require('googleapis');
var googleAuth = require('google-auth-library');
var moment = require('moment');
var auth = new googleAuth();

const config = require('../../../config/authConfig');

var oauth2Client = new auth.OAuth2(
    config.gapiClientId, '', ''
);

exports.setWorkingTime = function (token, startTime) {
    startTime = moment(startTime).local().seconds(0).milliseconds(0).toISOString();

    var deferred = Q.defer();

    oauth2Client.setCredentials({
        access_token: token,
    });

    var userId;

    google.oauth2("v2").userinfo.v2.me.get({auth: oauth2Client}, function (error, profile) {
        User.findOne({
            googleId: profile.id
        })
            .then(function (data) {
                const dayStart = moment(startTime).local().startOf('day');
                const dayEnd = moment(startTime).local().endOf('day');

                userId = data._id;

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
    });
    return deferred.promise;

};

exports.getWorkingTime = function (token) {
    var deferred = Q.defer();

    oauth2Client.setCredentials({
        access_token: token,
    });

    google.oauth2("v2").userinfo.v2.me.get({auth: oauth2Client}, function (error, profile) {
        if (error) {
            deferred.reject(new Error(error));
        }
        const googleId = profile.id;
        User.findOne({
            googleId: profile.id
        })
            .then(function (user) {
                return WorkTime.find({
                    userId: user._id
                })
            })
            .then(function (worktime) {
                deferred.resolve(worktime)
            })
            .catch(function (err) {
                deferred.reject(err)
            });
    });
    return deferred.promise;
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
        console.log(userData, "userData")
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