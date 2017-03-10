'use strict';

const _ = require('lodash');
const Boom = require('boom');
const Models = global.Models;
const Joi = require('joi');
const ResponseJSON = global.helpers.ResponseJSON;
const service = require('../services');

const helpers = global.helpers;
const config = helpers.config;

module.exports.log = {
    handler: function (req, rep) {

        return rep(ResponseJSON('Success!'));
    }
};