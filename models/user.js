'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = new Schema({
    name: String,
    avatar: String,
    email: String,
    token: String,
});

User.statics.findOrCreate = function (args) {
    let deferred = Promise.defer();

    let {email} = args;

    let self = this;

    this
        .findOne({email})
        .then(
            user => {
                if (!user) {
                    let u = new self(args);

                    return u.save();
                }

                return Promise.resolve(user);
            }
        )
        .then(
            (user) => {
                deferred.resolve(user.toJSON());
            }
        )
        .catch(
            error => {
                deferred.reject(error);
            }
        );

    return deferred.promise;
};

mongoose.model('User', User);