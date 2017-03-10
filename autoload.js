'use strict';

/**
 * Environment variables.
 */
require('dotenv').config({
    path: '.env'
});

/**
 * Helper functions.
 */
global.helpers = require('./app/helpers/helpers');

const mongodb = require('./mongoose');

module.exports = mongodb;