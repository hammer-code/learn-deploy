require('dotenv').config(); 

const app = require('./app');
const db = require('./db');

const PORT = 8080;

Promise.resolve()
  .then(() => {
    return db.connect()
      .then(() => {
        console.log('DB Authenticated!');
      });
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`API running on port: ${PORT}`);
    });
  });
