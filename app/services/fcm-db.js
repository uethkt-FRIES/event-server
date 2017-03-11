'use strict';
let admin = require("firebase-admin");
let async = require('async');

let serviceAccount = require("./../../serviceAccountKey.json");

let defaultAppConfig = {
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://timy-hackathon.firebaseio.com"
};

module.exports.updateMap = (event_id, mapUrl) => {
// Initialize the default app
    admin.initializeApp(defaultAppConfig);

// Get a database reference to our blog
//     let db = admin.database();
    let eventUpdate = admin.database().ref("events/" + event_id);
    eventUpdate.update({map: mapUrl});
};