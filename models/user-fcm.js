'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserFcm = new Schema({
    email: String,
    event_id: String,
    fcm_token: String
});

mongoose.model('UserFcm', UserFcm);