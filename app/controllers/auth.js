'use strict';

const _ = require('lodash');
const Boom = require('boom');
const Models = global.Models;
const Joi = require('joi');
const ResponseJSON = global.helpers.ResponseJSON;
const service = require('../services');
const fbService = service.fb;

const helpers = global.helpers;
const config = helpers.config;

const Mongoose = require('mongoose');
let User = Mongoose.model('User');

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
        let {token, profile} = data;
        let {id, email, displayName} = profile;

        fbService.getAvatar(id)
            .then(
                avatar => {
                    let name = displayName;

                    return User.findOrCreate({name, email, token, avatar});
                }
            )
            .then(
                user => {
                    reply(ResponseJSON('Login success', user));
                }
            )
            .catch(
                error => {
                    console.log(error);
                }
            );
    }
};