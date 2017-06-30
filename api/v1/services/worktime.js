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
                startTime: {$gte: dayStart, $lt: dayEnd}
            })
        })
        .then(function (worktime) {
            if(!worktime) {
                worktime = new WorkTime({
                    userId : userId,
                    startTime: moment(startTime).local()
                });
            } else {
                worktime.startTime =  moment(startTime).local();
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
        if(error) {
            deferred.reject(new Error(error));
        }
        const googleId =  profile.id;
        User.findOne({
            googleId: profile.id
        })
        .then(function (user) {
            console.log(user, "user")
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
    })
    return deferred.promise;
};