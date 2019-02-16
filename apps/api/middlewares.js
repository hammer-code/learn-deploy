const jwt = require('jsonwebtoken');
const { findUserById, permissions } = require('./authorization');

function authentication(request, response, next) {
  const authHeader = request.header('Authorization');

  if (!authHeader) {
    return next(new Error('Authorization header is not present'))
    // return response.status(401).json({
    //   message: 'You are not authenticated'
    // })
  }

  const [, token] = authHeader.split('Bearer ')

  let decoded = null

  try {
    decoded = jwt.verify(token, 'rahasia')
  } catch (error) {
    return next(error)
    // return response.status(401).json({
    //   message: error.message
    // })
  }

  console.log(decoded)

  request.userId = decoded.userId

  next()
}

function createAuthorizationGuard (permission) {
  return async function (request, response, next) {
    const allowedRoles = permissions[permission]

    if (!allowedRoles) {
      return next(new Error(`Roles for permission ${permission} is not available`))
    }

    const user = await findUserById(request.userId)

    if (!user) return next(new Error('User was not found'))

    const isPermitted = allowedRoles.some(role => user.roles.includes(role))

    if (!isPermitted) {
      return next(new Error('You are not allowed to access/perform action'))
    }

    next()
  }
}

module.exports = {
  authentication,
  createAuthorizationGuard
}