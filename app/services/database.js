'use strict';

const _ = require('lodash');
const async = require('async');

const Mongoose = require('mongoose');
let User = Mongoose.model('User');
let UserEvent = Mongoose.model('UserEvent');

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

// User event
module.exports.insertUserEvent = function (user_info) {
    return UserEvent.findOne(user_info)
        .then(user => {
            if (!_.isEmpty(user)) {
                console.log('da ton tai user');
                return Promise.resolve(user);
            } else {
                let user = new UserEvent(user_info);
                return user.save();
            }
        });
};

module.exports.findUsersByEventId = function (event_id) {
    return UserEvent.find({
        event_id
    });
};