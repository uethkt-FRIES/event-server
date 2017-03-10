'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = new Schema({
    fb_id: String,
    first_name: String,
    last_name: String,
    profile_pic: String,
    locale: String,
    timezone: String,
    gender: String,
});

mongoose.model('User', User);