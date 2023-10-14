const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/playground')
  .then(() => console.log('Connected to MongoDB....'))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [ String ],
  date: { type: Date, default: Date.now },
  isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

const createCourse = async () => {
  const course = new Course({
    name: 'Angular Course',
    author: "Kelvin Chan",
    tags: ['angular', 'frontend'],
    isPublished: true
});

  const result = await course.save();
  console.log(result);
};

const getCourses = async () => {

  // eq (equal)
  // ne (not equal)
  // gt (greater than)
  // gte (greater than or equal to)
  // lt (less than)
  // lte (less than or equal to)
  // in
  // nin (not in)
  // or()
  // and()

  const pageNumber = 2;
  const pageSize = 10;

  const courses = await Course
    // .find({ author: "Mosh"}) // ---> exact string
    // .find({ author: /^Mosh/ }) ---> starts with Mosh
    // .find({ author: /Chan$/i }) // ---> ends with Chan (i means case insensitive)
    .find({ author: /.*Mosh.*/ }) // ---> contains Mosh
    .skip((pageNumber - 1) * pageSize) // means skpping the 1st page
    .limit(pageSize)
    // .count()
    .select({ tags: 1, name: 1 });
  console.log(courses);
};

getCourses();