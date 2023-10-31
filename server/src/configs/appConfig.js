const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require("cors");
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const route = require('../routes/index');
const cookieParser = require('cookie-parser');

const db = require('../models/database');

// view engine setup
const config = (app) => {
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');

    // app.use(logger('dev'));
    app.use(express.json()); 
    app.use(cors());
    app.use(express.urlencoded({
        extended: true,
    }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));

    app.use(bodyParser.json());
    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }));
    // parse the raw data
    app.use(bodyParser.raw());
    // parse text
    app.use(bodyParser.text());


    // connect to database
    db.connect();

    // connect to route index
    route(app);
    // app.use('/', accountRouter);

    // // Sử dụng Passport và session
    // Đặt up phiên làm việc (session)
    // app.use(session({
    //     secret: 'eglv bxko aqbh eyws',
    //     resave: true,
    //     saveUninitialized: true
    // }));
    // app.use(passport.initialize());
    // app.use(passport.session());


}

module.exports = {
    config,
}