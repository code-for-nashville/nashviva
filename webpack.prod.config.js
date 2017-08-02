const webpack = require('webpack')
const webpackBase = require('./webpack.config.js')

var webpackProd = Object.assign(
  webpackBase,
  {
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      }),
      new webpack.optimize.UglifyJsPlugin()
    ]
  })

module.exports = webpackProd
