const express = require("express")
const router = express.Router()

// Import controllers
const {createCourse, authorizeUser} = require('../controllers/adminControllers')

// to authorize admin
router.get('/authorize',authorizeUser)

// to create a new course
router.post('/CourseData',createCourse)

module.exports = router