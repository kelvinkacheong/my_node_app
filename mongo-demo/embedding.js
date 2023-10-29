const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors: {
    type: [authorSchema],
    required: true
  }
}));

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId) {
  const course = await Course.updateOne({ _id: courseId }, {
    $unset: {
      'author': ''
    }
  });
  //course.author.name = "Kelvin Chan";
  //course.save();
}

const addAuthor = async (courseId, author) => {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();
};

const removeAuthor = async (courseId, authorId) => {

  await Course.updateOne(
    { _id: courseId },
    { $pull: { 'authors': { _id: authorId } } }
  );
};

// createCourse('Node Course', [
//   new Author({ name: 'Mosh' }),
//   new Author({ name: 'Elgar Lam' }),
//   new Author({ name: 'Kelvin Chan' })
// ]);

// updateAuthor("653e23c89012daf94aee0813");

// addAuthor("653e38a953fa4c3f7ff5df95", new Author({ name: "Amy", bio: "yolo" }));
removeAuthor("653e5ab4152200c7bc652dc7", "653e5ab4152200c7bc652dc5");