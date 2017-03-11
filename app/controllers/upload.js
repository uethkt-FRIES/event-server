'use strict';

const _ = require('lodash');
const Boom = require('boom');
const Models = global.Models;
const Joi = require('joi');
const ResponseJSON = global.helpers.ResponseJSON;
const service = require('../services');

const helpers = global.helpers;
const config = helpers.config;

/**
 * Post/attack a image
 * @return linkImg : String
 */

module.exports.uploadImage = {
    handler: function (req, rep) {
        let user_data = req.auth.credentials;
        let email = _.get(user_data, 'email');

        console.log(user_data);

        let data = req.payload;

        let event_id = data.event_id;

        if (data.file) {
            let file = data.file;

            console.log(file);

            service.file.saveFileAndGetStaticURL(file, event_id, function (err, res) {
                if (!err) {
                    rep(ResponseJSON('Upload success!', res));

                    // save to db
                    // new Models.AttackFile({
                    //     user_id: user_id,
                    //     type: 'image',
                    //     url: res.url
                    // }).save();
                } else {
                    rep(Boom.badData('Something went wrong!'));
                }
            });
        } else {
            rep(Boom.badData('Data is wrong!'));
        }
    },
    // auth: {
    //     mode: 'required',
    //     strategies: ['jwt']
    // },
    payload: {
        output: 'stream',
        maxBytes: 5097152,
        allow: 'multipart/form-data',
        parse: true
    }
};

module.exports.uploadMap = {
    handler: function (req, rep) {
        let user_data = req.auth.credentials;
        let email = _.get(user_data, 'email');
        // let event_id = _.get(user_data, 'event_id');

        let data = req.payload;

        let event_id = data.event_id;

        if (data.file) {
            let file = data.file;

            console.log(file);

            service.file.saveFileAndGetStaticURL(file, event_id, function (err, res) {
                if (!err) {

                    service.fcmDb.updateMap(event_id, res.url);

                    rep(ResponseJSON('Upload success!', res));

                    // save to db
                    // new Models.AttackFile({
                    //     user_id: user_id,
                    //     type: 'image',
                    //     url: res.url
                    // }).save();
                } else {
                    rep(Boom.badData('Something went wrong!'));
                }
            });
        } else {
            rep(Boom.badData('Data is wrong!'));
        }
    },
    // auth: {
    //     mode: 'required',
    //     strategies: ['jwt']
    // },
    payload: {
        output: 'stream',
        maxBytes: 5097152,
        allow: 'multipart/form-data',
        parse: true
    }
};