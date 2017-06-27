'use strict';

module.exports = function (app, error) {
    app.use(error.logErrors);
    app.use(error.classifyError);
    app.use(error.errorHandler);
};