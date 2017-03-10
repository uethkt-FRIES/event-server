'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = new Schema({
    name: String,
    avatar: String,
    email: String
});

mongoose.model('User', User);