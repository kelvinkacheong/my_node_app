const express = require('express');
const router = express.Router();


const courses = [
    {id: 1, name: "ScratchJr"},
    {id: 2, name: "Scratch"},
    {id: 3, name: "App Inventor"},
    {id: 4, name: "Full Stack Web Development"}
];

router.get('/', (req, res) => {
    res.send(courses);
});

router.get('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send("The course with the given ID was not found!");
    res.send(course);
});

router.post('/', (req, res) => {
    const result = validateCourse(req.body);

    if (result.error) return res.status(400).send(result.error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
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

module.exports = router;