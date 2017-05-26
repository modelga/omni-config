const express = require('express');

const app = express();

app.get('/:config/:version', require('./read'));
app.post('/', require('./write'));

module.exports = app;
