'use strict';

const _ = require('lodash');
const async = require('async');

const Mongoose = require('mongoose');
let User = Mongoose.model('User');
let Event = Mongoose.model('Event');
let UserEvent = Mongoose.model('UserEvent');
let UserFcm = Mongoose.model('UserFcm');

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

// Event

module.exports.findEvent = function (event_id) {
    return Event.findOne({event_id});
};

module.exports.insertEvent = function (event_infor) {
    let event = new Event(event_infor);
    return event.save();
};

module.exports.updateAvatarEvent = function (event_id, avatar) {
    return Event.findOne({event_id})
        .then(event => {
            if (_.isEmpty(event)) {
                return Promise.reject('event not exist');
            } else {
                event.avatar = avatar;
                return event.save();
            }
        });
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


// User - fcm

module.exports.insertUserFcm = function (user_info) {
    return UserFcm.findOne(user_info)
        .then(user => {
            if (!_.isEmpty(user)) {
                console.log('da ton tai user');
                return Promise.resolve(user);
            } else {
                let user = new UserFcm(user_info);
                return user.save();
            }
        });
};

module.exports.findUserFcmByEventId = function (event_id) {
    return UserFcm.find({
        event_id
    });
};