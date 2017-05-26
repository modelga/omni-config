const express = require('express');

const app = express();

app.get('/:client/:version', require('./read'));
app.post('/', require('./write'));

module.exports = app;
