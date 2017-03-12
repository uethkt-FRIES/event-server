'use strict';
let admin = require("firebase-admin");
let async = require('async');

let serviceAccount = require("./../../serviceAccountKey.json");

let defaultAppConfig = {
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://timy-hackathon.firebaseio.com"
};

// Initialize the default app
admin.initializeApp(defaultAppConfig);

module.exports.updateMap = (event_id, mapUrl) => {
// Initialize the default app
//     admin.initializeApp(defaultAppConfig);

// Get a database reference to our blog
//     let db = admin.database();
    let eventUpdate = admin.database().ref("events/" + event_id);
    eventUpdate.update({map: mapUrl});
};

module.exports.postVote = (event_id, question_id, answer) => {
// Initialize the default app
//     admin.initializeApp(defaultAppConfig);

// Get a database reference to our blog
//     let db = admin.database();
    let eventUpdate = admin.database().ref("events/" + event_id + '/questions/' + question_id + '/stats/' + answer);
    eventUpdate.push({answer: answer});
};

module.exports.pushNoti = (title, content) => {
// Initialize the default app
//     admin.initializeApp(defaultAppConfig);
    let created_at = Date.now();

// Get a database reference to our blog
//     let db = admin.database();
    let eventUpdate = admin.database().ref("events/notifications");
    eventUpdate.push({title, content, created_at});
};