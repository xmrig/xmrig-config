'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


module.exports = {
  entry: [
    'babel-polyfill',
    './index.js'
  ],

  output: {
    filename: 'assets/js/[chunkhash].js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/'
  },

  mode: 'production',
  context: path.resolve(__dirname, 'src'),

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [ 'babel-loader' ],
        exclude: /node_modules/
      }
    ],
  },

  plugins: [
    new UglifyJsPlugin({
      extractComments: true,
      uglifyOptions: {
        compress: {
          drop_console: true,
          // unsafe: true,
          warnings: false
        },
        output: {
          comments: false
        },
      }
    }),
    new HtmlWebpackPlugin({template: './index.html'})
  ],
};
