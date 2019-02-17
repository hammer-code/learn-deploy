const superstatic = require('superstatic').server

const port = 3030
const app = superstatic({
  port
});

app.listen(function() {
  console.log('www listening on port', port)
});
