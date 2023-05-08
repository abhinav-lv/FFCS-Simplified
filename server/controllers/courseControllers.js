const CourseModel = require('../models/CourseModel')

const getCourses = async (req,res) => {
    const studentDetails = req.body

    const courses = await CourseModel.find({
        studentBatch: studentDetails.class,
        studentSchool: studentDetails.school
    })

    res.send(courses)
}

module.exports = {getCourses}