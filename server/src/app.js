const express = require('express');

const { config } = require('./configs/appConfig');
//
const app = express();

config(app);


module.exports = app;