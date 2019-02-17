const path = require('path')
const superstatic = require('superstatic').server

const port = 4040
const app = superstatic({
  port,
  cwd: path.resolve(__dirname, 'public')
});

app.listen(function() {
  console.log('admin listening on port', port)
});
