function view (request, response) {
  response.json({ message: 'Report data' })
}

function create (request, response) {
  response.json({ message: 'Report data was created by ' + request.userId })
}

module.exports = {
  view,
  create,
}
