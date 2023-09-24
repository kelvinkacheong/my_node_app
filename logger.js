const EventEmitter = require('events');

const url = "https://logger.com/"

class Logger extends EventEmitter {

    log = message => {
        console.log(message);

        // raise an event
        this.emit("messageLogged", {id: 1, url: "https://www.google.com/"});
    }
}

module.exports = Logger;

// console.log(module);