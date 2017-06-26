'use strict';
/**
 * This part of the application is responsible for handling the routes api/v1. It delegates
 * the requests mounted on that path to the handlers via express-load.
 */

var path = require('path');
var fs = require('fs');
var express = require('express');
var debug = require('debug')('weekSchedule:api:init');
var reflection = require('../../lib/reflection');
var app = module.exports = express();

var apiRoutesPath = path.join(__dirname, 'routes');


function initializeRoutes() {
    var routes = fs.readdirSync(apiRoutesPath);

    for (var i = routes.length; i--;) {
        if (routes[i] === 'error.js') {
            continue;
        }

        initializeRoute(routes[i]);
    }

    initializeRoute('error.js');
}

function initializeRoute(route) {
    var routerPath = path.join(apiRoutesPath, route);
    var router = require(routerPath);
    var routerParams = [app].concat(getHandlers(router));

    router.apply(router, routerParams);
}

function getHandlers(router) {
    var handlers = reflection.getParamNames(router);

    if (handlers[0] === 'app') {
        handlers.shift();
    }

    return handlers.map(function (hanlder) {
        return getHandlerInstance(require('./handlers/' + hanlder));
    });
}

function getHandlerInstance(handlerConstructor) {
    var params = reflection.getParamNames(handlerConstructor).map(function (dep) {
        return require('./services/' + dep);
    });

    return construct(handlerConstructor, params);
}

function construct(constructor, args) {
    function F() {
        constructor.apply(this, args);
    }

    F.prototype = constructor.prototype;
    return new F();
}


app.use(function (req, res, next) {
    req.app = app;
    next();
});



debug('initializing api routes');
initializeRoutes();