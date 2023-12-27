require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');
const express = require('express');
const app = express();


winston.exceptions.handle(
    new winston.transports.File({ filename: 'uncaughtExceptions.log' })
)

process.on('unhandledRejection', (ex) => {
    throw ex;
});

winston.add(new winston.transports.File({ filename: 'logfile.log' }));
winston.add(new winston.transports.MongoDB({ db: "mongodb://127.0.0.1:27017/vidly", options: {
        useUnifiedTopology: true,
    } 
}));

require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();

const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Listening on port ${port}...`));