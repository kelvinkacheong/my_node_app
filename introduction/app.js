// const EventEmitter = require('events');
// const emitter = new EventEmitter();
const http = require('http');

const Logger = require('./logger.js');
const logger = new Logger();

// Register a listener
logger.on('messageLogged', (arg) => {
    console.log('Listener called:', arg);
});

logger.log("Hello this is the beginning!");

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.write("Yo this is the first line!\n");
        res.write("this is the second line \n");
        res.end("bye world");
    }

    if (req.url === '/api/courses') {
        res.write(JSON.stringify({
            "Scratch": "7-9",
            "App Inventor": "9 - 11",
            "Full Stack": "11+"
        }))
        res.end("\n bye world <3");
    }
});

server.listen(3000);

console.log("listening to port 3000.....");