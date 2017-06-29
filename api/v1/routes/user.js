'use strict';

module.exports = function (app, user) {
    app.post('/isAuth', user.checkUserAuth);
    app.post('/user', user.createUser);
    app.get('/user', user.getUser);
};