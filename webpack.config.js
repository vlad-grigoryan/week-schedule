const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: [
      './public/src/index.js'
    ],
    output: {
        path: __dirname + '/public/',
        publicPath: '/',
        filename: 'bundle.js'
    },
    devtool: "eval",
    module: {
    loaders: [
      {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
              presets: ["stage-0", 'es2015', 'react' ],
              cacheDirectory: true
          },
          exclude: /node_modules/
      },
      { test: /\.s?css$/, loader: 'style-loader!css-loader!sass-loader' },

    ]
    },
    resolve: {
    extensions: ['.js','.scss']
    },

    devServer: {
        historyApiFallback: true,
        contentBase: './public'
    },

    plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
          warnings: false
      }
    })
    ]
};
