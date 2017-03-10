'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Event = new Schema({
    name: String,
    avatar: String,
    banners: Schema.Types.Mixed
});

mongoose.model('Event', Event);