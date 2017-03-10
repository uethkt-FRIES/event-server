'use strict';

const _ = require('lodash');
const async = require('async');

const Mongoose = require('mongoose');
let User = Mongoose.model('User');
let ChatSession = Mongoose.model('ChatSession');

const helpers = global.helpers;
const config = helpers.config;

// User

module.exports.findUser = function (fb_id) {
    return User.findOne({fb_id});
};

module.exports.insertUser = function (user_info) {
    let user = new User(user_info);
    return user.save();
};

// Chat session

module.exports.findAllSession = function () {
    return ChatSession.find();
};

module.exports.insertLogSession = (log_session) => {
    let logSession = new ChatSession(log_session);
    return logSession.save();
};