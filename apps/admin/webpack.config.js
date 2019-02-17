const path = require('path');

module.exports = {
  mode: 'development',

  entry: {
    home: path.resolve(__dirname, './src/home.js'),
    create: path.resolve(__dirname, './src/create.js'),
    login: path.resolve(__dirname, './src/login.js'),
  },

  output: {
    path: path.resolve(__dirname, 'public/dist')
  },

  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' }
    ]
  }
}
