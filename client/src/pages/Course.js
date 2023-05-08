/* Import packages */
import axios from 'axios'
import { useState, useEffect } from "react"

/* Import components */ 
import NavBar from '../components/NavBar'
import Details from '../components/Details'
import CourseTable from '../components/CourseTable'
import Tables from '../components/Tables'
import { Select, Box, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

/* Import context */
import { CourseContextProvider } from '../context/course'

// Authorize user with server
const authorize = async (setUser) => {
    try{
        const user = await axios.get('/auth/authorize')
        setUser({
            authorized: true,
            user: user.data,
        })
    }
    catch(error){
        setUser({
            authorized: false,
            user: {},
        })
    }
}

// Get shortened array of objects where each object has course code and title
const getCourseNames = (courses) => {
    return courses.map((course) => {
        return {
            code: course.theoryCourseCode, 
            title: course.theoryCourseTitle
        }
    })
}

// Get <option> elements for <select> element
const getCourseOptionElements = (courseNames) => courseNames.map((course) => {
    return <option key={course.code} value={course.code}>{course.code+' - '+course.title}</option>
})

// Courses component
const Courses = ({user, tabIndex, setTabIndex}) => {
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
            {selectedCourse ? <Box margin='auto' marginTop='25px'>
                                <CourseTable
                                    tabIndex={tabIndex}
                                    setTabIndex={setTabIndex} 
                                    course={selectedCourse}
                                />
                            </Box> : <p></p>}
        </Box>
    )
}

// Course Page
const Course = () => {

    const [user, setUser] = useState({
        authorized: false,
        user: {},
    })
    useEffect(function (){authorize(setUser)}, [])

    const [tabIndex, setTabIndex] = useState(0)

    return user.authorized ? (
        <CourseContextProvider>
            <NavBar User={user.user}/>
            <Box width='90%' margin='auto' mt='25px'>
                <Tabs
                    isFitted
                    index={tabIndex}
                    onChange={(index) => setTabIndex(index)}
                >
                    <TabList width='90%' margin='auto'>
                        <Tab>Courses</Tab>
                        <Tab>Tables</Tab>
                        <Tab>Share</Tab>
                    </TabList> 

                    <TabPanels>
                        <TabPanel>
                            <Courses tabIndex={tabIndex} setTabIndex={setTabIndex} user={user.user}/>
                        </TabPanel>
                        <TabPanel>
                            <Tables tabIndex={tabIndex} setTabIndex={setTabIndex}/>
                        </TabPanel>
                        <TabPanel>
                            Share the tables you've made
                        </TabPanel>
                    </TabPanels>

                </Tabs>
            </Box>
        </CourseContextProvider>
    ) : <p>Forbidden</p>

}

export default Course