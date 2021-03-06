'use strict';

module.exports.register = (server, options, next) => {
    let controller = require('./../controllers');

    server.route([
        {//Any request OPTIONS
            path: '/{text*}',
            method: ['OPTIONS'],
            config: {
                handler: function(request, reply) {
                    return reply().code(204);
                }
            }
        },

        // {
        //     method: '*',
        //     path: '/auth/fb',
        //     config: controller.auth.facebook
        // },

        // user
        {
            method : ['POST'],
            path: '/login',
            config: controller.user.login
        },
        {
            method : ['POST'],
            path: '/fcm',
            config: controller.user.registerFcm
        },

        // event
        {
            method : ['GET'],
            path: '/event',
            config: controller.event.getInfor
        },
        {
            method : ['POST'],
            path: '/postquestion',
            config: controller.event.postPool
        },
        {
            method : ['POST'],
            path: '/postvote',
            config: controller.event.postVote
        },
        {
            method : ['POST'],
            path: '/sendnoti',
            config: controller.event.pushNoti
        },

        // upload
        {
            method : ['POST'],
            path: '/img',
            config: controller.upload.uploadImage
        },
        {
            method : ['POST'],
            path: '/map',
            config: controller.upload.uploadMap
        }

    ]);
};

module.exports.register.attributes = {
    name: 'Fries Router',
    version: '1.0.0'
};