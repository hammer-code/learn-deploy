const User = require('../models/User')

function findByUsernameAndPassword (username, password) {
  return User.findOne ({ username, password })
}

function findById (userId) {
  return User.findById(userId);
}

module.exports = {
  findById,
  findByUsernameAndPassword,
}
