'use strict';

module.exports = {
    shared: {
    },

    local: {
        db: 'mongodb://localhost/weekschedule',

        host: 'http://localhost:3000',
        websiteUrl: 'http://localhost:4000',
        apiUrl: 'http://localhost:3000'
    },

    testing: {
    },

    staging: {
    },

    production: {
        db: 'mongodb://heroku',
    }
};