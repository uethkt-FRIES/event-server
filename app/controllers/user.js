'use strict';

const _ = require('lodash');
const Boom = require('boom');
const Models = global.Models;
const Joi = require('joi');
const ResponseJSON = global.helpers.ResponseJSON;
const service = require('../services');

const helpers = global.helpers;
const config = helpers.config;

module.exports.login = {
    handler: function (req, rep) {
        let payload = req.payload;
        console.log(payload);
        service.db.insertUserEvent(payload)
            .then(user=>{
                return service.user.getTokenUser(payload);
            })
            .then(res => {

                rep(ResponseJSON('Success!', res));
            })
            .catch(err => {
                rep(Boom.badData('wrong'));
            });
    },
    validate: {
        payload: {
            email: Joi.string().email().required(),
            event_id: Joi.string().required()
        }
    }
};