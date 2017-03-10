'use strict';

const mkdirp = require('mkdirp');
const fs = require('fs');
const archiver = require('archiver');
const helpers = global.helpers;
const config = helpers.config;

module.exports.saveFileAndGetStaticURL = function (file, event_id, cb) {
    let timeNow = new Date(Date.now());
    let name = file.hapi.filename;

    let PATH_STATIC_FILE = config('PATH_STATIC_FILE');
    let PATH_FILE_UPLOAD = config('PATH_FILE_UPLOAD');
    let SERVER_STATIC_FILES = config('SERVER_STATIC_FILES', 'http://163.44.119.83');

    let zenPath = '/' + event_id;
    let saveFilePathServer = PATH_STATIC_FILE + PATH_FILE_UPLOAD + zenPath + '/' + name; // name mac dinh la 1.jpg

    mkdirp(PATH_STATIC_FILE + PATH_FILE_UPLOAD + zenPath, function (err) {
        if (err) {
            cb(true);
        } else {
            let newFile = fs.createWriteStream(saveFilePathServer);

            newFile.on('error', function (err) {
                cb(true);
            });

            file.pipe(newFile);

            file.on('end', function (err) {
                let res = {
                    filename: file.hapi.filename,
                    headers: file.hapi.headers,
                    path: saveFilePathServer,
                    url: (SERVER_STATIC_FILES + encodeURI(PATH_FILE_UPLOAD + zenPath + '/' + name))
                };
                cb(false, res, saveFilePathServer);
            })
        }
    });
};