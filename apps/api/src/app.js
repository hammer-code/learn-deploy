const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

const router = require('./router');

const app = express();
  
// Apply global Middlewares
app.use(cors({
  origin: '*',
}));
app.use(bodyParser.json());

app.use('/api', router);

module.exports = app;