'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');


module.exports = {
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://127.0.0.1:8081',
    'webpack/hot/only-dev-server',
    './index.js'
  ],

  output: {
    filename: 'assets/js/app.js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/'
  },

  mode: 'development',
  context: path.resolve(__dirname, 'src'),
  devtool: 'inline-source-map',

  devServer: {
    hot: true,
    contentBase: path.resolve(__dirname, 'public'),
    publicPath: '/',
    historyApiFallback: true
  },

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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({template: './index.html'}),
    new BundleAnalyzerPlugin({ analyzerMode: 'static', openAnalyzer: false, reportFilename: path.resolve(__dirname, 'report.html') })
  ]
};
