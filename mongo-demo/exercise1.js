const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/mongo-exercises')
    .then(() => console.log('connecting to DB.....'))
    .catch(err => console.error('Could not connect to DB...', err));

const courseSchema = new mongoose.Schema({
    tags: [ String ],
    date: Date,
    name: String,
    author: String,
    isPublished: Boolean,
    price: Number
})

const Course = mongoose.model('Course', courseSchema);

const getBackendCourses = async () => {
    return await Course
        .find({ isPublished: true, tags: "backend"})
        .sort({name: 1})
        .select({name: 1, author: 1});
};

async function logCourses() {
    const courses = await getBackendCourses();
    console.log(courses);
}

logCourses();