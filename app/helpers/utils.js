'use strict';

function replaceAll(string, search, replace) {
    return string.split(search).join(replace);
}

module.exports.replaceAll = replaceAll;
