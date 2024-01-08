require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');

module.exports = function() {
  winston.exceptions.handle(
    new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize({ all: true }),
            winston.format.simple()
        )
    }),
    new winston.transports.File({ filename: 'uncaughtExceptions.log' })
  );
  
  process.on('unhandledRejection', (ex) => {
    throw ex;
  });
  
  winston.add(new winston.transports.File({ filename: 'logfile.log' }));
  winston.add(new winston.transports.MongoDB({ db: "mongodb://127.0.0.1:27017/vidly", options: {
        useUnifiedTopology: true,
    } 
  }));
}