'use strict';

const _ = require('lodash');
const Boom = require('boom');
const Models = global.Models;
const Joi = require('joi');
const ResponseJSON = global.helpers.ResponseJSON;
const service = require('../services');

const helpers = global.helpers;
const config = helpers.config;

module.exports.getInfor = {
    handler: function (req, rep) {
        let user_data = req.auth.credentials;
        rep(ResponseJSON('ok', user_data));
    },
    auth: {
        mode: 'required',
        strategies: ['jwt']
    }
};