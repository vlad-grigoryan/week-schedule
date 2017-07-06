const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const config = require('./config');
var debug = require('debug')();
const init = require('./init');


init(config);
const app = express();

app.use(bodyParser.json({limit : config.bodyLimit}));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(expressValidator());

app.use(cookieParser());
console.log(process.env.NODE_ENV, "process.env.NODE_ENV")
if(process.env.NODE_ENV !== 'production') {

    const webpackConfig = require('./webpack.config');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');

    const webpack = require('webpack');
    let compiler = webpack(webpackConfig);



    app.use(webpackDevMiddleware(compiler, {
        contentBase: path.join(__dirname, './public'),
        hot: true,
        inline: true,
        historyApiFallback: true,
        filename: "bundle.js",
        publicPath: "/",
        stats: { colors: true },
    }));

    app.use(webpackHotMiddleware(compiler, {
        log: console.log
    }));
}

app.set('env', process.env.NODE_ENV);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

debug('Initializing express: /api/v1 server');
var apiServerV1 = require('./api/v1');
app.use('/api/v1', apiServerV1);

app.use(express.static(path.join(__dirname, 'public')));
const routes = require('./routes');
app.use(routes);



/// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function (err, req, res, next) {

    res.status(err.status || 500);

    if (app.get('env') === 'dev') {
        res.send({error: err.stack});
    } else {
        res.end();
    }

});

module.exports = app;
