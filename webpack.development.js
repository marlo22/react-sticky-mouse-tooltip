const merge = require('webpack-merge');
const config = require('./webpack.config.js');
const path = require('path');

module.exports = merge(config, {
  output: {
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "eslint-loader"
      }
    ]
  }
})
