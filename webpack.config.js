const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

module.exports = {
  entry: './client/index.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      { test: /\.(js)$/, use: 'babel-loader' },
      { test: /\.(css)$/, use: ['style-loader', 'css-loader'] }
    ]
  },
  mode: 'development',
  devServer: {
    historyApiFallback: true
  },
  plugins: [
    // strips all locales except en
    new MomentLocalesPlugin(),
    new HTMLWebpackPlugin({
      template: './client/index.html'
    })
  ]
};
