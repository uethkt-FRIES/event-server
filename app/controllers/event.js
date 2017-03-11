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

        let apiKey = 'AAAAAQrifT0:APA91bGude_DQ9IgAFRTXGSOYA7QbaAJNlCeaHd-jo7uAsaA7npLteHunahJbH6h5cbsafTlEJDW2YWuek6qUyJoxN2mVJ1IPrgNo330j_pDsx4RCtqT3oWhxbCZRhkG-hDHPxkh6eOK';
        let event_id = payload.event_id;
        let dataSend = {
            event_id: event_id,
            question_id: payload.question_id,
            title: payload.title,
            content: payload.content,
            as1: payload.as1 || '',
            as2: payload.as2 || '',
            as3: payload.as3 || '',
            as4: payload.as4 || '',
            type: 1
        };

        service.db.findUserFcmByEventId(event_id)
            .then(users => {
                for (let user of users) {
                    pushFirebaseNoti(apiKey, user.fcm_token, dataSend);
                }

                rep(ResponseJSON('ok'));
            })
            .catch(err => {
                rep(Boom.badData(err));
            });
    },
    validate: {
        payload: {
            event_id: Joi.string().required(),
            question_id: Joi.string().required(),
            title: Joi.string().required(),
            content: Joi.string().required(),
            as1: Joi.string(),
            as2: Joi.string(),
            as3: Joi.string(),
            as4: Joi.string()
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