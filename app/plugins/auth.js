'use strict';

const _ = require('lodash');
const jwt = require('hapi-auth-jwt2');

const Bell = require('bell');

module.exports.register = function register(server, options, next) {
    let config = global.helpers.config;
    let key = config('SERVER_KEY', '');


    let validate = function (decoded, request, callback) {
        // if (!_.has(decoded, 'id')) {
        //     return callback(null, false);
        // }

        request.auth.credentials = decoded;

        // console.log('decoder' + decoded);

        callback(null, true);

        // let tokenId = _.get(decoded, 'token_id', '');
        // new Models.Token({
        //     id : tokenId
        // }).fetch().then(function (token) {
        //     let timeExpire = token.toJSON().time_expire;
        //     if (Date.now() > timeExpire){
        //         callback(null, false);
        //     } else {
        //         return callback(null, true);
        //     }
        // }).catch(function () {
        //     callback(null, false);
        // });
    };

    server.register(jwt, function (err) {
        if (err) {
            return console.log(err);
        }

        server.auth.strategy('jwt', 'jwt', {
            key: key,
            validateFunc: validate,
            verifyOptions: {algorithms: ['HS256']}
        });
    });

    // let app_id = config('FB_APP_ID');
    // let app_secret = config('FB_APP_SECRET');
    // let host = config('SERVER_HOST');
    //
    // server.register(Bell, (err) => {
    //     server.auth.strategy('facebook', 'bell', {
    //         provider: 'facebook',
    //         password: '3c0bcd61ba83c729fa8c7faeff016ef6',
    //         isSecure: false,
    //         // You'll need to go to https://developers.facebook.com/ and set up a
    //         // Website application to get started
    //         // Once you create your app, fill out Settings and set the App Domains
    //         // Under Settings >> Advanced, set the Valid OAuth redirect URIs to include http://<yourdomain.com>/bell/door
    //         // and enable Client OAuth Login
    //         clientId: app_id,
    //         clientSecret: app_secret,
    //         location: host
    //     });
    // });
};

module.exports.register.attributes = {
    name: 'auth',
    version: '1.0.0'
};