const express = require('express');
const path = require('path');

const app = express();

app.use(
  express.static(
    path.resolve(__dirname, './public')
  )
);

app.use(
  express.static(
    path.resolve(__dirname, './views')
  )
);

const PORT = 4040;

app.listen(PORT, () => {
  console.log(`Client running on port: ${PORT}`);
});
