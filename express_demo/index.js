const startUpDebugger = require('debug')("app:startup");
const dbDebugger = require('debug')('app:db');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const courses = require("./routes/courses");
const home = require("./routes/home");
const express = require('express');
const logger = require('./middleware/logger');

const app = express();

app.set('view engine', 'pug');
app.set('views', './views') // default

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/courses', courses);
app.use('/', home);

// configuration
console.log(`Application name: ${config.get('name')}`);
console.log(`mail server: ${config.get('mail.host')}`);
console.log(`mail password: ${config.get('mail.password')}`);

if (app.get('env') === "development") {
    app.use(morgan("tiny"));
    startUpDebugger("morgan enabled.....");
}

// if it connects to a database..
dbDebugger('Connecting to the database......');

app.use(logger);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`listening on port ${port}.....`);
})