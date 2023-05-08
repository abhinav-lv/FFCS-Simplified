const mongoose = require('mongoose');
const {Schema} = mongoose;

mongoose.connect('mongodb://127.0.0.1:27017/ffcstest');

const courseSchema = new Schema({
    courseID: {type: String, index:{unique: true}},
    studentBatch: Number,
    studentSchool: String,
    semester: String,
    year: Number,
    category: String,
    courseType: String,
    hasLabComponent: Boolean,
    theoryCourseCode: String, 
    theoryCourseTitle: String,
    theoryCourseCredits: Number,
    theoryCourseSlots: [{slot: Array, venue: String, faculty: String, courseType: String}],
    labCourseCode: String,
    labCourseTitle: String,
    labCourseCredits: Number,
    labCourseSlots: [{slot: Array, venue: String, faculty: String, courseType: String}],
    dateCreated: {type: Date, default: Date.now}
});
const CourseModel = mongoose.model('Course', courseSchema);

module.exports = CourseModel;