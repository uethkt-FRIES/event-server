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

        {
            method: '*',
            path: '/auth/fb',
            config: controller.auth.facebook
        },

        // user
        {
            method : ['POST'],
            path: '/login',
            config: controller.user.login
        },

        // event
        {
            method : ['GET'],
            path: '/event',
            config: controller.event.getInfor
        }

    ]);
};

module.exports.register.attributes = {
    name: 'Fries Router',
    version: '1.0.0'
};