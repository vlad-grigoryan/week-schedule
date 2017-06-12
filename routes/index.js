const fs = require('fs');
const path = require('path');
const Router = require('express').Router;

const mongoose = require('mongoose');

const router = new Router();

router.use(function(req, res, next) {
    const env = process.env.NODE_ENV || 'local';
    res.locals.env = env;

    next();
});

router.get('/', function(req, res, next) {
    res.status(200).render('index');
});

const routes = fs.readdirSync(__dirname);

for (let i = 0; i < routes.length; i++) {
    let route = routes[i];
    if (route !== 'index.js') {
        router.use(require(path.join(__dirname, route)));
    }
}

router.get('/:route*', function (rq, res, next) {
    res.status(200).render('index');
});


module.exports = router;
