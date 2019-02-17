const mongoose = require('mongoose');

function connect () {
  return mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true
  });  
}

function disconnect (connection) {
  connection.disconnect()
}

module.exports = {
  connect,
  disconnect,
};
