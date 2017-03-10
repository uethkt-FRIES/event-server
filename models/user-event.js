'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserEvent = new Schema({
    email: String,
    event_id: String
});

mongoose.model('UserEvent', UserEvent);