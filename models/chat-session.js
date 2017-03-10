'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ChatSession = new Schema({
    sender: {type: Schema.ObjectId, ref: 'User'},
    session: {
        id: String,
        lhs_fb_id: String,
        rhs_fb_id: String
    },
    message: Schema.Types.Mixed
});

mongoose.model('ChatSession', ChatSession);