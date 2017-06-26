
/**
 * The Module Dynamically loads the configurations for
 * the heroku deployed project. This way of managing the configuration
 * is done because of the heroku suggestion for
 * Multiple Environments for the LoginContainer article.
 */

const url = require('url');
const path = require('path');

/**
 * Returns the Redis actionType object for the staging,
 * testing and production servers
 * @returns {{port: *, host: (*|string), pass: *}}
 * @private
 */

let __redisConfig = () => {
    if (!process.env.REDISCLOUD_URL || process.env.REDISCLOUD_URL === 'undefined') {
        return null;
    }
    let redisURL = url.parse(process.env.REDISCLOUD_URL);
    return {
        port: redisURL.port,
        host: redisURL.hostname,
        pass: redisURL.auth.split(':')[1]
    };
};

/**
 * Returns the mongo db actionType for the staging,
 * testing and production servers
 * @returns {*}
 * @private
 */
let __mongoConfig = () => {
    return process.env.MONGOHQ_URL !== 'undefined' && process.env.MONGOHQ_URL ||
        process.env.MONGOLAB_URI !== 'undefined' && process.env.MONGOLAB_URI;
};

/**
 * Returns the Elastic Search actionType properties for the staging,
 * testing and production servers.
 * @returns {{host: (*|string), port: *, secure: boolean, auth: {username: *, password: *}}}
 * @private
 */
let __elasticSearchConfig = () => {
    if (!process.env.BONSAI_URL || process.env.BONSAI_URL === 'undefined') {
        return null;
    } else {
        return process.env.BONSAI_URL;
    }
};

let __rollbarConfig = () => {
    if (!process.env.ROLLBAR_ACCESS_TOKEN || process.env.ROLLBAR_ACCESS_TOKEN === 'undefined') {
        return null;
    } else {
        return process.env.ROLLBAR_ACCESS_TOKEN;
    }
};

let __mailtrapConfig = () => {
    if (!(process.env.MAILTRAP_USERNAME && process.env.MAILTRAP_PASSWORD)) {
        return null;
    }

    return {
        host: 'mailtrap.io',
        port: 2525,
        auth: {
            user: process.env.MAILTRAP_USERNAME,
            pass: process.env.MAILTRAP_PASSWORD
        }
    };
};

/**
 * Resolves the paths of APN certificates
 * @param config
 * @private
 */
let __resolveApnCertPaths = (config) => {

};

let __mergeSharedConfigs = (shared, config) => {
    for (var key in shared) {
        config[key] = config[key] || shared[key];
    }

    return config
};

/**
 * Creates a actionType object dynamically for the application.
 * @returns {*}
 * @private
 */
let __createConfig =() => {
    const env = process.env.NODE_ENV || 'local';

    let config = require('./config');

    config = __mergeSharedConfigs(config.shared, config[env]);

    config.env = env;
    config.notLocal = config.env !== 'local' && config.env !== 'testing';

    config.db = __mongoConfig() || config.db;

    __resolveApnCertPaths(config.apn);

    return config;
};

module.exports = __createConfig();