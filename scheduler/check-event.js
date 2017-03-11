'use strict';
let admin = require("firebase-admin");
let async = require('async');

let serviceAccount = require("./../serviceAccountKey.json");

let defaultAppConfig = {
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://timy-hackathon.firebaseio.com"
};

// Initialize the default app
admin.initializeApp(defaultAppConfig);

// Get a database reference to our blog
let db = admin.database();
let eventRef = db.ref("events");

function checkTimeline(cb) {
    admin.database().ref("events").once("value", function (snapshot) {
        // var appointmentsData = snapshot.val();
        let events = snapshot.val();

        // convert to array
        let eventKeyArr = [];

        for (let eventKey in events) {
            eventKeyArr.push(eventKey);
        }

        async.each(
            eventKeyArr,
            checkEachEvent,
            function (err) {
                if (!err) {
                    cb()
                } else {
                    cb(err);
                }
            });


    });
}

function checkEachEvent(eventKey, cb) {
    admin.database().ref("events/" + eventKey + '/timelines').once("value", function (snapshot) {

        let timelines = snapshot.val();
        let indexUpdateArr = [];
        for (let i = 0; i < timelines.length; i++) {
            let timeline = timelines[i];

            let now = Date.now();
            if (!timeline.is_online && timeline.start_time <= now) {
                console.log(timeline.start_time);
                console.log(now);
                indexUpdateArr.push(i);
            }
        }

        async.each(
            indexUpdateArr,
            function (i, callback) {
                let eventRef = admin.database().ref('events/' + eventKey + '/timelines/' + i);
                eventRef.update({is_online: true});

                // eventRef.on('value', function (snapshot) {
                //     console.log('ok men');
                //
                // });
                callback();
            },
            function (err) {
                if (!err) {
                    cb()
                } else {
                    cb(err);
                }
            });
    })
}

function schedule() {
    console.log('schedule');
    setTimeout(function () {
        checkTimeline(function (err) {
            if (err) {
                console.log(err);
            }
            schedule();
        })
    }, 5000);
}

module.exports = schedule;