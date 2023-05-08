const CourseModel = require('../models/CourseModel')
const UserModel = require('../models/UserModel')

// authorize
const authorizeUser = async (req,res) => {
    if(req.session.user){
        const user = await UserModel.findOne({'regNo': `${req.session.user.regNo}`})
        if(user.admin) res.status(200).send(req.session.user)
        else res.status(403).send('Unauthorized')
    }
    else res.status(403).send('Unauthorized')
}

// create a new course
const createCourse = async (req, res) => {

    const course = new CourseModel(req.body)

    try{
        await course.save()
    }
    catch(err){
        console.log(err.message)
    }

    res.status(200).send('Success')
}

module.exports = {
    createCourse,
    authorizeUser
}