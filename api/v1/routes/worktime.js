'use strict';

module.exports = function (app, worktime) {
    app.post('/worktime', worktime.setWorkingTime);
    app.get('/worktime', worktime.getWorkSchedule);
    app.get('/myworktime', worktime.getWorkingTime);
};