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

module.exports.postPool = {
    handler: function (req, rep) {
        let user_data = req.auth.credentials;
        let payload = req.payload;

        let apiKey = '';
        let event_id = payload.event_id;

        service.db.findUserFcmByEventId(event_id)
            .then(users => {
                for (let user of users) {
                    pushFirebaseNoti(apiKey,user.fcm_token, {title, choices});
                }

                rep(ResponseJSON('ok'));
            })
            .catch(err=>{
                rep(Boom.badData(err));
            });
    },
    validate: {
        payload: {
            event_id: Joi.string().required(),
            title: Joi.string().required(),
            choices: Joi.string().required() // Tu;quy;sdfksjdkfjsdf
        }
    }
};

function pushFirebaseNoti(apiKey, deviceToken, data) {
    // console.log('api key: ' + apiKey);
    // console.log('device: ' + deviceToken);

    let urlReq = 'https://fcm.googleapis.com/fcm/send';

    let form = {
        to: deviceToken,
        // "notification": {
        //     "body": "This week's edition is now available.",
        //     "title": "NewsMagazine.com",
        //     "icon": "new"
        // },
        data: data
    };

    let authorHeader = 'key=' + apiKey;
    let param_post = {
        url: urlReq,
        headers: {
            'Authorization': authorHeader,
            'Content-Type': 'application/json'
        },
        form: form
    };

    request.post(param_post, function (err, response, body) {
        console.log(err);
        console.log(response);
    });
}