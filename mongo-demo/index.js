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
    name: 'ABC example Course',
    author: "Elgar Lam",
    tags: ['diu', 'lah'],
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

const updateCourse = async (id) => {
  // Approach: Query first
  // findById()
  // Modify its properties
  // save()

  // const course = await Course.findById(id);
  // if (!course) console.log("no course");

  // course.set({
  //   isPublished: true,
  //   author: 'Kelvin Heyyyy'
  // });

  // const result = await course.save();
  // console.log(result);

  // Approach: Update first
  // Update directly
  // Optionally: get the updated document as well
  const course = await Course.findByIdAndUpdate(id, {
    $set: {
      author: "Yoyoyo what's up",
      isPublished: true
    }
  }, { new: true });
  console.log(course);
};

const removeCourse = async (id) => {
  const result = await Course.deleteOne({ _id: id });
  console.log(result);
};

removeCourse("65328c7ea0c8a743ea65ab9d");