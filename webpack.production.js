const merge = require("webpack-merge");
const config = require("./webpack.config.js");
const uglifyJSPlugin = require("uglifyjs-webpack-plugin");
const webpack = require("webpack");

module.exports = merge(config, {
  output: {
    filename: "bundle.min.js"
  },
  plugins: [
    new uglifyJSPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify("production")
      }
    })
  ]
})
