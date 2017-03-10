// 'use strict';
//
// const _ = require('lodash');
// const Boom = require('boom');
// const Models = global.Models;
// const Joi = require('joi');
// const ResponseJSON = global.helpers.ResponseJSON;
// const service = require('../services');
// const fbService = service.fb;
//
// const helpers = global.helpers;
// const config = helpers.config;
//
// const Mongoose = require('mongoose');
// let User = Mongoose.model('User');
//
// module.exports.facebook = {
//     auth: {
//         strategy: 'facebook',
//         mode: 'try'
//     },
//     handler: function (request, reply) {
//         if (!request.auth.isAuthenticated) {
//             return reply.redirect('/');
//         }
//
//         let data = request.auth.credentials;
//         let {token, profile} = data;
//         let {id, email, displayName} = profile;
//
//         fbService.getAvatar(id)
//             .then(
//                 avatar => {
//                     let name = displayName;
//
//                     return User.findOrCreate({name, email, token, avatar});
//                 }
//             )
//             .then(
//                 user => {
//                     return service.user.generateToken(user);
//                 }
//             )
//             .then(
//                 token => {
//                     let web_token = config('WEB_CLIENT', 'https://web.edoo.vn');
//                     let url_redirect = web_token + '/auth/' + token;
//
//                     reply.redirect(url_redirect);
//                 }
//             )
//             .catch(
//                 error => {
//                     console.log(error);
//                     let host = config('SERVER_HOST');
//
//                     reply.redirect(host + '/auth/fb');
//                 }
//             );
//     }
// };