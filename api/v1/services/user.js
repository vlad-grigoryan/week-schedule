'use strict';

var mongoose = require('mongoose');
var Q = require('q');

var User = mongoose.model('User');


var google = require('googleapis');
var googleAuth = require('google-auth-library');
var auth = new googleAuth();

var oauth2Client = new auth.OAuth2(
    '735955037545-r8ujuf1njsm3sv02t371npmmj6ieelaa.apps.googleusercontent.com', '', ''
);




exports.checkUserAuth = function (token) {
    var deferred = Q.defer();

    oauth2Client.setCredentials({
        access_token: token,
    });

    google.oauth2("v2").userinfo.v2.me.get({auth: oauth2Client}, function (error, profile) {

        if(error) {
            deferred.reject(new Error(error));
        }
        var start = profile.email.indexOf("@");
        var emailVarifaction = profile.email.substring(start+1, profile.email.length);

        if(emailVarifaction !== 'simplytechnologies.net') {
            deferred.resolve(false);
        }

        User.findOne({
            email: profile.email
        })
        .then(function (user) {
            if(!user) {
                deferred.resolve(false);
            }
            deferred.resolve(true);
        });
    });

    return deferred.promise;

};


exports.createUser = function (token) {
    var deferred = Q.defer();

    oauth2Client.setCredentials({
        access_token: token,
    });

    google.oauth2("v2").userinfo.v2.me.get({auth: oauth2Client}, function (error, profile) {

        if(error) {
            deferred.reject(new Error(error));
        }

        if(!profile.hd && profile.hd !== 'simplytechnologies.net') {
            deferred.resolve({status: 400, errorMessage: 'should_simply_email'});
        }

        User.findOne({
            email: profile.email
        })
            .then(function (userData) {
                if(!userData) {
                    var user =  new User({
                        googleId: profile.id,
                        firstName: profile.given_name,
                        lastName: profile.family_name,
                        email: profile.email,
                        hd: profile.hd,
                    });
                    user.save();
                }
                deferred.resolve(user);
            });
    });

    return deferred.promise;

};
