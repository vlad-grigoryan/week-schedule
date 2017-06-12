'use strict';
/**
 * Initializes the database instance.
 * @author Alexander Adamyan
 */

const fs = require('fs');
const mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;
const debug = require('debug')('botAssigner:init:db');
const path = require('path');

var dbInitialized = false;

/**
 * Initialize Database connection
 * @param  {Object} config current environment configuration
 * @param forceNoDebug
 */
exports.init = function (config, forceNoDebug) {
    //Preventing the module to be initialize more than one time
    if (dbInitialized) {
        return;
    }
    dbInitialized = true;

    //Connecting to the database
    debug('initializing database connection');
    mongoose.connect(config.db, { server: { reconnectTries: Number.MAX_VALUE }});

    //Set debug mode for dev environment
    let env = process.env.NODE_ENV || 'dev';
    if (env === 'dev' && !forceNoDebug) {
        mongoose.set('debug', true);
    }

    //Init model schemas
    debug('initializing model schemas');
    let schemasPath = path.join(__dirname, '../schemas');
    let schemaFiles = fs.readdirSync(schemasPath);

    schemaFiles.forEach(function (file) {
        require(schemasPath + '/' + file);
        debug('model schema initialized: %s', file);
    });
};