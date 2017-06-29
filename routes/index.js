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


router.get('/:route*', function (rq, res, next) {
    res.status(200).render('index');
});


module.exports = router;
