const express = require("express");
const router = express.Router();
const {getCourses} = require('../controllers/courseControllers')

router.post('/get-courses',getCourses)

module.exports = router