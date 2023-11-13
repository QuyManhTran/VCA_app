const express = require('express');
const path = require('path');

const { config } = require('./configs/appConfig');
//
const app = express();

config(app);
app.use('/public',express.static(path.join(__dirname, 'public')));


module.exports = app;