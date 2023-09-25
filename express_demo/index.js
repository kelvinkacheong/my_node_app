const startUpDebugger = require('debug')("app:startup");
const dbDebugger = require('debug')('app:db');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const express = require('express');
const logger = require('./logger');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());

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

const courses = [
    {id: 1, name: "ScratchJr"},
    {id: 2, name: "Scratch"},
    {id: 3, name: "App Inventor"},
    {id: 4, name: "Full Stack Web Development"}
];
app.get('/', (req, res) => {
    res.send('Hello World!!!');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send("The course with the given ID was not found!");
    res.send(course);
});

app.post('/api/courses', (req, res) => {
    const result = validateCourse(req.body);

    if (result.error) return res.status(400).send(result.error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    // Look up the course first, if not exist => return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send("The course with the given ID was not found!");

    // Validate, if invalid => return 400 - bad request
    const { error } = validateCourse(req.body)

    if (error) return res.status(400).send(error.details[0].message);

    // update the course => return the updated course to the client
    course.name = req.body.name;
    res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
    // look up the course
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send("The course with the give ID was not found!");

    // delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    // return the deleted course
    res.send(course);
});

const validateCourse = course => {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    const result = schema.validate(course);
    return result;
};

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`listening on port ${port}.....`);
})