const userService = require('../services/user');

function view (request, response) {
  userService.findById(request.userId)
    .then((user) => {
      response.json({
        user,
      })
    })
}

module.exports = {
  view,
}
