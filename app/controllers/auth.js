'use strict';

const _ = require('lodash');
const Boom = require('boom');
const Models = global.Models;
const Joi = require('joi');
const ResponseJSON = global.helpers.ResponseJSON;
const service = require('../services');


const helpers = global.helpers;
const config = helpers.config;

module.exports.facebook = {
    auth: {
        strategy: 'facebook',
        mode: 'try'
    },
    handler: function (request, reply) {
        if (!request.auth.isAuthenticated) {
            return reply.redirect('/');
        }

        let data = request.auth.credentials;

        reply('<pre>' + JSON.stringify(request.auth.credentials, null, 4) + '</pre>');
    }
};