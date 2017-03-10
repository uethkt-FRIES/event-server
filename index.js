'use strict';

/**
 * Auto load.
 */
require('./autoload')()
    .then(
        message => {
            console.log(message);

            // start server
            require('./app/main');
        }
    ).catch(error => console.log(error));