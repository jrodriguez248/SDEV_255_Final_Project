const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    TeacherName:{
        type: String,
        required: true
    },
    TeacherCourses:{
        type: String,
        required: true
    }},{timestamps:true});

const Course = mongoose.model('Course', CourseSchema);
module.exports = Course;