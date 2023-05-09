/* IMPORT HOOKS */
import { useState, useEffect } from 'react'

/* IMPORT PACKAGES */
import axios from 'axios'

/* IMPORT COMPONENTS */
import Details from '../info/Details'
import CourseTable from '../CourseTable'
import { Select, Box } from '@chakra-ui/react'

/* ------------------------------------------------------------------------------------------------- */

// Return an array of course objects where each object contains the course code and course title
const getCourseNames = (courses) => {
    return courses.map((course) => {
        return {
            code: course.theoryCourseCode, 
            title: course.theoryCourseTitle
        }
    })
}

// Return array of <option> elements for rendering <select> element
const getCourseOptionElements = (courseNames) => courseNames.map((course) => {
    return <option key={course.code} value={course.code}>{course.code+' - '+course.title}</option>
})

/* ------------------------------------------------------------------------------------------------- */

/* COURSES TAB COMPONENT */
const CoursesTab = ({user, tabIndex, setTabIndex}) => {

    // States
    const [courses, setCourses] = useState([])
    const [selectedCourse, setSelectedCourse] = useState(courses[0])

    // Get courses from server on first render
    useEffect(function(){
        const getData = async () => {
            const courseData = await axios.post('/courses/get-courses', {
                class: user.class,
                school: user.school,
            })
            setCourses(courseData.data)
        }
        getData()
        // eslint-disable-next-line
    },[])

    // Control the value of the Select element
    const handleChange = (e) => {
        courses.forEach((course) => {
            if(course.theoryCourseCode === e.target.value) setSelectedCourse(course)
        })
    }

    // courseNames = [{code: 'BCSE307L', title:'Compiler Design'}, ...]
    const courseNames = getCourseNames(courses)

    // courseOption = <option>BCSE307L - Compiler Design</option>
    const courseOptionElements = getCourseOptionElements(courseNames)

    return(
        <Box width='90%' margin='auto' mt='25px'>
            <Details user={user} courses={courses}/>
            <Select 
                margin='auto' 
                marginTop='50px' 
                placeholder="Select course"
                name="courseSelect" 
                value={selectedCourse?.theoryCourseCode}
                onChange={handleChange}
            >
                {courseOptionElements}
            </Select>
            {selectedCourse 
            ?   <Box margin='auto' marginTop='25px'>
                    <CourseTable
                        tabIndex={tabIndex}
                        setTabIndex={setTabIndex} 
                        course={selectedCourse}
                    />
                </Box> 
            : <p></p>}
        </Box>
    )
}

export default CoursesTab