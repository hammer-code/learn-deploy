const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, './index.js'),

  output: {
    filename: 'output.js',

    path: path.resolve(__dirname)
  },

  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' }
    ]
  }
}
