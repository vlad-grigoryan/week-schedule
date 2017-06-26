'use strict';

module.exports = function (app, user) {
    app.post('/user', user.saveUser);
};