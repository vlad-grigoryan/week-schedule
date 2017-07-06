var Q = require('q');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var google = require('googleapis');
var googleAuth = require('google-auth-library');
var auth = new googleAuth();

const config = require('../../../config/authConfig');

var oauth2Client = new auth.OAuth2(
    config.gapiClientId, '', ''
);

exports.getUserData = function (token) {
    var deferred = Q.defer();

    oauth2Client.setCredentials({
        access_token: token,
    });

    google.oauth2("v2").userinfo.v2.me.get({auth: oauth2Client}, function (error, profile) {
        if(error && !profile) {
            deferred.reject(new Error(error));
        }

        User.findOne({email: profile.email}).lean()
            .then(function (user) {
                if(user) {
                    user.googleId = profile.id;
                    user.firstName = profile.given_name;
                    user.lastName = profile.family_name;
                    user.email = profile.email;
                    user.picture = profile.picture;
                    user.hd = profile.hd;
                    user.save();
                    deferred.resolve(user);
                }
            });
        deferred.resolve(profile);
    });

    return deferred.promise;
};