const User = require('./models/User')

const ROLE_ADMIN = 'admin'
const ROLE_MODERATOR = 'moderator'
const ROLE_ORGANIZER = 'organizer'

const permissions = {
  'reports.view': [ROLE_ADMIN, ROLE_MODERATOR],
  'reports.create': [ROLE_ADMIN],
  'reports.delete': [ROLE_ADMIN],
  'reports.update': [ROLE_ADMIN],
  'events.create': [ROLE_ADMIN, ROLE_ORGANIZER]
}

function findUserByUsernameAndPassword (username, password) {
  return User.findOne({ username, password })
  // return users.find((user) => {
  //   return user.username === username && user.password === password
  // })
}

function findUserById (userId) {
  return User.findById(userId)
  // return users.find((user) => user.id === userId)
}

module.exports = {
  findUserByUsernameAndPassword,
  permissions,
  findUserById
}