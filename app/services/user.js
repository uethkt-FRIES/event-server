'use strict';

const _ = require('lodash');
const jwt = require('jsonwebtoken');
const helpers = global.helpers;
const config = helpers.config;

let db = require('./database');
const async = require('async');

const SERVER_KEY = config('SERVER_KEY', '');

module.exports.getTokenUser = (user_infor) => {
    return new Promise((resolve, reject) => {
        let tokenUser = jwt.sign(user_infor, SERVER_KEY);
        let res = {
            token: tokenUser,
            user_infor: user_infor
        };

        resolve(res);
    });
};