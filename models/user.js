'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = new Schema({
    name: String,
    avatar: String
});

mongoose.model('User', User);