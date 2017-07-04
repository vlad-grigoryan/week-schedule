'use strict';

module.exports = {
    shared: {
    },

    local: {
        db: 'mongodb://localhost/weekschedule',
        host: 'http://localhost:3000',
        websiteUrl: 'http://localhost:4000',
        apiUrl: 'http://localhost:3000',
        gapiClientId: '735955037545-r8ujuf1njsm3sv02t371npmmj6ieelaa.apps.googleusercontent.com',
        requireMail: 'simplytechnologies.net'
    },

    testing: {
    },

    staging: {
    },

    production: {
        db: 'mongodb://heroku_896l663q:38e270fls3iobpmf7p9iok5tt5@ds149382.mlab.com:49382/heroku_896l663q',
        gapiClientId: '735955037545-r8ujuf1njsm3sv02t371npmmj6ieelaa.apps.googleusercontent.com',
        requireMail: 'simplytechnologies.net'
    }
};