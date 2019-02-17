const jwt = require('jsonwebtoken');
const userService = require('../services/user');

async function login (request, response) {
  const { username, password } = request.body
  let foundUser = null

  try {
    foundUser = await userService.findByUsernameAndPassword(username, password)
  } catch (error) {
    throw error
  }

  if (!foundUser) {
    return response.status(404).json({
      message: 'User not found'
    })
  }

  const token = jwt.sign({ userId: foundUser._id }, process.env.JWT_SECRET);

  return response.json({
    token,
    user: foundUser
  })
}

module.exports = {
  login,
}
