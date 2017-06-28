'use strict';

var mongoose = require('mongoose');
var Q = require('q');

var User = mongoose.model('User');


var google = require('googleapis');
var googleAuth = require('google-auth-library');
var auth = new googleAuth();

const config = require('../../../config/authConfig');

console.log(config, "config")
var oauth2Client = new auth.OAuth2(
    config.gapiClientId, '', ''
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

        if(!profile.hd && profile.hd !== config.requireMail) {
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

        if(!profile.hd && profile.hd !== config.requireMail) {
            deferred.resolve({error: 'should_simply_email'});
        } else {
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
        }

    });

    return deferred.promise;

};
