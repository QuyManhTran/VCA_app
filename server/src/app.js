const express = require('express');
require('dotenv').config();
const { config } = require('./configs/appConfig');
//
const app = express();

config(app);

module.exports = app;