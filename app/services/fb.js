'use strict';

const Request = require('request');

module.exports.getAvatar = (id) => {
    let deferred = Promise.defer();

    let api = `http://graph.facebook.com/${id}/picture?type=large&redirect=false`;

    Request(api, {}, (error, response, body) => {
        if (error) {
            return deferred.reject(error);
        }

        try {
            let object = JSON.parse(body);
            let {data} = object;
            let {url} = data;

            return deferred.resolve(url);
        } catch (e) {
            return deferred.reject(e);
        }
    });

    return deferred.promise;
};