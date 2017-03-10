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

        // log receiver
        {
            method : ['POST'],
            path: '/log',
            config: controller.logReceiver.log
        }

    ]);
};

module.exports.register.attributes = {
    name: 'Fries Router',
    version: '1.0.0'
};