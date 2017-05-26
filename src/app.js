const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.use('/config', require('./config'));

module.exports = app;
