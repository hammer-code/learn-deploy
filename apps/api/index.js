require('dotenv').config(); 

const app = require('./src/app');
const db = require('./src/db');

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
